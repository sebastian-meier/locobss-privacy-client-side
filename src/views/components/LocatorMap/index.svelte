<script lang="ts">
  import ShadowMap from './ShadowMap.svelte';
  import Map from './Map.svelte';
  import type { Map as mbMap } from 'mapbox-gl';
  import { Marker, NavigationControl, GeolocateControl } from 'mapbox-gl';
  import {onMount} from 'svelte';
  import { loaded, germany } from '../../../stores/data';
  import bbox from '@turf/bbox';
  import inPolygon from '@turf/boolean-point-in-polygon';
  import { makePoint } from '../../../lib/utils';
  import { _ } from 'svelte-i18n';

  let map: mbMap;
  let marker: Marker;
  let moves = [];

  let shadowZoom: number = 9;
  export let position: [number, number] | null;
  export let shadows: number = 0;

  const createMarker = () => {
    if (!marker && map) {
      marker = new Marker({
        draggable: true
      })
      .setLngLat([0,0])
      .on('dragend', () =>  {
        const lngLat = marker.getLngLat();
        position = [lngLat.lng, lngLat.lat];
      })
      .addTo(map);
    }
  };

  onMount(() => {
    shadowZoom = map.getZoom();

    map.addControl(new NavigationControl());

    map.on('movestart', () => {
      moves.forEach((m) => m());
    });

    map.on('zoom', () => {
      shadowZoom = map.getZoom();
    });

    map.on('click', (event) => {
      createMarker();
      marker.setLngLat(event.lngLat);
      position = [event.lngLat.lng, event.lngLat.lat];
    });

    const geolocate = new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      showAccuracyCircle: false,
      showUserLocation: false,
      trackUserLocation: false
    });

    map.addControl(geolocate);

    geolocate.on('geolocate', (event: { coords: {longitude: number, latitude: number}}) => {
      position = [event.coords.longitude, event.coords.latitude];
      createMarker();
      marker.setLngLat(position);
    });
  });

  const gen = (min, max): number => {
    return min + (max-min) * Math.random();
  }

  const inGermany = (x, y): boolean => {
    let inside = false;

    $germany.features.forEach((f) => {
      if (inPolygon(makePoint(x, y), f)) {
        inside = true;
      }
    });

    return inside;
  }

  const randPoints: [number, number][] = [];
  for (let ri = 0; ri < shadows; ri += 1) {
    randPoints.push([0, 0]);
  }

  $: if ($loaded) {
    const bb = bbox($germany);
    randPoints.forEach((r, i) => {
      let x = gen(bb[0], bb[2]);
      let y = gen(bb[1], bb[3]);
      while (!inGermany(x, y)) {
        x = gen(bb[0], bb[2]);
        y = gen(bb[1], bb[3]);
      }
      randPoints[i] = [x, y];
    });
  }

</script>

<Map cssClass="mainmap" bind:map={map} explanation={$_('map_explanation')} />
{#each Array(shadows) as s, i}
<ShadowMap bind:zoom={shadowZoom} bind:move={moves[i]} bind:start={randPoints[i]} />  
{/each}