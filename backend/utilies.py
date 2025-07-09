import os
import requests
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(to_email, subject, body):
    sender_email = os.getenv("EMAIL_ADDRESS")
    sender_password = os.getenv("EMAIL_PASSWORD")

    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = to_email
    msg["Subject"] = subject

    msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(msg)
            print("Email sent successfully.")
    except Exception as e:
        print(f"Error sending email: {e}")

from google.auth.transport.requests import Request
from google.oauth2 import service_account
import requests
import json
import os

PROJECT_ID = "my-petition-465211"
LOCATION = "us-central1"
MODEL_ID = "text-bison"

SERVICE_ACCOUNT_FILE = "vertex-service-account.json"

credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE,
    scopes=["https://www.googleapis.com/auth/cloud-platform"]
)

def generate_thank_you(name, topic):
    prompt = f"""
    Write a warm thank-you message to {name}, who signed a petition about {topic}.
    Include a fact about animal welfare in India and encourage them to stay involved.
    """

    access_token = credentials.refresh(Request()) or credentials.token

    endpoint = f"https://us-central1-aiplatform.googleapis.com/v1/projects/{PROJECT_ID}/locations/{LOCATION}/publishers/google/models/{MODEL_ID}:predict"

    headers = {
        "Authorization": f"Bearer {credentials.token}",
        "Content-Type": "application/json"
    }

    payload = {
        "instances": [{"prompt": prompt}],
        "parameters": {
            "temperature": 0.7,
            "maxOutputTokens": 300
        }
    }

    response = requests.post(endpoint, headers=headers, json=payload)
    response_data = response.json()

    if "predictions" in response_data:
        return response_data["predictions"][0]["content"]
    else:
        print("Error:", response_data)
        return "We received your signature. Thank you for supporting the cause!"


# def generate_thank_you(name, topic):
#     prompt = f"""
#     Write a warm thank-you message to {name}, who signed a petition about {topic}.
#     Include a fact about animal welfare in India and encourage them to stay involved.
#     """

#     url = "https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/us-central1/publishers/google/models/text-bison:predict"
    
#     headers = {
#         "Authorization": f"Bearer {API_KEY}",
#         "Content-Type": "application/json"
#     }

#     payload = {
#         "instances": [{"prompt": prompt}],
#         "parameters": {"temperature": 0.7, "maxOutputTokens": 300}
#     }

#     response = requests.post(url, headers=headers, json=payload)

#     # DEBUG LINE — add this:
#     print("🔍 DEBUG: Response JSON:", response.json())

#     # Now check if 'predictions' key exists
#     if "predictions" in response.json():
#         return response.json()["predictions"][0]["content"]
#     else:
#         return "We received your signature. Thank you for supporting the cause!"
