# api/utils/email.py
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def send_email_via_sendgrid(subject, message, to_email, from_email=None, html_content=None):
    if from_email is None:
        from_email = os.environ.get("DEFAULT_FROM_EMAIL", "noreply@greentech.com")

    mail = Mail(
        from_email=from_email,
        to_emails=to_email,
        subject=subject,
        plain_text_content=message,
    )

    if html_content:
        mail.add_content(html_content)

    try:
        sg = SendGridAPIClient(os.environ.get("EMAIL_HOST_PASSWORD"))
        response = sg.send(mail)
        print("SendGrid status:", response.status_code)
        return response.status_code
    except Exception as e:
        print("SendGrid Error:", e)
        return None
