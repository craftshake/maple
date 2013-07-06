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
        craft()->templates->includeJsResource('maps/js/Maps.js');
        $id = rtrim(preg_replace('/[\[\]]+/', '-', $name), '-');
		return craft()->templates->render('maps/fieldtypes/map', array(
            'id' => $id,
            'name'  => $name,
            'value' => $map,
        ));
	}

	public function prepValue($value)
	{
        if (empty($value)) {
            return new Maps_MapModel();
        }
        $locations = array();
        foreach ($value['locations'] as $location) {
            $locationModel = new Maps_LocationModel($location['lat'], $location['lng']);
            if ($locationModel->isComplete())
            {
                $locations[] = $locationModel;
            }
        }
        if (empty($value))
        {
            return null;
        }
        $map = new Maps_MapModel($locations, $value['options']);
        $map->markers = $map->markersToArray();
		return $map;
	}
}
