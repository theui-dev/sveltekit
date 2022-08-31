<script lang='ts'>
  import { onMount } from 'svelte'
  import { NAV_CONFIG } from '../config'
  import { animate, getConfig, rounded } from '../utility'
  import type { NAV_CONFIG_TYPE } from '@theui/core/types'

  export let segment: string = '/'
  export let config: NAV_CONFIG_TYPE = {}

  let CONFIG: NAV_CONFIG_TYPE = {}
  Object.assign(CONFIG, $NAV_CONFIG, config)

  let heightCls = (height: string) => {
    if(!CONFIG?.reset || !getConfig('reset')){
      return height == 'sm' ? 'h-12' : height == 'lg' ? 'h-20' : height == 'xl' ? 'h-24' : 'h-16'
    }
    return ''
  }

  let classes = (CONFIG?.classes||'bg-transparent px-8') + ' ' +
    animate(CONFIG?.animateSpeed||getConfig('animateSpeed'), CONFIG?.animate||getConfig('animate')) +
    (CONFIG?.reset||getConfig('reset') ? ' navbar-reset' : ' top-0 z-10 w-full max-w-screen-2xl flex items-center') +
    ' ' + heightCls(CONFIG?.height || 'md') + rounded(CONFIG?.rounded||false)

  $: miniNav = false
  $: hideNav = false

  let scrollPos = 0
  onMount(() => {
    let navbar = document.querySelector('.navbar')
    window.addEventListener('scroll', () => {
      // Shrink Navbar
      if(CONFIG.scrollBehavior === 'shrinkOnScrollDown' || CONFIG.scrollBehavior === 'shrinkAndHide') {
        miniNav = (window.pageYOffset >= CONFIG.scrollAmountToShrink)
      }
      // Set / Reset Navbar
      if(CONFIG.scrollBehavior === 'hideOnScrollDown' || CONFIG.scrollBehavior === 'shrinkAndHide') {
        if (document.body.getBoundingClientRect().top > scrollPos) {
          // miniNav = true
          hideNav = false
        } else {
          if (scrollPos == 0) {
            if (window.pageYOffset > CONFIG.scrollAmountToHide) hideNav = true
          } else hideNav = true
        }
        scrollPos = window.pageYOffset >= CONFIG.scrollAmountToHide ? document.body.getBoundingClientRect().top : 0
      }
    })
  })
</script>

<nav class='navbar {classes} {miniNav||(hideNav===false && scrollPos!==0) ? CONFIG?.scrollClasses : ''}'
  class:fixed={CONFIG.scrollBehavior !== 'default'} class:navbar-mini={miniNav} class:navbar-hidden={hideNav}>
  <slot {segment}></slot>
</nav>

<style lang='postcss'>
  :global(.navbar.navbar-mini:not(.navbar-reset)) {
    @apply shadow-black/10 shadow-2xl md:px-8;
  }
  :global(.navbar.navbar-hidden) {
    @apply -top-full;
  }
</style>