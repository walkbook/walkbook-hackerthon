# Generated by Django 3.2.5 on 2021-07-30 17:19

import accounts.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_auto_20210717_1641'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(null=True, upload_to=accounts.models.Profile.date_upload_to),
        ),
    ]
