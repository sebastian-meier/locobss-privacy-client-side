<script lang="ts">
  import { _ } from 'svelte-i18n';
  import Modal from '../components/Modal.svelte';

  let supported = false;
  $: disabled = !supported;

  if ('geolocation' in navigator) {
    supported = true;
  }

  export let position: [number, number] | null;

  const locateMe = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          position = [pos.coords.longitude, pos.coords.latitude];
        },
        (err) => {
          console.log(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }
  }
</script>

<!-- <Modal title="Standort bestimmen" message="Um die Survey abzuschließen müssen wir deinen Standort bestimmen. Dein genauer Standort wird nicht an unseren Server übertragen. Basierend auf deinem Standort ermitteln wir, ob du in einem städtischen oder ländlichen Raum lebst." buttons={[{label: 'Fortfahren', callback: () => { console.log('ok'); }}, {label: 'Abbrechen', callback: () => { console.log('cancel'); }}]} /> -->
<div class="geolocation">
  <button on:click={locateMe} {disabled}>{$_('locate_me')}</button>
  <p class="message" class:has_result={position}>
  {#if !supported}
    {$_('geo_not_supported')}
  {:else if position}
    {@html $_('your_location', { 
      values: { 
        location: position.map((c) => c.toFixed(3)).join(', ')
      }
    })}
  {:else}
  {$_('locate_me_description')}
  {/if}
  </p>
</div>