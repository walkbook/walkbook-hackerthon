# Generated by Django 3.2.5 on 2021-07-15 02:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('maps', '0007_auto_20210715_1036'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='walkroad',
            name='marker',
        ),
    ]