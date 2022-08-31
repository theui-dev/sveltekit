<script lang='ts'>
  import type { COLLAPSE_CONFIG_TYPE } from '@theui/core/types'
  import { collapseID } from '../Stores'
  import { token, animate } from '../utility'

  export let config           : COLLAPSE_CONFIG_TYPE = {}
  export let id               : string = token()
  export let label            : string = ''

  let C: COLLAPSE_CONFIG_TYPE = {animate : true, animateSpeed : 'fast'}
  Object.assign(C, config)
  let classes = animate(C?.animateSpeed, C?.animate)

  let toggleCollapse = (id: string) => {
    let element = document.getElementById(id)
    if ($collapseID.includes(id)) {
      let D = $collapseID.filter(i => i !== id)
			collapseID.update(d => D)
      if(C?.animate) element.style.height = 0
		} else {
      collapseID.update(d=> [...d, id])
      let height = element.scrollHeight
      if(C?.animate) element.style.height = height + 'px'
		}
  }
</script>

{#if $$slots.title}
<span class='collpase-title select-none' class:collapse-active-title={$collapseID.includes(id)} role='button' on:click={()=>toggleCollapse(id)} aria-controls={id} aria-expanded={$collapseID.includes(id)} aria-label={label} id='{id}Collapse'>
  <slot name='title'></slot>
</span>
{/if}

{#if $$slots.body}
<div {id} class='collapse-body overflow-hidden {classes}' class:invisible={!$collapseID.includes(id)} class:collapse-open={$collapseID.includes(id)} aria-labelledby='{id}Collapse' aria-hidden={!$collapseID.includes(id)}>
	<div>
		<slot name='body'></slot>
	</div>
</div>
{/if}

<style lang='postcss'>
  .collapse-body.invisible {
    @apply h-0;
  }
</style>