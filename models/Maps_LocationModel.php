<?php
namespace Craft;

class Maps_LocationModel extends BaseModel
{

    public function __construct($lat, $lng)
    {
        $this->lat = $lat;
        $this->lng = $lng;
    }

    protected function defineAttributes()
    {
        return array(
            'lat' => AttributeType::String,
            'lng' => AttributeType::String
        );
    }

    public function __toString()
    {
        return json_encode($this->getAttributes());
    }
}