import React from 'react';
import { ArrowLeft, Shield, Scale, FileText } from 'lucide-react';

interface LegalPagesProps {
  type: 'cgv' | 'cgu' | 'privacy' | 'mentions';
  onBack: () => void;
}

export default function LegalPages({ type, onBack }: LegalPagesProps) {
  const content = {
    cgv: {
      title: "Conditions Générales de Vente",
      icon: Scale,
      text: `
        <section class="mb-12">
          <p class="text-xl leading-relaxed mb-8">Les présentes conditions régissent l’acquisition des instruments et remèdes Bloom by Botanik. Elles incarnent notre engagement de transparence et de souveraineté.</p>
          
          <h3 class="text-2xl font-bold mb-4">1. Philosophie de l'Offre</h3>
          <p class="mb-6">Bloom by Botanik propose des instruments d'extraction (BloomLab) et des remèdes botaniques. Nos produits ne sont pas des dispositifs médicaux et ne remplacent en aucun cas un avis médical professionnel.</p>

          <h3 class="text-2xl font-bold mb-4">2. Acquisition et Engagement</h3>
          <p class="mb-6">Toute commande validée sur notre plateforme constitue un engagement ferme. Les prix sont exprimés en Euros TTC. La propriété de l'instrument n'est transférée qu'après paiement intégral.</p>

          <h3 class="text-2xl font-bold mb-4">3. Expédition et Logistique du Vivant</h3>
          <p class="mb-6">Nous accordons un soin extrême à la préparation de vos colis. Les remèdes botaniques, par leur nature précieuse, font l'objet d'un traitement logistique spécifique. Les délais de livraison sont donnés à titre indicatif selon les transporteurs partenaires.</p>

          <h3 class="text-2xl font-bold mb-4">4. Garantie Souveraineté</h3>
          <p class="mb-6">L'instrument BloomLab bénéficie d'une garantie de conformité de 2 ans. Cette garantie couvre les défauts de fabrication dans le cadre d'un usage conforme aux protocoles Bloom.</p>

          <h3 class="text-2xl font-bold mb-4">5. Droit de Rétractation</h3>
          <p class="mb-6">Conformément au code de la consommation, vous disposez de 14 jours pour exercer votre droit de rétractation, à condition que les produits n'aient pas été ouverts ou utilisés.</p>
        </section>
      `
    },
    cgu: {
      title: "Conditions Générales d'Utilisation",
      icon: FileText,
      text: `
        <section class="mb-12">
          <p class="text-xl leading-relaxed mb-8">L'écosystème numérique Bloom est un espace d'apprentissage et de guidage vers l'autonomie botanique.</p>

          <h3 class="text-2xl font-bold mb-4">1. Cadre de l'Application</h3>
          <p class="mb-6">Les protocoles, recettes et conseils prodigués via l'application sont destinés à l'accompagnement du bien-être. Ils ne constituent pas des prescriptions. L'utilisateur est seul responsable de l'usage qu'il fait des extractions réalisées avec la BloomLab.</p>

          <h3 class="text-2xl font-bold mb-4">2. Propriété Intellectuelle</h3>
          <p class="mb-6">L'intégralité du contenu (textes, vidéos, protocoles, algorithmes de reset) est la propriété exclusive de Bloom by Botanik. Toute reproduction ou partage hors du cadre privé est strictement interdit.</p>

          <h3 class="text-2xl font-bold mb-4">3. Accès Premium</h3>
          <p class="mb-6">L'accès à la bibliothèque experte et aux protocoles avancés est réservé aux abonnés Premium. L'abonnement est personnel et non cessible.</p>
        </section>
      `
    },
    privacy: {
      title: "Politique de Confidentialité",
      icon: Shield,
      text: `
        <section class="mb-12">
          <p class="text-xl leading-relaxed mb-8">Votre intimité biologique et numérique est sacrée. Nous protégeons vos données avec la même rigueur que nous sélectionnons nos plantes.</p>

          <h3 class="text-2xl font-bold mb-4">1. Collecte Intelligente</h3>
          <p class="mb-6">Nous collectons uniquement les données nécessaires à la personnalisation de votre expérience : profil de terrain (anamnèse), historique de recettes et informations de livraison.</p>

          <h3 class="text-2xl font-bold mb-4">2. Usage des Données</h3>
          <p class="mb-6">Vos données ne sont jamais vendues ou cédées. Elles servent exclusivement à affiner les recommandations de protocoles et à assurer le suivi de vos commandes.</p>

          <h3 class="text-2xl font-bold mb-4">3. Sécurité et Hébergement</h3>
          <p class="mb-6">Vos informations sont stockées sur des serveurs sécurisés conformes au RGPD. Nous utilisons des protocoles de chiffrement de pointe pour vos transactions et vos données de profil.</p>

          <h3 class="text-2xl font-bold mb-4">4. Vos Droits</h3>
          <p class="mb-6">Vous disposez d'un droit total d'accès, de rectification et d'effacement de vos données sur simple demande à bloombybotanik@gmail.com.</p>
        </section>
      `
    },
    mentions: {
      title: "Mentions Légales",
      icon: FileText,
      text: `
        <section class="mb-12">
          <h3 class="text-2xl font-bold mb-4">Éditeur</h3>
          <p class="mb-6">Bloom by Botanik SAS<br/>Siège social : 75008 Paris, France<br/>RCS Paris : B 123 456 789</p>

          <h3 class="text-2xl font-bold mb-4">Directeur de la Publication</h3>
          <p class="mb-6">Équipe Fondatrice Bloom by Botanik</p>

          <h3 class="text-2xl font-bold mb-4">Hébergement</h3>
          <p class="mb-6">Google Cloud Platform / Firebase<br/>8 rue de Londres, 75009 Paris</p>

          <h3 class="text-2xl font-bold mb-4">Contact</h3>
          <p class="mb-6">Email : bloombybotanik@gmail.com</p>
        </section>
      `
    }
  };

  const page = content[type];

  return (
    <article className="max-w-4xl mx-auto px-6 py-20 animate-in fade-in duration-700">
      <button onClick={onBack} className="flex items-center gap-2 text-[#1B3022]/60 hover:text-[#F97316] mb-12 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Retour
      </button>

      <div className="flex items-center gap-4 mb-12">
        <div className="w-16 h-16 bg-[#1B3022]/5 rounded-2xl flex items-center justify-center">
          <page.icon className="w-8 h-8 text-[#1B3022]" />
        </div>
        <h1 className="text-4xl font-bold text-[#1B3022]">{page.title}</h1>
      </div>

      <div 
        className="prose prose-botanik max-w-none prose-headings:text-[#1B3022] prose-p:text-[#1B3022]/70"
        dangerouslySetInnerHTML={{ __html: page.text }}
      />
    </article>
  );
}
