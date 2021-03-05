<script lang="ts">
  import { loaded, postcodeDense } from '../../stores/data';
  import { _ } from 'svelte-i18n';
  import Loader from './Loader.svelte';

  const checkInput = () => {
    noPostcode = false;
    goodPostcode = false;
    result = null;
    if (postcode.length === 0) {
      noPostcode = true;
    } else if( postcode.length >= 4) {
      if (parseInt(postcode) in $postcodeDense) {
        goodPostcode = true;
        result = $postcodeDense[parseInt(postcode)];
      }
    }
  };

  let postcode = '';
  let goodPostcode = false;
  let noPostcode = true;
  let result: null | 1 | 0 = null;

</script>

{#if $loaded}
<div id="spatialunit">
  <span class="title">Demo: {$_('dense_title')}</span>
  <input 
    type="text"
    class:good={goodPostcode}
    class:empty={noPostcode}
    bind:value={postcode}
    on:keyup={checkInput}
    placeholder={$_('enter_postcode')}
  />
  <p class="result" class:has_result={result!==null}>
    {#if result === null}
      {$_('please_enter_postcode')}
    {:else if result === 0}
      {@html $_('postcode_not_dense')}
    {:else if result === 1}
      {@html $_('postcode_dense')}
    {:else}
      Woopsi?!
    {/if}
  </p>
</div>
{:else}
<Loader />
{/if}

<style lang="scss">
  input{
    border: 1px solid saddlebrown;
    border-radius:3px;
    padding: 5px 10px;
    outline:none;
    background-color:rgba(0,0,0,0.1);
    &:focus{
      background-color:#fff;
    }
  }
  input.empty{
    border-color:rgb(100,100,100);
  }
  input.good{
    border-color:seagreen;
  }

  #spatialunit{
    padding-top:20px;
    text-align:center;
    .title{
      display:block;
      font-weight:700;
      padding-bottom:10px;
    }
  }
</style>