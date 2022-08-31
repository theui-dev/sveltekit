<script context="module">
	export const FORM = {}
</script>

<script lang='ts'>
	import { setContext, onDestroy } from "svelte"
  import { token } from "theui"
  
  // Input attributes
  export let id : string = token()
  export let inputGrow : boolean = true
  export let reset : boolean = false
  export let size : 'none' | 'sm' | 'md' | 'lg' | 'xl' = 'md'
  export let variant : 'filled' | 'bordered' | 'flat' = 'bordered'
  export let labelStyle  : string|undefined = undefined

  setContext(FORM, {formConfig: {variant, inputGrow, size, labelStyle, reset}, formID: id})
</script>

<form method="POST" {...$$restProps} class={$$restProps.class ? $$restProps.class : "flex flex-col gap-4"} on:submit>
  <slot/>
</form>