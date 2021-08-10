# Generated by Django 3.2.5 on 2021-08-10 21:39

from django.db import migrations, models
import maps.models


class Migration(migrations.Migration):

    dependencies = [
        ('maps', '0010_auto_20210720_2346'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='walkroad',
            name='images',
        ),
        migrations.AddField(
            model_name='walkroad',
            name='thumbnail',
            field=models.ImageField(null=True, upload_to=maps.models.Walkroad.date_upload_to),
        ),
        migrations.DeleteModel(
            name='MapImage',
        ),
    ]
