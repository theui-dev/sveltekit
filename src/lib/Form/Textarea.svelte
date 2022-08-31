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
  export let label  : string|undefined = undefined
  export let name   : string
  export let value  : any = ''

  let C:INPUT_CONFIG_TYPE = {rounded : 'md', inputGrow: true, size: 'md', variant: 'bordered' }
  Object.assign(C, ctx?.formConfig||{}, config)

  let cls = getInputClass(C, $$restProps) + getStyle(C?.variant) + getSize(C?.size)
  let id = token()
</script>

<div class={getContainerClass(C)}>
  {#if label}<Label labelStyle={config.labelStyle} labelFor={id} label={label}/>{/if}
  <textarea {...$$restProps} class={$$props.class ? $$props.class : cls} {id} {name} bind:value
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
  ></textarea>
</div>