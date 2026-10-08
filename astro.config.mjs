// @ts-check
import { defineConfig } from "astro/config";
import perseidDocs from "perseid-docs";

export default defineConfig({
  site: "https://docs.meteroid.com",
  integrations: [
    perseidDocs({
      title: "Meteroid Documentation",
      reference: "reference.json",
      logo: { light: "./src/assets/logo/light.svg", dark: "./src/assets/logo/dark.svg", replacesTitle: true },
      favicon: "/favicon.svg",
      social: [{"icon":"github","label":"Github","href":"https://github.com/meteroid-oss/meteroid"},{"icon":"linkedin","label":"Linkedin","href":"https://www.linkedin.com/company/meteroid"},{"icon":"discord","label":"Discord","href":"https://go.meteroid.com/discord"}],
      navbar: {"links":[{"label":"Talk to us","href":"https://meteroid.com/talk-to-us"}],"primary":{"label":"Get started","href":"https://app.meteroid.com/registration"}},
      anchors: [{"label":"Blog","href":"https://meteroid.com/blog","icon":"book"},{"label":"Talk to us","href":"https://meteroid.com/talk-to-us","icon":"message"},{"label":"GitHub","href":"https://go.meteroid.com/github","icon":"github"}],
      contextual: ["copy","view","chatgpt","claude","perplexity","grok"],
      appearance: "dark",
      topics: [
    {
      label: "Docs",
      link: "/",
      items: [
        {
          "label": "Getting started",
          "items": [
            {
              "slug": "index"
            },
            {
              "slug": "introduction/understanding-meteroid"
            },
            {
              "slug": "introduction/get-started-with-meteroid"
            },
            {
              "slug": "introduction/glossary"
            }
          ]
        },
        {
          "label": "Metering",
          "items": [
            {
              "slug": "metering/billable-metrics"
            },
            {
              "slug": "metering/managing-events"
            }
          ]
        },
        {
          "label": "Quotes",
          "items": [
            {
              "slug": "quotes/introduction"
            },
            {
              "slug": "quotes/create-and-manage-quotes"
            }
          ]
        },
        {
          "label": "Billing",
          "items": [
            {
              "slug": "billing/managing-plans"
            },
            {
              "slug": "billing/creating-products-and-modeling-your-pricing"
            },
            {
              "slug": "billing/managing-trials-and-coupons"
            },
            {
              "slug": "billing/managing-add-ons"
            },
            {
              "slug": "billing/managing-price-updates"
            },
            {
              "slug": "billing/managing-invoice-annexes"
            }
          ]
        },
        {
          "label": "Subscriptions",
          "items": [
            {
              "slug": "subscriptions/what-is-a-subscription"
            },
            {
              "slug": "subscriptions/creating-a-subscription"
            },
            {
              "slug": "subscriptions/managing-a-subscription"
            },
            {
              "slug": "subscriptions/updating-a-subscription"
            },
            {
              "slug": "subscriptions/check-out"
            }
          ]
        },
        {
          "label": "Customer",
          "items": [
            {
              "slug": "customer/managing-customers"
            },
            {
              "slug": "customer/customer-portal"
            }
          ]
        },
        {
          "label": "Invoices",
          "items": [
            {
              "slug": "invoices/managing-invoices"
            }
          ]
        },
        {
          "label": "Credit Notes",
          "items": [
            {
              "slug": "credit-notes/create-and-manage-credit-notes"
            }
          ]
        },
        {
          "label": "Entitlements",
          "items": [
            {
              "slug": "entitlements/create-and-manage-entitlements"
            }
          ]
        },
        {
          "label": "Intelligence",
          "items": [
            {
              "slug": "analytics/overview"
            },
            {
              "slug": "analytics/reports"
            },
            {
              "slug": "analytics/segments"
            },
            {
              "slug": "analytics/steering"
            },
            {
              "slug": "analytics/customer-signals"
            },
            {
              "slug": "analytics/dashboards"
            }
          ]
        },
        {
          "label": "Settings",
          "items": [
            {
              "slug": "settings/merchant"
            },
            {
              "slug": "settings/branding"
            },
            {
              "slug": "settings/taxes"
            },
            {
              "slug": "settings/invoices-settings"
            },
            {
              "slug": "settings/custom-properties"
            },
            {
              "slug": "settings/tenants"
            },
            {
              "slug": "settings/payment-methods"
            },
            {
              "slug": "settings/security-management"
            },
            {
              "slug": "settings/single-sign-on"
            }
          ]
        },
        {
          "label": "Connect",
          "items": [
            {
              "slug": "connect/express"
            },
            {
              "slug": "connect/oauth"
            }
          ]
        },
        {
          "label": "Integrations",
          "items": [
            {
              "slug": "integrations/general-information"
            },
            {
              "label": "Payment Providers",
              "items": [
                {
                  "slug": "integrations/stripe"
                },
                {
                  "slug": "integrations/gocardless"
                },
                {
                  "slug": "integrations/mollie"
                },
                {
                  "slug": "integrations/stancer"
                }
              ]
            },
            {
              "label": "CRM",
              "items": [
                {
                  "slug": "integrations/hubspot"
                }
              ]
            },
            {
              "label": "Accounting",
              "items": [
                {
                  "slug": "integrations/pennylane"
                }
              ]
            }
          ]
        },
        {
          "label": "Migration",
          "items": [
            {
              "slug": "migration/stripe-migration-guide"
            }
          ]
        }
      ],
    },
    {
      label: "API Reference",
      link: "/api-reference/",
      items: "reference",
    },
    {
      label: "Changelog",
      link: "/changelog/product-update/",
      items: [
        {
          "label": "Changelog",
          "items": [
            {
              "slug": "changelog/product-update"
            }
          ]
        }
      ],
    },
      ],
    }),
  ],
});
