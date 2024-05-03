# Generated by Django 5.0.3 on 2024-05-03 06:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Questions', '0004_alter_question_topics'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='topics',
            field=models.ManyToManyField(blank=True, related_name='questions', to='Questions.topic'),
        ),
    ]
