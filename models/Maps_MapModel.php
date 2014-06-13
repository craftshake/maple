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

    public function __construct($locations = array(), $options = array())
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

    public function render() {
        craft()->templates->includeJsFile('//maps.google.com/maps/api/js?sensor=false&v=3.16');
        craft()->templates->includeJsResource('maps/js/maps.js');
        craft()->path->setTemplatesPath(craft()->path->getPluginsPath());
        $arguments = $this->getAttributes();
        $arguments['name'] = substr(md5(microtime()),rand(0,26),5);
        return craft()->templates->render('maps/templates/map', $arguments);
    }

    public function markersToArray() {
        $markers = array();
        foreach ($this->markers as $location) {
            if ($location->isComplete()) {
                $markers[] = array(
                    'lat' => $location->lat,
                    'lng' => $location->lng
                );
            }
        }
        return $markers;
    }

    public function __toString() {
        return $this->render();
    }
}
