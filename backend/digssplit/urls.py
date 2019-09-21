from django.urls import include, path
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
from django.contrib import admin

API_TITLE = 'Pastebin API'
API_DESCRIPTION = 'A Web API for managing expenses between house mates'
schema_view = get_schema_view(title=API_TITLE)

urlpatterns = [
    path('', include('digs.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('schema/', schema_view),
    path('docs/', include_docs_urls(title=API_TITLE, description=API_DESCRIPTION)),
    path('admin/', admin.site.urls),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls'))

]