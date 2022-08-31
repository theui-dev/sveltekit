// import { get } from 'svelte/store'
// import { BUTTON_CONFIG } from '../config'
// import type { BUTTON_CONFIG_TYPE } from '@theui/core/types'
// import { animate, rounded, shadow, getConfig } from '../utility'

// let CONFIG: BUTTON_CONFIG_TYPE = get(BUTTON_CONFIG)

// export let getClasses = (userConfig: BUTTON_CONFIG_TYPE): string => {
//   let config: any = {}
//   Object.assign(config, CONFIG, userConfig)

//   if(getConfig('reset')){
//     return (config?.outline ? 'btn-outline ' : ' ') + size(config?.size||'md', true)
//   }

//   return 'inline-flex items-center justify-center gap-2 select-none border no-underline ' +
//   theme(config) + rounded(config?.rounded||getConfig('isRounded')) +
//   animate(getConfig('animateSpeed'), getConfig('animate')) +
//   shadow(config?.shadow) + (config?.outline ? 'btn-outline ' : ' ')
//   + size(config?.size||'md', getConfig('reset'))
// }

// let size = (size: string|0, reset: boolean): string => {
//   return  size=='xs' ? 'btn-xs ' + (reset ? '' : 'py-1 px-2 text-xs ') :
//           size=='sm' ? 'btn-sm ' + (reset ? '' : 'px-3 py-2 text-sm ') :
//           size=='md' ? 'btn-md ' + (reset ? '' : 'px-4 py-2.5 text-base ') :
//           size=='lg' ? 'btn-lg ' + (reset ? '' : 'px-6 py-3 text-lg ') :
//           size=='xl' ? 'btn-xl ' + (reset ? '' : 'px-8 py-4 text-xl ') : (reset ? 'btn-0 ' : 'p-0 ')
// }

// export let theme = (config: BUTTON_CONFIG_TYPE): string => {
//   let cls: string = ' '
//   // Set theme
//   cls += config?.outline === true ? 'border-brand text-brand ' : 'bg-brand border-brand text-on-brand '
//   // Hover-able styles
//   if(config?.hover !== false){
//     cls +=  config?.hover == true ? 'hover:bg-brand-active hover:border-brand-active hover:text-on-brand ' : config?.hover + ' '
//   }
//   return cls
// }