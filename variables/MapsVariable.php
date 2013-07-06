<?php
namespace Craft;

class MapsVariable
{
    public function renderMap($locations, $options = array(), $autoZoom = true)
    {
    	$markers = array();
        foreach ($locations as $location) {
            $locationModel = new Maps_LocationModel($location['lat'], $location['lng']);
            if ($locationModel->isComplete())
            {
                $markers[] = $locationModel;
            }
        }
        if ($autoZoom)
        {
            $options['autoZoom'] = true;
        }
        $map = new Maps_MapModel($markers, $options);
        $map->markers = $map->markersToArray();
        return $map->render();
    }
}