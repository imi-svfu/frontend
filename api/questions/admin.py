from django.contrib import admin

from . import models


@admin.register(models.Question)
class AdminQuestion(admin.ModelAdmin):
    pass


@admin.register(models.Answer)
class AdminAnswer(admin.ModelAdmin):
    pass
