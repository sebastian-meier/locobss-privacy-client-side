<script lang="ts">
  export let title: string = '';
  export let message: string = '';
  export let buttons: {
    label: string;
    callback: () => void;
  }[] = [];
  export let show: boolean = true;
</script>

{#if show}
<div class="modal-container">
  <div class="modal-content">
    <span class="modal-title">{title}</span>
    <p class="modal-message">{message}</p>
    {#if buttons.length > 0}
    <div class="modal-buttons">
    {#each buttons as button}
      <button on:click={() => { show = false; button.callback(); }}>{button.label}</button>
    {/each}
    </div>
    {/if}
  </div>
</div>
{/if}