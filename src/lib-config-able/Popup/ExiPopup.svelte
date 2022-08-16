<script lang="ts">
  import {onMount} from "svelte"
  import { getConfig, rounded } from '../utility'
  import { THEUI_CONFIG } from '../config'
  import type { ROUNDED_TYPE } from '@theui/core/types'

  export let backDrop         : boolean = true
  export let backDropClasses  : string = 'bg-black/50'
  export let containerClasses : string = 'flex items-center justify-center z-40'
  export let contentClasses   : string = 'bg-white dark:bg-gray-800 max-w-3xl max-h-screen grid overflow-y-auto relative p-8'
  export let repeat           : boolean | 'page' = false
  export let roundedCorner    : ROUNDED_TYPE = getConfig('isRounded') ? 'xl' : false

  let popup = false
  onMount(() => {
    const onMouseOut = (event) => {
      if(event.clientY < 50 && event.relatedTarget == null && event.target.nodeName.toLowerCase() !== 'select') {
        if(repeat === false){
          if(localStorage.getItem('exitPopUp')) return
          localStorage.setItem('exitPopUp', true)
        }
        if(repeat === 'page'){
          document.removeEventListener("mouseout", onMouseOut)
          let epData = JSON.parse(localStorage.getItem('exitPopUp'))
          if(epData){
            if(!epData.includes(window.location.href)){
              epData.push(window.location.href)
              localStorage.setItem('exitPopUp', JSON.stringify(epData))
            }
            else return
          }
          else{
            localStorage.setItem('exitPopUp', JSON.stringify([window.location.href]))
          }
        }
        popup = true
      }
    }
    document.addEventListener("mouseout", onMouseOut)
  })

	let handleKeyboard = (e) => {
		if (e.keyCode == 27){
      e.preventDefault()
      popup = false
    }
		return
	}
</script>

<svelte:body on:keydown={(e)=>handleKeyboard(e)}></svelte:body>
{#if popup}
<div class="fixed inset-0 {containerClasses}">
  {#if backDrop}<div class="back-drop fixed inset-0 {backDropClasses}" on:click={()=>popup = false}></div>{/if}
  <div class="content {contentClasses} {rounded(roundedCorner)} ">
    <slot />
  </div>
</div>
{/if}