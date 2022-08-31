<script lang='ts'>
  import type { MODAL_CONFIG_TYPE } from '@theui/core/types'
	import { modalIdStore } from '../Stores'
  import { token, animate, rounded, getConfig } from '../utility'
  import { Close, Svg } from '../index'

  export let config: MODAL_CONFIG_TYPE = {}
  export let id: string = token()
	export let label: string = ''

  let C: MODAL_CONFIG_TYPE = {
    animate         : true,
    backdrop        : true,
    bodyClasses     : ' ',
    closeBtn        : true,
    closeOnEsc      : true,
    reset           : false,
    staticBackdrop  : false,
  }
  Object.assign(C, config)

	$: attr = {
		'id' : `${id}Btn`,
		'aria-label' : label,
		'aria-haspopup' : 'true',
		'aria-controls' : `${id}Modal`,
		'aria-expanded' : $modalIdStore.includes(id)
	}

  let toggle = ( closeBtn = true ) => {
    if($modalIdStore.includes(id) && (closeBtn || (!closeBtn && !C?.staticBackdrop))){
      modalIdStore.set( $modalIdStore.filter(i => i !== id) )
      return
    }
    modalIdStore.update(m=> [...m, id])
  }

	let handleKeyboard = (e) => {
		if ($modalIdStore.includes(id) && (C?.closeOnEsc && e.keyCode == 27)){
      e.preventDefault()
      modalIdStore.set( $modalIdStore.filter(i => i !== id) )
    }
		return
	}

  let modalBodyCls = () => {
    return  'modal' + modalSize() + modalPosition() + animateCls() + C?.bodyClasses + (C?.reset ? ' modal-reset' : '')
  }

  let modalSize = () => {
    let size: string = C?.size||'md'
    return ' ' + (size === 'sm' ? ' modal-sm' : size === 'lg' ? ' modal-lg' : size === 'full' ? ' modal-full' : ' modal-md')
  }

  let modalPosition = () => {
    let position: string = C?.position||'top'
    return  ' ' + (position === 'bottom' ? ' items-end' :
            position === 'center' ? ' items-center' :  ' items-start')
  }

  let animateCls = () => {
    return animate(C?.animateSpeed||'fast', C?.animate)
  }

  let animationCls = () => {
    return (C?.animate) ? C?.animation||'fade' : ''
  }

</script>

<svelte:body on:keydown={(e)=>handleKeyboard(e)}></svelte:body>

{#if $$slots.modalBtn}
  <span role='button' on:click={()=>toggle()}>
    <slot name='modalBtn' {attr} {label}></slot>
  </span>
{/if}

{#if $$slots.body}
  <div id='{id}Modal' class={modalBodyCls()} focuasable role='dialog'
    class:open={$modalIdStore.includes(id)}
    class:animate={C?.animate}>

    {#if C?.backdrop}
    <div class='backdrop fixed inset-0 bg-black z-[-1]{animateCls()}' on:click={()=>toggle(false)}></div>
    {/if}

    <div class='modal-content {C?.contentClasses||'bg-white dark:bg-secondary'}{animateCls()} {animationCls()} {C?.size !== 'full' ? rounded(C?.rounded||'lg') : ''}'
      aria-labelledby={$$slots.header ? `${id}Heading` : `${id}Btn`}
      aria-hidden={!$modalIdStore.includes(id)}
    >

      {#if $$slots.header}
        <div id='{id}Heading' class="modal-header flex justify-between w-full gap-8 items-start border-b border-black/10 dark:border-tertiary pb-4 mb-8">
          <slot name='header'></slot>
          {#if C?.closeBtn!==false}
          <button class="text-default flex-grow-0 opacity-25 hover:opacity-75 transition-opacity" on:click={()=>toggle()}>
            <Close/>
          </button>
          {/if}
        </div>
        {:else if C?.closeBtn!==false}
        <button class="text-default flex-grow-0 opacity-25 hover:opacity-75 transition-opacity absolute top-2 right-2" on:click={()=>toggle()}>
          <Close/>
        </button>
      {/if}

      <slot name='body'></slot>

      {#if $$slots.footer}
        <div class="modal-footer border-t border-black/10 dark:border-tertiary pt-4 mt-8">
          <slot name='footer'></slot>
        </div>
      {/if}
    </div>

  </div>
{/if}

<style lang='postcss'>
  .modal{
    @apply fixed inset-0 flex justify-center visible opacity-100;
  }
  .modal:not(.open){
    @apply invisible opacity-0;
  }
  .modal:not(.modal-reset):not(.modal-full){
    @apply p-8;
  }
  .modal:not(.modal-reset) .modal-content{
    @apply flex flex-col p-8 md:p-12 relative;
  }
  .modal:not(.modal-reset).modal-sm .modal-content{
    @apply w-full sm:w-96;
    /* @apply xs:w-72; */
  }
  .modal:not(.modal-reset).modal-md .modal-content{
    @apply w-full md:w-[640px];
  }
  .modal:not(.modal-reset).modal-lg .modal-content{
    @apply w-full lg:w-[960px];
  }
  .modal.modal-full .modal-content{
    @apply w-full min-h-screen;
  }
  .modal.animate .backdrop{
    @apply opacity-0;
  }
  .modal.open .backdrop{
    @apply opacity-90;
  }
  .modal.animate .modal-content.slide-down{
    @apply transform -translate-y-8;
  }
  .modal.animate .modal-content.slide-up{
    @apply transform translate-y-8;
  }
  .modal.open .modal-content.slide-down, .modal.open .modal-content.slide-up{
    @apply translate-y-0;
  }
  .modal.animate .modal-content.zoom-in{
    @apply transform scale-90;
  }
  .modal.animate .modal-content.zoom-out{
    @apply transform scale-110;
  }
  .modal.open .modal-content.zoom-in, .modal.open .modal-content.zoom-out{
    @apply scale-100;
  }
</style>