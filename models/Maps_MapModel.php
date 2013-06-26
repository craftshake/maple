<?php
namespace Craft;

class Maps_MapModel extends BaseModel
{

    public static $mapTypes = array(
        'HYBRID',
        'ROADMAP',
        'SATELLITE',
        'TERRAIN'
    );

    public function __construct($locations = '', $options = '')
    {
        $this->markers = $locations;
        $this->options = $options;
    }

    protected function defineAttributes()
    {
        return array(
            'markers' => AttributeType::Mixed,
            'options' => AttributeType::Mixed
        );
    }

    public function addMarker(Maps_LocationModel $location)
    {
        if ($location->isComplete()) {
            $markers = $this->markers;
            $markers[] = $location->toJson();
            $this->markers = $markers;
        }        
    }

    public function addMarkers(array $locations)
    {
        foreach ($locations as $location) {
            $this->addMarker($location);
        }
    }

    public function render() {
        craft()->templates->includeJsFile('http://maps.google.com/maps/api/js?sensor=false');
        craft()->templates->includeJsResource('lib/jquery-1.9.1.min.js');
        craft()->templates->includeJsResource('lib/garnish-0.1.min.js');
        craft()->templates->includeJsResource('maps/js/map.js');
        craft()->path->setTemplatesPath(craft()->path->getPluginsPath());
        $arguments = $this->getAttributes();
        $arguments['name'] = substr(md5(microtime()),rand(0,26),5);
        return craft()->templates->render('maps/templates/map', $arguments);
    }

    public function __toString() {
        return $this->render();
    }
}