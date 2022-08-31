<script lang='ts'>
  import {onMount} from 'svelte'
  export let name         : string
  let packageName  : string = 'default'
  export let size         : number = 1
  export let focusable    : boolean = false
  export let viewBox      : string|undefined = '0 0 16 16'
  export let stroke       : boolean = false
  export let classes      : string = (stroke ? 'stroke-current' : 'fill-current') + ' shrink-0'
  export let path         : string|undefined = undefined
  
  let Icon
  if(name){
    let loadIcon = async () => {
      let importValue
      if(packageName === 'default')
        importValue = (await import(`./${packageName}/${name}.svelte`)).default
      Icon = importValue
    }
    Icon = loadIcon()
  }
</script>

<svg
  class={classes}
  class:strock-icon={stroke}
  {focusable} {viewBox}
  width='{(1 * size)||1}rem' height='{(1 * size)||1}rem'
  xmlns='http://www.w3.org/2000/svg'
  xmlns:xlink='http://www.w3.org/1999/xlink'>
  {#if name}
    {#await Icon then I}<svelte:component this={I}/>{/await}
  {/if}
  {#if !name && path} {@html path} {/if}
</svg>

<style lang="postcss">
  .strock-icon{
    fill: none;
  }
</style>