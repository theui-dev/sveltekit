<script context="module">
	export const TABS = {}
</script>

<script lang="ts">
	import { setContext, onDestroy } from 'svelte'
	import { writable } from 'svelte/store'
	import { token } from '../utility'
	import type { TAB_CONFIG_TYPE } from '@theui/core/types'

	export let config		: TAB_CONFIG_TYPE = {}
	export let id				: string = token()
	export let variant	: 'tabs' | 'pills' = 'tabs'

	let C: TAB_CONFIG_TYPE = {
		animate						: true,
		activeTabClasses  : {
			pills : 'bg-brand text-white',
			tabs : 'border-0 border-b-2 border-brand text-brand bg-primary',
		},
		reset             : false,
		tabClasses        : {
			pills : 'bg-secondary hover:bg-brand',
			tabs  : 'border-0 border-b-2 border-secondary bg-primary',
		}
	}
	Object.assign(C, config)

	const tabs = []
	const panels = []
	const selectedTab = writable(null)
	const selectedPanel = writable(null)

	setContext(TABS, {
		registerTab: tab => {
			tabs.push(tab)
			selectedTab.update(current => current || tab)
			onDestroy(() => {
				const i = tabs.indexOf(tab)
				tabs.splice(i, 1)
				selectedTab.update(current => current === tab ? (tabs[i] || tabs[tabs.length - 1]) : current)
			})
		},

		registerPanel: panel => {
			panels.push(panel)
			selectedPanel.update(current => current || panel)
			onDestroy(() => {
				const i = panels.indexOf(panel)
				panels.splice(i, 1)
				selectedPanel.update(current => current === panel ? (panels[i] || panels[panels.length - 1]) : current)
			})
		},

		selectTab: tab => {
			const i = tabs.indexOf(tab)
			selectedTab.set(tab)
			selectedPanel.set(panels[i])
		},

		selectedTab,
		selectedPanel,
		config: C,
		variant,
	})
</script>

<div {id} class="tabs {$$props.class ? $$props.class : ''}">
	<slot></slot>
</div>