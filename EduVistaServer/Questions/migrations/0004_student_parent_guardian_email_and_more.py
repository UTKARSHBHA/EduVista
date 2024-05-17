# Generated by Django 5.0.3 on 2024-05-16 06:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Questions', '0003_student'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='parent_guardian_email',
            field=models.EmailField(default='parent@gmail.com', max_length=254),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='student',
            name='emergency_contact_name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='student',
            name='emergency_contact_number',
            field=models.CharField(max_length=15),
        ),
        migrations.AlterField(
            model_name='student',
            name='parent_guardian_contact',
            field=models.CharField(max_length=15),
        ),
        migrations.AlterField(
            model_name='student',
            name='parent_guardian_name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='student',
            name='profile_picture',
            field=models.ImageField(blank=True, null=True, upload_to='student_profile_pics/'),
        ),
    ]