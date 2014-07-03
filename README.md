# Maple Plugin

This is a map & location plugin built for [Craft](http://buildwithcraft.com).

## Usage

There are two different fieldtypes included in Maple:

- Map: If you want to store an entire map with multiple markers (ex: Nice surfing spots)
- Location: If you want to store just a location (ex: Location for Shop entries)

### Map field

_For the following examples, I assume the field's name is "map"._

Display a map field as a map:

```
<div style="height: 300px">{{ entry.map|map }}</div>
```

### Location field

_For the following examples, I assume the field's name is "location"._

Diplay a location field attributes:

```
<p>Latitude: {{entry.location.lat}}</p>
<p>Longitude: {{entry.location.lng}}</p>
```

Display a location field as a map:

```
<div style="height: 300px">{{ entry.location|map }}</div>
```

Display multiple locations on a single map:
_Let's say we have multiple Shop entries and each Shop has a location field_

```
{% set locations = [] %}

{% for entry in craft.entries.section('shops').find() %}
	{% set locations = locations|merge([entry.location]) %}
{% endfor %}

<div style="height: 300px">{{ craft.maple.renderMap(locations)|raw }}</div>
```
