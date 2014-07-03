<?php
namespace Craft;

class Maple_MapFieldType extends BaseFieldType
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
        craft()->templates->includeJsFile('//maps.google.com/maps/api/js?sensor=false&v=3.16');
        craft()->templates->includeJsResource('maple/js/maple.js');
        $id = craft()->templates->formatInputId($name);
		return craft()->templates->render('maple/fieldtypes/map', array(
            'id' => $id,
            'name'  => $name,
            'value' => $map,
        ));
	}

	public function prepValue($value)
	{
        if (empty($value)) {
            return new Maple_MapModel();
        }
        $locations = array();
        foreach ($value['locations'] as $location) {
            $locationModel = new Maple_LocationModel($location['lat'], $location['lng']);
            if ($locationModel->isComplete())
            {
                $locations[] = $locationModel;
            }
        }
        if (empty($value))
        {
            return null;
        }
        $map = new Maple_MapModel($locations, $value['options']);
        $map->markers = $map->markersToArray();
		return $map;
	}
}
