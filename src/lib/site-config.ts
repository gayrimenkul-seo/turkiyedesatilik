// ─── Site Konfigürasyonu ───────────────────────────────────────────────
export const siteConfig = {
  name: "Türkiye'de Satılık",
  nameShort: "TDS",
  tagline: "Güvenli Emlak Yatırımı",
  description:
    "Türkiye'nin Ege ve Akdeniz kıyılarında yalnızca Bakanlık onaylı emlak ofisleriyle çalışan premium gayrimenkul platformu.",
  url: "https://turkiyedesatilik.com",
  domain: "turkiyedesatilik.com",

  contact: {
    phone: "+90 545 169 29 28",
    phoneRaw: "+905451692928",
    email: "info@turkiyedesatilik.com",
    address: {
      street: "Ağa Kuyusu Sk. No:2",
      district: "Müskebi",
      city: "Bodrum",
      province: "Muğla",
      postalCode: "48420",
      country: "Türkiye",
      full: "Ağa Kuyusu Sk. No:2, Müskebi, 48420 Bodrum / Muğla",
    },
  },

  social: {
    instagram: "https://instagram.com/turkiyedesatilik",
    facebook: "https://facebook.com/turkiyedesatilik",
    youtube: "https://youtube.com/@turkiyedesatilik",
  },

  legal: {
    verbis: "1775227142",
    etbis: true,
    kvkk: true,
    gdpr: true,
    ttbs: true,
  },

  // i18n — desteklenen diller
  locales: ["tr", "de", "en", "ru", "ar", "fr", "nl", "sv", "no", "da", "fi", "pl"],
  defaultLocale: "tr",

  // Tasarım token'ları (CSS değişkenleriyle eşleşir)
  theme: {
    colors: {
      sand: "#F5F0E8",
      sandDark: "#EDE5D4",
      obsidian: "#0F1010",
      aegean: "#1B4F6B",
      terracotta: "#C4552A",
      gold: "#B8923A",
      mist: "#8B9098",
      cream: "#FDFCFA",
    },
  },
} as const

export type SiteConfig = typeof siteConfig
