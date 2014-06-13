<?php
namespace Craft;

class Maps_LocationModel extends BaseModel
{

    public function __construct($lat = 0, $lng = 0)
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

    public function isComplete() {
        return !(empty($this->lat) || empty($this->lng));
    }

}
