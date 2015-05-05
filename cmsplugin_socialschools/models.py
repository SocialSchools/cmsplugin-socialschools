from cms.models.pluginmodel import CMSPlugin
from django.utils.translation import ugettext_lazy as _
from django.db import models

class SocialSchools(CMSPlugin):
    socialschools_url = models.CharField(help_text=_(u"the url to our API, fill out https://app.socialschools.nl/"), max_length=125)
    community_id = models.IntegerField(help_text=_(u"the ID (number) of the community you want to display public posts of. You can find this number in the addressbar when you navigate to the community page. E.g. the ID of https://desocialschool.socialschools.nl/communities/306 is 306"))
    only_descendants = models.BooleanField(help_text=_(u"This option will show public posts from any descendant community of the selected community."))
    only_headlines = models.BooleanField(help_text=_(u"This option will show  only headlines instead of full posts."))
    only_photos = models.BooleanField(help_text=_(u"This option will show only the images from the most recent published posts in a carousel"))
    news_headlines = models.CharField(max_length=125, help_text=_(u"Fill out a title for the plugin in case you checked the only headlines option."), null=True, blank=True)
    headlines_with_thumbnails = models.BooleanField(_('Only headlines and thumbnails'), help_text=_(u"This option will only show the headlines and a thumbail if there is an image or event in the post."))
    number_of_items = models.IntegerField(_('Number of items per page'), help_text=_(u"The number of items per page with a maximum of 10."), blank=True, null=True)
