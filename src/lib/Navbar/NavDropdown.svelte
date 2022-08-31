<script lang="ts">
  import { getContext } from "svelte"
  import { NAV } from "../index"
  import { animate, rounded, token } from "theui"
  import { Svg } from "../index"
  const { config } = getContext(NAV)

  export let label: string = ''
  export let megaMenu: boolean = false
  export let align: 'left'|'right' = 'left'
  export let animation: 'fade'|'slide-up'|'zoom-in' = 'zoom-in'

  let id: string = token()
  let toggle = () => {
    let dd = document.getElementById(id)
    if(dd.classList.contains('hide')){
      let activeDd = document.querySelectorAll('.nav-dropdown-contianer:not(.hide)')
      activeDd.forEach(elm => elm.classList.add('hide'))
      dd.classList.remove('hide')
    }else{
      dd.classList.add('hide')
    }
  }
  let linkCls = 'nav-link flex items-center ' + ($$props.class ? $$props.class : config.linkStyle) + rounded(config?.rounded)

  let commonCls = 'nav-dropdown'
  let defaultCls = ($$props.class||'pl-8 flex-col py-2 pr-2 bg-primary')
  let nonResCls = 'absolute pl-0 flex shadow-xl block w-80 max-h-[80vh] overflow-y-auto'
  let resCls =  rounded(config?.rounded, 'bottom') + animate(config.animate) + ' shadow-none ' +
                (config.responsive == 'xl' ? 'xl:absolute xl:pl-2 xl:flex xl:shadow-xl xl:block dark:xl:bg-tertiary ' :
                config.responsive == 'md' ? 'md-collapse md:absolute md:pl-2 md:flex md:shadow-xl md:block dark:md:bg-tertiary ' :
                config.responsive == 'lg' ? 'lg-collapse lg:absolute lg:pl-2 lg:flex lg:shadow-xl lg:block dark:lg:bg-tertiary ' : '') +
                (megaMenu ? 'mega-menu left-8 right-8' : (align=='right' ? 'right-0' : 'left-0'))
  let resSize = config.responsive == 'xl' ? 'xl:w-80 xl:max-h-[80vh] overflow-y-auto' :
                config.responsive == 'md' ? 'md:w-80 md:max-h-[80vh] overflow-y-auto' :
                config.responsive == 'lg' ? 'lg:w-80 lg:max-h-[80vh] overflow-y-auto' : ''

  let handleKeyboard = (e) => {
		if(e.code == 'Escape' || e.code == 'ArrowUp'){
      e.preventDefault()
      document.getElementById(id).classList.add('hide')
		}
		if(e.code == 'ArrowDown'){
      e.preventDefault()
      document.getElementById(id).classList.remove('hide')
		}
    return
	}
  let handleBlur = (e) => {
    if(e.target.closest('#'+id+':not(.hide)') === null){
      document.getElementById(id).classList.add('hide')
    }
  }
</script>

<svelte:window on:click={(e)=>handleBlur(e)}/>

<div {id} class="nav-dropdown-contianer hide z-[1]" class:relative={!megaMenu} on:click={()=>toggle()}>
  <button class="nav-dropdown-btn {linkCls} gap-x-1 w-full justify-between" on:keydown={(e)=>handleKeyboard(e)}>
    {#if !$$slots.label}{label}<slot name="label"/>{:else}{/if}
    <slot name="icon"><Svg stroke={true} viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></Svg></slot>
  </button>
  <div  class={commonCls + ' ' + defaultCls + ' ' + (config.responsive != false ? (resCls + ' hidden ' + resSize) : nonResCls)}
        class:fade={animation=='fade'}
        class:slide-up={animation=='slide-up'}
        class:zoom-in={animation=='zoom-in'}>
    <slot />
  </div>
</div>

<style lang="postcss">
  .nav-dropdown-contianer.hide .nav-dropdown{
    @apply invisible;
  }
  .nav-dropdown-contianer.hide .nav-dropdown.fade{
    @apply opacity-0 translate-y-2 transition-none;
  }
  .nav-dropdown-contianer.hide .nav-dropdown.slide-up{
    @apply translate-y-8 opacity-0 transition-none;
  }
  .nav-dropdown-contianer.hide .nav-dropdown.zoom-in{
    @apply scale-75 opacity-0 translate-y-2 transition-none;
  }
  .nav-dropdown-contianer:not(.hide) .nav-dropdown-btn{
    @apply bg-secondary dark:bg-tertiary transition-all duration-150;
  }
  .nav-dropdown-contianer:not(.hide) .nav-dropdown{
    @apply visible block;
    @apply translate-y-2 opacity-100 scale-100 transition-all duration-150;
  }
</style>
