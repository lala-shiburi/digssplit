from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter

from digs import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'invite', views.InviteViewSet,basename='Invite')
router.register(r'expenses', views.ExpensesViewSet,basename='Expenses')
router.register(r'users', views.UserViewSet,basename='User')
router.register(r'digs', views.DigsViewSet,basename='Digs')

# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls))
]