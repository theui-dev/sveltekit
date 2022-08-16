<script lang='ts'>
  import { token, animate, getConfig } from '../utility'
  import { OFFCANVAS_CONFIG } from '../config'
  import type { OFFCANVAS_CONFIG_TYPE } from '@theui/core/types'

  export let id: string = token()
  export let label: string = ''
  export let config: OFFCANVAS_CONFIG_TYPE = {}

  let CONFIG: OFFCANVAS_CONFIG_TYPE = {}
  Object.assign(CONFIG, $OFFCANVAS_CONFIG, config)
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
		if (document.getElementById(id).classList.contains('open') && (CONFIG?.closeOnEsc != false && e.keyCode == 27)) toggle(id)
	}

  let animateCls = () => {
    return animate(CONFIG?.animateSpeed||getConfig('animateSpeed'), CONFIG?.animate||getConfig('animate'))
  }

  let positionCls = (position: string) => {
    return position === 'top' ? 'offcanvas-top' : position === 'right' ? 'offcanvas-right' : position === 'bottom' ? 'offcanvas-bottom' : 'offcanvas-left'
  }
</script>

<svelte:body on:keydown={(e)=>handleKeyboard(e)}></svelte:body>

{#if $$slots.btn}
<span role='button' on:click={()=>toggle(id)} id='{id}Btn'>
  <slot name='btn' {label} {attr}></slot>
</span>
{/if}

{#if $$slots.body}
  <div {id} class='offcanvas fixed inset-0 z-40 {animateCls()} {positionCls(CONFIG?.position||'left')}' role='dialog' class:animate={CONFIG?.animate||getConfig('animate')}>

    {#if CONFIG?.backdrop}
    <div class='backdrop fixed inset-0 bg-black z-[-1] {animateCls()}'
      on:click={()=>CONFIG?.staticBackdrop ? false : toggle(id)}
    ></div>
    {/if}

    <div id='{id}Offcanvas' class='offcanvas-body z-40 fixed {$$props.class||'bg-white dark:bg-secondary'} {animateCls()}' aria-labelledby='{id}Btn' aria-hidden={!active}>
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