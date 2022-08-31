<script lang="ts">
  import { getContext } from "svelte"
  import { TABS } from "../index"
  import { rounded, shadow, getConfig } from '../utility'

  const tab = {}
  const { registerTab, selectTab, selectedTab, config, type } = getContext(TABS)
  registerTab(tab)

  let getClass = (active: boolean) => {
    let cls = (config?.reset || getConfig('reset') ? '' : ' px-8 py-3 text-center focus-within:outline-none font-medium ') + (type == "pills" ? ' tab-pill ' : ' ')
    cls +=  active ?  (config?.activeTabClasses[type]||config?.activeTabClasses) :
                      (config?.tabClasses[type]||config?.tabClasses)
    cls +=  shadow(config?.shadow||'lg') +
            rounded(config?.rounded||getConfig('isRounded'), (type == 'tabs' ? 'top' : 'all'))
    return cls
  }
</script>

<button
  class={getClass($selectedTab === tab)} class:selected={$selectedTab === tab}
  on:click={() => selectTab(tab)}
>
  <slot/>
</button>