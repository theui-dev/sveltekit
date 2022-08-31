<script lang='ts'>
  import type { LABEL_STYLE_TYPE } from "theui/types"
  export let label: string|undefined = undefined
  export let id: string|undefined = undefined
  export let style: string|undefined = undefined
</script>

<label class={$$props.class ? $$props.class : style||'font-medium'} for={id}>
  {@html label}
  <slot/>
</label>
