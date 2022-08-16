<script lang='ts'>
  import type { OFFCANVAS_CONFIG_TYPE } from '@theui/core/types'
  import { token, animate } from '../utility'
	import { Close, Svg } from '../index'

  export let config: OFFCANVAS_CONFIG_TYPE = {}
  export let id: string = token()
  export let label: string = ''

  let C: OFFCANVAS_CONFIG_TYPE = {
    animate : true,
    backdrop: true,
    closeOnEsc: true,
    staticBackdrop: false,
  }
  Object.assign(C, config)
  let active: boolean = false

  $: attr = {
		'id' : `${id}Heading`,
		'aria-label' : label,
		'aria-haspopup' : 'true',
		'aria-controls' : `${id}Offcanvas`,
		'aria-expanded' : active
	}

  let toggle = (id) => document.getElementById(id).classList.toggle('open')

  let handleKeyboard = (e) => {
		if (document.getElementById(id).classList.contains('open') && (C.closeOnEsc != false && e.keyCode == 27)) toggle(id)
	}

  let animateCls = () => {
    return animate(C?.animateSpeed||'fast', C.animate)
  }

  let positionCls = (position: string) => {
    return position === 'top' ? 'offcanvas-top' : position === 'right' ? 'offcanvas-right' : position === 'bottom' ? 'offcanvas-bottom' : 'offcanvas-left'
  }
</script>

<svelte:body on:keydown={(e)=>handleKeyboard(e)}></svelte:body>

{#if $$slots.button}
<span role='button' on:click={()=>toggle(id)} id='{id}Btn'>
  <slot name='button' {label} {attr}></slot>
</span>
{/if}

{#if $$slots.body}
  <div {id} class='offcanvas fixed inset-0 {animateCls()} {positionCls(C?.position||'left')}' role='dialog' class:animate={C.animate}>

    {#if C.backdrop}
    <div class='backdrop fixed inset-0 bg-black z-[-1] {animateCls()}'
      on:click={()=>C.staticBackdrop ? false : toggle(id)}
    ></div>
    {/if}

    <div id='{id}Offcanvas' class='offcanvas-body fixed {$$props.class||'bg-white dark:bg-secondary'} {animateCls()}' aria-labelledby='{id}Btn' aria-hidden={!active}>
      <button class="text-default flex-grow-0 opacity-25 hover:opacity-75 transition-opacity absolute top-2 right-4" on:click={()=>toggle(id)} aria-label="Close" >
        <Close/>
      </button>
      <slot name='body'></slot>
    </div>

  </div>
{/if}

<style lang='postcss'>
  .offcanvas.open{
    @apply visible opacity-100;
  }
  .offcanvas{
    @apply invisible opacity-0;
  }
  .offcanvas.offcanvas-right .offcanvas-body, .offcanvas.offcanvas-left .offcanvas-body{
    @apply top-0 bottom-0 w-full sm:w-96;
  }
  .offcanvas.offcanvas-top .offcanvas-body, .offcanvas.offcanvas-bottom .offcanvas-body{
    @apply left-0 right-0 w-full min-h-[160px];
  }
  .offcanvas.offcanvas-right .offcanvas-body{
    @apply right-0;
  }
  .offcanvas.offcanvas-bottom .offcanvas-body{
    @apply bottom-0;
  }
  .offcanvas.animate .backdrop{
    @apply opacity-0;
  }
  .offcanvas.open .backdrop{
    @apply opacity-50 dark:opacity-75;
  }
  .offcanvas.animate .offcanvas-body{
    @apply transform;
  }
  .offcanvas.animate.offcanvas-left .offcanvas-body{
    @apply -translate-x-full;
  }
  .offcanvas.animate.offcanvas-right .offcanvas-body{
    @apply translate-x-full;
  }
  .offcanvas.animate.offcanvas-left.open .offcanvas-body, .offcanvas.animate.offcanvas-right.open .offcanvas-body{
    @apply translate-x-0
  }
  .offcanvas.animate.offcanvas-top .offcanvas-body{
    @apply -translate-y-full;
  }
  .offcanvas.animate.offcanvas-bottom .offcanvas-body{
    @apply translate-y-full;
  }
  .offcanvas.animate.offcanvas-top.open .offcanvas-body, .offcanvas.animate.offcanvas-bottom.open .offcanvas-body{
    @apply translate-y-0
  }
</style>