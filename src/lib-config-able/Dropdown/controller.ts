import { writable } from 'svelte/store'
import { animate, rounded, getConfig } from '../utility'
import type { Writable } from 'svelte/store'
import type { DD_CONFIG_TYPE } from '@theui/core/types'

export let activeDropdownID: Writable<[]> = writable([])

export let getContainerClasses = (CONFIG: DD_CONFIG_TYPE) => {
  return  'dropdown relative inline-block ' + isAnimate(CONFIG) +
          (CONFIG?.alignRight ? ' dropdown-right ' : ' ') +
          getContainerSize(CONFIG?.size||'md')
}

export let getDropdownClasses = (CONFIG: DD_CONFIG_TYPE) => {
  return  (CONFIG?.animation||'slide-up') + rounded(CONFIG?.rounded||getConfig('isRounded')) +
          ' dropdown-content absolute list-none z-[25]' + isAnimate(CONFIG)
}

let getContainerSize = (size: string) => {
  return  size === 'sm' ? 'dropdown-sm' :
          size === 'md' ? 'dropdown-md' :
          size === 'lg' ? 'dropdown-lg' :
          size === 'full' ? 'dropdown-full' : 'dropdown-auto'
}

let isAnimate = (CONFIG: DD_CONFIG_TYPE) => {
  return animate(CONFIG?.animateSpeed||'fast', CONFIG?.animate||getConfig('animate'))
}