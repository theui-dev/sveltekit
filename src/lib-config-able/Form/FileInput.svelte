<script lang='ts'>
  import { Label } from '../index'
  import { token } from '../utility'
  import { containerCls, fileInputCls } from './controller'
  import type { FILE_INPUT_CONFIG } from '@theui/core/types'
  
  // Input attributes
  export let name   : string
  export let value  : string = ''
  export let attr   : object = {}
  export let label  : string|boolean = false
  export let config : FILE_INPUT_CONFIG = {}
  let id = token()
</script>

<div class={containerCls(config)}>
  {#if label}<Label labelStyle={config.labelStyle} labelFor={id} label={label}/>{/if}
  <input {id} class={fileInputCls(config, attr)} type="file" {name} {...attr} bind:value/>
</div>

<style lang="postcss">
  :global(input){
    @apply outline-transparent ring-transparent border-transparent;
  }
</style>