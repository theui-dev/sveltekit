<script lang="ts">
  import type { ROUNDED_TYPE } from "theui/types"
  import { token      } from "theui"
  import { getContext } from "svelte"
  import { FORM       } from "../index"
  import { Label      } from "../index"
  import { getCheckRadioClass, getCheckRadioStateClass } from "./controller"
  const ctx = getContext( FORM || {} )

  export let rounded    : ROUNDED_TYPE = 'sm'
  export let size       : 'none' | 'sm' | 'md' | 'lg' = 'md'
  export let id         : string = token()
  export let name       : string
  export let label      : string = ''
  export let helperText : string|undefined = undefined
  export let value      : any = ''

  let C = {}
  Object.assign(C, ctx?.formConfig||{}, {rounded, size})
</script>

<label for={id} class="flex gap-x-4 {getCheckRadioStateClass($$restProps)}" class:items-center={C?.size!='lg'} class:items-start={C?.size=='lg'}>
  <input {...$$restProps} class={getCheckRadioClass(C)} {id} {name} type="checkbox" bind:value>
  {@html label}
</label>

{#if $$slots.helperText}
  <slot name="helperText" />
{/if}

{#if !$$slots.helperText && helperText}
  <p class="text-sm text-gray-500 font-normal {getCheckRadioStateClass($$restProps)}" class:pl-8={C?.size=='sm'} class:pl-10={C?.size=='md'} class:pl-12={C?.size=='lg'}>{@html helperText}</p>
{/if}
