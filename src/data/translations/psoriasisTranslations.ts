export interface ProtocolTranslations {
  breadcrumb: {
    home: string;
    protocols: string;
    current: string;
    share: string;
    copied: string;
    downloadPdf: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export const psoriasisTranslations: Record<'fr' | 'en' | 'de', ProtocolTranslations> = {
  fr: {
    breadcrumb: {
      home: "Accueil",
      protocols: "Protocoles Systémiques",
      current: "Protocole Psoriasis",
      share: "Partager",
      copied: "Lien copié !",
      downloadPdf: "Télécharger le PDF"
    },
    hero: {
      badge: "Reset Homéostasique — Terrain Cutané",
      title: "PROTOCOLE PSORIASIS & TERRAIN",
      tagWeeks: "Programme 8 semaines"
    }
  },
  en: {
    breadcrumb: {
      home: "Home",
      protocols: "Systemic Protocols",
      current: "Psoriasis Protocol",
      share: "Share",
      copied: "Link copied!",
      downloadPdf: "Download PDF"
    },
    hero: {
      badge: "Homeostatic Reset — Skin Terrain",
      title: "PSORIASIS & TERRAIN PROTOCOL",
      tagWeeks: "8-week protocol"
    }
  },
  de: {
    breadcrumb: {
      home: "Startseite",
      protocols: "Systemische Protokolle",
      current: "Psoriasis Protokoll",
      share: "Teilen",
      copied: "Link kopiert!",
      downloadPdf: "PDF herunterladen"
    },
    hero: {
      badge: "Homöostatischer Reset — Haut-Terrain",
      title: "PSORIASIS & TERRAIN PROTOKOLL",
      tagWeeks: "8-Wochen-Programm"
    }
  }
};

export default psoriasisTranslations;
