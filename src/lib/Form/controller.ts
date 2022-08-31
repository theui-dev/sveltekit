import { animate, rounded } from "theui"
import type { INPUT_CONFIG_TYPE } from 'theui/types'

export let getStyle = (variant: string) : string => {
  let cls = variant == 'filled' ? 'bg-gray-50 dark:bg-gray-900 text-default focus:ring-brand border border-gray-200 dark:border-gray-600 focus:border-brand focus:bg-transparent' :
  variant == 'bordered' ? 'border border-gray-100 dark:border-gray-700 text-default focus:border-brand bg-transparent focus:ring-brand' :
  variant == 'flat'     ? 'border-0 border-b-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-default focus:ring-brand focus:border-brand focus:bg-transparent' : ''
  return ' ' + cls
}

export let getSize = (size: string, file: boolean = false) : string => {
  if(file){
    return size == 'sm' ? ' file:p-2 file:text-sm' : size == 'md' ? ' file:p-3' : size == 'lg' ? ' file:p-4 file:text-xl' : size == 'xl' ? ' file:p-5 file:text-2xl' : ''
  }
  return size == 'sm' ? ' p-2 text-sm' : size == 'md' ? ' p-3' : size == 'lg' ? ' p-4 text-xl' : size == 'xl' ? ' p-5 text-2xl' : ''
}

export let getContainerClass = (config: INPUT_CONFIG_TYPE): string => {
  return  config?.reset ? 'input-box input-box-reset ' : ('input-box flex flex-col gap-2 ' + (config?.inputGrow ? 'flex-grow ' : ''))
}

export let getInputClass = (config: INPUT_CONFIG_TYPE, attr: any): string => {
  if(config?.reset) return ''
  let cls = animate(config?.animate) + (config?.variant == 'flat' ? rounded(config.rounded, 'top') : rounded(config.rounded))
  if(attr?.disabled){
    cls += ' disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50 disabled:select-none'
  }
  if(attr?.readonly){
    cls += ' read-only:bg-gray-100 dark:read-only:bg-gray-900 read-only:pointer-events-none read-only:opacity-50'
  }
  return cls
}

export let getCheckRadioClass = (config: object, type:string = 'checkbox'): string => {
  let cls = type + ' '
  if(type == "checkbox"){
    cls += ((config?.size == 'sm' ? 'checkbox-sm h-4 w-4' : config?.size == 'md' ? 'checkbox-md h-6 w-6' : config?.size == 'lg' ? 'checkbox-md h-8 w-8' : '') + rounded(config?.rounded))
  }else{
    cls += config?.size == 'sm' ? 'radio-sm h-4 w-4' : config?.size == 'md' ? 'radio-md h-6 w-6' : config?.size == 'lg' ? 'radio-md h-8 w-8' : ''
  }
  cls += ' bg-gray-100 dark:bg-gray-700 border border-gray-400 dark:border-transparent text-brand focus-within:ring-brand dark:checked:bg-brand !ring-offset-primary'
  return cls
}

export let getCheckRadioStateClass = (attr: any): string => {
  if(attr?.disabled) return ' cursor-not-allowed opacity-50 select-none'
  if(attr?.readonly) return ' pointer-events-none opacity-50'
  return ''
}

export let getFileInputCls = (config: INPUT_CONFIG_TYPE, attr: any): string => {
  if(config?.reset) return ''

  let cls = ' file:px-4 focus:ring-brand focus:border-brand focus:outline-brand '

  if(config.variant !== 'flat'){
    return getInputClass(config, attr) + getStyle(config.variant) + getSize(config.size, true) + cls + (config?.buttonStyle||'')
  }else{
    cls += animate(config?.animate) + ' text-gray-500/50' + getSize(config.size, true) + cls + (config?.buttonStyle||'')
    if(attr?.disabled){
      cls += ' disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50 disabled:select-none'
    }
    if(attr?.readonly){
      cls += ' read-only:bg-gray-100 dark:read-only:bg-gray-900 read-only:pointer-events-none read-only:opacity-50'
    }
    return cls
  }

  // let cls = animate(config?.animate) + rounded(config?.rounded, 'file') + ' ' + (config?.class||'') + ' ' + (config?.buttonStyle||'') +
  // ((typeof config.inputClass == 'string' ? config.inputClass : (config.inputClass[config.appearance]||'')) + ' ' +
  // (typeof config.inputFocusClasses == 'string' ? config.inputFocusClasses : (config.inputFocusClasses[config.appearance]||'')))
  // return cls + fineInputSize(config?.inputClass||'md') + (attr?.disabled ? ' disabled:bg-gray-200 dark:disabled:bg-gray-900 disabled:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed' : '') +  (attr?.readonly ? ' read-only:bg-gray-200 dark:read-only:bg-gray-900 read-only:text-gray-500 read-only:opacity-50 read-only:pointer-events-non' : '') + ' ' +
  // (config?.theme||'bg-primary focus-within:bg-secondary') + ' ' +
  // (config?.fileBtnClasses||'file:mr-4 file:border-0 file:text-sm file:font-semibold file:cursor-pointer') + ' ' +
  // (config?.fileBtnTheme||'file:bg-tertiary hover:file:bg-brand hover:file:text-on-brand dark:file:text-white text-gray-500') + ' ' +
  // ((typeof config.inputClass == 'string' ? config.inputClass : (config.inputClass[config.variant])) + ' ' +
  // (typeof config.inputFocusClasses == 'string' ? config.inputFocusClasses : (config.inputFocusClasses[config.variant])))
}

let fineInputSize = (size: string) => {
  return size == 'xs' ? 'file:px-1 file:py-1 pr-1 text-xs' : size == 'sm' ? 'file:px-3 pr-3 file:py-2 text-sm' : size == 'lg' ? 'file:px-6 pr-6 file:py-3 text-lg' : size == 'xl' ? 'file:px-8 pr-8 file:py-4 text-xl' : 'file:px-4 pr-4 file:py-3 text-base'
}
























// export let inputLabelStyle = (userConfig: INPUT_CONFIG_TYPE) => {
//   let config: any = {}
//   Object.assign(config, CORE_LABEL_CONFIG, userConfig.labelStyle)
//   return  (config?.color||'text-inherit') + ' ' +
//           (config?.textSize||'text-xs') + ' ' +
//           (config?.fontWeight||'font-semibold') + ' ' +
//           (config?.cls||'uppercase') + marginCls(config?.marginBottom||2)
// }

// export let labelClasses = (userConfig: LABEL_STYLE_TYPE) => {
//   let config: any = {}
//   Object.assign(config, CORE_LABEL_CONFIG, userConfig)
//   return  (config?.color||'text-inherit') + ' ' +
//           (config?.textSize||'text-xs') + ' ' +
//           (config?.fontWeight||'font-semibold') + ' ' +
//           (config?.cls||'uppercase') + marginCls(config?.marginBottom||2)
// }

// export let isSelected = (d: any, value: any) => {
//   return (d.selected || value==d.value || value==d.text || value == d)
// }