# Generated by Django 3.2.5 on 2021-07-15 00:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('maps', '0005_rename_user_walkroad_author'),
    ]

    operations = [
        migrations.AddField(
            model_name='walkroad',
            name='info',
            field=models.JSONField(default=dict),
        ),
    ]
