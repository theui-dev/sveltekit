<script lang='ts'>
  import type { ACCORDION_CONFIG_TYPE } from '@theui/core/types'
  import { ACCORDION_CONFIG } from '../config'
  import { animate, rounded, getConfig, token } from '../utility'
  import { activeAccordionID } from '../Stores'

  export let data: {title: string, content: string}
  export let config: ACCORDION_CONFIG_TYPE = {}

  let id = token()
  let C: any = {}
  Object.assign(C, $ACCORDION_CONFIG, config)

  let toggle = (id: string) => {
    if($activeAccordionID!=''){
      let accordions = document.querySelectorAll('.accordion-body')
      accordions.forEach(accordion => {
        if(getConfig('animate')) accordion.style.height = 0
      })
    }
    if($activeAccordionID==id){
      activeAccordionID.update(v => '')
      return
    }else{
      let element = document.getElementById(id);
      activeAccordionID.set(id)
      if(getConfig('animate')) element.style.height = (element.scrollHeight + 20) + 'px'
    }
  }

  $: containerClasses = ($activeAccordionID==id ? 'accordion-active overflow-hidden' : '') + ' ' + size(C?.size||'default') + (C?.type=='flush' ? ' accordion-flush ' : ' accordion-default ') + ($activeAccordionID==id ? (C?.containerActiveClass ? C?.containerActiveClass[C?.type] || C?.containerActiveClass : '') : (C?.containerClass ? C?.containerClass[C?.type] || C?.containerClass : ''))
  $: titleClasses = ($activeAccordionID==id ? rounded(C?.rounded, 'top') : (C?.type == 'default' ? rounded(C?.rounded) : rounded(C?.rounded, 'top'))) + ' flex justify-between items-center w-full ' + ($activeAccordionID==id ? (C?.titleActiveClass ? C?.titleActiveClass[C?.type] || C?.titleActiveClass : '') : (C?.titleClass ? C?.titleClass[C?.type] || C?.titleClass : ''))
  $: bodyClasses = animate(C?.animateSpeed||getConfig('animateSpeed'), getConfig('animate'))
  $: contentClasses = (C?.type == 'default' ? rounded(C?.rounded, 'bottom') + ' ' : '') + ($activeAccordionID==id ? (C?.contentActiveClass ? C?.contentActiveClass[C?.type] || C?.contentActiveClass : '') : (C?.contentClass ? C?.contentClass[C?.type] || C?.contentClass : ''))
  let size = (size: string): string => size=='compact' ? 'space-compact' : size=='large' ? 'space-large' : 'space-default'

</script>

<div class='accordion {containerClasses}'>
  <div
    id='{id}Heading'
    class='accordion-title'
    aria-controls={id}
    aria-label={data.title}
    aria-expanded={$activeAccordionID==id}
  >
  <!-- class={getTitleClasses(config)} -->
    <button
      class={titleClasses}
      class:accordion-active={$activeAccordionID==id}
      on:click={()=>toggle(id)}>
      {#if $$slots.title}<slot name="title"></slot>
      {:else}{data.title||""}{/if}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" class:transition-transform={getConfig('animate')} class:transform={!getConfig('animate')} class:-rotate-180={$activeAccordionID==id} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </div>

  <div
    {id}
    class='accordion-body {bodyClasses}'
    aria-labelledby='{id}Heading'
    aria-hidden={$activeAccordionID!=id}
    class:accordion-close={$activeAccordionID!=id}
  >
    <div class='accordion-content h-full {contentClasses}'>
      {#if $$slots.content}<slot name="content"></slot>
      {:else}{@html data.content||""}{/if}
    </div>
  </div>
</div>

<style lang='postcss'>
  .accordion.space-compact:not(.accordion-flush) .accordion-title button, .accordion.space-compact .accordion-content{
    @apply p-3;
  }
  .accordion.space-compact.accordion-flush .accordion-title button{
    @apply py-3 px-2;
  }
  .accordion.space-default:not(.accordion-flush) .accordion-title button, .accordion.space-default .accordion-content{
    @apply p-4;
  }
  .accordion.space-default.accordion-flush .accordion-title button{
    @apply py-4 px-3;
  }
  .accordion.space-large:not(.accordion-flush) .accordion-title button, .accordion.space-large .accordion-content{
    @apply p-5;
  }
  .accordion.space-large.accordion-flush .accordion-title button{
    @apply py-5 px-3;
  }
  .accordion.space-default.accordion-flush .accordion-content{
    @apply py-3;
  }
  .accordion.space-default.accordion-flush .accordion-content{
    @apply py-4;
  }
  .accordion.space-large.accordion-flush .accordion-content{
    @apply py-5;
  }
  .accordion-body{
    @apply overflow-hidden;
  }
  .accordion-body.accordion-close {
    @apply h-0;
  }
</style>