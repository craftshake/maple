<?php
namespace Craft;

class MapsVariable
{
    public function renderMap($locations, $options = null)
    {
        $map = new Maps_MapModel();
        $map->addMarkers($locations);
        return $map->render();
    }
}