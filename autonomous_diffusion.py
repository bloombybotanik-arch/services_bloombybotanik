import os
import json
import urllib.request
import urllib.error
from datetime import datetime

# =================================================================
# CONFIGURATION ET VARIABLES DE SÉCURITÉ
# =================================================================
# Ces variables doivent être configurées dans l'environnement Hostinger
# ou dans un fichier .env si vous utilisez python-dotenv.
BREVO_API_KEY = os.getenv('BREVO_API_KEY')
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
SENDER_EMAIL = "contact@bloombybotanik.com"
SENDER_NAME = "Bloom by BotaniK"

def get_ai_content():
    """
    Module IA : Génère l'objet et le corps de la newsletter via Gemini API.
    Cette fonction agit comme le 'Module IA' demandé.
    """
    if not GEMINI_API_KEY:
        print("Avertissement : GEMINI_API_KEY manquante. Utilisation du contenu par défaut.")
        return {
            "subject": "L'Art de l'Extraction par Bloom by BotaniK",
            "body": "<p>Découvrez nos rituels de saison pour une santé souveraine sur bloombybotanik.com.</p>"
        }

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
    
    prompt = """
    Tu es l'expert en phytothérapie de Bloom by BotaniK.
    Génère une newsletter hebdomadaire élégante, scientifique et haut de gamme.
    Réponds EXCLUSIVEMENT au format JSON avec les clés exactes :
    - 'subject' : Un objet d'email captivant et court.
    - 'body' : Le corps de l'email en HTML riche et propre (sans blocs de code markdown).
    Contenu : Parle de l'importance du Totum végétal, de l'extraction basse température et donne un conseil botanique de saison.
    """

    data = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"response_mime_type": "application/json"}
    }).encode('utf-8')

    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    
    try:
        with urllib.request.urlopen(req) as response:
            res_data = json.loads(response.read().decode('utf-8'))
            text_content = res_data['candidates'][0]['content']['parts'][0]['text']
            return json.loads(text_content)
    except Exception as e:
        print(f"Erreur lors de la génération IA : {e}")
        return {
            "subject": "Votre rendez-vous avec le vivant", 
            "body": "<p>Retrouvez nos derniers protocoles d'herboristerie de précision sur notre plateforme.</p>"
        }

def send_via_brevo(subject, html_content):
    """
    Module de Diffusion : Se connecte à l'API REST de Brevo pour envoyer l'email.
    """
    if not BREVO_API_KEY:
        print("Erreur critique : BREVO_API_KEY non configurée dans les variables d'environnement.")
        return

    url = "https://api.brevo.com/v3/smtp/email"
    
    # Configuration du message
    # Note : Pour un envoi à une liste d'abonnés, remplacez 'to' par 'listIds': [VOTRE_ID_LISTE]
    payload = {
        "sender": {"name": SENDER_NAME, "email": SENDER_EMAIL},
        "to": [{"email": "contact@bloombybotanik.com", "name": "Abonnés Bloom"}], # Destinataire test/liste
        "subject": subject,
        "htmlContent": html_content
    }

    req = urllib.request.Request(
        url, 
        data=json.dumps(payload).encode('utf-8'),
        headers={
            'accept': 'application/json',
            'api-key': BREVO_API_KEY,
            'content-type': 'application/json'
        }
    )

    try:
        with urllib.request.urlopen(req) as response:
            print(f"[{datetime.now()}] Newsletter diffusée avec succès : {subject}")
    except urllib.error.HTTPError as e:
        print(f"Erreur Brevo (HTTP {e.code}) : {e.read().decode('utf-8')}")
    except Exception as e:
        print(f"Erreur lors de la diffusion : {e}")

if __name__ == "__main__":
    print("Lancement de la diffusion autonome Bloom by BotaniK...")
    newsletter = get_ai_content()
    send_via_brevo(newsletter['subject'], newsletter['body'])
