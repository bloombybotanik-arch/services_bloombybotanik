import { Language } from '../translations';

export interface Option {
  label: string;
  value: string;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
  validation: string;
}

export const getAlmaQuestions = (lang: Language): Question[] => {
  const translations = {
    fr: {
      questions: [
        {
          id: 1,
          question: "Bonjour, je suis ALMA. 'L'Ingénierie au service du vivant.' Pour commencer notre exploration, quel est votre niveau de vitalité globale aujourd'hui ?",
          options: [
            { label: "Pleine d'énergie", value: "high" },
            { label: "Fatiguée mais stable", value: "medium" },
            { label: "Épuisement chronique", value: "low" },
            { label: "Énergie en dents de scie", value: "unstable" }
          ],
          validation: "Merci pour cette précision. Votre vitalité globale est le point de départ de notre reset."
        },
        {
          id: 2,
          question: "Je comprends. Votre vitalité est le reflet de vos ressources profondes. Concernant votre digestion, ressentez-vous des ballonnements ou des inconforts après les repas ?",
          options: [
            { label: "Quasiment à chaque repas", value: "often" },
            { label: "De temps en temps", value: "sometimes" },
            { label: "Jamais, digestion fluide", value: "never" }
          ],
          validation: "C'est noté. L'intestin est souvent le premier verrou à libérer."
        },
        {
          id: 3,
          question: "C'est noté. La barrière intestinale est la porte d'entrée du terrain. Au niveau du foie, avez-vous des réveils fréquents entre 1h et 3h du matin ?",
          options: [
            { label: "Oui, très souvent", value: "yes" },
            { label: "Rarement", value: "rarely" },
            { label: "Non, je dors d'une traite", value: "no" }
          ],
          validation: "Le foie est en effet le grand chef d'orchestre de votre homéostasie."
        },
        {
          id: 4,
          question: "Le foie est le grand chef d'orchestre de la détoxication. Côté immunité, vous sentez-vous vulnérable au moindre virus qui circule ?",
          options: [
            { label: "Oui, je tombe souvent malade", value: "weak" },
            { label: "1 ou 2 épisodes par an", value: "normal" },
            { label: "Très rarement malade", value: "strong" }
          ],
          validation: "Une immunité stable est le signe d'un terrain qui sait se défendre."
        },
        {
          id: 5,
          question: "Une immunité réactive est un signe de force vitale. Sur le plan émotionnel, comment gérez-vous le stress actuellement ?",
          options: [
            { label: "Je me sens souvent dépassée", value: "overwhelmed" },
            { label: "Je stresse mais je tiens le coup", value: "coping" },
            { label: "Je me sens calme et ancrée", value: "calm" }
          ],
          validation: "L'équilibre émotionnel est indispensable pour que le corps s'autorise à lâcher prise."
        },
        {
          id: 6,
          question: "L'équilibre nerveux est le pilier du reset. Ressentez-vous des douleurs inflammatoires (articulations, muscles, tendons) ?",
          options: [
            { label: "Douleurs chroniques", value: "chronic" },
            { label: "Douleurs passagères", value: "transient" },
            { label: "Aucune douleur", value: "none" }
          ],
          validation: "Ces signaux inflammatoires indiquent une saturation de certains émonctoires."
        },
        {
          id: 7,
          question: "L'inflammation est souvent un signal de surcharge. Côté circulation, avez-vous les jambes lourdes ou les extrémités froides ?",
          options: [
            { label: "Oui, c'est fréquent", value: "yes" },
            { label: "Seulement en fin de journée", value: "evening" },
            { label: "Non, pas du tout", value: "no" }
          ],
          validation: "La circulation est le fleuve qui nourrit et nettoie vos cellules."
        },
        {
          id: 8,
          question: "La fluidité du sang assure l'apport en nutriments. Votre peau présente-t-elle des signes d'inconfort (boutons, sécheresse, rougeurs) ?",
          options: [
            { label: "Oui, c'est mon point sensible", value: "sensitive" },
            { label: "Quelques imperfections", value: "mild" },
            { label: "Peau saine et lumineuse", value: "clear" }
          ],
          validation: "La peau exprime souvent ce que l'intérieur ne parvient plus à gérer."
        },
        {
          id: 9,
          question: "La peau est le miroir de votre pharmacie intérieure. Votre respiration est-elle fluide ou vous sentez-vous souvent oppressée ?",
          options: [
            { label: "Respiration courte / Oppression", value: "short" },
            { label: "Parfois bloquée par le stress", value: "stress" },
            { label: "Fluide et profonde", value: "fluid" }
          ],
          validation: "Le souffle est votre premier outil de régulation systémique."
        },
        {
          id: 10,
          question: "Le souffle libère les toxines volatiles. Vos reins vous semblent-ils sollicités (cernes, rétention, maux de dos) ?",
          options: [
            { label: "Oui, je le sens physiquement", value: "yes" },
            { label: "Peut-être un peu", value: "maybe" },
            { label: "Non, tout va bien", value: "no" }
          ],
          validation: "Les reins filtrent et préservent l'équilibre minéral de votre terrain."
        },
        {
          id: 11,
          question: "Les reins filtrent votre histoire liquide. Votre concentration est-elle altérée par un brouillard mental ?",
          options: [
            { label: "Oui, j'ai du mal à réfléchir", value: "foggy" },
            { label: "Par intermittence", value: "sometimes" },
            { label: "Esprit vif et clair", value: "clear" }
          ],
          validation: "Le brouillard mental est souvent le signe d'une surcharge métabolique."
        },
        {
          id: 12,
          question: "La clarté mentale dépend de la pureté du terrain. Ressentez-vous des déséquilibres hormonaux (cycle, libido, humeur) ?",
          options: [
            { label: "Déséquilibre marqué", value: "marked" },
            { label: "Légères variations", value: "mild" },
            { label: "Équilibre stable", value: "stable" }
          ],
          validation: "Vos hormones régulent la danse de votre équilibre intérieur."
        },
        {
          id: 13,
          question: "Les hormones sont les messagers de votre équilibre. Votre métabolisme réagit-il fortement au sucre ou au sel ?",
          options: [
            { label: "Envies irrésistibles", value: "cravings" },
            { label: "Besoin de grignoter", value: "snacking" },
            { label: "Appétit régulé", value: "regulated" }
          ],
          validation: "Le métabolisme est votre moteur énergétique principal."
        },
        {
          id: 14,
          question: "La régulation du sucre est la clé de l'énergie constante. Vos articulations manquent-elles de souplesse ?",
          options: [
            { label: "Raideurs matinales", value: "stiff" },
            { label: "Manque de souplesse global", value: "limited" },
            { label: "Grande liberté de mouvement", value: "free" }
          ],
          validation: "La souplesse du corps reflète souvent la souplesse du terrain."
        },
        {
          id: 15,
          question: "Enfin, vos cheveux et ongles sont-ils fragiles ou cassants ?",
          options: [
            { label: "Chute de cheveux / Ongles mous", value: "fragile" },
            { label: "Assez ternes", value: "dull" },
            { label: "Forts et brillants", value: "healthy" }
          ],
          validation: "Merci. Ces derniers indices complètent votre cartographie systémique."
        }
      ]
    },
    en: {
      questions: [
        {
          id: 1,
          question: "Hello, I am ALMA. 'Your body is not broken. It is locked.' To begin our exploration, what is your overall vitality level today?",
          options: [
            { label: "Full of energy", value: "high" },
            { label: "Tired but stable", value: "medium" },
            { label: "Chronic exhaustion", value: "low" },
            { label: "Up and down energy", value: "unstable" }
          ],
          validation: "Thank you for that precision. Your overall vitality is the starting point of our reset."
        },
        {
          id: 2,
          question: "I understand. Your vitality reflects your deep resources. Regarding your digestion, do you feel bloating or discomfort after meals?",
          options: [
            { label: "Almost every meal", value: "often" },
            { label: "From time to time", value: "sometimes" },
            { label: "Never, smooth digestion", value: "never" }
          ],
          validation: "Noted. The intestine is often the first lock to release."
        },
        {
          id: 3,
          question: "Noted. The intestinal barrier is the gateway to the terrain. Regarding the liver, do you have frequent awakenings between 1 AM and 3 AM?",
          options: [
            { label: "Yes, very often", value: "yes" },
            { label: "Rarely", value: "rarely" },
            { label: "No, I sleep through", value: "no" }
          ],
          validation: "The liver is indeed the great conductor of your homeostasis."
        },
        {
          id: 4,
          question: "The liver is the conductor of detoxification. Regarding immunity, do you feel vulnerable to any virus circulating?",
          options: [
            { label: "Yes, I get sick often", value: "weak" },
            { label: "1 or 2 episodes per year", value: "normal" },
            { label: "Very rarely sick", value: "strong" }
          ],
          validation: "Stable immunity is the sign of a terrain that knows how to defend itself."
        },
        {
          id: 5,
          question: "Reactive immunity is a sign of vital force. Emotionally, how are you currently managing stress?",
          options: [
            { label: "I often feel overwhelmed", value: "overwhelmed" },
            { label: "I stress but I cope", value: "coping" },
            { label: "I feel calm and grounded", value: "calm" }
          ],
          validation: "Emotional balance is essential for the body to allow itself to let go."
        },
        {
          id: 6,
          question: "Nervous balance is the pillar of the reset. Do you experience inflammatory pain (joints, muscles, tendons)?",
          options: [
            { label: "Chronic pain", value: "chronic" },
            { label: "Transient pain", value: "transient" },
            { label: "No pain", value: "none" }
          ],
          validation: "These inflammatory signals indicate saturation of certain emunctories."
        },
        {
          id: 7,
          question: "Inflammation is often a signal of overload. Regarding circulation, do you have heavy legs or cold extremities?",
          options: [
            { label: "Yes, it's frequent", value: "yes" },
            { label: "Only at the end of the day", value: "evening" },
            { label: "No, not at all", value: "no" }
          ],
          validation: "Circulation is the river that nourishes and cleanses your cells."
        },
        {
          id: 8,
          question: "Blood fluidity ensures nutrient supply. Does your skin show signs of discomfort (pimples, dryness, redness)?",
          options: [
            { label: "Yes, it's my sensitive point", value: "sensitive" },
            { label: "A few imperfections", value: "mild" },
            { label: "Healthy and glowing skin", value: "clear" }
          ],
          validation: "The skin often expresses what the interior can no longer manage."
        },
        {
          id: 9,
          question: "The skin is the mirror of your inner pharmacy. Is your breathing fluid or do you often feel oppressed?",
          options: [
            { label: "Short breath / Oppression", value: "short" },
            { label: "Sometimes blocked by stress", value: "stress" },
            { label: "Fluid and deep", value: "fluid" }
          ],
          validation: "Breath is your first tool for systemic regulation."
        },
        {
          id: 10,
          question: "Breath releases volatile toxins. Do your kidneys seem strained (dark circles, retention, back pain)?",
          options: [
            { label: "Yes, I feel it physically", value: "yes" },
            { label: "Maybe a little", value: "maybe" },
            { label: "No, everything is fine", value: "no" }
          ],
          validation: "Kidneys filter and preserve the mineral balance of your terrain."
        },
        {
          id: 11,
          question: "Kidneys filter your liquid history. Is your concentration affected by mental fog?",
          options: [
            { label: "Yes, I have trouble thinking", value: "foggy" },
            { label: "Intermittently", value: "sometimes" },
            { label: "Sharp and clear mind", value: "clear" }
          ],
          validation: "Mental fog is often the sign of a metabolic overload."
        },
        {
          id: 12,
          question: "Mental clarity depends on the purity of the terrain. Do you experience hormonal imbalances (cycle, libido, mood)?",
          options: [
            { label: "Marked imbalance", value: "marked" },
            { label: "Slight variations", value: "mild" },
            { label: "Stable balance", value: "stable" }
          ],
          validation: "Your hormones regulate the dance of your inner balance."
        },
        {
          id: 13,
          question: "Hormones are the messengers of your balance. Does your metabolism react strongly to sugar or salt?",
          options: [
            { label: "Irresistible cravings", value: "cravings" },
            { label: "Need to snack", value: "snacking" },
            { label: "Regulated appetite", value: "regulated" }
          ],
          validation: "Metabolism is your main energy engine."
        },
        {
          id: 14,
          question: "Sugar regulation is the key to constant energy. Do your joints lack flexibility?",
          options: [
            { label: "Morning stiffness", value: "stiff" },
            { label: "Global lack of flexibility", value: "limited" },
            { label: "Great freedom of movement", value: "free" }
          ],
          validation: "Body flexibility often reflects terrain flexibility."
        },
        {
          id: 15,
          question: "Finally, are your hair and nails fragile or brittle?",
          options: [
            { label: "Hair loss / Soft nails", value: "fragile" },
            { label: "Quite dull", value: "dull" },
            { label: "Strong and shiny", value: "healthy" }
          ],
          validation: "Thank you. These final clues complete your systemic mapping."
        }
      ]
    },
    de: {
      questions: [
        {
          id: 1,
          question: "Hallo, ich bin ALMA. 'Ihr Körper ist nicht kaputt. Er ist verschlossen.' Um unsere Erkundung zu beginnen: Wie ist Ihr allgemeines Vitalitätsniveau heute?",
          options: [
            { label: "Voller Energie", value: "high" },
            { label: "Müde, aber stabil", value: "medium" },
            { label: "Chronische Erschöpfung", value: "low" },
            { label: "Schwankende Energie", value: "unstable" }
          ],
          validation: "Vielen Dank für diese Präzision. Ihre allgemeine Vitalität ist der Ausgangspunkt für unseren Reset."
        },
        {
          id: 2,
          question: "Ich verstehe. Ihre Vitalität spiegelt Ihre tiefen Ressourcen wider. In Bezug auf Ihre Verdauung: Verspüren Sie Blähungen oder Unbehagen nach den Mahlzeiten?",
          options: [
            { label: "Fast bei jeder Mahlzeit", value: "often" },
            { label: "Von Zeit zu Zeit", value: "sometimes" },
            { label: "Niemals, flüssige Verdauung", value: "never" }
          ],
          validation: "Notiert. Der Darm ist oft das erste Schloss, das gelöst werden muss."
        },
        {
          id: 3,
          question: "Notiert. Die Darmbarriere ist das Tor zum Terrain. In Bezug auf die Leber: Wachen Sie häufig zwischen 1 und 3 Uhr morgens auf?",
          options: [
            { label: "Ja, sehr oft", value: "yes" },
            { label: "Selten", value: "rarely" },
            { label: "Nein, ich schlafe durch", value: "no" }
          ],
          validation: "Die Leber ist in der Tat der große Dirigent Ihrer Homöostase."
        },
        {
          id: 4,
          question: "Die Leber ist der Dirigent der Entgiftung. In Bezug auf die Immunität: Fühlen Sie sich anfällig für jedes zirkulierende Virus?",
          options: [
            { label: "Ja, ich werde oft krank", value: "weak" },
            { label: "1 oder 2 Episoden pro Jahr", value: "normal" },
            { label: "Sehr selten krank", value: "strong" }
          ],
          validation: "Eine stabile Immunität ist das Zeichen eines Terrains, das sich zu verteidigen weiß."
        },
        {
          id: 5,
          question: "Reaktive Immunität ist ein Zeichen für Lebenskraft. Emotional gesehen: Wie gehen Sie derzeit mit Stress um?",
          options: [
            { label: "Ich fühle mich oft überfordert", value: "overwhelmed" },
            { label: "Ich bin gestresst, aber ich komme klar", value: "coping" },
            { label: "Ich fühle mich ruhig und geerdet", value: "calm" }
          ],
          validation: "Emotionales Gleichgewicht ist unerlässlich, damit der Körper loslassen kann."
        },
        {
          id: 6,
          question: "Nervliches Gleichgewicht ist die Säule des Resets. Verspüren Sie entzündliche Schmerzen (Gelenke, Muskeln, Sehnen)?",
          options: [
            { label: "Chronische Schmerzen", value: "chronic" },
            { label: "Vorübergehende Schmerzen", value: "transient" },
            { label: "Keine Schmerzen", value: "none" }
          ],
          validation: "Diese Entzündungssignale deuten auf eine Sättigung bestimmter Emunktorien hin."
        },
        {
          id: 7,
          question: "Entzündungen sind oft ein Signal für Überlastung. In Bezug auf die Durchblutung: Haben Sie schwere Beine oder kalte Extremitäten?",
          options: [
            { label: "Ja, das ist häufig", value: "yes" },
            { label: "Nur am Ende des Tages", value: "evening" },
            { label: "Nein, gar nicht", value: "no" }
          ],
          validation: "Die Durchblutung ist der Fluss, der Ihre Zellen nährt und reinigt."
        },
        {
          id: 8,
          question: "Blutfluss sichert die Nährstoffversorgung. Zeigt Ihre Haut Anzeichen von Unbehagen (Pickel, Trockenheit, Rötungen)?",
          options: [
            { label: "Ja, das ist mein empfindlicher Punkt", value: "sensitive" },
            { label: "Ein paar Unvollkommenheiten", value: "mild" },
            { label: "Gesunde und strahlende Haut", value: "clear" }
          ],
          validation: "Die Haut drückt oft aus, was das Innere nicht mehr bewältigen kann."
        },
        {
          id: 9,
          question: "Die Haut ist der Spiegel Ihrer inneren Apotheke. Ist Ihr Atem flüssig oder fühlen Sie sich oft bedrückt?",
          options: [
            { label: "Kurzer Atem / Beklemmung", value: "short" },
            { label: "Manchmal durch Stress blockiert", value: "stress" },
            { label: "Flüssig und tief", value: "fluid" }
          ],
          validation: "Der Atem ist Ihr erstes Werkzeug zur systemischen Regulation."
        },
        {
          id: 10,
          question: "Der Atem setzt flüchtige Toxine frei. Scheinen Ihre Nieren beansprucht (Augenringe, Wassereinlagerungen, Rückenschmerzen)?",
          options: [
            { label: "Ja, ich spüre es körperlich", value: "yes" },
            { label: "Vielleicht ein wenig", value: "maybe" },
            { label: "Nein, alles ist gut", value: "no" }
          ],
          validation: "Nieren filtern und bewahren das Mineralgleichgewicht Ihres Terrains."
        },
        {
          id: 11,
          question: "Nieren filtern Ihre flüssige Geschichte. Ist Ihre Konzentration durch Gehirnnebel beeinträchtigt?",
          options: [
            { label: "Ja, ich habe Schwierigkeiten beim Denken", value: "foggy" },
            { label: "Zeitweise", value: "sometimes" },
            { label: "Wacher und klarer Geist", value: "clear" }
          ],
          validation: "Gehirnnebel ist oft das Zeichen einer metabolischen Überlastung."
        },
        {
          id: 12,
          question: "Geistige Klarheit hängt von der Reinheit des Terrains ab. Verspüren Sie hormonelle Ungleichgewichte (Zyklus, Libido, Stimmung)?",
          options: [
            { label: "Deutliches Ungleichgewicht", value: "marked" },
            { label: "Leichte Schwankungen", value: "mild" },
            { label: "Stabiles Gleichgewicht", value: "stable" }
          ],
          validation: "Ihre Hormone regulieren den Tanz Ihres inneren Gleichgewichts."
        },
        {
          id: 13,
          question: "Hormone sind die Boten Ihres Gleichgewichts. Reagiert Ihr Stoffwechsel stark auf Zucker oder Salz?",
          options: [
            { label: "Unwiderstehliches Verlangen", value: "cravings" },
            { label: "Bedürfnis zu naschen", value: "snacking" },
            { label: "Regulierter Appetit", value: "regulated" }
          ],
          validation: "Der Stoffwechsel ist Ihr wichtigster Energiemotor."
        },
        {
          id: 14,
          question: "Zuckerregulierung ist der Schlüssel zu konstanter Energie. Fehlt es Ihren Gelenken an Flexibilität?",
          options: [
            { label: "Morgendliche Steifheit", value: "stiff" },
            { label: "Allgemeiner Mangel an Flexibilität", value: "limited" },
            { label: "Große Bewegungsfreiheit", value: "free" }
          ],
          validation: "Körperliche Flexibilität spiegelt oft die Flexibilität des Terrains wider."
        },
        {
          id: 15,
          question: "Und schließlich: Sind Ihre Haare und Nägel brüchig oder empfindlich?",
          options: [
            { label: "Haarausfall / Weiche Nägel", value: "fragile" },
            { label: "Ziemlich stumpf", value: "dull" },
            { label: "Stark und glänzend", value: "healthy" }
          ],
          validation: "Vielen Dank. Diese letzten Hinweise vervollständigen Ihre systemische Kartierung."
        }
      ]
    }
  };

  return translations[lang]?.questions || translations.fr.questions;
};
