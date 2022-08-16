<script lang='ts'>
  import { Label } from '../index'
  import { token } from '../utility'
  import { containerCls, getInputCls, isSelected } from './controller'
  import type { INPUT_CONFIG, SELECT_DATA_TYPE } from '@theui/core/types'

  export let name   : string
  export let value  : string = ''
  export let attr   : object = {}
  export let label  : string|boolean = false
  export let config : INPUT_CONFIG = {}
  export let data   : SELECT_DATA_TYPE[] = []

  let id = token()
</script>

<div class={containerCls(config)}>
  {#if label}<Label labelStyle={config.labelStyle} labelFor={id} label={label}/>{/if}

  {#if attr?.readonly && data.lenth > 0}
    {#each data as d}
      {#if isSelected(d, value)}
        <input {id} class={getInputCls(config, attr)} type="text" {name} {...attr} bind:value/>
      {/if}
    {/each}
  {:else}
  <select {id} class={getInputCls(config, attr)} {name} {...attr} bind:value>
    {#if attr.placeholder}<option value='' disabled>{attr.placeholder}</option>{/if}
    {#if data.lenth > 0}
      {#each data as d}
        <option value={d.value||d.text||d} selected={isSelected(d, value)}>{d.text||d}</option>
      {/each}
    {:else}
      <slot/>
    {/if}
  </select>
  {/if}
</div>

<style lang="postcss">
  :global(select){
    @apply outline-transparent ring-transparent border-transparent;
  }
</style>