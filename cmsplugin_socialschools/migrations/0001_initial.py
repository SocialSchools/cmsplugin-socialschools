# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0013_urlconfrevision'),
    ]

    operations = [
        migrations.CreateModel(
            name='SocialSchools',
            fields=[
                ('cmsplugin_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='cms.CMSPlugin')),
                ('socialschools_url', models.CharField(help_text='the url to our API, fill out https://app.socialschools.nl/', max_length=125)),
                ('community_id', models.IntegerField(help_text='the ID (number) of the community you want to display public posts of. You can find this number in the addressbar when you navigate to the community page. E.g. the ID of https://desocialschool.socialschools.nl/communities/306 is 306')),
                ('only_descendants', models.BooleanField(help_text='This option will show public posts from any descendant community of the selected community.')),
                ('community_and_descendants', models.BooleanField(help_text='This option will show public posts from Community and all it descendants.')),
                ('only_headlines', models.BooleanField(help_text='This option will show  only headlines instead of full posts.')),
                ('only_photos', models.BooleanField(help_text='This option will show only the images from the most recent published posts in a carousel')),
                ('news_headlines', models.CharField(help_text='Fill out a title for the plugin in case you checked the only headlines option.', max_length=125, null=True, blank=True)),
                ('headlines_with_thumbnails', models.BooleanField(help_text='This option will only show the headlines and a thumbail if there is an image or event in the post.', verbose_name='Only headlines and thumbnails')),
                ('number_of_items', models.IntegerField(help_text='The number of items per page with a maximum of 10.', null=True, verbose_name='Number of items per page', blank=True)),
            ],
            options={
                'abstract': False,
            },
            bases=('cms.cmsplugin',),
        ),
    ]
