import type { NOTIFY_CONFIG_TYPE } from '@theui/core/types'
import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'
import { rounded, token } from '../utility'
type NOTIFICATION_TYPE = 'error'| 'info'| 'success' | 'warning'

export const notifications: Writable<any> = writable([])

export let notify = (msg: string, type: NOTIFICATION_TYPE = 'error', config: NOTIFY_CONFIG_TYPE = {}): string => {
  let C: any = {animate : true, removeOnClick : true, reset : false}
  Object.assign(C, {id: token()}, config )
  notifications.update((all) => [...all, {msg, type, CONFIG: C}])
  if(C?.removeAfter !== 0){
    setTimeout(() => {removeNotification(C.id)}, C?.removeAfter||5000)
  }
  return C.id;
}

export let removeNotification = (id: string) => {
  notifications.update((all) => all.filter((toast: any) => toast.CONFIG.id !== id));
}

export let getClasses = (config: NOTIFY_CONFIG_TYPE, type: string): string => {
  return `notification ${rounded(config?.rounded||'md')} 
  ${config.reset ? '' : 'px-4 py-3 shadow-2xl shadow-black/50 cursor-pointer'} 
  ${getTheme(config, type)}` + (config.style == 'flat' ? ' notification-flat' : ' notification-card')
}

let getTheme = (config: NOTIFY_CONFIG_TYPE, type: string): string => {
  if(config?.class) return config.class
  const themes: any = {
    card : {
      error: 'bg-red-500 text-white',
      info: 'bg-sky-500 text-white',
      success: 'bg-green-500 text-white',
      warning: 'bg-yellow-500 text-white',
    }
  }
  return themes[config?.style||'card'][type]
}
