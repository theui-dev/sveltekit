<script lang="ts">
	import { getContext } from 'svelte'
	import { TABS } from '../index'
	import { fade } from 'svelte/transition'
  import { getConfig, token } from '../utility'

	const panel = {}
	const { registerPanel, selectedPanel } = getContext(TABS)
	registerPanel(panel)
</script>

{#if $selectedPanel === panel}
	{#if getConfig('animate')}
		<div class="tab-panel {$$props.class||''}" in:fade={{duration:150}}><slot></slot></div>
	{:else}
		<div class="tab-panel {$$props.class||''}"><slot></slot></div>
	{/if}
{/if}