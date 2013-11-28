<?php
namespace Craft;

class MapsPlugin extends BasePlugin
{
    public function getName()
    {
        return Craft::t('Maps');
    }

    public function getVersion()
    {
        return '0.9.2';
    }

    public function getDeveloper()
    {
        return 'Mario Friz';
    }

    public function getDeveloperUrl()
    {
        return 'http://builtbysplash.com';
    }

    public function hookAddTwigExtension()
    {
        Craft::import('plugins.maps.twigextensions.MapsTwigExtension');

        return new MapsTwigExtension();
    }
}
