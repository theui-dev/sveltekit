<script lang='ts'>
  import type { INPUT_CONFIG_TYPE } from "theui/types"
  import { token      } from "theui"
  import { getContext } from "svelte"
  import { FORM       } from "../index"
  import { Label      } from "../index"
  const ctx = getContext( FORM || {} )
  import { getContainerClass, getInputClass, getSize, getStyle } from "./controller"

  // Input attributes
  export let config : INPUT_CONFIG_TYPE = {}
  export let id     :string = token()
  export let label  : string|undefined = undefined
  export let name   : string
  export let type   : string = 'text'
  export let value  : any = ''
  export let labelStyle  : string|undefined = undefined

  let C:INPUT_CONFIG_TYPE = {rounded : 'md', inputGrow: true, size: 'md', variant: 'bordered' }
  Object.assign(C, ctx?.formConfig||{}, config)

  let cls = getInputClass(C, $$restProps) + getStyle(C?.variant) + getSize(C?.size)
  let setType = (node) => node.type = type
</script>

<div class={getContainerClass(C)}>
  {#if label}<Label style={C.labelStyle||labelStyle} {id} label={label}/>{/if}
  <input {...$$restProps} class={$$props.class ? $$props.class : cls} {id} {name} use:setType bind:value
    on:blur
    on:change
    on:click
    on:focus
    on:keydown
    on:keypress
    on:keyup
    on:mouseover
    on:mouseenter
    on:mouseleave
    on:paste
  />
  <slot name="helper" />
</div>

<style lang="postcss">
  :global(input){
    @apply outline-transparent ring-transparent border-transparent;
  }
</style>