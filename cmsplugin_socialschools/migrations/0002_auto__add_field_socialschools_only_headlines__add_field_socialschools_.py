# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'SocialSchools.only_headlines'
        db.add_column(u'cmsplugin_socialschools', 'only_headlines',
                      self.gf('django.db.models.fields.BooleanField')(default=False),
                      keep_default=False)

        # Adding field 'SocialSchools.only_photos'
        db.add_column(u'cmsplugin_socialschools', 'only_photos',
                      self.gf('django.db.models.fields.BooleanField')(default=False),
                      keep_default=False)

        # Adding field 'SocialSchools.news_headlines'
        db.add_column(u'cmsplugin_socialschools', 'news_headlines',
                      self.gf('django.db.models.fields.CharField')(max_length=125, null=True, blank=True),
                      keep_default=False)

        # Adding field 'SocialSchools.number_of_items'
        db.add_column(u'cmsplugin_socialschools', 'number_of_items',
                      self.gf('django.db.models.fields.IntegerField')(null=True, blank=True),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'SocialSchools.only_headlines'
        db.delete_column(u'cmsplugin_socialschools', 'only_headlines')

        # Deleting field 'SocialSchools.only_photos'
        db.delete_column(u'cmsplugin_socialschools', 'only_photos')

        # Deleting field 'SocialSchools.news_headlines'
        db.delete_column(u'cmsplugin_socialschools', 'news_headlines')

        # Deleting field 'SocialSchools.number_of_items'
        db.delete_column(u'cmsplugin_socialschools', 'number_of_items')


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
            'community_id': ('django.db.models.fields.IntegerField', [], {}),
            'news_headlines': ('django.db.models.fields.CharField', [], {'max_length': '125', 'null': 'True', 'blank': 'True'}),
            'number_of_items': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'only_descendants': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'only_headlines': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'only_photos': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'socialschools_url': ('django.db.models.fields.CharField', [], {'max_length': '125'})
        }
    }

    complete_apps = ['cmsplugin_socialschools']