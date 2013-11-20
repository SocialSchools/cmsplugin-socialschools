from setuptools import setup, find_packages

version = '1.0.2'

setup(
    name='cmsplugin-socialschools',
    version=version,
    description='SocialSchools plugin for django-cms',
    author='Pratik Vyas',
    author_email='pratik.vyas@changer.nl',
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=[],
)
