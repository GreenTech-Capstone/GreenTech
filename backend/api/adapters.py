from allauth.account.adapter import DefaultAccountAdapter

class NoCsrfAccountAdapter(DefaultAccountAdapter):
    def is_safe_url(self, url):
        # Always allow, prevents Referer blocking
        return True

    def is_open_for_signup(self, request):
        return True
