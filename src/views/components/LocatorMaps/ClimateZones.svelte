<script lang="ts">
  import { climateZones } from '../../../stores/data';
  import LocatorMap from '../LocatorMap/index.svelte';
  import inPolygon from '@turf/boolean-point-in-polygon';
  import { makePoint } from '../../../lib/utils';
  import { _ } from 'svelte-i18n';

  let position;
  $: climateZone = (position) ? $climateZones.features.filter((c) => {
    return inPolygon(makePoint(position[0], position[1]), c);
  }) : null;

</script>

<LocatorMap bind:position={position} shadows={0} />
<div class="result" class:has_result={climateZone !== null && climateZone.length >= 1}>
  {#if climateZone !== null && climateZone.length >= 1}
    {@html $_('climate_result', { values: { zone: $_(climateZone[0].properties.type.toString()) } })}
  {:else}
    {$_('map_explanation_2')}
  {/if}
</div>