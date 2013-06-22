<?php
namespace Craft;

class Maps_MapFieldType extends BaseFieldType
{
	public function getName()
	{
		return Craft::t('Map');
	}

    public function defineContentAttribute()
    {
        return AttributeType::Mixed;
    }

	public function getInputHtml($name, $map)
	{
        craft()->templates->includeJsFile('http://maps.google.com/maps/api/js?sensor=false');
        craft()->templates->includeJsResource('maps/js/MapFieldType.js');
        $id = rtrim(preg_replace('/[\[\]]+/', '-', $name), '-');
		return craft()->templates->render('maps/fieldtypes/map', array(
            'id' => $id,
            'name'  => $name,
            'value' => $map,
        ));
	}

	public function prepValue($value)
	{
        $locations = array();
        foreach ($value['locations'] as $location) {
            $locations[] = array(
                'lat' => $location['lat'],
                'lng' => $location['lng']
            );
        }
        if (empty($value))
        {
            return null;
        }
        $map = new Maps_MapModel($locations, $value['options']);
		return $map;
	}
}
