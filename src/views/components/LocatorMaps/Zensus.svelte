<script lang="ts">
  import { ror} from '../../../stores/data';
  import LocatorMap from '../LocatorMap/index.svelte';
  import inPolygon from '@turf/boolean-point-in-polygon';
  import { makePoint, makeMultiPolygon } from '../../../lib/utils';
  import { _ } from 'svelte-i18n';

  const zensusDef: {
    [key: string]: {
      [key: string]: string
    }
  } = {
    'Einwohner': {
      '-1': $_('noone_or_secret'),
      '1': '3 – 250',
      '2': '250 – 500',
      '3': '500 – 2.000',
      '4': '2.000 – 4.000',
      '5': '4.000 – 8.000',
      '6': '8.000 ' + $_('and_more')
    },
    'Frauen_A': {
      '-9': $_('secret'),
      '-1': $_('noone'),
      '1': '0 – 40',
      '2': '40 – 47',
      '3': '47 – 53',
      '4': '53 – 60',
      '5': '60 ' + $_('and_more')
    },
    'Alter_D': {
      '-9': $_('secret'),
      '-1': $_('noone'),
      '1': '0 – 40',
      '2': '40 – 42',
      '3': '42 – 44',
      '4': '44 – 47',
      '5': '47 ' + $_('and_more')
    },
    'unter18_A': {
      '-9': $_('secret'),
      '-1': $_('noone'),
      '1': '0',
      '2': '0 – 15',
      '3': '15 – 20',
      '4': '20 – 25',
      '5': '25 ' + $_('and_more')
    },
    'ab65_A': {
      '-9': $_('secret'),
      '-1': $_('noone'),
      '1': '0',
      '2': '0 – 15',
      '3': '15 – 20',
      '4': '20 – 25',
      '5': '25 ' + $_('and_more')
    },
    'Auslaender_A': {
      '-9': $_('secret'),
      '-1': $_('noone'),
      '1': '0',
      '2': '0 – 4',
      '3': '4 – 8',
      '4': '8 – 20',
      '5': '20 ' + $_('and_more')
    },
    'HHGroesse_D': {
      '-9': $_('secret'),
      '-1': $_('noone'),
      '1': '1 – 2',
      '2': '2 – 2,5',
      '3': '2,5 – 3',
      '4': '3 – 3,5',
      '5': '3,5 ' + $_('and_more')
    },
    'Leerstandsquote': {
      '-9': $_('secret'),
      '-1': $_('noone'),
      '1': '0 – 1',
      '2': '1 – 3',
      '3': '3 – 5',
      '4': '5 – 10',
      '5': '10 ' + $_('and_more')
    },
    'Wohnfl_Bew_D': {
      '-9': $_('secret'),
      '-1': $_('noone'),
      '1': '0 – 30',
      '2': '30 – 40',
      '3': '40 – 50',
      '4': '50 – 60',
      '5': '60 ' + $_('and_more')
    },
    'Wohnfl_Whg_D': {
      '-9': $_('secret'),
      '-1': $_('noone'),
      '1': '0 – 60',
      '2': '60 – 80',
      '3': '80 – 100',
      '4': '100 – 120',
      '5': '120 – 140',
      '6': '140 ' + $_('and_more')
    }
  };

  let position;
  $: rorMatch = (position) ? $ror.features.filter((c) => {
    return inPolygon(makePoint(position[0], position[1]), c);
  }) : null;

  let zensusMatch = [];
  let zensus = [];
  let zensusColumns = [];
  let currentRor = null;

  const getZensus = () => {
    if (position && rorMatch) {
      zensusMatch = zensus.filter((z) => {
        return inPolygon(makePoint(position[0], position[1]), makeMultiPolygon(JSON.parse(z[z.length - 1])));
      })
    }
  }

  $: if (rorMatch && rorMatch.length > 0) {
    if (rorMatch[0].properties.SN_ROR !== currentRor) {
      currentRor = rorMatch[0].properties.SN_ROR;
      fetch(`https://locobss-privacy-clientside.s3.eu-central-1.amazonaws.com/zensus_ror250/SN_ROR_${rorMatch[0].properties.SN_ROR}.geojson`)
        .then((res) => {
          return res.text();
        })
        .then((txt) => {
          const csv = txt.split('\n').map((row) => row.split(';'));
          zensusColumns = csv[0];
          zensus = csv.filter((row, ri) => ri > 0);
          getZensus();
        });
    } else {
      getZensus();
    }
  } else {
    zensusMatch = [];
  }

</script>

<LocatorMap bind:position={position} />
<div class="result zensus" class:has_result={zensusMatch !== null && zensusMatch.length > 0}>
  {#if zensusMatch !== null && zensusMatch.length > 0}
  <table>
    <tbody>
    {#each zensusColumns as column, index}
      {#if column !== 'geojson'}
        <tr><th>{$_(column)}</th><td>{(column in zensusDef) ? ((zensusMatch[0][index] in zensusDef[column]) ? zensusDef[column][zensusMatch[0][index]] : zensusMatch[0][index]) : zensusMatch[0][index]}</td></tr>
      {/if}
    {/each}
    </tbody>
  </table>
  {:else}
    {$_('map_explanation_2')}
  {/if}
</div>

<style lang="scss">
  table {
    margin: 0 auto;
    text-decoration: none;
  }
  th {
    font-weight:700;
    text-align: right;
    padding-right:3px;
  }
  td {
    padding-left:3px;
    text-align:left;
  }
</style>