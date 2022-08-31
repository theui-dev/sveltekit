<script lang='ts'>
  import { getConfig } from '../utility'
  import type { BREADCRUMB_DATA_TYPE } from '@theui/core/types'

  export let activeColor: string = 'text-gray-500'
  export let data: Array<BREADCRUMB_DATA_TYPE> = []
  export let reset: boolean = false
  export let separator: string = '/'
  export let space: 'compact' | 'default' | 'large' = 'default'
</script>

<nav aria-label='breadcrumb'
    class={$$props.class||'bg-tertiary text-brand hover:text-brand-active'}
    class:rounded-lg={getConfig('isRounded')}
    class:p-3={space=='compact'}
    class:p-4={space=='default'}
    class:p-5={space=='large'}
    >
  <ol class='breadcrumb flex'>
    {#each data as item, i}
      <li class='breadcrumb-item pl-2 before:pr-2 {reset?'':'before:text-gray-400/40'} {(data.length == i+1) ? activeColor : ""}' class:active={!item.url} style="--breadcrumb-separator: '{separator}';">
        {#if !item.url}
          {item.text}
        {:else}
          <a href={item.url}>{item.text}</a>
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