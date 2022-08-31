import type { ANIMATE_SPEED_TYPE, ROUNDED_TYPE, SHADOW_TYPE } from '@theui/core/types'

// =================================
import { get } from 'svelte/store'
import { THEUI_CONFIG } from './config'
let CORE_CONFIG = get(THEUI_CONFIG)
// =================

let randomNum = (min: number = 10, max: number = 99): number => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

let token = (prefix: string = "id"): string => {
  let n = Date.now()
	return prefix + (++n).toString(36) + randomNum()
}

let animate = (speed: ANIMATE_SPEED_TYPE, animate: boolean, type: string = ''): string => {
  if(type == 'file'){
    return  (' ') + (
      !animate ? 'file:tui-no-animate' :
      'file:tui-animate file:transition-all file:ease-in-out ' +
      (speed=='faster' ? 'file:duration-100' : speed=='fast' ? 'file:duration-150' : 
      speed=='slow' ? 'file:duration-500' : speed=='slower' ? 'file:duration-700' : 'file:duration-300')
    )
  }

  let duration =  (' tui-animate ease-in-out ') + (speed=='faster' ? 'duration-100' : speed=='fast' ? 'duration-150' :
                  speed=='slow' ? 'duration-500' : speed=='slower' ? 'duration-700' : 'duration-300')

  if(type == 'color')     return !animate ? ' tui-no-animate' : duration + ' transition-colors'
  if(type == 'opacity')   return !animate ? ' tui-no-animate' : duration + ' transition-opacity'
  if(type == 'shadow')    return !animate ? ' tui-no-animate' : duration + ' transition-shadow'
  if(type == 'transform') return !animate ? ' tui-no-animate' : duration + ' transition-transform'

  return  !animate ? 'tui-no-animate' : duration + ' transition-all'
}

let rounded = (value: ROUNDED_TYPE|boolean, side:string = 'all'): string => {
  if(value===false || value=='none'){
    return side != 'file' ? ' rounded-none' : ' file:rounded-none'
  }

  if(side == 'top'){
    return  ' ' + (
      (value=='sm')   ? 'rounded-t' :
      (value=='lg')   ? 'rounded-t-lg' :
      (value=='xl')   ? 'rounded-t-xl' :
      (value=='full') ? 'rounded-t-full' : 'rounded-t-md'
    )
  }

  if(side == 'right'){
    return  ' ' + (
      (value=='sm')   ? 'rounded-r' :
      (value=='lg')   ? 'rounded-r-lg' :
      (value=='xl')   ? 'rounded-r-xl' :
      (value=='full') ? 'rounded-r-full' : 'rounded-r-md'
    )
  }

  if(side == 'bottom'){
    return  ' ' + (
      (value=='sm')   ? 'rounded-b' :
      (value=='lg')   ? 'rounded-b-lg' :
      (value=='xl')   ? 'rounded-b-xl' :
      (value=='full') ? 'rounded-b-full' : 'rounded-b-md'
    )
  }

  if(side == 'left'){
    return  ' ' + (
      (value=='sm')   ? 'rounded-l' :
      (value=='lg')   ? 'rounded-l-lg' :
      (value=='xl')   ? 'rounded-l-xl' :
      (value=='full') ? 'rounded-l-full' : 'rounded-l-md'
    )
  }

  if(side == 'file'){
    return  ' ' + (
      (value=='sm')   ? 'file:rounded' :
      (value=='lg')   ? 'file:rounded-lg' :
      (value=='xl')   ? 'file:rounded-xl' :
      (value=='full') ? 'file:rounded-full' : 'file:rounded-md'
    )
  }

  return  ' ' + (
    (value=='sm')   ? 'rounded' :
    (value=='lg')   ? 'rounded-lg' :
    (value=='xl')   ? 'rounded-xl' :
    (value=='full') ? 'rounded-full' : 'rounded-md'
  )

}

let shadow = (size?: SHADOW_TYPE|boolean) => {
  return  (' ') + ((size==='none') ? '!shadow-none' :
          (size==='md' || size===true) ? 'shadow-md' :
          (size==='sm') ? 'shadow-sm' :
          (size==='lg') ? 'shadow-lg' :
          (size==='xl') ? 'shadow-xl' :
          (size==='2xl') ? 'shadow-2xl' :
          (size==='inner') ? 'shadow-inner' : '')
}

let getConfig = (config: string): any => {
	return CORE_CONFIG[config]||false
}

export { randomNum, token, animate, rounded, shadow, getConfig }