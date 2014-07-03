<?php
namespace Craft;

class MaplePlugin extends BasePlugin
{
    public function getName()
    {
        return Craft::t('Maple');
    }

    public function getVersion()
    {
        return '0.9.4';
    }

    public function getDeveloper()
    {
        return 'Mario Friz';
    }

    public function getDeveloperUrl()
    {
        return 'http://craftshake.com';
    }

    public function addTwigExtension()
    {
        Craft::import('plugins.maple.twigextensions.MapleTwigExtension');

        return new MapleTwigExtension();
    }
}
