# Generated by Django 3.1.1 on 2020-11-01 05:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Lecturer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created time')),
                ('modified_at', models.DateTimeField(auto_now_add=True, verbose_name='modified time')),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('kakao_id', models.CharField(max_length=20)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Lecture',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created time')),
                ('modified_at', models.DateTimeField(auto_now_add=True, verbose_name='modified time')),
                ('title', models.CharField(max_length=200)),
                ('content', models.TextField()),
                ('price', models.IntegerField(default=0)),
                ('lecturer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lecture.lecturer')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
