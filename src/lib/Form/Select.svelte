<script lang='ts'>
  import type { INPUT_CONFIG_TYPE, SELECT_DATA_TYPE } from "theui/types"
  import { token        } from "theui"
  import { getContext   } from "svelte"
  import { FORM         } from "../index"
  import { Input, Label } from "../index"
  import { getContainerClass, getInputClass, getSize, getStyle } from "./controller"
  const ctx = getContext(FORM || {})

  // Input attributes
  export let config     : INPUT_CONFIG_TYPE = {}
  export let id         : string = token()
  export let label      : string|undefined = undefined
  export let name       : string
  export let value      : any = ''
  export let labelStyle : string|undefined = undefined
  export let data       : SELECT_DATA_TYPE[] = []
  
  let C:INPUT_CONFIG_TYPE = {rounded : 'md', inputGrow: true, size: 'md', variant: 'bordered'}
  Object.assign(C, ctx?.formConfig||{}, config)

  let cls = getInputClass(C, $$restProps) + getStyle(C?.variant) + getSize(C?.size)
</script>

<div class={getContainerClass(C)}>
  {#if label}<Label style={C.labelStyle||labelStyle} {id} label={label}/>{/if}
  {#if $$restProps.readonly ||  $$restProps.disabled}
    {#if data.length > 0 && value == ''}
      {#each data as d}
        {#if d.selected}<Input class={$$props.class ? $$props.class : cls} {id} {name} readonly value={d?.value||d?.text}/>{/if}
      {/each}
    {/if}
    {#if value != ''}<Input class={$$props.class ? $$props.class : cls} {id} {name} readonly {value}/>{/if}
  {:else}
    <select class={$$props.class ? $$props.class : cls} {...$$restProps} {id} {name} bind:value on:change on:click on:focus>
      {#if $$restProps.placeholder}<option value='' disabled>{$$restProps.placeholder}</option>{/if}
      {#if data.length > 0}
        {#each data as d}
          <option value={d.value||d.text||d} selected={d?.selected || value == d.value} disabled={d?.disabled}>{d.text||d}</option>
        {/each}
      {:else}
        <slot/>
      {/if}
    </select>
  {/if}
  <slot name="helper" />
</div>

<style lang="postcss">
  :global(select){
    @apply outline-transparent ring-transparent border-transparent;
  }
</style>