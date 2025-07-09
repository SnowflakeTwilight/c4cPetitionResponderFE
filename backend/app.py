from flask import Flask, request, jsonify
from utilies import generate_thank_you,send_email     # ✅ import utility function, from utilies import generate_thank_you, 


app = Flask(__name__)

def send_email(to, subject, body):
    # Dummy email logic (you can plug in SMTP, SendGrid, etc.)
    print(f"\n📧 Sending email to {to}\nSubject: {subject}\nMessage:\n{body}\n")

@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    topic = data.get("petition_topic")

    message = generate_thank_you(name, topic)
    send_email(email, f"Thank You for Supporting {topic}", message)

    return jsonify({"message": "Email sent!"})

if __name__ == "__main__":
    app.run(debug=True)
