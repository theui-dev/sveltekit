<script lang='ts'>
  import type { ROUNDED_TYPE, BREADCRUMB_DATA_TYPE } from '@theui/core/types'
  import {rounded} from '../utility'

  export let activeColor : string = 'text-gray-500'
  export let data : Array<BREADCRUMB_DATA_TYPE> = []
  export let linkColor : string = 'text-brand'
  export let reset : boolean = false
  export let round : ROUNDED_TYPE = 'md'
  export let separator : string = '/'
</script>

<nav aria-label='breadcrumb'
  class="breadcrumb {$$props.class||''}{rounded(round)}">
  <ol class='breadcrumb flex'>
    {#each data as item, i}
      <li class='breadcrumb-item {reset?'':'before:text-gray-400/50'} {(data.length == i+1) ? activeColor : ""}' class:before:pr-2={i!=0} class:before:pl-2={i!=0} class:active={!item.url} style="--breadcrumb-separator: '{separator}';">
        {#if !item.url || item.active}
          {item.text}
        {:else}
          <a href={item.url} class={linkColor}>{item.text}</a>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style lang='postcss'>
  .breadcrumb .breadcrumb-item:not(:first-child)::before {
    content: var(--breadcrumb-separator);
  }
</style>