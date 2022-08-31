<script context="module">
	export const NAV = {}
</script>

<script lang='ts'>
  import type { NAV_CONFIG_TYPE } from "theui/types"
	import { setContext, onDestroy } from "svelte"
  import { onMount } from "svelte"
  import { animate, rounded, token } from "theui"
  import { mobileNav } from "../Stores"
  import { NavCollapse } from "../index"

  export let segment: string = '/'
  export let config: NAV_CONFIG_TYPE = {}

  let C: NAV_CONFIG_TYPE = {
    activeLinkStyle       : 'p-3 text-default text-sm',
    animate               : 'fast',
    height                : 'md',
    linkStyle             : 'p-3 text-gray-700 dark:text-gray-300 hover:text-default text-sm',
    responsive            : 'lg',
    rounded               : true,
    scrollAmountToHide    : 64,
    scrollAmountToShrink  : 32,
    scrollBehavior        : 'shrinkAndHide',
    scrollClass           : 'bg-white dark:bg-secondary shadow-black/10 shadow-2xl md:px-4',
  }
  Object.assign(C, config)

  let heightCls = () => C.height == 'sm' ? ' h-12' : C.height == 'lg' ? ' h-20' : C.height == 'xl' ? ' h-24' : ' h-16'

  $: miniNav = false
  $: hideNav = false

  let id: string = token()
  let scrollPos = 0
  onMount(() => {
    let navbar = document.querySelector('.navbar')
    window.addEventListener('scroll', () => {
      // Shrink Navbar
      if(C.scrollBehavior === 'shrinkOnScrollDown' || C.scrollBehavior === 'shrinkAndHide') {
        miniNav = (window.pageYOffset >= C.scrollAmountToShrink)
      }
      // Set / Reset Navbar
      if(C.scrollBehavior === 'hideOnScrollDown' || C.scrollBehavior === 'shrinkAndHide') {
        if (document.body.getBoundingClientRect().top > scrollPos) {
          // miniNav = true
          hideNav = false
        } else {
          if (scrollPos == 0) {
            if (window.pageYOffset > C.scrollAmountToHide) hideNav = true
          } else hideNav = true
        }
        scrollPos = window.pageYOffset >= C.scrollAmountToHide ? document.body.getBoundingClientRect().top : 0
      }
    })
  })
  setContext(NAV, {config: C, id, mobileNav})
</script>

<nav
  {id}
  class:navbar-mini={miniNav}
  class:navbar-hidden={hideNav}
  class:fixed={C.scrollBehavior !== 'default'}
  class="navbar {$$props.class||'bg-primary left-0 top-0 w-full flex items-center justify-center'} {animate(C.animate?'slow':false)} {miniNav||(hideNav===false && scrollPos!==0) ? C.scrollClass : ''}"
>
  <div class="w-full max-w-[var(--max-width)] flex grow gap-x-8 items-center justify-between relative {heightCls()} {miniNav||(hideNav===false && scrollPos!==0) ? 'px-4' : 'px-8'} {animate(C.animate)}">
    <slot {segment}></slot>
  </div>
</nav>

<style lang='postcss'>
  :global(.navbar.navbar-hidden) {
    @apply -top-full;
  }
</style>
