<script lang="ts">
  import type { POPUP_CONFIG_TYPE, ROUNDED_TYPE } from '@theui/core/types'
  import { onMount } from "svelte"
  import { rounded } from '../utility'

  export let config           : POPUP_CONFIG_TYPE = {}
  export let event            : 'entry' | 'exit' = 'entry'
  export let repeat           : boolean | 'page' = true

  let C: POPUP_CONFIG_TYPE = {
    animate         : true,
    backdrop        : true,
    backDropClass   : 'bg-black/50',
    containerClass  : 'flex items-center justify-center',
    contentClass    : 'bg-white dark:bg-gray-800 max-w-3xl max-h-screen p-8',
    rounded         : 'xl',
    staticBackdrop  : false,
  }
  Object.assign(C, config)

  let popup = false

  onMount(() => {
    if(event == 'entry'){
      const onPageLoad = () => {
        if(repeat === false){
          if(localStorage.getItem('entryPopUp')) return
          localStorage.setItem('entryPopUp', true)
        }
        if(repeat === 'page'){
          let epData = JSON.parse(localStorage.getItem('entryPopUp'))
          if(epData){
            if(!epData.includes(window.location.href)){
              epData.push(window.location.href)
              localStorage.setItem('entryPopUp', JSON.stringify(epData))
            }
            else return
          }
          else{
            localStorage.setItem('entryPopUp', JSON.stringify([window.location.href]))
          }
        }
        popup = true
      }
      onPageLoad()
    }
    if(event == 'exit'){
      const onMouseOut = (e) => {
        if(e.clientY < 50 && e.relatedTarget == null && e.target.nodeName.toLowerCase() !== 'select') {
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
    }
  })

	let handleKeyboard = (e) => {
		if (e.keyCode == 27){
      e.preventDefault()
      popup = false
    }
		return
	}

  let handleBackbrop = () => {
		if (C.staticBackdrop === false){
      popup = false
    }
		return
  }
</script>

<svelte:body on:keydown={(e)=>handleKeyboard(e)}></svelte:body>

{#if popup}
<div class="popup fixed inset-0 overflow-y-hidden {C.containerClass}" role='dialog'>
  {#if C.backdrop}<div class="back-drop fixed inset-0 {C.backDropClass}" on:click={()=>handleBackbrop()}></div>{/if}
  <div class="content overflow-y-auto relative {C.contentClass} {rounded(C.rounded)} ">
    <slot />
  </div>
</div>
{/if}