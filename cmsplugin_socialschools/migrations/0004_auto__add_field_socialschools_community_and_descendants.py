# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'SocialSchools.community_and_descendants'
        db.add_column(u'cmsplugin_socialschools', 'community_and_descendants',
                      self.gf('django.db.models.fields.BooleanField')(default=False),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'SocialSchools.community_and_descendants'
        db.delete_column(u'cmsplugin_socialschools', 'community_and_descendants')


    models = {
        'cms.cmsplugin': {
            'Meta': {'object_name': 'CMSPlugin'},
            'changed_date': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'creation_date': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'language': ('django.db.models.fields.CharField', [], {'max_length': '15', 'db_index': 'True'}),
            'level': ('django.db.models.fields.PositiveIntegerField', [], {'db_index': 'True'}),
            'lft': ('django.db.models.fields.PositiveIntegerField', [], {'db_index': 'True'}),
            'parent': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['cms.CMSPlugin']", 'null': 'True', 'blank': 'True'}),
            'placeholder': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['cms.Placeholder']", 'null': 'True'}),
            'plugin_type': ('django.db.models.fields.CharField', [], {'max_length': '50', 'db_index': 'True'}),
            'position': ('django.db.models.fields.PositiveSmallIntegerField', [], {'null': 'True', 'blank': 'True'}),
            'rght': ('django.db.models.fields.PositiveIntegerField', [], {'db_index': 'True'}),
            'tree_id': ('django.db.models.fields.PositiveIntegerField', [], {'db_index': 'True'})
        },
        'cms.placeholder': {
            'Meta': {'object_name': 'Placeholder'},
            'default_width': ('django.db.models.fields.PositiveSmallIntegerField', [], {'null': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'slot': ('django.db.models.fields.CharField', [], {'max_length': '50', 'db_index': 'True'})
        },
        u'cmsplugin_socialschools.socialschools': {
            'Meta': {'object_name': 'SocialSchools', 'db_table': "u'cmsplugin_socialschools'", '_ormbases': ['cms.CMSPlugin']},
            u'cmsplugin_ptr': ('django.db.models.fields.related.OneToOneField', [], {'to': "orm['cms.CMSPlugin']", 'unique': 'True', 'primary_key': 'True'}),
            'community_and_descendants': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'community_id': ('django.db.models.fields.IntegerField', [], {}),
            'headlines_with_thumbnails': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'news_headlines': ('django.db.models.fields.CharField', [], {'max_length': '125', 'null': 'True', 'blank': 'True'}),
            'number_of_items': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'only_descendants': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'only_headlines': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'only_photos': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'socialschools_url': ('django.db.models.fields.CharField', [], {'max_length': '125'})
        }
    }

    complete_apps = ['cmsplugin_socialschools']