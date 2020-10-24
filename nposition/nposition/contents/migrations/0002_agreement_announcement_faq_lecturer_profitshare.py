# Generated by Django 3.1.1 on 2020-10-24 07:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contents', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Agreement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created time')),
                ('modified_at', models.DateTimeField(auto_now_add=True, verbose_name='modified time')),
                ('service_usage', models.URLField()),
                ('personal_info', models.URLField()),
                ('unique_info', models.URLField()),
                ('paid_service', models.URLField()),
                ('marketing', models.URLField()),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Announcement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created time')),
                ('modified_at', models.DateTimeField(auto_now_add=True, verbose_name='modified time')),
                ('writer', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=200)),
                ('content', models.TextField()),
                ('view_cnt', models.IntegerField(default=0)),
                ('type', models.CharField(choices=[('AN', '공지사항'), ('EV', '이벤트')], default='AN', max_length=2)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='FAQ',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created time')),
                ('modified_at', models.DateTimeField(auto_now_add=True, verbose_name='modified time')),
                ('title', models.CharField(max_length=200)),
                ('content', models.TextField()),
            ],
            options={
                'abstract': False,
            },
        ),
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
            name='ProfitShare',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created time')),
                ('modified_at', models.DateTimeField(auto_now_add=True, verbose_name='modified time')),
                ('image', models.ImageField(upload_to='')),
                ('content', models.TextField()),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
