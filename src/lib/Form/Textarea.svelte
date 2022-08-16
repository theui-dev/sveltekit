<script lang='ts'>
  import { Label } from '../index'
  import { token } from '../utility'
  import { containerCls, getInputCls } from './controller'
  import type { INPUT_CONFIG } from '@theui/core/types'
  
  // Input attributes
  export let name   : string
  export let value  : string = ''
  export let attr   : object = {}
  export let label  : string|boolean = false
  export let config : INPUT_CONFIG = {}
  export let id = token()
</script>

<div class={containerCls(config)}>
  {#if label}<Label labelStyle={config.labelStyle} labelFor={id} label={label}/>{/if}
  <textarea {id} class={getInputCls(config, attr)} {name} {...attr} bind:value></textarea>
</div>

<style lang="postcss">
  :global(textarea){
    @apply outline-transparent ring-transparent border-transparent;
  }
</style>