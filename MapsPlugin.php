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
