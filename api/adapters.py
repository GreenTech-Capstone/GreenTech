from allauth.account.adapter import DefaultAccountAdapter
from django.core.exceptions import ValidationError
from django.core.validators import validate_email


class NoCsrfAccountAdapter(DefaultAccountAdapter):
    def is_safe_url(self, url):
        # Always allow, prevents Referer blocking
        return True

    def is_open_for_signup(self, request):
        return True

    def clean_email(self, email):
        """
        Validate email format
        """
        try:
            validate_email(email)
        except ValidationError:
            raise ValidationError(
                "Email is invalid. Please provide a valid email."
            )

        return email
