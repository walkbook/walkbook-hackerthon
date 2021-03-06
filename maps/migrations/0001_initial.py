# Generated by Django 3.2.5 on 2021-07-10 17:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Walkroad',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(blank=True, max_length=20)),
                ('walkroad_name', models.CharField(default=models.CharField(blank=True, max_length=20), max_length=100)),
                ('walkroad_info', models.TextField(blank=True)),
                ('walkroad_start', models.TextField(blank=True)),
                ('walkroad_finish', models.TextField(blank=True)),
                ('walkroad_tmi', models.TextField(blank=True)),
                ('walkroad_picpath', models.TextField(blank=True)),
                ('walkroad_time', models.TextField(blank=True)),
                ('walkroad_map', models.JSONField(default='{}')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(blank=True, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
