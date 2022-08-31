<script lang="ts">
  import { ROUNDED_TYPE } from 'theui/types'
  import { rounded } from 'theui'
	import { Close } from '../index'

  export let round  : ROUNDED_TYPE = 'full'
  export let fill   : boolean = true
  export let imgUrl : string | undefined = undefined
  export let close  : boolean = true
  export let size   : 'sm' | 'md' | 'lg' = 'md'
  export let text   : string = ''

	let nodeRef
  let getClasses = (fill) => $$props.class ? $$props.class : (fill ? 'text-gray-500 bg-gray-200 dark:bg-gray-700 dark:text-gray-300 font-semibold text-sm' : 'border border-gray-300')
  let imgSize = (s) => {
    if(s == 'sm') return 'w-9 h-9'
    if(s == 'md') return 'w-11 h-11'
    if(s == 'lg') return 'w-14 h-14'
  }
  const hideChips = () => nodeRef.parentNode.removeChild(nodeRef)
</script>

<span class="pr-4 flex items-center w-max gap-4 cursor-pointer active:bg-gray-300 transition duration-300 ease shadow {getClasses(fill)}{rounded(round)}" class:pl-4={!imgUrl} class:py-2={!imgUrl} bind:this={nodeRef}>
  {#if imgUrl}<img class="max-w-none {imgSize(size)}{rounded(round)}" alt="A" src={imgUrl}>{/if}
  {#if $$slots.text}<slot name="text" />
  {:else}{@html text}{/if}
  {#if close}
    <button class="opacity-75 hover:opacity-100 transition-opacity" on:click={hideChips} aria-label="Close">
      <Close size="1.5" />
    </button>
  {/if}
</span>
