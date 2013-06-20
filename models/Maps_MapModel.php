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

    protected function defineAttributes()
    {
        return array(
            'name' => AttributeType::String,
            'center' => AttributeType::Mixed,
            'zoom' => AttributeType::Number,
            'type' => AttributeType::String,
            'markers' => AttributeType::Mixed
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
        if (empty($this->name))
        {
            $this->name = substr(md5(microtime()),rand(0,26),5);
        }     
        craft()->path->setTemplatesPath(craft()->path->getPluginsPath());
        return craft()->templates->render('maps/templates/map', $this->getAttributes());
    }

    public function __toString() {
        return $this->render();
    }
}