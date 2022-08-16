<script lang="ts">
  import { getContext } from "svelte"
  import { NAV } from "../index"
  const { config, id, mobileNav } = getContext(NAV)
  import { animate, rounded } from '../utility'

  export let href     : string = null
  export let prefetch : boolean = true
  export let active   : string|boolean = false

  let linkCls = 'nav-link flex items-center ' + ($$props.class ? $$props.class : (active ? config.activeLinkStyle : config.linkStyle)) + rounded(config?.rounded) + animate(config?.animateSpeed, config?.animate)

  let closeMobileNav = () => {
    if ($mobileNav.includes(id)) {
      let D = $mobileNav.filter(i => i !== id)
			mobileNav.update(d => D)
    }
  }

</script>

{#if href}
  <a {href} class={linkCls} sveltekit:prefetch={prefetch} on:click={()=>closeMobileNav()}><slot/></a>
{:else}
  <span class="cursor-pointer {linkCls}"><slot/></span>
{/if}

<style lang="postcss">
  :global(.navbar-collapse .nav-link:not(.nav-dropdown-btn)){
    @apply hover:bg-secondary;
  }
  :global(.navbar-collapse.xl-collapse .nav-links > .nav-link){
    @apply xl:hover:bg-transparent;
  }
  :global(.navbar-collapse.lg-collapse .nav-links > .nav-link){
    @apply lg:hover:bg-transparent;
  }
  :global(.navbar-collapse.md-collapse .nav-links > .nav-link){
    @apply md:hover:bg-transparent;
  }
</style>