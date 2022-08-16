<script context="module">
	export const TABS = {}
</script>

<script lang="ts">
	import { setContext, onDestroy } from 'svelte'
	import { writable } from 'svelte/store'
	import { token } from '../utility'
	import { TAB_CONFIG } from '../config'
	import type { TAB_CONFIG_TYPE } from '@theui/core/types'

	export let config	: TAB_CONFIG_TYPE = {}
	export let id			: string = token()
	export let type		: 'tabs' | 'pills' = 'tabs'

	let CONFIG: TAB_CONFIG_TYPE = {}
	Object.assign(CONFIG, $TAB_CONFIG, config)

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
		config: CONFIG,
		type,
	})
</script>

<div {id} class="tabs {$$props.class||''}">
	<slot></slot>
</div>