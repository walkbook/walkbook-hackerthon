# Generated by Django 3.2.5 on 2021-08-05 14:58

from django.db import migrations, models
import django.db.models.deletion
import maps.models


class Migration(migrations.Migration):

    dependencies = [
        ('maps', '0010_auto_20210720_2346'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mapimage',
            name='url',
        ),
        migrations.RemoveField(
            model_name='walkroad',
            name='images',
        ),
        migrations.AddField(
            model_name='mapimage',
            name='image',
            field=models.ImageField(null=True, upload_to=maps.models.MapImage.date_upload_to),
        ),
        migrations.AddField(
            model_name='mapimage',
            name='thumbnail',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='mapimage',
            name='walkroad',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='maps.walkroad'),
        ),
    ]