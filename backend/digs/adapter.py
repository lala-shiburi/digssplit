from allauth.account.adapter import DefaultAccountAdapter
from allauth.account.adapter import app_settings
from django import forms

class CustomAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=False):
        user = super().save_user(request, user, form, commit)
        data = form.cleaned_data
        digs=data.get('digs')
        # digsName=digs.name.popitem()[1]
        user.digs = digs
        user.save()
        return user


    def clean_username(self, username, shallow=True):
        """
        Validates the username. You can hook into this if you want to
        (dynamically) restrict what usernames can be chosen.
        """
        for validator in app_settings.USERNAME_VALIDATORS:
            validator(username)

        # TODO: Add regexp support to USERNAME_BLACKLIST
        username_blacklist_lower = [ub.lower()
                                    for ub in app_settings.USERNAME_BLACKLIST]
        if username.lower() in username_blacklist_lower:
            raise forms.ValidationError(
                self.error_messages['username_blacklisted'])
        # Skipping database lookups when shallow is True, needed for unique
        # username generation.
        if not shallow:
            from .utils import filter_users_by_username
            if filter_users_by_username(username).exists():
                user_model = get_user_model()
                username_field = app_settings.USER_MODEL_USERNAME_FIELD
                error_message = user_model._meta.get_field(
                    username_field).error_messages.get('unique')
                if not error_message:
                    error_message = self.error_messages['username_taken']
                raise forms.ValidationError(
                    error_message,
                    params={
                        'model_name': user_model.__name__,
                        'field_label': username_field,
                    }
                )
        return username
