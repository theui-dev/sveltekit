<script lang='ts'>
	import type {ROUNDED_TYPE} from "@theui/core/types"
	import { rounded, token }	from '../utility'
	import { Close, Svg } from '../index'

	export let dismissible: boolean = true
	export let icon: boolean = true
	export let reset: boolean = false
	export let round: ROUNDED_TYPE = 'md'
	export let type: 'error' | 'info' | 'success' | 'warning' = 'error'
	export let variant: 'card' | 'cardLight' | 'borderTop'| 'borderBottom'| 'borderStart' = 'card'

	let getClass = () => {
    let cls = '';
    if (!reset) {
			cls = 'alert flex items-center p-4 mb-4 gap-4 text-sm font-medium ';
			if($$props.class){
				cls += $$props.class + rounded(round)
			}else{
				if(variant == "card"){
					cls += 	rounded(round) + ' ' + 
									(type == 'info' ? 'bg-[#1656d6] text-[#d1dffe]  dark:bg-[#061666]' :
									type == 'success' ? 'bg-green-500 text-green-100 dark:bg-green-700' :
									type == 'warning' ? 'bg-yellow-300 text-yellow-900 dark:bg-yellow-600 dark:text-yellow-100'
									: 'bg-red-500 text-red-100 dark:bg-red-800')
				}
				else{
					cls += (type == 'info' ? 'bg-[#1656d6]/20 dark:bg-[#1656d6]/10 text-[#061666] dark:text-[#1656d6] border-[#1656d6]' :
					type == 'success' ? 'bg-green-500/20 dark:bg-green-500/10 text-green-800 dark:text-green-600 border-green-500 dark:border-green-600' :
					type == 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-600 border-yellow-500 dark:border-yellow-600'
					: 'bg-red-100 text-red-900 dark:bg-red-500/10 dark:text-red-600 border-red-500 dark:border-red-600')

					if(variant == 'cardLight') cls += rounded(round)
					if(variant == "borderTop") cls += rounded(round, 'bottom') + ' border-t-4'
					if(variant == "borderBottom") cls += rounded(round, 'top') + ' border-b-4' 
					if(variant == "borderStart") cls += rounded(round) + ' border-l-4' 
				}
			}
		}
		return cls
	}

	let nodeRef
	let id: string = token()
	const toggleAlert = () => nodeRef.parentNode.removeChild(nodeRef)

	let types = ['error', 'info', 'success', 'warning']
</script>

<div {id} class={getClass()} role='alert' bind:this={nodeRef}>
	{#if icon && types.includes(type)}
		<Svg size=1.25>
			{#if type == 'error' || type == 'warning'}
			<path d='M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'/>
			{/if}
			{#if type == 'info'}
			<path d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z'/>
			{/if}
			{#if type == 'success'}
			<path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z'/>
			{/if}
		</Svg>
	{/if}

	<slot />

	{#if dismissible}
	<div class="ml-auto mb-auto text-inherit">
		<button class="opacity-75 hover:opacity-100 transition-opacity" on:click={toggleAlert} aria-label="Close">
			<Close size="1.5" />
		</button>
	</div>
	{/if}
</div>
