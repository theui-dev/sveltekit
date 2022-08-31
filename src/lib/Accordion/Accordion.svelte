<script lang='ts'>
  import type { ACCORDION_CONFIG_TYPE } from '@theui/core/types'
  import { animate, rounded, token } from '../utility'
  import { activeAccordionID } from '../Stores'

  export let data: {title: string, content: string}|null = null
  export let isOpen: boolean = false
  export let config: ACCORDION_CONFIG_TYPE = {}

  let C: ACCORDION_CONFIG_TYPE = {
    animate               : true,
    animateSpeed          : 'fast',
    containerClass        : 'mb-4',
    containerActiveClass  : 'mb-4',
    contentActiveClass    : {
      'default' : 'border border-gray-300 dark:border-gray-700 bg-primary',
      'flush'   : 'border-b border-gray-300 dark:border-gray-700 bg-primary'
    },
    contentClass    : {
      'default' : 'border border-gray-300 dark:border-gray-700 bg-primary',
      'flush'   : 'border-b border-gray-300 dark:border-gray-700 bg-primary'
    },
    titleActiveClass      : {
      'default' : 'border border-brand bg-brand text-on-brand',
      'flush'   : 'border-b border-brand bg-brand/10 text-brand dark:text-on-brand'
    },
    titleClass            : {
      'default' : 'border border-gray-300 dark:border-gray-700 bg-primary',
      'flush'   : 'border-b border-gray-300 dark:border-gray-700 bg-primary'
    },
    variant        : 'default',
  }

  let id = token()
  Object.assign(C, config)

  let toggle = (id: string) => {
    if($activeAccordionID!=''){
      let accordions = document.querySelectorAll('.accordion-body')
      accordions.forEach(accordion => {
        if(C?.animate) accordion.style.height = 0
      })
    }
    if($activeAccordionID==id){
      activeAccordionID.update(v => '')
      return
    }else{
      let element = document.getElementById(id);
      activeAccordionID.set(id)
      if(C?.animate) element.style.height = (element.scrollHeight + 20) + 'px'
    }
  }

  if (isOpen) activeAccordionID.set(id)

  let getContainerClasses = (active_ID) => {
    let cls = 'accordion ' + (C?.variant=='flush' ? 'accordion-flush ' : 'accordion-default ') +
              (C?.size == 'compact' ? 'space-compact' : (C?.size == 'large' ? 'space-large' : 'space-default'))
    if(active_ID == id){
      return cls + ' accordion-active overflow-hidden ' + (C?.containerActiveClass[C?.variant] || C?.containerActiveClass || '')
    }else{
      return cls + ' ' + (C?.containerClass[C?.variant] || C?.containerClass || '')
    }
    return ''
  }

  let getTitleClasses = (active_ID) => {
    let cls = 'accordion-title flex justify-between items-center w-full '
    if(active_ID==id){
      return cls + rounded(C?.rounded, 'top') + ' ' + (C?.titleActiveClass[C?.variant] || C?.titleActiveClass || '')
    }else{
      return cls + (C?.variant == 'default' ? rounded(C?.rounded) : rounded(C?.rounded, 'top')) + ' ' +
              (C?.titleClass[C?.variant] || C?.titleClass || '')
    }
    return ''
  }

  let getContentClasses = (active_ID) => {
    let cls = 'accordion-content h-full ' + (C?.variant == 'default' ? rounded(C?.rounded, 'bottom') : '') + ' '
    if(active_ID==id){
      return cls + (C?.contentActiveClass[C?.variant] || C?.contentActiveClass || '') 
    }else{
      return cls + (C?.contentClass[C?.variant] || C?.contentClass || '')
    }
    return ''
  }
</script>

<div class={getContainerClasses($activeAccordionID)}>
  <div
    id='{id}Heading'
    class='accordion-title'
    aria-controls={id}
    aria-label={data?.title}
    aria-expanded={$activeAccordionID==id}
  >
    <button
      class={getTitleClasses($activeAccordionID)}
      class:accordion-active={$activeAccordionID==id}
      on:click={()=>toggle(id)}>
      {#if $$slots.title}<slot name="title"></slot>
      {:else}{data?.title||""}{/if}
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" class:transition-transform={C?.animate} class:transform={!C?.animate} class:-rotate-180={$activeAccordionID==id} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </div>

  <div
    {id}
    class='accordion-body{animate(C?.animateSpeed, C?.animate)}'
    aria-labelledby='{id}Heading'
    aria-hidden={$activeAccordionID!=id}
    class:accordion-close={$activeAccordionID!=id}
  >
    <div class={getContentClasses($activeAccordionID)}>
      {#if $$slots.content}<slot name="content"></slot>
      {:else}{@html data?.content||""}{/if}
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