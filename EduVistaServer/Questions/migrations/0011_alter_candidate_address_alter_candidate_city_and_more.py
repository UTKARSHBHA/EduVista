# Generated by Django 5.0.3 on 2024-06-01 12:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Questions', '0010_candidate_country_candidate_postal_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candidate',
            name='address',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='candidate',
            name='city',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='candidate',
            name='educational_institution',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='candidate',
            name='entrance_test_applied_for',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Questions.entrancetest'),
        ),
        migrations.AlterField(
            model_name='candidate',
            name='highest_qualification',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='candidate',
            name='parents_name',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='candidate',
            name='parents_phone_number',
            field=models.CharField(max_length=15),
        ),
        migrations.AlterField(
            model_name='candidate',
            name='state',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='candidate',
            name='year_of_completion',
            field=models.IntegerField(),
        ),
    ]