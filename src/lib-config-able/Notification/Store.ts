import { writable, get } from 'svelte/store'
import { NOTIFY_CONFIG } from '../config'
import { rounded, token, getConfig } from '../utility'
import type { NOTIFY_CONFIG_TYPE } from '@theui/core/types'

export const notifications = writable([])
let configurations = get(NOTIFY_CONFIG)

export let notify = ( msg: string, type: string = 'error', config: NOTIFY_CONFIG_TYPE = {}): string => {
  let CONFIG: any = {}
  Object.assign(CONFIG, configurations, {id: token()}, config )
  notifications.update((all) => [...all, {msg, type, CONFIG},])
  if(CONFIG?.removeAfter !== 0){
    setTimeout(() => {removeNotification(CONFIG.id)}, CONFIG?.removeAfter||5000)
  }
  return CONFIG.id;
}

export let removeNotification = (id: string) => {
  notifications.update((all) => all.filter((toast) => toast.CONFIG.id !== id));
}

export let getClasses = (config: NOTIFY_CONFIG_TYPE, type: string): string => {
  return `notification ${rounded(config?.rounded||getConfig('isRounded'))} 
  ${config?.reset||getConfig('reset') ? '' : 'px-4 py-3 shadow-2xl shadow-black/50 cursor-pointer'} 
  ${getTheme(config, type)}` + (config.style == 'flat' ? ' notification-flat' : ' notification-default')
}

let getTheme = (config: NOTIFY_CONFIG_TYPE, type: string): string => {
  if(config?.classes) return config.classes
  const themes = {
    default : {
      error: 'bg-red-500 text-white',
      info: 'bg-sky-500 text-white',
      success: 'bg-green-500 text-white',
      warning: 'bg-yellow-500 text-white',
    }
  }
  return themes[config?.style||'default'][type]  
}
