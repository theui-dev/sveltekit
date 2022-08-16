<script lang="ts">
  import { Label } from '../index'
  import { token } from '../utility'
  import type { LABEL_STYLE_TYPE } from '@theui/core/types'

  export let cls    : string = ''
  export let label  : string = ''
  export let config : LABEL_STYLE_TYPE = ''

let id = token()
</script>

<fieldset>
	<legend class="sr-only">{label}</legend>
  {#if label}<Label labelStyle={config.labelStyle} labelFor={id} label={label}/>{/if}
  <div class={cls}>
    <slot/>
  </div>
</fieldset>