<script lang='ts'>
  import {onMount} from "svelte"
  export let size         : number = 1
  export let stroke       : boolean = false

  let focusable : boolean = true
  let viewBox : string = '0 0 16 16'
  let cls = "svg-icon shrink-0 " + {$$props?.class ? $$props.class : (stroke ? 'stroke-current fill-transparent' : 'fill-current')}
</script>

<svg
  {focusable}
  {viewBox}
  width='{size}rem' height='{size}rem'
  class={cls}
  {...$$restProps}
  class:stroke-icon={stroke}
  xmlns='http://www.w3.org/2000/svg'
  xmlns:xlink='http://www.w3.org/1999/xlink'>
  <slot />
</svg>