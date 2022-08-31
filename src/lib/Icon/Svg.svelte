<script lang='ts'>
  import {onMount} from "svelte"
  export let size         : number = 1
  export let stroke       : boolean = false

  let focusable : boolean = true
  let viewBox : string = '0 0 16 16'
</script>

<svg
  {focusable}
  {viewBox}
  width='{size}rem' height='{size}rem'
  class="svg-icon {$$props.class||( (stroke ? 'stroke-current fill-transparent' : 'fill-current') + ' shrink-0')}"
  {...$$restProps}
  class:strock-icon={stroke}
  xmlns='http://www.w3.org/2000/svg'
  xmlns:xlink='http://www.w3.org/1999/xlink'>
  <slot />
</svg>