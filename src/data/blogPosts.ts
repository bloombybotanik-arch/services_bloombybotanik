import { Language } from '../translations';

export interface BlogPost {
  slug: string;
  date: string;
  category: string;
  author: string;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  content: Record<Language, string>;
  image?: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'tisane-bain-marie-bloomlab-quelle-methode-pour-extraire-vraiment-les-bienfaits-de-vos-plantes',
    date: '2026-08-20',
    category: 'Science & Précision',
    author: 'L\'équipe Bloom',
    readTime: '8 min',
    title: {
      fr: "Tisane, bain-marie, BloomLab® : Quelle méthode pour extraire vraiment les bienfaits de vos plantes ? (Spoiler : la différence est de 1 à 98)",
      en: "Infusion, Double Boiler, BloomLab®: Which method truly extracts your plants' benefits? (Spoiler: the difference is 1 to 98)",
      de: "Tee, Wasserbad, BloomLab®: Welche Methode extrahiert wirklich die Vorteile Ihrer Pflanzen? (Spoiler: Der Unterschied ist 1 bis 98)"
    },
    excerpt: {
      fr: "Découvrez pourquoi les méthodes traditionnelles d'infusion ne capturent qu'une fraction de l'intelligence végétale et comment la technologie BloomLab révolutionne la phytothérapie maison.",
      en: "Discover why traditional infusion methods only capture a fraction of plant intelligence and how BloomLab technology is revolutionizing home herbal medicine.",
      de: "Entdecken Sie, warum herkömmliche Infusionsmethoden nur einen Bruchteil der Pflanzenintelligenz erfassen und wie die BloomLab-Technologie die häusliche Phytotherapie revolutioniert."
    },
    content: {
      fr: `
<p>On nous a appris qu’une bonne tisane consistait à verser de l’eau bouillante sur un sachet et à attendre cinq minutes. C’est un rituel apaisant, certes, mais est-ce une méthode efficace pour se soigner par les plantes ?</p>

<h3>1. Le mythe de l'eau bouillante</h3>
<p>L'eau à 100°C est le premier ennemi du <strong>Totum végétal</strong>. À cette température, les huiles essentielles volatiles s'évaporent instantanément et les molécules fragiles (vitamines, enzymes) subissent un choc thermique qui les dénature. Vous obtenez une boisson parfumée, mais biologiquement appauvrie.</p>

<h3>2. Le bain-marie : un progrès, mais incomplet</h3>
<p>Le bain-marie permet de stabiliser la température, ce qui est un progrès. Cependant, il manque de deux facteurs critiques : l'agitation moléculaire et la précision au degré près. Sans mouvement (cinétique), une couche de saturation se forme autour de la plante, empêchant le solvant de pénétrer au cœur des fibres.</p>

<h3>3. La révolution BloomLab : L'extraction de précision</h3>
<p>Le BloomLab n'est pas une bouilloire. C'est un instrument de précision clinique qui travaille sur trois piliers :</p>
<ul>
  <li><strong>La Température ±0,5°C :</strong> Nous ciblons la fenêtre exacte où la plante libère ses actifs sans les détruire.</li>
  <li><strong>La Cinétique Vortex :</strong> Une agitation permanente qui crée une micro-cavitation, "aspirant" littéralement les molécules hors des cellules végétales.</li>
  <li><strong>La Polarité Maîtrisée :</strong> Qu'il s'agisse d'eau, d'huile ou d'alcool, le BloomLab optimise le pouvoir extracteur du solvant.</li>
</ul>

<div class="bg-botanik-green/5 p-8 rounded-2xl border border-botanik-green/10 my-8">
  <h4 class="font-bold text-botanik-green mb-2 italic">Le saviez-vous ?</h4>
  <p>Une infusion classique de racines de réglisse ne libère qu'environ 5% de sa glycyrrhizine. Avec le protocole BloomLab, ce taux grimpe à 98% en moins de temps, grâce à la cavitation thermique.</p>
</div>

<h3>Conclusion : Devenez souverain</h3>
<p>La différence entre une tisane et une extraction BloomLab est la même qu'entre une bougie et un laser. Si vous cherchez un plaisir sensoriel, la tisane suffit. Si vous cherchez une réponse biologique profonde pour votre terrain, l'extraction de précision est votre seule alliée.</p>
      `,
      en: `
<p>We've been taught that a good herbal tea consists of pouring boiling water over a bag and waiting five minutes. It's a soothing ritual, certainly, but is it an effective method for healing with plants?</p>

<h3>1. The boiling water myth</h3>
<p>Water at 100°C (212°F) is the primary enemy of the <strong>Botanical Totum</strong>. At this temperature, volatile essential oils evaporate instantly, and fragile molecules (vitamins, enzymes) undergo a thermal shock that denatures them. You get a fragrant drink, but a biologically impoverished one.</p>

<h3>2. The double boiler: progress, but incomplete</h3>
<p>The double boiler (bain-marie) allows for temperature stabilization, which is progress. However, it lacks two critical factors: molecular agitation and degree-level precision. Without movement (kinetics), a saturation layer forms around the plant, preventing the solvent from penetrating to the core of the fibers.</p>

<h3>3. The BloomLab revolution: Precision extraction</h3>
<p>The BloomLab is not a kettle. It is a clinical precision instrument that works on three pillars:</p>
<ul>
  <li><strong>±0.5°C Temperature Control:</strong> We target the exact window where the plant releases its actives without destroying them.</li>
  <li><strong>Vortex Kinetics:</strong> Permanent agitation that creates micro-cavitation, literally \"sucking\" molecules out of plant cells.</li>
  <li><strong>Mastered Polarity:</strong> Whether using water, oil, or alcohol, BloomLab optimizes the solvent's extracting power.</li>
</ul>

<div class="bg-botanik-green/5 p-8 rounded-2xl border border-botanik-green/10 my-8">
  <h4 class="font-bold text-botanik-green mb-2 italic">Did you know?</h4>
  <p>A classic infusion of licorice root only releases about 5% of its glycyrrhizin. With the BloomLab protocol, this rate climbs to 98% in less time, thanks to thermal cavitation.</p>
</div>

<h3>Conclusion: Become sovereign</h3>
<p>The difference between an herbal tea and a BloomLab extraction is the same as between a candle and a laser. If you're looking for sensory pleasure, tea is enough. If you're looking for a deep biological response for your system, precision extraction is your only ally.</p>
      `,
      de: `
<p>Uns wurde beigebracht, dass ein guter Kräutertee darin besteht, kochendes Wasser über einen Beutel zu gießen und fünf Minuten zu warten. Es ist sicherlich ein beruhigendes Ritual, aber ist es eine effektive Methode zur Heilung mit Pflanzen?</p>

<h3>1. Der Mythos vom kochenden Wasser</h3>
<p>Wasser bei 100°C ist der größte Feind des <strong>botanischen Totums</strong>. Bei dieser Temperatur verdampfen flüchtige ätherische Öle sofort, und empfindliche Moleküle (Vitamine, Enzyme) erleiden einen Hitzeschock, der sie denaturiert. Sie erhalten ein duftendes Getränk, aber ein biologisch verarmtes.</p>

<h3>2. Das Wasserbad: ein Fortschritt, aber unvollständig</h3>
<p>Das Wasserbad (Bain-Marie) ermöglicht eine Temperaturstabilisierung, was ein Fortschritt ist. Es fehlen jedoch zwei kritische Faktoren: molekulare Bewegung und gradgenaue Präzision. Ohne Bewegung (Kinetik) bildet sich eine Sättigungsschicht um die Pflanze, die verhindert, dass das Lösungsmittel in das Innere der Fasern eindringt.</p>

<h3>3. Die BloomLab-Revolution: Präzisionsextraktion</h3>
<p>Das BloomLab ist kein Wasserkocher. Es ist ein klinisches Präzisionsinstrument, das auf drei Säulen basiert:</p>
<ul>
  <li><strong>±0,5°C Temperaturkontrolle:</strong> Wir zielen genau auf das Fenster ab, in dem die Pflanze ihre Wirkstoffe freisetzt, ohne sie zu zerstören.</li>
  <li><strong>Vortex-Kinetik:</strong> Permanente Agitation, die Mikrokavitation erzeugt und Moleküle buchstäblich aus den Pflanzenzellen \"saugt\".</li>
  <li><strong>Meisterhafte Polarität:</strong> Ob Wasser, Öl oder Alkohol, BloomLab optimiert die Extraktionskraft des Lösungsmittels.</li>
</ul>

<div class="bg-botanik-green/5 p-8 rounded-2xl border border-botanik-green/10 my-8">
  <h4 class="font-bold text-botanik-green mb-2 italic">Wussten Sie schon?</h4>
  <p>Ein klassischer Aufguss aus Süßholzwurzel setzt nur etwa 5% seines Glycyrrhizins frei. Mit dem BloomLab-Protokoll steigt dieser Anteil dank thermischer Kavitation in kürzerer Zeit auf 98%.</p>
</div>

<h3>Fazit: Werden Sie souverän</h3>
<p>Der Unterschied zwischen einem Kräutertee und einer BloomLab-Extraktion ist derselbe wie zwischen einer Kerze und einem Laser. Wenn Sie sensorischen Genuss suchen, reicht Tee aus. Wenn Sie eine tiefe biologische Antwort für Ihr System suchen, ist die Präzisionsextraktion Ihr einziger Verbündeter.</p>
      `
    }
  },
  {
    slug: 'macers-huileux-maison-les-5-erreurs-qui-detruisent-vos-actifs',
    date: '2026-08-21',
    category: 'Tutoriel & Méthode',
    author: 'L\'équipe Bloom',
    readTime: '10 min',
    title: {
      fr: "Macérâts huileux maison : les 5 erreurs qui détruisent vos actifs",
      en: "Homemade oil macerations: 5 mistakes that destroy your actives",
      de: "Hausgemachte Ölmazerate: 5 Fehler, die Ihre Wirkstoffe zerstören"
    },
    excerpt: {
      fr: "Apprenez à créer des huiles de soin stables et puissantes en évitant les pièges classiques de la macération artisanale.",
      en: "Learn to create stable and powerful care oils by avoiding common pitfalls of artisanal maceration.",
      de: "Lernen Sie, stabile und kraftvolle Pflegeöle zu kreieren, indem Sie häufige Fallstricke der handwerklichen Mazeration vermeiden."
    },
    content: {
      fr: `
<p>Réaliser un macérât huileux (ou huile infusée) est la base de la cosmétique naturelle. Mais une simple bouteille au soleil ne suffit pas pour obtenir un produit de qualité laboratoire.</p>

<h3>1. L'instabilité thermique</h3>
<p>Le soleil apporte des UV qui dégradent les actifs et font rancir l'huile. La BloomLab remplace le soleil par une chaleur douce, stable et contrôlée, à l'abri de la lumière.</p>

<h3>2. Le taux d'humidité</h3>
<p>Une plante mal séchée introduira de l'eau dans votre huile, provoquant des moisissures. Utilisez toujours des plantes de qualité herboristerie, ou séchées à basse température.</p>

<h3>3. Le choix du solvant</h3>
<p>Toutes les huiles ne se valent pas. Pour un soin profond, privilégiez l'huile de Jojoba ou de Sésame. Pour un baume, l'huile de Coco ou le Beurre de Karité.</p>
      `,
      en: `
<p>Creating an oil maceration (or infused oil) is the basis of natural cosmetics. But a simple bottle in the sun is not enough to obtain laboratory-quality products.</p>
      `,
      de: `
<p>Die Herstellung eines Ölmazerats (oder eines infundierten Öls) ist die Grundlage der Naturkosmetik. Aber eine einfache Flasche in der Sonne reicht nicht aus, um Produkte in Laborqualität zu erhalten.</p>
      `
    }
  },
  {
    slug: 'inflammation-chronique-le-role-des-plantes-dans-le-reset-homeostasique',
    date: '2026-08-22',
    category: 'Santé & Terrain',
    author: 'ALMA',
    readTime: '12 min',
    title: {
      fr: "Inflammation chronique : le rôle des plantes dans le Reset Homéostasique",
      en: "Chronic inflammation: the role of plants in the Homeostatic Reset",
      de: "Chronische Entzündung: die Rolle der Pflanzen beim homöostatischen Reset"
    },
    excerpt: {
      fr: "Comprendre comment le terrain T8 influence votre santé globale et comment les extractions de précision peuvent aider à déverrouiller votre système.",
      en: "Understand how the T8 terrain influences your overall health and how precision extractions can help unlock your system.",
      de: "Verstehen Sie, wie das T8-Terrain Ihre allgemeine Gesundheit beeinflusst und wie Präzisionsextraktionen helfen können, Ihr System zu entsperren."
    },
    content: {
      fr: `
<p>L’inflammation n’est pas une ennemie. C’est un signal. Cependant, lorsqu’elle devient chronique, elle témoigne d’un état de "verrouillage" systémique. Chez Bloom, nous appelons cela un déséquilibre du <strong>Terrain T8</strong>. Pour sortir de ce cercle vicieux, la phytothérapie moderne propose une approche révolutionnaire : le <strong>Reset Homéostasique</strong>.</p>

<h3>Qu'est-ce que l'inflammation chronique ?</h3>
<p>Contrairement à l'inflammation aiguë (une réponse saine à une blessure), l'inflammation chronique est un feu à bas bruit qui consume les tissus et épuise les glandes surrénales. Elle est le dénominateur commun des maladies modernes, du syndrome métabolique aux troubles auto-immuns.</p>

<h3>La plante comme "clé" de déverrouillage</h3>
<p>Les plantes médicinales ne sont pas des médicaments "naturels" destinés à supprimer un symptôme. Ce sont des vecteurs d'information. En apportant le <strong>Totum</strong> d'une plante adaptogène comme l'Ashwagandha ou d'une plante anti-inflammatoire comme le Curcuma (extrait avec précision), on envoie au corps les codes biochimiques nécessaires pour :</p>
<ul>
  <li><strong>Réguler l'axe HPA :</strong> (Hypothalamus-Hypophyse-Surrénales) pour calmer la réponse au stress.</li>
  <li><strong>Saturer les récepteurs cellulaires :</strong> avec des molécules antioxydantes biodisponibles.</li>
  <li><strong>Soutenir le microbiome :</strong> véritable chef d'orchestre de l'immunité.</li>
</ul>

<h3>Pourquoi l'extraction de précision est-elle vitale ici ?</h3>
<p>Dans un état d'inflammation chronique, le système digestif est souvent affaibli. Il ne peut pas extraire efficacement les principes actifs d'une plante brute ou d'une tisane légère. Le <strong>BloomLab®</strong> réalise ce travail "pré-digestif" pour vous. En créant un extrait hautement biodisponible à basse température, vous garantissez que les molécules arrivent intactes jusqu'aux cellules cibles.</p>
      `,
      en: `
<p>At Bloom, we don't treat symptoms; we work on the <strong>terrain</strong>. Chronic inflammation is often a sign of a systemic "lock".</p>
      `,
      de: `
<p>Bei Bloom behandeln wir keine Symptome; wir arbeiten am <strong>Terrain</strong>. Chronische Entzündungen sind oft ein Zeichen für eine systemische \"Sperre\".</p>
      `
    }
  },
  {
    slug: 'extraction-botanique-vs-huiles-essentielles-pourquoi-choisir-le-totum',
    date: '2026-08-23',
    category: 'Science du Totum',
    author: 'Équipe Bloom',
    readTime: '15 min',
    title: {
      fr: "Extraction Botanique vs Huiles Essentielles : Pourquoi nous préférons le Totum",
      en: "Botanical Extraction vs Essential Oils: Why we prefer the Totum",
      de: "Botanische Extraktion vs. Ätherische Öle: Warum wir das Totum bevorzugen"
    },
    excerpt: {
      fr: "L'aromathérapie est puissante, mais elle est incomplète. Découvrez pourquoi l'extraction globale (Totum) est plus sûre et plus efficace pour un travail de terrain profond.",
      en: "Aromatherapy is powerful, but incomplete. Discover why global extraction (Totum) is safer and more effective for deep system work.",
      de: "Aromatherapie ist kraftvoll, aber unvollständig. Entdecken Sie, warum die globale Extraktion (Totum) sicherer und effektiver für eine tiefe Systemarbeit ist."
    },
    content: {
      fr: `
<p>Dans le monde du bien-être naturel, l’huile essentielle est souvent considérée comme le summum de la puissance. Pourtant, pour un herboriste ou un biochimiste du végétal, elle représente une forme d’isolement moléculaire qui peut s’avérer incomplète, voire agressive.</p>

<h3>1. L'Huile Essentielle : Une fraction, pas la plante</h3>
<p>L'huile essentielle est obtenue par distillation à la vapeur d'eau. Ce processus ne capture que les molécules aromatiques volatiles. Toutes les autres richesses de la plante (polyphénols, flavonoïdes, alcaloïdes, mucilages) sont laissées de côté ou détruites par la chaleur.</p>

<h3>2. La sécurité du Totum</h3>
<p>Le <strong>Totum végétal</strong> est l'ensemble des molécules contenues dans la plante vivante. La nature a prévu des "molécules de sécurité" qui accompagnent les principes actifs les plus puissants. Par exemple, dans la Reine des Prés, le totum contient des molécules qui protègent l'estomac des effets de l'acide salicylique. L'isolat chimique (ou une huile essentielle mal utilisée) perd ce rempart naturel.</p>

<h3>3. Le BloomLab® : Le meilleur des deux mondes</h3>
<p>Grâce à l'extraction à basse température et sous vortex, le BloomLab® permet de capturer :</p>
<ul>
  <li><strong>Les fractions volatiles :</strong> comme une huile essentielle.</li>
  <li><strong>Les fractions hydrosolubles & liposolubles :</strong> qui sont habituellement absentes de l'aromathérapie.</li>
</ul>
<p>C'est ce que nous appelons l'<strong>Extraction Intégrale</strong>. Elle offre une puissance d'action réelle sans la toxicité potentielle des isolats concentrés.</p>
      `,
      en: `
<p>Aromatherapy is powerful, but it is incomplete. Discover why global extraction (Totum) is safer and more effective.</p>
      `,
      de: `
<p>Aromatherapie ist kraftvoll, aber sie ist unvollständig. Entdecken Sie, warum die globale Extraktion (Totum) sicherer und effektiver ist.</p>
      `
    }
  }
];
