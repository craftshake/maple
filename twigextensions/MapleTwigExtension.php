<?php
namespace Craft;

class MapleTwigExtension extends \Twig_Extension
{
	public function getName()
	{
		return 'Maple';
	}

	public function getFilters()
	{
		return array(
			'map' => new \Twig_Filter_Method($this, 'mapFilter'),
		);
	}

	public function mapFilter($argument, $autoZoom = false) {
		$markers = array();
		$options = array();
		if ($argument instanceof Maple_MapModel)
		{
			$markers = $argument->markers;
			$options = $argument->options;
		}
		else if ($argument instanceof Maple_LocationModel)
		{
            if ($argument->isComplete())
            {
                $markers[] = array(
                	'lat' => $argument->lat,
                	'lng' => $argument->lng,
            	);
            	$autoZoom = true;
            }
		}
		else if (is_array($argument))
		{
			foreach ($argument as $location)
			{
	            if ($location->isComplete())
	            {
	                $markers[] = array(
	                	'lat' => $location->lat,
	                	'lng' => $location->lng,
	            	);
	            }
	        }
		}

		if ($autoZoom)
		{
			$options['autoZoom'] = true;
		}

		$mapModel = new Maple_MapModel($markers, $options);
		$html = $mapModel->render();
		$charset = craft()->templates->getTwig()->getCharset();

		return new \Twig_Markup($html, $charset);
	}
}
