<script lang='ts'>
	import type { DD_CONFIG_TYPE, DD_DATA } from "theui/types"
  import { animate, rounded, token } from "theui"
  import { activeDropdownID } from "../Stores"
  import { Button } from "../index"

	export let config: DD_CONFIG_TYPE = {}
	export let id: string = token()
	export let items: DD_DATA[] = []
	export let label: string = ''

	let C: DD_CONFIG_TYPE = {
		animate        			: 'fast',
		alignEnd          	: false,
		backdrop            : false,
		block               : false,
		closeOnClick        : true,
		closeOnOutsideClick : true,
		reset								: false,
		standalone          : true,
	}
	Object.assign(C, config)

	const toggle = (e, close: boolean = true) => {
		if(close === false){
			return
		}
		$activeDropdownID.includes(id) ? hide() : show()
	}
	let show = () =>  C.standalone ? activeDropdownID.set([id]) : activeDropdownID.update(d=> [...d, id])
	let hide = () => activeDropdownID.set( $activeDropdownID.filter(i => i !== id) )

	$: attr = {
		'id' : `${id}Heading`,
		'aria-label' : label,
		'aria-haspopup' : 'true',
		'aria-controls' : `${id}Body`,
		'aria-expanded' : $activeDropdownID.includes(id)
	}

	let handleKeyboard = (e) => {
		if($activeDropdownID.includes(id) && (e.code == 'Escape' || e.code == 'ArrowUp')){
			e.preventDefault()
			hide()
		}
		if (!$activeDropdownID.includes(id) && e.code == 'ArrowDown'){
			e.preventDefault()
			show()
		}
		return
	}

	let handleBlur = (e) => {
		if(C.closeOnOutsideClick && $activeDropdownID.includes(id) && e.target.closest('.dropdown') === null) hide()
	}

	let getContainerClasses = () => {
		return  'dropdown relative inline-block ' + animate(C?.animate) +
						(C?.alignEnd ? ' dropdown-right ' : ' ') + getContainerSize()
	}

	let getDropdownClasses = () => {
		return  (C?.animation||'slide-up') + ' dropdown-content absolute list-none z-[11] ' +
		animate(C?.animate) + rounded(C?.rounded||'md')
	}

	let getContainerSize = () => {
		let size: string = C?.size||'md'
		return  size === 'sm' ? 'dropdown-sm' : size === 'md' ? 'dropdown-md' :
						size === 'lg' ? 'dropdown-lg' : size === 'full' ? 'dropdown-full' : 'dropdown-auto'
	}

	let liCls = (data={}) => {
    let cls = 'dropdown-item-container '
    if(data?.type=='divider'){
      cls += (C.reset ? '' : 'border-b pb-2 mb-2 ' + config?.itemConfig?.dividerClasses||'border-tertiary')
    }
    return cls
  }

	let itemCls = (data={}) => {
		return (C.reset ? '' : 'flex items-center gap-4 py-3 px-4 ') + (data?.active ? (C?.itemConfig?.activeClasses||'bg-gray-500/10') : (C?.itemConfig?.classes||'bg-transparent hover:bg-gray-500/10 text-default'))
	}
</script>

<svelte:window on:click={(e)=>handleBlur(e)}/>

<div class={getContainerClasses(C)} class:open={$activeDropdownID.includes(id)}>

	<span class='relative dropdown-btn select-none' role='button' id='{id}Btn' on:click={(e)=>toggle(e)} on:keydown={(e)=>handleKeyboard(e)} aria-expanded={$activeDropdownID.includes(id)}>
		{#if $$slots.label}
		<slot name='label' {attr} {label}></slot>
		{:else}
		<Button {label} />
		{/if}
	</span>
	
	{#if C.backdrop}<div class='fixed inset-0 backdrop z-10 {C.reset?'':'bg-black/50'}' on:click={()=>toggle()}></div>{/if}

	<div class={($$props.class ? $$props.class : 'bg-white dark:bg-secondary text-base shadow-lg') + ' ' + getDropdownClasses(C)}
	on:click={(e)=>toggle(e, C.closeOnClick)} aria-labelledby='{id}Btn'>
		{#if $$slots.items}
			<div class='py-1' id='{id}Body'>
				<slot name='items' itemClass={itemCls()}/>
			</div>
		{:else}
			<ul class='py-1' id='{id}Body'>
				{#each items as item }
					<li class={liCls(item)}>
						{#if item.type != 'divider'}
							{#if item.type == 'header'}
								<p class={config?.headerClasses||'p-4 font-semibold text-xs opacity-75 uppercase'}>{item.text}</p>
							{:else}
								<a href={item.url} class={itemCls(item)} data-sveltekit-prefetch={!item.noPreset?"":"off"}>{item.text}</a>
							{/if}
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style lang='postcss'>
	.dropdown .backdrop{
    @apply z-10;
  }
  .dropdown-content{
    @apply z-[11];
  }
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
		@apply translate-x-2;
	}
	.dropdown .dropdown-content.slide-right{
		@apply -translate-x-2;
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
