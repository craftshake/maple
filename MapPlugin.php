<?php
namespace Craft;

class MapPlugin extends BasePlugin
{
    public function getName()
    {
        return Craft::t('Map');
    }

    public function getVersion()
    {
        return '1.0';
    }

    public function getDeveloper()
    {
        return 'Splash';
    }

    public function getDeveloperUrl()
    {
        return 'http://builtbysplash.com';
    }
}
