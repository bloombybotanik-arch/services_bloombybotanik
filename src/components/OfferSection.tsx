import React, { useState } from 'react';
import { Check, ShoppingBag, ArrowRight, ShieldCheck, Truck, Sparkles, Flame, Heart } from 'lucide-react';
import { PaymentBadges } from './PaymentBadges';
import styles from './OfferSection.module.css';

export interface SelectedOfferData {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  selectedKitOption?: string;
}

interface OfferSectionProps {
  onSelectOffer: (offer: SelectedOfferData) => void;
  lang?: string;
}

export const OfferSection: React.FC<OfferSectionProps> = ({
  onSelectOffer,
  lang = 'fr',
}) => {
  const isDE = lang === 'de';
  const isFR = lang === 'fr';

  const [selectedPlantOption, setSelectedPlantOption] = useState<string>(
    isFR ? "Kit Nuit Profonde (Mélisse & Passiflore)" : isDE ? "Tiefschlaf-Set (Melisse & Passionsblume)" : "Deep Night Set (Lemon Balm & Passionflower)"
  );

  const plantOptions = [
    {
      id: 'nuit',
      label: isFR ? "Kit Nuit Profonde (Mélisse & Passiflore)" : isDE ? "Tiefschlaf-Set (Melisse & Passionsblume)" : "Deep Night Set (Lemon Balm & Passionflower)",
      benefit: isFR ? "Sommeil réparateur" : isDE ? "Erholsamer Schlaf" : "Restorative Sleep"
    },
    {
      id: 'digestion',
      label: isFR ? "Kit Digestion Sereine (Menthe Poivrée & Romarin)" : isDE ? "Verdauungs-Set (Pfefferminze & Rosmarin)" : "Digestive Ease Set (Peppermint & Rosemary)",
      benefit: isFR ? "Confort intestinal" : isDE ? "Darmkomfort" : "Gut Comfort"
    },
    {
      id: 'articulaire',
      label: isFR ? "Kit Feu Articulaire (Curcuma & Reine des Prés)" : isDE ? "Gelenk-Set (Kurkuma & Mädesüß)" : "Joint Mobility Set (Turmeric & Meadowsweet)",
      benefit: isFR ? "Souplesse articulaire" : isDE ? "Gelenkbeweglichkeit" : "Joint Flexibility"
    }
  ];

  const microCopyText = isFR
    ? "Paiement 3x sans frais • Garantie 30 jours satisfait ou remboursé • Expédition sous 24/48h"
    : isDE
    ? "3x zinsfreie Raten • 30 Tage Geld-zurück-Garantie • Versand in 24/48h"
    : "3x fee-free installments • 30-day money-back guarantee • 24/48h shipping";

  return (
    <section id="offres" className={styles.offerSection} aria-label="Configurations et offres BloomLab">
      <div className={styles.container}>
        
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.categoryBadge}>
            <Sparkles className="w-3.5 h-3.5 text-[#C8AB8A]" />
            <span>{isFR ? 'Configurations & Tarifs Transparents' : isDE ? 'Transparente Konfigurationen' : 'Transparent Configurations & Pricing'}</span>
          </div>
          <h2 className={styles.title}>
            {isFR 
              ? "Choisissez votre configuration BloomLab®" 
              : isDE 
              ? "Wählen Sie Ihre BloomLab®-Konfiguration" 
              : "Choose your BloomLab® configuration"}
          </h2>
          <p className={styles.subtitle}>
            {isFR
              ? "Équipez votre cuisine d'un laboratoire botanique personnel. Cuve Inox 304 inerte, thermorégulation ±0,5°C et extraction du Totum sans cuisson dégradante."
              : isDE
              ? "Statten Sie Ihre Küche mit einem persönlichen botanischen Labor aus. Inerter 304-Edelstahltank und Totum-Extraktion."
              : "Equip your home with a personal botanical laboratory. Inert 304 stainless steel and non-degrading Totum extraction."}
          </p>
        </div>

        {/* 3 Configurations Grid */}
        <div className={styles.grid}>
          
          {/* 1. BloomLab Solo (239€ au lieu de 289€) */}
          <div className={styles.card}>
            <div>
              <span className={styles.tag}>
                {isFR ? "L'essentiel pour débuter" : isDE ? "Das Wesentliche" : "Essential Starter"}
              </span>
              <h3 className={styles.offerTitle}>BloomLab® Solo</h3>
              <p className={styles.offerDescription}>
                {isFR 
                  ? "L'extracteur de précision avec son guide pratique digital de 100 recettes pour vos propres plantes." 
                  : isDE 
                  ? "Der Präzisionsextraktor mit digitalem 100-Rezepte-Praxisleitfaden für Ihre eigenen Kräuter." 
                  : "Precision extractor with digital 100-recipe practical guide for your own plants."}
              </p>

              <div className={styles.pricingBlock}>
                <span className={styles.currentPrice}>239€</span>
                <span className={styles.originalPrice}>289€</span>
                <span className={styles.discountBadge}>-50€</span>
              </div>
              <div className={styles.installment}>
                {isFR ? "ou 3x 79,66€ sans frais" : isDE ? "oder 3x 79,66€ zinsfrei" : "or 3x 79.66€ fee-free"}
              </div>

              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <Check className={styles.checkIcon} />
                  <span>{isFR ? "Machine BloomLab® v2 (Cuve Inox 304 Alimentaire)" : "BloomLab® v2 Machine (Food-grade 304 Steel)"}</span>
                </li>
                <li className={styles.featureItem}>
                  <Check className={styles.checkIcon} />
                  <span>{isFR ? "Panier d'extraction fine & joint d'étanchéité hermétique" : "Fine extraction basket & airtight seal"}</span>
                </li>
                <li className={styles.featureItem}>
                  <Check className={styles.checkIcon} />
                  <span>{isFR ? "Guide Digital 100 recettes pas-à-pas (PDF & Web)" : "Digital 100-recipe practical guide"}</span>
                </li>
                <li className={styles.featureItem}>
                  <Check className={styles.checkIcon} />
                  <span>{isFR ? "Garantie constructeur 1 an pièces et main d'œuvre" : "1-Year Manufacturer Warranty"}</span>
                </li>
                <li className={styles.featureItem}>
                  <Check className={styles.checkIcon} />
                  <span>{isFR ? "Support client réactif basé en France" : "French customer support"}</span>
                </li>
              </ul>
            </div>

            <div>
              <button
                type="button"
                onClick={() => onSelectOffer({
                  id: 'bloomlab-solo',
                  name: isFR ? "BloomLab® Solo — Édition 2026" : "BloomLab® Solo — 2026 Edition",
                  price: 239,
                  originalPrice: 289
                })}
                className={`${styles.orderButton} ${styles.orderButtonDefault}`}
                aria-label="Commander BloomLab Solo à 239€"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{isFR ? "Je commande ma BloomLab — 239€" : "Order BloomLab Solo — 239€"}</span>
              </button>
              <p className={styles.microCopy}>{microCopyText}</p>
            </div>
          </div>

          {/* 2. Kit de Démarrage Souveraineté (299€ au lieu de 350€) - FEATURED */}
          <div className={`${styles.card} ${styles.cardFeatured}`}>
            <div className={styles.popularRibbon}>
              {isFR ? "★ OFFRE PRINCIPALE · MEILLEURE VENTE" : isDE ? "★ EMPFOHLEN · BESTSELLER" : "★ BEST VALUE · MOST POPULAR"}
            </div>

            <div>
              <span className={`${styles.tag} ${styles.tagFeatured}`}>
                {isFR ? "Autonomie Immédiate" : isDE ? "Sofortige Autonomie" : "Instant Herbal Autonomy"}
              </span>
              <h3 className={`${styles.offerTitle} ${styles.offerTitleFeatured}`}>
                {isFR ? "Kit Démarrage Souveraineté" : isDE ? "Souveränitäts-Starterset" : "Sovereignty Starter Kit"}
              </h3>
              <p className={`${styles.offerDescription} ${styles.offerDescriptionFeatured}`}>
                {isFR 
                  ? "BloomLab® v2 + 1 kit de plantes médicinales au choix prêt à l'emploi. Démarrez dès réception." 
                  : isDE 
                  ? "BloomLab® v2 + 1 Heilpflanzen-Set Ihrer Wahl. Sofort startklar nach Erhalt." 
                  : "BloomLab® v2 + 1 medicinal botanical blend of your choice. Ready to extract day one."}
              </p>

              <div className={styles.pricingBlock}>
                <span className={`${styles.currentPrice} ${styles.currentPriceFeatured}`}>299€</span>
                <span className={`${styles.originalPrice} ${styles.originalPriceFeatured}`}>350€</span>
                <span className={`${styles.discountBadge} ${styles.discountBadgeFeatured}`}>Économisez 51€</span>
              </div>
              <div className={`${styles.installment} ${styles.installmentFeatured}`}>
                {isFR ? "ou 3x 99,66€ sans frais" : isDE ? "oder 3x 99,66€ zinsfrei" : "or 3x 99.66€ fee-free"}
              </div>

              {/* Plant selection interactive chips */}
              <div className={styles.plantSelector}>
                <div className={styles.plantSelectorTitle}>
                  <Flame className="w-3.5 h-3.5" />
                  <span>{isFR ? "Votre sachet de plantes inclus (au choix) :" : "Included herbal blend of choice:"}</span>
                </div>
                <div className={styles.plantChips}>
                  {plantOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedPlantOption(opt.label)}
                      className={`${styles.plantChip} ${selectedPlantOption === opt.label ? styles.plantChipActive : ''}`}
                    >
                      <span>{opt.label}</span>
                      <span className="text-[10px] opacity-75 font-normal">({opt.benefit})</span>
                    </button>
                  ))}
                </div>
              </div>

              <ul className={styles.featureList}>
                <li className={`${styles.featureItem} ${styles.featureItemFeatured}`}>
                  <Check className={`${styles.checkIcon} ${styles.checkIconFeatured}`} />
                  <span className="font-bold">{isFR ? "Machine BloomLab® v2 complète" : "BloomLab® v2 full machine"}</span>
                </li>
                <li className={`${styles.featureItem} ${styles.featureItemFeatured}`}>
                  <Check className={`${styles.checkIcon} ${styles.checkIconFeatured}`} />
                  <span className="font-bold text-amber-300">
                    {isFR ? "1 Kit Plantes Médicinales Bio Sélectionnées" : "1 Organic Herbal Blend pouch"}
                  </span>
                </li>
                <li className={`${styles.featureItem} ${styles.featureItemFeatured}`}>
                  <Check className={`${styles.checkIcon} ${styles.checkIconFeatured}`} />
                  <span>{isFR ? "Guide Digital 100 recettes pas-à-pas" : "100-recipe Digital Guide"}</span>
                </li>
                <li className={`${styles.featureItem} ${styles.featureItemFeatured}`}>
                  <Check className={`${styles.checkIcon} ${styles.checkIconFeatured}`} />
                  <span>{isFR ? "Accès prioritaire à l'Académie Bloom (1 mois)" : "Bloom Academy VIP access (1 month)"}</span>
                </li>
                <li className={`${styles.featureItem} ${styles.featureItemFeatured}`}>
                  <Check className={`${styles.checkIcon} ${styles.checkIconFeatured}`} />
                  <span>{isFR ? "Garantie 1 an constructeur + Expédition prioritaire 24h" : "1-Year Warranty & Priority 24h shipping"}</span>
                </li>
              </ul>
            </div>

            <div>
              <button
                type="button"
                onClick={() => onSelectOffer({
                  id: 'kit-souverainete',
                  name: isFR ? "Kit de Démarrage Souveraineté — BloomLab® + 1 Kit Plantes" : "Sovereignty Starter Kit — BloomLab® + 1 Herbal Blend",
                  price: 299,
                  originalPrice: 350,
                  selectedKitOption: selectedPlantOption
                })}
                className={`${styles.orderButton} ${styles.orderButtonFeatured}`}
                aria-label="Commander le Kit Souveraineté à 299€"
              >
                <ShoppingBag className="w-5 h-5 text-white" />
                <span>{isFR ? "Choisir ce kit — 299€" : "Choose this kit — 299€"}</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
              <p className={`${styles.microCopy} ${styles.microCopyFeatured}`}>{microCopyText}</p>
            </div>
          </div>

          {/* 3. Pack Signature (289€ au lieu de 349€) */}
          <div className={styles.card}>
            <div>
              <span className={styles.tag}>
                {isFR ? "Purification & Synergie" : isDE ? "Reinigung & Synergie" : "Purification & Synergy"}
              </span>
              <h3 className={styles.offerTitle}>Pack Signature</h3>
              <p className={styles.offerDescription}>
                {isFR 
                  ? "BloomLab® v2 + Duo Argiles Minérales Bloom (Zéolithe & Bentonite) pour un reset systémique profond." 
                  : isDE 
                  ? "BloomLab® v2 + Bloom Erden-Duo (Zeolith & Bentonit) für einen tiefen systemischen Reset." 
                  : "BloomLab® v2 + Bloom Clay Duo (Zeolite & Bentonite) for deep systemic reset."}
              </p>

              <div className={styles.pricingBlock}>
                <span className={styles.currentPrice}>289€</span>
                <span className={styles.originalPrice}>349€</span>
                <span className={styles.discountBadge}>-60€</span>
              </div>
              <div className={styles.installment}>
                {isFR ? "ou 3x 96,33€ sans frais" : isDE ? "oder 3x 96,33€ zinsfrei" : "or 3x 96.33€ fee-free"}
              </div>

              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <Check className={styles.checkIcon} />
                  <span>{isFR ? "Machine BloomLab® v2 (Cuve Inox 304)" : "BloomLab® v2 Machine"}</span>
                </li>
                <li className={styles.featureItem}>
                  <Check className={styles.checkIcon} />
                  <span className="font-semibold text-[#A8B8A0]">
                    {isFR ? "Duo Argiles Bloom — Purification Systémique" : "Bloom Clay Duo — Systemic Purification"}
                  </span>
                </li>
                <li className={styles.featureItem}>
                  <Check className={styles.checkIcon} />
                  <span>{isFR ? "Guide Digital 100 recettes pas-à-pas" : "100-recipe Digital Guide"}</span>
                </li>
                <li className={styles.featureItem}>
                  <Check className={styles.checkIcon} />
                  <span>{isFR ? "Protocole d'accompagnement terrain 84 jours" : "84-day systemic terrain protocol"}</span>
                </li>
                <li className={styles.featureItem}>
                  <Check className={styles.checkIcon} />
                  <span>{isFR ? "Garantie constructeur 1 an" : "1-Year Manufacturer Warranty"}</span>
                </li>
              </ul>
            </div>

            <div>
              <button
                type="button"
                onClick={() => onSelectOffer({
                  id: 'pack-signature',
                  name: isFR ? "Pack Signature — BloomLab® + Duo Argiles Bloom" : "Signature Pack — BloomLab® + Clay Duo",
                  price: 289,
                  originalPrice: 349
                })}
                className={`${styles.orderButton} ${styles.orderButtonSecondary}`}
                aria-label="Commander le Pack Signature à 289€"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{isFR ? "Commander le Pack Signature — 289€" : "Order Signature Pack — 289€"}</span>
              </button>
              <p className={styles.microCopy}>{microCopyText}</p>
            </div>
          </div>

        </div>

        {/* Global Reassurance & Payment Badges footer */}
        <div className={styles.guaranteeFooter}>
          <div className={styles.guaranteeBadges}>
            <div className={styles.guaranteeItem}>
              <Truck className="w-5 h-5 text-[#C8AB8A]" />
              <span>{isFR ? "Expédition prioritaire 24/48h avec suivi" : "Priority 24/48h tracked shipping"}</span>
            </div>
            <div className={styles.guaranteeItem}>
              <ShieldCheck className="w-5 h-5 text-[#C8AB8A]" />
              <span>{isFR ? "Garantie 30 jours satisfait ou remboursé" : "30-day money back guarantee"}</span>
            </div>
            <div className={styles.guaranteeItem}>
              <Sparkles className="w-5 h-5 text-[#C8AB8A]" />
              <span>{isFR ? "Facilité de paiement en 3x sans frais" : "3x fee-free installment payment"}</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 pt-2">
            <span className="text-xs uppercase tracking-widest font-bold text-slate-500">
              {isFR ? "Paiement 100% Chiffré & Sécurisé SSL" : "100% SSL Encrypted & Secure Payment"}
            </span>
            <PaymentBadges />
          </div>
        </div>

      </div>
    </section>
  );
};

export default OfferSection;
