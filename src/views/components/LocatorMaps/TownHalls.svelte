<script lang="ts">
  import { townHalls } from '../../../stores/data';
  import LocatorMap from '../LocatorMap/index.svelte';
  import distance from '@turf/distance';
  import { makePoint } from '../../../lib/utils';
  import { _ } from 'svelte-i18n';

  let position;
  $: closest = (position) ? $townHalls.map((s): [{ lat: number, lon: number}, number] => {
    return [s, distance(makePoint(s.lon, s.lat), makePoint(position[0], position[1]))];
  }).sort((s1, s2) => {
    return (s1[1] - s2[1]);
  })[0] : null;

</script>

<LocatorMap bind:position={position} shadows={0} />
<div class="result" class:has_result={closest !== null}>
  {#if closest !== null}
    {$_('next_townhall')}:  {closest[1].toFixed(2)} km ({closest[0].lon.toFixed(4)}, {closest[0].lat.toFixed(4)})<br />
    {$_('classed_dist')} (km): [
      <span class:active={closest[1] < 1}>0-1</span>,
      <span class:active={closest[1] >= 1 && closest[1] < 5}>1-5</span>,
      <span class:active={closest[1] >= 5 && closest[1] < 10}>5-10</span>,
      <span class:active={closest[1] >= 10 && closest[1] < 25}>10-25</span>,
      <span class:active={closest[1] >= 25}>25+</span>]
  {:else}
    {$_('map_explanation_2')}
  {/if}
</div>

<style lang="scss">
  span.active {
    font-weight: 700;
  }
</style>