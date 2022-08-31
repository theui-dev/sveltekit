<script lang='ts'>
	import { modalIdStore } from './Store'
  import { MODAL_CONFIG } from '../config'
  import { token, animate, rounded, getConfig } from '../utility'
  import { Icon } from '../index'
  import type { MODAL_CONFIG_TYPE } from '@theui/core/types'

  export let id: string = token()
	export let label: string = ''
  export let config: MODAL_CONFIG_TYPE = {}

  let CONFIG: MODAL_CONFIG_TYPE = {}
  Object.assign(CONFIG, $MODAL_CONFIG, config)

	$: attr = {
		'id' : `${id}Btn`,
		'aria-label' : label,
		'aria-haspopup' : 'true',
		'aria-controls' : `${id}Modal`,
		'aria-expanded' : $modalIdStore.includes(id)
	}

  let toggle = ( closeBtn = true ) => {
    if($modalIdStore.includes(id) && (closeBtn || (!closeBtn && !CONFIG?.staticBackdrop))){
      modalIdStore.set( $modalIdStore.filter(i => i !== id) )
      return
    }
    modalIdStore.update(m=> [...m, id])
  }

	let handleKeyboard = (e) => {
		if ($modalIdStore.includes(id) && (CONFIG?.closeOnEsc && e.keyCode == 27)){
      e.preventDefault()
      modalIdStore.set( $modalIdStore.filter(i => i !== id) )
    }
		return
	}

  let modalBodyCls = () => {
    return 'modal' + (CONFIG?.reset||getConfig('reset') ? ' modal-reset' : ' ') +
            CONFIG?.bodyClasses + ' ' +  modalSize(CONFIG?.size||'md') + ' ' + animateCls() +
            modalPosition(CONFIG?.position||'top')
  }

  let modalSize = (size: string) => {
    return size === 'sm' ? ' modal-sm' : size === 'lg' ? ' modal-lg' :
           size === 'full' ? ' modal-full' : ' modal-md'
  }

  let modalPosition = (position: string) => {
    return  position === 'bottom' ? ' items-end' :
            position === 'center' ? ' items-center' :  ' items-start'
  }

  let animateCls = () => {
    return animate(CONFIG?.animateSpeed||getConfig('animateSpeed'), CONFIG?.animate||getConfig('animate'))
  }

  let animationCls = (type: string) => {
    return (CONFIG?.animate||getConfig('animate')) ? type : ''
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
    class:animate={CONFIG?.animate||getConfig('animate')}>

    {#if CONFIG?.backdrop}
    <div class='backdrop fixed inset-0 bg-black z-[-1]{animateCls()}' on:click={()=>toggle(false)}></div>
    {/if}

    <div class='modal-content {CONFIG?.contentClasses||'bg-white dark:bg-secondary'}{animateCls()} {animationCls(CONFIG?.animation||'fade')} {CONFIG?.size !== 'full' ? rounded(CONFIG?.rounded||getConfig('isRounded')) : ''}'
      aria-labelledby={$$slots.header ? `${id}Heading` : `${id}Btn`}
      aria-hidden={!$modalIdStore.includes(id)}
    >

      {#if $$slots.header}
      <div id='{id}Heading' class="flex justify-between w-full gap-8 items-start border-b border-black/10 dark:border-tertiary pb-4 mb-8">
        <slot name='header'></slot>
        {#if CONFIG?.closeBtn}
        <button class="text-default flex-grow-0 opacity-25 hover:opacity-50 transition-opacity" on:click={()=>toggle()}>
          <Icon slot="label" name="close" size=2 />
        </button>
        {/if}
      </div>
      {:else if CONFIG?.closeBtn}
      <button class="text-default flex-grow-0 opacity-25 absolute top-2 right-2 p-0" on:click={()=>toggle()}><Icon slot="label" name="close" size=2 /></button>
      {/if}

      <slot name='body'></slot>

      {#if $$slots.footer}
      <div class="border-t border-black/10 dark:border-tertiary pt-4 mt-8">
        <slot name='footer'></slot>
      </div>
      {/if}
    </div>

  </div>
{/if}

<style lang='postcss'>
  .modal{
    @apply fixed inset-0 z-40 flex justify-center visible opacity-100;
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