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
        return '0.1';
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
