# Generated by Django 3.2.5 on 2021-07-08 15:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_auto_20210709_0003'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='name',
            new_name='username',
        ),
    ]
