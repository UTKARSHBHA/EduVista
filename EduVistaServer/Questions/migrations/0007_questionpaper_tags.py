# Generated by Django 5.0.3 on 2024-05-28 05:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Questions', '0006_tag_question_tags'),
    ]

    operations = [
        migrations.AddField(
            model_name='questionpaper',
            name='tags',
            field=models.ManyToManyField(blank=True, to='Questions.tag'),
        ),
    ]
