<script lang="ts">
	import { getContext } from 'svelte'
	import { TABS } from '../index'
	import { fade } from 'svelte/transition'
  import { token } from '../utility'

	const panel = {}
	const { registerPanel, selectedPanel, config } = getContext(TABS)
	registerPanel(panel)
</script>

{#if $selectedPanel === panel}
	{#if config.animate}
		<div class="tab-panel {$$props.class||''}" in:fade={{duration:150}}><slot></slot></div>
	{:else}
		<div class="tab-panel {$$props.class||''}"><slot></slot></div>
	{/if}
{/if}