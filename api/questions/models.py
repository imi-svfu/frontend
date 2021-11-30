from django.db.models import (Model, CharField, TextField, DateTimeField,
                              ForeignKey, CASCADE, SET_NULL)


class Question(Model):
    """
    Вопросы пользователей
    """
    title = CharField('заголовок', max_length=100)
    text = TextField('текст', blank=True, default='')
    created = DateTimeField('время создания')
    changed = DateTimeField('время изменения')
    author = ForeignKey('auth.User', verbose_name='автор', on_delete=SET_NULL,
                        null=True)

    class Meta:
        verbose_name = 'вопрос'
        verbose_name_plural = 'вопросы'

    def __str__(self):
        return self.title


class Answer(Model):
    """
    Ответы на вопросы пользователей
    """
    question = ForeignKey('Question', verbose_name='вопрос', on_delete=CASCADE)
    text = TextField('ответ')
    created = DateTimeField('время создания')
    changed = DateTimeField('время изменения')
    author = ForeignKey('auth.User', verbose_name='автор', on_delete=SET_NULL,
                        null=True)

    class Meta:
        verbose_name = 'ответ'
        verbose_name_plural = 'ответы'
