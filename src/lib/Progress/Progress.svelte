<script lang="ts">
  import type { PROGRESS_CONFIG_TYPE } from "theui/types"
  import { onMount } from "svelte"
  import { rounded, token } from "theui"

  export let config: PROGRESS_CONFIG_TYPE = {}
  export let id: string = token()
  export let label: string = undefined
  export let start: number = 0
  export let end: number = 50

  $: startPoint = start
  $: endsPoint = end

  let C: PROGRESS_CONFIG_TYPE = {}
  Object.assign(C, config)
  
  let height = (): string => {
    let h = C?.height||'md'
    if(h == 'px' || h == 'sm' || h == 'md' || h == 'lg' || h == 'xl') {
      return  label ? '' : (h == 'px' ? ' h-px ' : h == 'sm' ? ' h-1 ' :
              h == 'md' ? ' h-2 ' : h == 'lg' ? ' h-4 ' : ' h-6 ')
    }
  }

  onMount(() => {
    let el = document.querySelector(`#${id} .progress-bar`)
    if(el) el.style.width = `${endsPoint}%`
  })

  let trackCls = () => 'progress overflow-hidden flex relative select-none' + rounded(C?.rounded||'full')
  let barCls = () => 'progress-bar flex items-center ' + height() + (C?.barClasses||'bg-brand justify-center') + rounded(C?.roundedProgress||false)
</script>

<div {id} class="progress {trackCls()} {$$props.class||'text-on-brand text-xs bg-tertiary'}">
  <div class={barCls()}>
    {#if label}<span class="progress-label">{label}</span>{/if}
  </div>
</div>
