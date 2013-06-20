<?php
namespace Craft;

class Maps_MapModel extends BaseModel
{

    public static mapTypes = array(
        'HYBRID',
        'ROADMAP',
        'SATELLITE',
        'TERRAIN'
    );

    protected function defineAttributes()
    {
        return array(
            'center' => AttributeType::Mixed,
            'zoom' => AttributeType::Number,
            'type' => AttributeType::String,
            'markers' => AttributeType::Mixed
        );
    }

    public function addMarker(Map_LocationModel $location)
    {
        if ($this->markers == null)
        {
            $this->markers = array();
        }
        $this->markers->push($location);
    }

    public function render() {
        return craft()->templates->render('maps/map', $this->getAttributes());
    }

    public function __toString() {
        return $this->render();
    }
}