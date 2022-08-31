<script lang="ts">
  import { onMount } from 'svelte'
  import { PROGRESS_CONFIG } from '../config'
  import { rounded, token, getConfig } from '../utility'
  import type { PROGRESS_CONFIG_TYPE } from '@theui/core/types'

  export let config: PROGRESS_CONFIG_TYPE = {}
  export let id: string = token()
  export let label: string = undefined
  export let start: number = 0
  export let end: number = 50

  $: startPoint = start
  $: endsPoint = end

  let CONFIG: PROGRESS_CONFIG_TYPE = {}
  Object.assign(CONFIG, $PROGRESS_CONFIG, config)
  
  let height = (): string => {
    let h = CONFIG?.height||'md'
    if(h == 'px' || h == 'sm' || h == 'md' || h == 'lg' || h == 'xl') {
      return  label ? '' : (h == 'px' ? ' h-px ' : h == 'sm' ? ' h-1 ' :
              h == 'md' ? ' h-2 ' : h == 'lg' ? ' h-4 ' : ' h-6 ')
    }
  }

  onMount(() => {
    let el = document.querySelector(`#${id} .progress-bar`)
    if(el) el.style.width = `${endsPoint}%`
  })

  let trackCls = () => {
    let cls = 'progress overflow-hidden flex relative select-none '
    if(getConfig('isRounded')) cls += rounded('full')
    return cls
  }

  let barCls = () => {
    let cls = 'progress-bar flex items-center ' + height() + (CONFIG?.barClasses||'bg-brand justify-center') +
              rounded(CONFIG?.roundedProgress||false)
    return cls
  }
</script>

<div {id} class="{trackCls()} {$$props.class||'text-on-brand text-xs bg-tertiary'}">
  <div class={barCls()}>
    {#if label}<span class="progress-label">{label}</span>{/if}
  </div>
</div>
