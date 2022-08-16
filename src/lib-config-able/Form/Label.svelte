<script lang='ts'>
  import { labelClasses } from './controller'
  import type { LABEL_STYLE_TYPE } from '@theui/core/types'
  export let label: string|undefined = undefined
  export let labelFor: string|undefined = undefined
  export let labelStyle: LABEL_STYLE_TYPE = null
</script>

<label class={labelClasses(labelStyle)} for={labelFor}>{@html label}</label>
