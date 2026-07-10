export interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

export const faqData: FAQItem[] = [
  {
    id: "faq-001",
    question: "What languages does RealMe AI support?",
    answer:
      "RealMe AI supports over 50 languages including English, French, Spanish, Portuguese, Hausa, Yoruba, Igbo, Swahili, Arabic, German, Italian, Dutch, and more. Our models are continuously being trained on new languages.",
    category: "General",
  },
  {
    id: "faq-002",
    question: "How does pricing work?",
    answer:
      "We offer tiered pricing based on your usage needs. The Free plan includes 100 API calls per month. Pro at $29/month includes 10,000 calls, and Enterprise at $199/month includes unlimited calls with priority support. All plans include our core translation and NLP features.",
    category: "Billing",
  },
  {
    id: "faq-003",
    question: "Can I switch plans at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades will be applied at the start of your next billing cycle.",
    category: "Billing",
  },
  {
    id: "faq-004",
    question: "What kind of support do you offer?",
    answer:
      "Free and Pro plans include email support with a 24-hour response time. Enterprise customers get priority support with a 2-hour response time, a dedicated account manager, and access to our engineering team.",
    category: "Support",
  },
  {
    id: "faq-005",
    question: "How is my data protected?",
    answer:
      "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We are SOC 2 compliant and GDPR compliant. Your data is never used to train our models unless explicitly opted in.",
    category: "Security",
  },
  {
    id: "faq-006",
    question: "Do you offer a free trial?",
    answer:
      "Yes, you can get started with our Free plan which includes 100 API calls. No credit card required. Upgrade to Pro or Enterprise when you're ready to scale.",
    category: "General",
  },
  {
    id: "faq-007",
    question: "Can I use RealMe AI for real-time translation?",
    answer:
      "Yes, our API supports real-time translation with sub-200ms response times for most language pairs. We also offer WebSocket support for streaming translations.",
    category: "Technical",
  },
  {
    id: "faq-008",
    question: "How do I integrate RealMe AI with my application?",
    answer:
      "We provide REST APIs and SDKs for JavaScript, Python, Go, and Java. Check our documentation for detailed integration guides and code samples. Our SDKs handle authentication, rate limiting, and error handling out of the box.",
    category: "Technical",
  },
  {
    id: "faq-009",
    question: "What happens if I exceed my API call limit?",
    answer:
      "If you exceed your plan's limit, your API calls will be throttled until the next billing cycle or until you upgrade to a higher tier. You'll receive email notifications when you reach 80%, 90%, and 100% of your limit.",
    category: "Billing",
  },
  {
    id: "faq-010",
    question: "Do you offer custom models for specific use cases?",
    answer:
      "Enterprise customers can request custom fine-tuned models for their specific use cases. Contact our sales team to discuss your requirements.",
    category: "General",
  },
]
