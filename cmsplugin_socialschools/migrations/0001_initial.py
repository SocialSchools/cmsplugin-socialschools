# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0014_auto_20160404_1908'),
    ]

    operations = [
        migrations.CreateModel(
            name='SocialSchools',
            fields=[
                ('cmsplugin_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='cms.CMSPlugin')),
                ('community_id', models.IntegerField(help_text='the ID (number) of the community you want to display public posts of. You can find this number in the addressbar when you navigate to the community page. E.g. the ID of https://desocialschool.socialschools.nl/communities/306 is 306')),
                ('only_descendants', models.BooleanField(help_text='This option will show public posts from any descendant community of the selected community.')),
                ('community_and_descendants', models.BooleanField(help_text='This option will show public posts from Community and all it descendants.')),
                ('only_photos', models.BooleanField(help_text='This option will show only the images from the most recent published posts in a carousel')),
                ('photo_choice', models.IntegerField(default=0, choices=[(0, b'Photos in Carousel'), (1, b'Photos in Grid')])),
                ('headlines_with_thumbnails', models.BooleanField(help_text='This option will only show the headlines and a thumbail if there is an image or event in the post.', verbose_name='Only headlines and thumbnails')),
                ('number_of_items', models.IntegerField(help_text='The number of items per page with a maximum of 10.', null=True, verbose_name='Number of items per page', blank=True)),
                ('hide_events', models.BooleanField(default=False, help_text='This option will hide the events from being shown in the newsfeed')),
            ],
            options={
                'abstract': False,
            },
            bases=('cms.cmsplugin',),
        ),
    ]
