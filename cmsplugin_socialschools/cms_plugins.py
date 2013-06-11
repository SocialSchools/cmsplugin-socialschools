from cms.plugin_base import CMSPluginBase
from cms.plugin_pool import plugin_pool
from django.utils.translation import ugettext_lazy as _

from models import SocialSchools

class SocialSchoolsPlugin(CMSPluginBase):
    model = SocialSchools
    name = _("SocialSchools Posts")
    render_template = "cms_plugins/socialschools/socialschools.html"

    def render(self, context, instance, placeholder):
        context.update({
          'instance': instance,
          })
        return context

plugin_pool.register_plugin(SocialSchoolsPlugin)