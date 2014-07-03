<?php
namespace Craft;

class MapleVariable
{
    public function renderMap($locations, $options = array(), $autoZoom = true)
    {
    	$markers = array();
        foreach ($locations as $location) {
            $locationModel = new Maple_LocationModel($location['lat'], $location['lng']);
            if ($locationModel->isComplete())
            {
                $markers[] = $locationModel;
            }
        }
        if ($autoZoom)
        {
            $options['autoZoom'] = true;
        }
        $map = new Maple_MapModel($markers, $options);
        $map->markers = $map->markersToArray();
        return $map->render();
    }
}
