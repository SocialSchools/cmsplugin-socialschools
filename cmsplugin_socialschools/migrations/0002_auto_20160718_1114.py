# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cmsplugin_socialschools', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='socialschools',
            name='community_and_descendants',
            field=models.BooleanField(default=False, help_text='This option will show public posts from Community and all it descendants.'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='socialschools',
            name='headlines_with_thumbnails',
            field=models.BooleanField(default=False, help_text='This option will only show the headlines and a thumbail if there is an image or event in the post.', verbose_name='Only headlines and thumbnails'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='socialschools',
            name='only_descendants',
            field=models.BooleanField(default=False, help_text='This option will show public posts from any descendant community of the selected community.'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='socialschools',
            name='only_photos',
            field=models.BooleanField(default=False, help_text='This option will show only the images from the most recent published posts in a carousel'),
            preserve_default=True,
        ),
    ]
