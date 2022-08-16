<script lang='ts'>
  import { getConfig, token } from '../utility'
  import { DROPDOWN_CONFIG } from '../config'
  import { activeDropdownID, getContainerClasses, getDropdownClasses } from './controller'
	import type { DD_CONFIG_TYPE, DD_DATA } from '@theui/core/types'

	export let label: string = ''
	export let items: DD_DATA[] = []
	export let config: DD_CONFIG_TYPE = {}
	export let id: string = token()

	let CONFIG: DD_CONFIG_TYPE = {}
	Object.assign(CONFIG, $DROPDOWN_CONFIG, config)

	const toggle = (e, close: boolean = true) => {
		if(close === false){
			return
		}
		$activeDropdownID.includes(id) ? hide() : show()
	}
	let show = () =>  CONFIG.standalone ? activeDropdownID.set([id]) : activeDropdownID.update(d=> [...d, id])
	let hide = () => activeDropdownID.set( $activeDropdownID.filter(i => i !== id) )

	$: attr = {
		'id' : `${id}Heading`,
		'aria-label' : label,
		'aria-haspopup' : 'true',
		'aria-controls' : `${id}Body`,
		'aria-expanded' : $activeDropdownID.includes(id)
	}

	let handleKeyboard = (e) => {
		if(e.keyCode == 13 ||e.keyCode == 27||  e.keyCode == 32 || e.keyCode == 38 || e.keyCode == 40){
			e.preventDefault()
		}
		if(e.keyCode == 32 || e.keyCode == 13){
			toggle(e)
			return
		}
		if ($activeDropdownID.includes(id) && ((CONFIG.closeOnEsc && e.keyCode == 27) || e.keyCode == 38)) hide()
		if (!$activeDropdownID.includes(id) && e.keyCode == 40) show()
		return
	}

	let handleBlur = (e) => {
		if(CONFIG.closeOnOutsideClick && $activeDropdownID.includes(id) && e.target.closest('.dropdown') === null) hide()
	}

	let liCls = (data={}) => {
    let cls = 'dropdown-item-container '
    if(data?.type=='divider'){
      cls += (CONFIG?.reset||getConfig('reset') ? '' : 'border-b pb-2 mb-2 ' + config?.itemConfig?.dividerClasses||'border-tertiary')
    }
    return cls
  }

	let itemCls = (data={}) => {
		return (CONFIG?.reset||getConfig('reset') ? '' : 'flex items-center gap-4 py-3 px-4 ') + (data?.active ? (CONFIG?.itemConfig?.activeClasses||'bg-brand/20') : (CONFIG?.itemConfig?.classes||'bg-transparent hover:bg-brand/10 text-default'))
	}
</script>

<svelte:window on:click={(e)=>handleBlur(e)}/>

<div class={getContainerClasses(CONFIG)} class:open={$activeDropdownID.includes(id)}>

	<span class='relative dropdown-btn' role='button' id='{id}Btn' on:click={(e)=>toggle(e)} on:keydown={(e)=>handleKeyboard(e)} aria-expanded={$activeDropdownID.includes(id)}>
		<slot name='dropdown-btn' {attr} {label}></slot>
	</span>
	
	{#if CONFIG.backdrop}<div class='fixed inset-0 backdrop z-20 {CONFIG.reset?'':'bg-black/50'}' on:click={()=>toggle()}></div>{/if}

	<div class={($$props.class ? $$props.class : 'bg-white dark:bg-secondary text-base shadow-lg') + ' ' + getDropdownClasses(CONFIG)}
	on:click={(e)=>toggle(e, CONFIG.closeOnClick)} aria-labelledby='{id}Btn'>
		{#if $$slots.items}
			<div class='py-1' id='{id}Body'>
				<slot name='items' itemCls={itemCls()}/>
			</div>
		{:else}
			<ul class='py-1' id='{id}Body'>
				{#each items as item }
					<li class={liCls(item)}>
						{#if item.type != 'divider'}
							{#if item.type == 'header'}
								<p class={config?.headerClasses||'p-4 font-semibold text-xs opacity-75 uppercase'}>{item.text}</p>
							{:else}
								<a href={item.url} class={itemCls(item)}>{item.text}</a>
							{/if}
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style lang='postcss'>
	/* Dropdown visibility */
	.dropdown .dropdown-content,.dropdown .backdrop{
		@apply invisible opacity-0;
	}
	.dropdown.open .dropdown-content,.dropdown.open .backdrop{
		@apply visible opacity-100;
	}

	/* Dropdown sizes */
	.dropdown-sm .dropdown-content{
		@apply w-48;
	}
	.dropdown-md .dropdown-content{
		@apply w-64;
	}
	.dropdown-lg .dropdown-content{
		@apply w-80;
	}
	.dropdown-full .dropdown-content{
		@apply w-full left-0 right-0;
	}
	.dropdown-right .dropdown-content{
		@apply left-auto right-0;
	}

	/* Dropdown animations */
	.dropdown .dropdown-content.slide-down{
		@apply -translate-y-2;
	}
	.dropdown .dropdown-content.slide-up{
		@apply translate-y-2;
	}
	.dropdown.open .dropdown-content.slide-down, .dropdown.open .dropdown-content.slide-up{
		@apply translate-y-0;
	}
	.dropdown .dropdown-content.slide-left{
		@apply -translate-x-2;
	}
	.dropdown .dropdown-content.slide-right{
		@apply translate-x-2;
	}
	.dropdown.open .dropdown-content.slide-left, .dropdown.open .dropdown-content.slide-right{
		@apply translate-x-0;
	}
	.dropdown .dropdown-content.zoom-in{
		@apply scale-75;
	}
	.dropdown .dropdown-content.zoom-out{
		@apply scale-110;
	}
	.dropdown.open .dropdown-content.zoom-in, .dropdown.open .dropdown-content.zoom-out{
		@apply scale-100;
	}
</style>
