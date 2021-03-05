<script lang="typescript">
  import mapbox from 'mapbox-gl';
  import { v4 as uuid } from 'uuid';
  import {onMount} from 'svelte';

  const id = uuid();
  export let map: mapbox.Map;
  export let cssClass = '';
  export let explanation = '';

  mapbox.accessToken = __global.env.MAPBOXKEY;

  onMount(() => {
    map = new mapbox.Map({
      container: `map-${id}`,
      style: "mapbox://styles/mapbox/light-v10",
      center: [10.452, 51.1605],
      zoom: 4,
      pitchWithRotate: false,
      dragRotate: false,
      touchZoomRotate: false
    });
  });

</script>

<svelte:head>
	<link href='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css' rel='stylesheet' />
</svelte:head>

<div class="map {cssClass}" id="map-{id}">
{#if explanation.length > 0}
<div class="map-explanation">
{explanation}
</div>
{/if}
</div>