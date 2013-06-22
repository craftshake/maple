<?php
namespace Craft;

class MapsVariable
{
    public function renderMap($locations, $options = false)
    {
    	$markers = array();
        foreach ($locations as $location) {
            $markers[] = array(
                'lat' => $location['lat'],
                'lng' => $location['lng']
            );
        }
        $map = new Maps_MapModel($markers, $options);
        return $map->render();
    }
}