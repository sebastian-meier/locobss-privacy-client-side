<script lang="ts">
  import Map from './Map.svelte';
  import type { Map as mbMap } from 'mapbox-gl';

  let map: mbMap;

  export let zoom: number = 4;
  export let start: [number, number];

  $: if (map) map.setZoom(zoom);

  export const move = () => {
    const randStart: [number, number] = [
      start[0] + (5/(zoom*zoom)*Math.random() * ((Math.random() > 0.5) ? -1 : 1)),
      start[1] + (5/(zoom*zoom)*Math.random() * ((Math.random() > 0.5) ? -1 : 1)),
    ];

    map.flyTo({
      center: randStart
    })
  };
</script>

<Map bind:map={map} cssClass="shadow" />