from django.db import models


class Page(models.Model):
    """
    Строницы сайта
    """
    text = models.TextField('текст вопроса')
    created = models.DateTimeField('время создания')
    changed = models.DateTimeField('время изменения')
    author = models.ForeignKey('auth.User', verbose_name='автор',
                               on_delete=models.SET_NULL, blank=True, null=True)

    class Meta:
        verbose_name = 'страница'
        verbose_name_plural = 'страницы'
