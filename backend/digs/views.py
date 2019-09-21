from django.contrib.auth.models import User
from rest_framework import mixins
from rest_framework import permissions, renderers, viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from digs.models import Expenses
from digs.serializers import ExpensesSerializer
from rest_framework.generics import (
    CreateAPIView,
)


from digs.models import Expenses,Digs,DigsMember,Invite
from digs.permissions import IsOwnerOrReadOnly
from digs.serializers import ExpensesSerializer, DigsSerializer,UserSerializer,InviteSerializer



class ExpensesViewSet(viewsets.ModelViewSet):
    serializer_class = ExpensesSerializer
    permission_classes = (
        permissions.AllowAny,
        IsOwnerOrReadOnly, )

    def get_queryset(self):
        queryset = Expenses.objects.all()
        digsId = self.request.query_params.get('digs', None)
        if digsId is not None:
            queryset = queryset.filter(digs=digsId)
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class InviteViewSet(viewsets.ModelViewSet):
    serializer_class = InviteSerializer
    queryset = Invite.objects.all()
    def perform_create(self, serializer):
        serializer.save(inviter=self.request.user)


class UserViewSet(viewsets.ReadOnlyModelViewSet,mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    
    serializer_class = UserSerializer

    def get_queryset(self):
        
        queryset = DigsMember.objects.all()
        digsId = self.request.query_params.get('digs', None)
        if digsId is not None:
            queryset = queryset.filter(digs=digsId)
        return queryset

    def get_object(self):
        return self.request.user


class DigsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Digs.objects.all()
    serializer_class = DigsSerializer