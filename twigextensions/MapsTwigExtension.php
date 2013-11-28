<?php
namespace Craft;

class MapsTwigExtension extends \Twig_Extension
{
	public function getName()
	{
		return 'Maps';
	}

	public function getFilters()
	{
		return array(
			'map' => new \Twig_Filter_Method($this, 'mapFilter'),
		);
	}

	public function mapFilter($argument, $autoZoom = true) {
		$locations = array();
		if ($argument instanceof Maps_MapModel)
		{
			$locations = $argument->markers;
		}

		if ($autoZoom)
		{
			$options['autoZoom'] = true;
		}
		$mapModel = new Maps_MapModel($locations, $options);
		$html = $mapModel->render();
		$charset = craft()->templates->getTwig()->getCharset();
		return new \Twig_Markup($html, $charset);
	}
}
