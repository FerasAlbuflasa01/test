from django.contrib import admin
from .models import Transport,Source,Destination,Package,TransportType,Container

# Register your models here.

admin.site.register(Container)
admin.site.register(Transport)
admin.site.register(Source)
admin.site.register(Destination)
admin.site.register(Package)
admin.site.register(TransportType)
