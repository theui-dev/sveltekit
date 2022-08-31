<script lang="ts">
  import { getContext } from "svelte"
  import { TABS } from "../index"
  import { rounded, shadow } from '../utility'

  const tab = {}
  const { registerTab, selectTab, selectedTab, config, variant } = getContext(TABS)
  registerTab(tab)

  let getClass = (active: boolean) => {
    let cls = (config.reset ? '' : ' px-8 py-3 text-center focus-within:outline-none font-medium ') + (variant == "pills" ? ' tab-pill ' : ' ')
    cls +=  active ? (config?.activeTabClasses[variant]||config?.activeTabClasses) : (config?.tabClasses[variant]||config?.tabClasses)
    cls +=  shadow(config?.shadow||'lg') + rounded(config?.rounded||'md', (variant == 'tabs' ? 'top' : 'all'))
    return cls
  }
</script>

<button class="tab {getClass($selectedTab === tab)}" class:selected={$selectedTab === tab} on:click={() => selectTab(tab)}>
  <slot/>
</button>