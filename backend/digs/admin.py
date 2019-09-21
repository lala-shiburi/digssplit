from django.contrib import admin

from .models import Expenses
from .models import DigsMember
from .models import Digs
admin.site.register(Expenses)
admin.site.register(DigsMember)
admin.site.register(Digs)

# Register your models here.
