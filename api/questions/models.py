from django.db import models


class Question(models.Model):
    """
    Вопросы пользователей
    """
    text = models.TextField('текст вопроса')
    created = models.DateTimeField('время создания')
    changed = models.DateTimeField('время изменения')
    author = models.ForeignKey('auth.User', verbose_name='автор', on_delete=models.SET_NULL, null=True)

    class Meta:
        verbose_name = 'вопрос'
        verbose_name_plural = 'вопросы'


class Answer(models.Model):
    """
    Ответы на вопросы пользователей
    """
    question = models.ForeignKey('Question', verbose_name='вопрос', on_delete=models.CASCADE)
    text = models.TextField('ответ')
    created = models.DateTimeField('время создания')
    changed = models.DateTimeField('время изменения')
    author = models.ForeignKey('auth.User', verbose_name='автор', on_delete=models.SET_NULL, null=True)

    class Meta:
        verbose_name = 'ответ'
        verbose_name_plural = 'ответы'
