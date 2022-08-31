import { get } from 'svelte/store'
import { CHECKBOX_RADIO_CONFIG, INPUT_CONFIG, FILE_INPUT_CONFIG, LABEL_CONFIG } from '../config'
import { animate, rounded, getConfig } from '../utility'
import type { CHECKBOX_RADIO_CONFIG_TYPE, INPUT_CONFIG_TYPE, LABEL_STYLE_TYPE } from '@theui/core/types'

let CORE_CHECKBOX_RADIO_CONFIG: CHECKBOX_RADIO_CONFIG_TYPE = get(CHECKBOX_RADIO_CONFIG)
let CORE_INPUT_CONFIG: INPUT_CONFIG_TYPE = get(INPUT_CONFIG)
let CORE_FILE_INPUT_CONFIG: INPUT_CONFIG_TYPE = get(FILE_INPUT_CONFIG)
let CORE_LABEL_CONFIG: LABEL_STYLE_TYPE = get(LABEL_CONFIG)

export let containerCls = (userConfig: INPUT_CONFIG_TYPE): string => {
  let config: any = {}
  Object.assign(config, CORE_INPUT_CONFIG, userConfig)
  return  appearanceCls(config?.appearance||'default') + marginCls(config?.marginBottom||8) +
          ((config?.reset||getConfig('reset')) ? '' : (config?.grow ? ' flex-grow' : '')) +
          containerSize(config?.size||'md') + ' ' + (config?.containerClasses||'flex flex-col')
}

let appearanceCls = (appearance: string) => {
  return appearance == 'flat' ? 'input-flat' : appearance == 'material' ? 'input-material ' : 'input-default'
}

let marginCls = (marginBottom: number) => {
  return marginBottom == 0 ? ' mb-0' : marginBottom == 2 ? ' mb-2' : marginBottom == 4 ? ' mb-4' : marginBottom == 12 ? ' mb-12' : ' mb-8'
}

let containerSize = (size: string) => {
  return size == 'xs' ? ' input-xs' : size == 'sm' ? ' input-sm' : size == 'lg' ? ' input-lg' : size == 'xl' ? ' input-xl' : ' input-md'
}

export let getInputCls = (userConfig: INPUT_CONFIG_TYPE, attr: any): string => {
  let config: any = {}
  Object.assign(config, CORE_INPUT_CONFIG, userConfig)
  let cls = animate(config?.animateSpeed||getConfig('animateSpeed'), config?.animate||getConfig('animate')) +
            rounded(config?.rounded||getConfig('isRounded')) + ' ' +
            (typeof config?.inputClasses == 'string' ? config?.inputClasses : (config?.inputClasses[config?.appearance||'default'])) + ' ' +
            (typeof config?.inputFocusClasses == 'string' ? config?.inputFocusClasses : (config?.inputFocusClasses[config?.appearance||'default']))
  if(config?.reset||getConfig('reset')) return cls + ' ' + config?.theme

  cls +=  ' ' + inputSize(config?.size||'md') + (config?.theme||' bg-primary focus-within:bg-secondary') +
          (attr?.disabled ? ' disabled:bg-gray-200 dark:disabled:bg-gray-900 disabled:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed' : '') +
          (attr?.readonly ? ' read-only:bg-gray-200 dark:read-only:bg-gray-900 read-only:text-gray-500 read-only:opacity-50 read-only:pointer-events-non' : '')
  return cls
}

let inputSize = (size: string) => {
  return size == 'none' ? '' : size == 'xs' ? 'p-1 text-xs' : size == 'sm' ? 'px-3 py-2 text-sm' : size == 'lg' ? 'px-6 py-3 text-lg' : size == 'xl' ? 'px-8 py-4 text-xl' : 'px-4 py-3 text-base'
}

export let fileInputCls = (userConfig: INPUT_CONFIG_TYPE, attr: any): string => {
  let config: any = {}
  Object.assign(config, CORE_FILE_INPUT_CONFIG, userConfig)

  let cls = animate(config?.animateSpeed||getConfig('animateSpeed'), config?.animate||getConfig('animate')) +
            rounded(config?.rounded||getConfig('isRounded'), 'file') + ' '
  if(config?.reset||getConfig('reset')){
    return cls + (config?.theme||'') + ' ' + (config?.fileBtnClasses||'') + ' ' + (config.fileBtnTheme||'') + ' ' +
    ((typeof config.inputClasses == 'string' ? config.inputClasses : (config.inputClasses[config.appearance]||'')) + ' ' +
    (typeof config.inputFocusClasses == 'string' ? config.inputFocusClasses : (config.inputFocusClasses[config.appearance]||'')))
  }

  return cls + fineInputSize(config?.inputClasses||'md') + (attr?.disabled ? ' disabled:bg-gray-200 dark:disabled:bg-gray-900 disabled:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed' : '') +  (attr?.readonly ? ' read-only:bg-gray-200 dark:read-only:bg-gray-900 read-only:text-gray-500 read-only:opacity-50 read-only:pointer-events-non' : '') + ' ' +
  (config?.theme||'bg-primary focus-within:bg-secondary') + ' ' +
  (config?.fileBtnClasses||'file:mr-4 file:border-0 file:text-sm file:font-semibold file:cursor-pointer') + ' ' +
  (config?.fileBtnTheme||'file:bg-tertiary hover:file:bg-brand hover:file:text-on-brand dark:file:text-white text-gray-500') + ' ' +
  ((typeof config.inputClasses == 'string' ? config.inputClasses : (config.inputClasses[config.appearance||'default'])) + ' ' +
  (typeof config.inputFocusClasses == 'string' ? config.inputFocusClasses : (config.inputFocusClasses[config.appearance||'default'])))
}

let fineInputSize = (size: string) => {
  return size == 'xs' ? 'file:px-1 file:py-1 pr-1 text-xs' : size == 'sm' ? 'file:px-3 pr-3 file:py-2 text-sm' : size == 'lg' ? 'file:px-6 pr-6 file:py-3 text-lg' : size == 'xl' ? 'file:px-8 pr-8 file:py-4 text-xl' : 'file:px-4 pr-4 file:py-3 text-base'
}

export let inputLabelStyle = (userConfig: INPUT_CONFIG_TYPE) => {
  let config: any = {}
  Object.assign(config, CORE_LABEL_CONFIG, userConfig.labelStyle)
  return  (config?.color||'text-inherit') + ' ' +
          (config?.textSize||'text-xs') + ' ' +
          (config?.fontWeight||'font-semibold') + ' ' +
          (config?.cls||'uppercase') + marginCls(config?.marginBottom||2)
}

export let labelClasses = (userConfig: LABEL_STYLE_TYPE) => {
  let config: any = {}
  Object.assign(config, CORE_LABEL_CONFIG, userConfig)
  return  (config?.color||'text-inherit') + ' ' +
          (config?.textSize||'text-xs') + ' ' +
          (config?.fontWeight||'font-semibold') + ' ' +
          (config?.cls||'uppercase') + marginCls(config?.marginBottom||2)
}

export let isSelected = (d: any, value: any) => {
  return (d.selected || value==d.value || value==d.text || value == d)
}

export let getCheckRadioClass = (userConfig: CHECKBOX_RADIO_CONFIG_TYPE, type:string = ''): string => {
  let config: any = {}
  Object.assign(config, CORE_CHECKBOX_RADIO_CONFIG, userConfig)
  let cls = (config?.class||'text-brand focus:ring-brand dark:checked:bg-brand') + ' ' +
            (config?.size == 'lg' ? 'checkbox-lg h-6 w-6' : config?.size == 'xl' ? 'checkbox-lg h-8 w-8' : 'checkbox-md h-4 w-4') +
            ((config?.reset||getConfig('reset')) ? '' : ' bg-gray-100 dark:bg-gray-700 border border-gray-400 dark:border-transparent')

  if(type !== 'radio'){
    if((config?.rounded||getConfig('isRounded')) && !config?.size) cls += ' rounded'
    else cls += rounded(config?.rounded||getConfig('isRounded'))
  }
  return cls
}

export let getHeightFixClass = (userConfig: CHECKBOX_RADIO_CONFIG_TYPE, helper: string): string => {
  if(helper === null || helper === '') return ''
  let config: any = {}
  Object.assign(config, CORE_CHECKBOX_RADIO_CONFIG, userConfig)
  return config?.size == 'lg' ? 'h-8' : config?.size == 'xl' ? 'h-10' : 'h-6'
}
