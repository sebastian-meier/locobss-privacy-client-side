<script lang="ts">
  import { supermarkets } from '../../../stores/data';
  import LocatorMap from '../LocatorMap/index.svelte';
  import distance from '@turf/distance';
  import { makePoint } from '../../../lib/utils';
  import { _ } from 'svelte-i18n';

  let classes = [0.5, 1, 2, 5];
  let distances: number[] = [];

  let position;
  $: closest = (position) ? classes.map((c, ci): number => {
    if (ci === 0) {
      distances = [];
      $supermarkets.forEach((s) => {
        distances.push(distance(makePoint(s.lon, s.lat), makePoint(position[0], position[1])));
      });
    }

    let count = 0;
    distances.forEach((d) => {
      if (d <= c) {
        count += 1;
      }
    });

    return count;
  }) : null;

</script>

<LocatorMap bind:position={position} shadows={0} />
<div class="result" class:has_result={closest !== null}>
  {#if closest !== null}
    {$_('supermarkets')}:<br />
    <table cellpadding="0" cellspacing="0">
      <thead>
        <tr>
          {#each classes as c, ci}
            <th>in {c} km</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        <tr>
          {#each classes as c, ci}
            <td>{closest[ci]}</td>
          {/each}
        </tr>
      </tbody>
    </table>
  {:else}
    {$_('map_explanation_2')}
  {/if}
</div>

<style lang="scss">
  .result{
    text-decoration: none;
  }
  table{
    margin:10px auto 0 auto;
    border:none;
  }
  th{
    padding: 0 7px;
    text-align: center;
    font-weight: 700;
    border-bottom:1px solid seagreen;
    border-right: 1px solid seagreen;
    &:last-child{
      border-right:none;
    }
  }
  td{
    text-align: center;
    border-right: 1px solid seagreen;
    &:last-child{
      border-right:none;
    }
  }
</style>