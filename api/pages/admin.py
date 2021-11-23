from django.contrib import admin

from . import models

admin.AdminSite.site_header = 'ИМИ СВФУ'
admin.AdminSite.index_title = 'Администрирование'


@admin.register(models.Page)
class AdminPage(admin.ModelAdmin):
    pass
