<script lang="ts">
  import { token } from "../utility"
  import { getCheckRadioClass, getHeightFixClass } from './controller'
  import { Label } from '../index'
  import type { CHECKBOX_RADIO_CONFIG_TYPE } from "@theui/core/types"

  export let name       : string
  export let text       : string = ''
  export let helperText : string = null
  export let value      : any = ''
  export let checked    : boolean = false
  export let attr       : object = {}
  export let config     : CHECKBOX_RADIO_CONFIG_TYPE = {}

  let id = token()
</script>

<div class="flex gap-2">
  <div class="flex items-center {getHeightFixClass(config, helperText)}">
    <input class={getCheckRadioClass(config)} {id} {name} {...attr} {checked} type="checkbox" bind:value>
  </div>
  <div class="flex flex-col text-sm font-medium">
    <label for={id}>
      {@html text} {value}
      {#if helperText}<p class="text-xs text-gray-500 font-normal">{@html helperText}</p>{/if}
    </label>
  </div>
</div>