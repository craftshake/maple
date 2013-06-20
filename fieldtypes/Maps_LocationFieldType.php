<?php
namespace Craft;

class Maps_LocationFieldType extends BaseFieldType
{
	public function getName()
	{
		return Craft::t('Location');
	}

    public function defineContentAttribute()
    {
        return AttributeType::Mixed;
    }

	public function getInputHtml($name, $location)
	{
        craft()->templates->includeJsFile('http://maps.google.com/maps/api/js?sensor=false');
        craft()->templates->includeJsResource('maps/js/location.js');
        $id = rtrim(preg_replace('/[\[\]]+/', '-', $name), '-');
		return craft()->templates->render('maps/location', array(
            'id' => $id,
            'name'  => $name,
            'value' => $location,
        ));
	}

	public function prepValue($values)
	{
        if (empty($values))
        {
            return null;
        }
        $location = new Maps_LocationModel($values['lat'], $values['lng']);
		return $location;
	}

    public function prepPostData($values)
    {
        $location = new Maps_LocationModel($values['lat'], $values['lng']);
        return $location;
    }
}
