<script lang='ts'>
  import type { INPUT_CONFIG_TYPE } from "theui/types"
  import { rounded, token, roundedFileBtn } from "theui"
  import { getContext } from "svelte"
  import { FORM       } from "../index"
  import { Label      } from "../index"
  const ctx = getContext( FORM || {} )
  import { getContainerClass, getFileInputCls, getSize, getStyle } from "./controller"

  // Input attributes
  export let id           : string = token()
  export let name         : string
  export let value        : string = ''
  export let label        : string|boolean = false
  export let buttonStyle  : string|undefined = ' file:mr-4 file:bg-brand/10 file:text-brand-active file:font-medium cursor-pointer file:border-0'
  export let labelStyle   : string|undefined = undefined
  export let config       : INPUT_CONFIG_TYPE = {}

  let C:INPUT_CONFIG_TYPE = {rounded : 'md', inputGrow: true, size: 'md', variant: 'bordared', buttonStyle }
  Object.assign(C, ctx?.formConfig||{}, config)

  // let cls = getFileInputCls(C, $$restProps) + getSize(C?.size, true) + C.buttonStyle

  let fileBtnClass = (config:INPUT_CONFIG_TYPE) => {
    if(C.rounded == "none") return ''
    else{
      if(C.variant === 'flat') return roundedFileBtn('full') + rounded('full')
      return rounded(C.rounded) + roundedFileBtn(C.rounded)
    }
  }
  console.table(C)
</script>

<div class={getContainerClass(C)}>
  {#if label}<Label style={C.labelStyle||labelStyle} {id} label={label}/>{/if}
  <input {...$$restProps} class="{$$props.class ? $$props.class : getFileInputCls(C, $$restProps)}{fileBtnClass()}" {id} {name} type="file" bind:value
    on:blur
    on:change
    on:click
    on:focus
    on:mouseover
    on:mouseenter
    on:mouseleave
  />
  <slot name="helper" />
</div>

<style lang="postcss">
  :global(input){
    @apply outline-transparent ring-transparent border-transparent;
  }
</style>