# Generated by Django 5.0.3 on 2024-04-02 14:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0004_question_image_delete_questionimage'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Class',
            new_name='Standard',
        ),
    ]