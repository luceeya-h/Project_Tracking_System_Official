# Generated by Django 5.1.7 on 2025-03-19 20:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("Tracker_Dashboard", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="authentication",
            name="role",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
