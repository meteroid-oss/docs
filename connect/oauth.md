---
title: "Standard Accounts (OAuth)"
description: "Let existing Meteroid users connect their accounts to your platform via OAuth 2.0."
---

# Standard Accounts (OAuth)

Standard accounts use an OAuth 2.0 authorization code flow with PKCE to let existing Meteroid users connect their organization to your platform. The user goes through a consent screen, approves the connection, and your platform receives tokens to act on their behalf.

This is the right approach when your users already have Meteroid accounts and you want to integrate with their existing billing setup.

<Info>If your users don't have Meteroid accounts yet and should not have write access to core entities, use [Express Accounts](/connect/express) instead — they handle user registration and organization setup automatically.</Info>

## How It Works

The flow follows the standard OAuth 2.0 Authorization Code grant with PKCE (RFC 9700):

1. Your application redirects the user to Meteroid's authorization endpoint
2. The user sees a consent screen showing your app name and the requested permissions, and selects which organization to connect
3. On approval, Meteroid redirects back to your app with an authorization code
4. Your server exchanges the code for an access token and refresh token
5. You use the access token to make API calls on behalf of the connected organization

```
Your App                        Meteroid                         User
   │                               │                               │
   │  1. Redirect to /authorize    │                               │
   │──────────────────────────────>│                               │
   │                               │  2. Show consent screen       │
   │                               │──────────────────────────────>│
   │                               │                               │
   │                               │  3. User approves             │
   │                               │<──────────────────────────────│
   │                               │                               │
   │  4. Redirect with ?code=...   │                               │
   │<──────────────────────────────│                               │
   │                               │                               │
   │  5. Exchange code for tokens  │                               │
   │──────────────────────────────>│                               │
   │  ← access_token + refresh    │                               │
   │                               │                               │
   │  6. Make API calls            │                               │
   │──────────────────────────────>│                               │
```

## OAuth Apps

Before initiating the OAuth flow, create an OAuth app from **Settings > Connect > OAuth Apps**.

You need to provide:

- **App name** — displayed to users on the consent screen
- **Redirect URIs** — the URLs Meteroid will redirect to after authorization (exact match required, no wildcards)

On creation, you receive a **client ID** and a **client secret**. The client secret is shown only once — store it securely. If you lose it, you can rotate it from the OAuth Apps tab, which immediately invalidates the old secret.

## Permissions

OAuth tokens currently grant full access to the connected organization's data — equivalent to an API key for that tenant. Granular scope-based permissions (e.g. read-only billing access) are planned for a future release.

## Authorization Flow

### Step 1 — Redirect to Authorize

Redirect the user's browser to Meteroid's authorization endpoint with PKCE parameters:

```
GET /api/v1/oauth/authorize
  ?response_type=code
  &client_id=YOUR_CLIENT_ID
  &redirect_uri=https://yourapp.com/callback
  &state=random_csrf_token
  &code_challenge=BASE64URL_SHA256_OF_VERIFIER
  &code_challenge_method=S256
```

| Parameter               | Required    | Description                                                             |
| ----------------------- | ----------- | ----------------------------------------------------------------------- |
| `response_type`         | Yes         | Must be `code`                                                          |
| `client_id`             | Yes         | Your OAuth app's client ID                                              |
| `redirect_uri`          | Yes         | Must exactly match one of your registered redirect URIs                 |
| `state`                 | Recommended | An opaque value for CSRF protection, returned unchanged in the callback |
| `code_challenge`        | Yes         | Base64URL-encoded SHA-256 hash of your code verifier                    |
| `code_challenge_method` | No          | Defaults to `S256` (only supported method)                              |

### Step 2 — User Consent

The user sees a consent screen showing your application name. They select which of their organizations to connect, then approve or deny the request.

On approval, Meteroid redirects to your `redirect_uri` with an authorization code:

```
https://yourapp.com/callback?code=AUTHORIZATION_CODE&state=random_csrf_token
```

### Step 3 — Exchange Code for Tokens

Exchange the authorization code for tokens. The code is single-use and expires after 10 minutes.

```
POST /api/v1/oauth/token
Authorization: Basic BASE64(client_id:client_secret)
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=AUTHORIZATION_CODE
&redirect_uri=https://yourapp.com/callback
&code_verifier=ORIGINAL_PKCE_VERIFIER
```

A successful response includes an access token (1 hour TTL) and a refresh token (30 days TTL).

## Using Tokens

### Making API Calls

Use the access token as a Bearer token. Meteroid automatically resolves the request to the connected organization's tenant context.

```
Authorization: Bearer mtr_at_xxxxxxxx
```

### Refreshing Tokens

When an access token expires, use the refresh token to obtain a new pair:

```
POST /api/v1/oauth/token
Authorization: Basic BASE64(client_id:client_secret)
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token
&refresh_token=mtr_rt_xxxxxxxx
```

Refresh tokens are **rotated on use** — each refresh returns a new refresh token and invalidates the previous one.

### Token Introspection

Check whether a token is valid (RFC 7662):

```
POST /api/v1/oauth/introspect
Authorization: Basic BASE64(client_id:client_secret)
Content-Type: application/x-www-form-urlencoded

token=mtr_at_xxxxxxxx
```

Returns `active: true` with token metadata if valid, or `active: false` for any invalid, expired, or revoked token.

### Token Revocation

Revoke a token (RFC 7009):

```
POST /api/v1/oauth/revoke
Authorization: Basic BASE64(client_id:client_secret)
Content-Type: application/x-www-form-urlencoded

token=mtr_at_xxxxxxxx
```

Always returns 200 regardless of whether the token existed, per the RFC specification.

## Security

- **PKCE is mandatory.** Only the `S256` challenge method is supported — `plain` is rejected.
- **Tokens are hashed at rest.** Access tokens, refresh tokens, and authorization codes are stored as cryptographic hashes, not plaintext.
- **Refresh token rotation.** Each refresh produces a new token pair; the old refresh token is immediately invalidated.
- **Client authentication required.** All token operations (exchange, refresh, introspect, revoke) require HTTP Basic authentication with your client credentials.
- **Redirect URI exact matching.** No wildcards or subdomain matching — the redirect URI must exactly match a registered URI.

## Disconnecting

Either party can disconnect a Standard account:

- **Platform** can disconnect from the Connected Accounts tab or via API
- **End user** can disconnect from their own Meteroid dashboard

In both cases, all tokens associated with the connection are immediately revoked.
