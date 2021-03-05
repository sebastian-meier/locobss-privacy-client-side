<script lang="typescript">
  import Loader from '../components/Loader.svelte';
  import ClimateZones from '../components/LocatorMaps/ClimateZones.svelte';
  import Zensus from '../components/LocatorMaps/Zensus.svelte';
  import TownHalls from '../components/LocatorMaps/TownHalls.svelte';
  import Supermarkets from '../components/LocatorMaps/Supermarkets.svelte';
  import { load } from '../../stores/data';
  import SpatialUnit from '../components/SpatialUnit.svelte';
  import Geolocation from '../components/Geolocation.svelte';
  import { _ } from 'svelte-i18n';

  let loaded = false;
  load().then(() => {
    loaded = true;
  }).catch((err) => {
    console.log(err);
  });

</script>

<h1>{@html $_('h1')}</h1>
<h2>{$_('h2')}</h2>
<span class="subline">{@html $_('subline')}</span>

<p class="intro">{@html $_('intro')}</p>

<h3>{$_('ch1_h3')}</h3>
<p>{@html $_('ch1_p1')}</p>
<div class="columns" style="margin: 30px 0;">
  <div>
    <strong>{$_('ch1_eg1_from')} &rarr; {$_('ch1_eg1_to')}</strong><br />
    <select style="margin-top:5px;">
      <option>{$_('please_choose')}</option>
      <option>&lt; 6</option>
      <option>6 - &lt;12</option>
      <option>12 - &lt;18</option>
      <option>18 - &lt;24</option>
      <option>24 - &lt;35</option>
      <option>35 - &lt;45</option>
      <option>45 - &lt;65</option>
      <option>65 &gt;=</option>
    </select>
  </div>
  <div class="gap"></div>
  <div>
    <strong>{$_('ch1_eg2_from')} &rarr; {$_('ch1_eg2_to')}</strong><br />
    <select style="margin-top:5px;">
      <option>{$_('please_choose')}</option>
      <option>Baden-Württemberg</option>
      <option>Bayern</option>
      <option>Berlin</option>
      <option>Brandenburg</option>
      <option>Bremen</option>
      <option>Hamburg</option>
      <option>Hessen</option>
      <option>Mecklenburg-Vorpommern</option>
      <option>Niedersachsen</option>
      <option>Nordrhein-Westfalen</option>
      <option>Rheinland-Pfalz</option>
      <option>Saarland</option>
      <option>Sachsen-Anhalt</option>
      <option>Sachsen</option>
      <option>Schleswig-Holstein</option>
      <option>Thüringen</option>
    </select>
  </div>
</div>
<p>{@html $_('ch1_p2')}</p>

<h3>{$_('ch2_h3')}</h3>
<p>{@html $_('ch2_intro')}</p>

<h4>{$_('ch2_h4_1')}</h4>
<p>{@html $_('ch2_p1')}</p>
{#if !loaded}
<Loader />
{:else}
<SpatialUnit />
{/if}
<p class="technote"><strong>{$_('tech_note')}</strong> {@html $_('ch2_t1')}</p>

<h4>{$_('ch2_h4_2')}</h4>
<p>{@html $_('ch2_p2')}</p>

<span class="demo-title">Demo: {$_('ch2_demo_title_1')}</span>
{#if !loaded}
<Loader />
{:else}
<ClimateZones />
{/if}
<p class="technote" style="margin-top:30px;"><strong>{$_('tech_note')}</strong> {@html $_('ch2_t2')}</p>

<p style="padding-top:20px;">{@html $_('ch2_p2_1')}</p>
<Geolocation />

<h4>{$_('ch2_h4_7')}</h4>
<p>{@html $_('ch2_p7')}</p>

<h4>{$_('ch2_h4_4')}</h4>
<p>{@html $_('ch2_p4')}</p>
<span class="demo-title">Demo: {$_('ch2_demo_title_2')}</span>
{#if !loaded}
<Loader />
{:else}
<Zensus />
{/if}
<p class="technote" style="margin-top:30px;"><strong>{$_('tech_note')}</strong> {@html $_('ch2_t4')}</p>

<h4>{$_('ch2_h4_5')}</h4>
<p>{@html $_('ch2_p5')}</p>
<span class="demo-title">Demo: {$_('ch2_demo_title_3')}</span>
{#if !loaded}
<Loader />
{:else}
<TownHalls />
{/if}
<p style="padding-top:30px;">{@html $_('ch2_p5_1')}</p>
<span class="demo-title">Demo: {$_('ch2_demo_title_4')}</span>
{#if !loaded}
<Loader />
{:else}
<Supermarkets />
{/if}
<p class="technote" style="margin-top:30px;"><strong>{$_('tech_note')}</strong> {@html $_('ch2_p6')}</p>

<h3>{$_('ch3_h3')}</h3>
<p>{@html $_('ch3_intro')}</p>
<h4>{$_('ch3_h4_2')}</h4>
<p>{@html $_('ch3_p2')}</p>
<div class="columns vcenter">
  <div>
    <figure>
      <img class="attrakdiff" src="assets/images/attrakdiff-q.png" alt="1. von 3 Fragebögen" />
      <figcaption>{@html $_('ch3_caption_1')}</figcaption>
    </figure>
  </div>
  <div class="gap"></div>
  <div>
    <figure>
      <img class="attrakdiff" src="assets/images/attrakdiff.png" alt="Attrakdiff Einzelauswertung" />
      <figcaption>{@html $_('ch3_caption_2')}</figcaption>
    </figure>
  </div>
</div>
<h4>{$_('ch3_h4_1')}</h4>
<p style="padding-bottom:20px;">{@html $_('ch3_p1')}</p>
<figure>
  <img class="attrakdiff" src="assets/images/sinus.png" alt="SINUS Milieus" />
  <figcaption>{@html $_('ch3_caption_3')}</figcaption>
</figure>


<h3>{$_('chA_h3')}</h3>
<p style="padding-bottom:10px;">{@html $_('chA_p1')}</p>
<p>{@html $_('chA_p2')}</p>