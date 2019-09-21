from django.contrib.auth.models import User
from rest_framework import serializers
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from django.core.mail import send_mail

from rest_auth.registration.serializers import RegisterSerializer


from digs.models import Expenses
from digs.models import DigsMember
from digs.models import Digs
from digs.models import Invite

class ExpensesSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Expenses
        fields = ('id', 'created','owner','name','amount','category','members_owing','digs')

class DigsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Digs
        fields = "__all__"
        extra_kwargs = {
            'name':{'validators':[]}
        }

class UserSerializer(serializers.ModelSerializer):
     
    digs = DigsSerializer(read_only=False)
    class Meta:
        model = DigsMember
        fields = ('id','email','username','digs')
       





class CustomRegisterSerializer(RegisterSerializer):
    digs = DigsSerializer(
        required=False,read_only=False

    )

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        currentDigs=self.validated_data.get('digs',  '')
        digsOrdered=Digs.objects.get_or_create(name=self.validated_data.get('digs',  '')['name'])[0]
        data_dict['digs'] = digsOrdered
        return data_dict


class InviteSerializer(serializers.ModelSerializer):
    inviter = serializers.ReadOnlyField(source='inviter.username')
    class Meta:
        model = Invite
        fields=('name','email','message','inviter')

    def create(self, validate_data):
        instance = super(InviteSerializer, self).create(validate_data)
        send_mail(
            'Invitation to join Digssplit',
            'Hi there {}, {}'.format(validate_data['name'],validate_data['message']),
            'nhlalala@nshiburi.co.za',
            [validate_data['email']],
            fail_silently=False,
        )
        return instance
    
