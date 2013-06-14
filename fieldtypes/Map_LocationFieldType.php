<?php
namespace Craft;

class Map_LocationFieldType extends BaseFieldType
{
	public function getName()
	{
		return Craft::t('Location');
	}

	public function getInputHtml($name, $value)
	{
		return craft()->templates->render('map/location/input', array(
            'name'  => $name,
            'value' => $value
        ));
	}

	public function prepValue($value)
	{
		$values = explode(':', $value);
        return array(
            'lat' => $values[0],
            'lng' => $values[1]
        );
	}
}
