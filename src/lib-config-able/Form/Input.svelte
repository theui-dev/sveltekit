<script lang='ts'>
  import { Label } from '../index'
  import { token } from '../utility'
  import { containerCls, getInputCls } from './controller'
  import type { INPUT_CONFIG, INPUT_TYPE } from '@theui/core/types'
  
  // Input attributes
  export let name   : string
  export let type   : INPUT_TYPE = 'text'
  export let value  : string = ''
  export let attr   : object = {}
  export let label  : string|boolean = false
  export let config : INPUT_CONFIG = {}

  let setType = (node) => node.type = type
  let id = token()
</script>

<div class={containerCls(config)}>
  {#if label}<Label labelStyle={config.labelStyle} labelFor={id} label={label}/>{/if}
  <input {id} class={getInputCls(config, attr)} use:setType {name} {...attr} bind:value/>
</div>

<style lang="postcss">
  :global(input){
    @apply outline-transparent ring-transparent border-transparent;
  }
</style>