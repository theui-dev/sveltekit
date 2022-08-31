<script lang='ts'>
	import { token, getConfig }	from '../utility'
	import { Button, Icon } from '../index'

	export let closeBtn: boolean = true
	export let icon: boolean = true
	export let reset: boolean = false
	export let type: 'error' | 'info' | 'success' | 'warning' | 'muted' = 'error'

	let cls = reset ? '' : 'flex items-center p-4 mb-4 gap-4 text-sm font-medium ' +
			($$props.class ? $$props.class :
			(type == 'info' ? 'bg-[#d1dffe] text-[#1656d6]  dark:bg-[#1046c6] dark:text-[#dfdfff]' :
			type == 'success' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
			type == 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
			type == 'muted' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'))
			
	let nodeRef
	let id: string = token()
	const toggleAlert = () => nodeRef.parentNode.removeChild(nodeRef)
</script>

<div {id} class={cls} class:rounded-lg={getConfig('isRounded')} role='alert' bind:this={nodeRef}>
	{#if icon}<Icon name={icon===true ? type : icon} size=1.25 />{/if}

	<slot />

	{#if closeBtn}
	<div class="ml-auto mb-auto text-inherit">
		<Button class="bg-transparent p-0 border-none btn-0" on:click={toggleAlert} aria-label="Close">
			<span slot='label'>
				<span class='sr-only'>Close</span>
				<Icon name='close' size=1.5 />
			</span>
		</Button>
	</div>
	{/if}
</div>