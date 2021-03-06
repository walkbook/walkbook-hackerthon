# Generated by Django 3.2.5 on 2021-07-08 15:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20210708_2248'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='age',
            field=models.CharField(blank=True, choices=[('0', '10세 미만'), ('10', '10대'), ('20', '20대'), ('30', '30대'), ('40', '40대'), ('50', '50대'), ('60', '60대이상'), ('U', '선택안함')], max_length=2),
        ),
        migrations.AlterField(
            model_name='profile',
            name='sex',
            field=models.CharField(blank=True, choices=[('M', '남자'), ('F', '여자'), ('U', '선택안함')], max_length=1),
        ),
    ]
