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
        return '@version@';
    }

    public function getDeveloper()
    {
        return 'Mario Friz';
    }

    public function getDeveloperUrl()
    {
        return 'http://builtbysplash.com';
    }
}
