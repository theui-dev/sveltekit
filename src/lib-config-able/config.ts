import { get, writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type {
  SITE,
  CORE,
  ACCORDION_CONFIG_TYPE,
  BUTTON_CONFIG_TYPE,
  COLLAPSE_CONFIG_TYPE,
  DD_CONFIG_TYPE,
  MODAL_CONFIG_TYPE,
  NAV_CONFIG_TYPE,
  NOTIFY_CONFIG_TYPE,
  OFFCANVAS_CONFIG_TYPE,
  PROGRESS_CONFIG_TYPE,
  TAB_CONFIG_TYPE,
  TABLE_CONFIG_TYPE,
  TOOLTIP_CONFIG_TYPE,
  INPUT_CONFIG_TYPE,
  CHECKBOX_RADIO_CONFIG_TYPE,
  LABEL_STYLE_TYPE,
} from "@theui/core/types"

let SITE_CONFIG : Writable<SITE> = writable({
  siteName          : 'Sveltekit Website',
  slogan            : '',
  description       : 'This site is a demo of TheUI component library of Sveltekit',
  keywords          : null,
  logoPath          : null,
  imgPath           : null,
  siteSchema        : null,
  businessSchema    : null,
  lang              : 'en',
  fbAppID           : null,
  pageType          : null,
  twitterCardType   : null,
  twitterID         : null,
  twitterCreatorID  : null,
  video             : null,
  gtmCode           : null,
})

let THEUI_CONFIG : Writable<CORE> = writable({
  animate               : true,
  animateSpeed          : 'fast',
  isRounded             : true,
  reset                 : false,
  toggleTheme           : true,
})

let ACCORDION_CONFIG : Writable<ACCORDION_CONFIG_TYPE> = writable({
  contentActiveClass    : {
    'default' : 'border border-gray-300 dark:border-gray-700',
    'flush'   : 'border-b border-gray-300 dark:border-gray-700'
  },
  contentClass    : {
    'default' : 'border border-gray-300 dark:border-gray-700',
    'flush'   : 'border-b border-gray-300 dark:border-gray-700'
  },
  titleActiveClass      : {
    'default' : 'border border-brand bg-brand text-on-brand',
    'flush'   : 'border-b border-brand bg-brand/10 text-brand dark:text-on-brand'
  },
  titleClass            : {
    'default' : 'border border-gray-300 dark:border-gray-700',
    'flush'   : 'border-b border-gray-300 dark:border-gray-700'
  },
  type        : 'default',
})

let BUTTON_CONFIG : Writable<BUTTON_CONFIG_TYPE> = writable({
  outline       : false,
  shadow        : 'none',
})

let COLLAPSE_CONFIG : Writable<COLLAPSE_CONFIG_TYPE> = writable({})

// let DROPDOWN_ITEM_CONFIG : Writable<DD_ITEM_CONFIG_TYPE> = writable({
//   // --active            : false,
//   // activeClasses    : 'bg-tertiary',
//   // classes          : 'bg-transparent hover:bg-tertiary',
//   dividerClasses      : 'border-tertiary',
//   // headerClasses       : 'p-4 font-medium text-xs opacity-50',
//   // --iconAfterSize       : 1,
//   // --iconAfterClasses    : 'fill-current opacity-75',
//   // --iconBeforeSize      : 1,
//   // --iconBeforeClasses   : 'fill-current opacity-75',
//   // reset             : THEUI_CONFIG.reset,
// })

let DROPDOWN_CONFIG : Writable<DD_CONFIG_TYPE> = writable({
  alignRight          : false,
  backdrop            : false,
  block               : false,
  closeOnClick        : true,
  closeOnEsc          : true,
  closeOnOutsideClick : true,
  standalone          : true,
})

let MODAL_CONFIG : Writable<MODAL_CONFIG_TYPE> = writable({
  backdrop        : true,
  bodyClasses     : '',
  closeBtn        : true,
  closeOnEsc      : true,
  staticBackdrop  : false,
})

let NAV_CONFIG : Writable<NAV_CONFIG_TYPE> = writable({
  // animate               : THEUI_CONFIG.animate,
  // animateSpeed          : THEUI_CONFIG.animateSpeed,
  // classes                   : 'bg-transparent px-8',
  // height                : 'md',
  // reset                 : false,
  // rounded               : false,
  scrollAmountToShrink  : 32,
  scrollAmountToHide    : 64,
  scrollBehavior        : 'shrinkAndHide',
  scrollTheme           : 'bg-white dark:bg-secondary shadow-md',
})

let NOTIFY_CONFIG : Writable<NOTIFY_CONFIG_TYPE> = writable({})

let OFFCANVAS_CONFIG : Writable<OFFCANVAS_CONFIG_TYPE> = writable({
  backdrop: true,
  closeOnEsc: true,
  staticBackdrop: false,
})

let PROGRESS_CONFIG : Writable<PROGRESS_CONFIG_TYPE> = writable({})

let TABLE_CONFIG : Writable<TABLE_CONFIG_TYPE> = writable({
  border        : 'y',
  borderColor   : 'border-gray-200/80 dark:border-gray-800/80',
  hover         : true,
  // reset         : THEUI_CONFIG.reset,
  // size          : 'md',
  stripe        : false,
  // containerClasses  : '',
  // tableClasses      : '',
  theadClasses    : 'bg-gray-100 dark:bg-gray-800 text-left uppercase',
  // tbodyClasses      : 'text-left',
  trClasses       : '',
})

let TAB_CONFIG : Writable<TAB_CONFIG_TYPE> = writable({
  activeTabClasses  : {
    pills : 'bg-brand text-white hover:bg-brand-active',
    tabs : 'border-0 border-b-2 border-brand text-brand bg-primary',
  },
  tabClasses        : {
    pills : 'bg-secondary',
    tabs  : 'border-0 border-b-2 border-secondary bg-primary',
  }
})

let TOOLTIP_CONFIG : Writable<TOOLTIP_CONFIG_TYPE> = writable({})




// FORM CONTROLS AND DATA CONFIGS
let INPUT_CONFIG : Writable<INPUT_CONFIG_TYPE> = writable({
  // appearance      : 'default',
  // containerClasses    : 'flex flex-col',
  grow            : false,
  inputClasses      : {
    'default'   : 'bg-primary focus-within:bg-secondary border border-tertiary ring-tertiary w-full',
    'flat'      : 'border-0 border-b-2 border-tertiary outline-0 px-0 w-full',
    'material'  : '',
  },
  inputFocusClasses : {
    'default'   : 'focus-within:border-brand focus-within:ring-brand',
    'flat'      : 'border-0 border-b-2 border-brand outline-0 px-0 w-full',
    'material'  : '',
  },
  labelStyle      : null,
  // marginBottom    : 8,
  // reset           : THEUI_CONFIG.reset,
  // rounded         : THEUI_CONFIG.isRounded,
  // size            : 'md',
})

let FILE_INPUT_CONFIG : Writable<INPUT_CONFIG_TYPE> = writable({
  // appearance      : 'default',
  // containerClasses    : 'flex flex-col',
  // fileBtnClasses    : 'file:mr-4 file:border-0 file:text-sm file:font-semibold file:cursor-pointer file:bg-tertiary hover:file:bg-brand hover:file:text-on-brand dark:file:text-white text-gray-500',
  grow            : false,
  inputClasses      : {
    'default'   : 'bg-primary focus-within:bg-secondary dark:ring:border-gray-900 w-full',
    'flat'      : 'outline-0 px-0 w-full',
    'material'  : '',
  },
  inputFocusClasses : {
    'default'   : 'focus:ring-brand',
    'flat'      : 'border-0 border-b-2 outline-0 px-0 w-full',
    'material'  : '',
  },
  labelStyle      : null,
  // marginBottom    : 8,
  // reset           : THEUI_CONFIG.reset,
  // rounded         : THEUI_CONFIG.isRounded,
  // size            : 'md',
})

let LABEL_CONFIG : Writable<LABEL_STYLE_TYPE> = writable({
  // classes         : 'uppercase font-semibold',
  // color         : 'text-inherit',
  // marginBottom  : 2,
  // textSize      : 'text-xs',
})

let CHECKBOX_RADIO_CONFIG : Writable<CHECKBOX_RADIO_CONFIG_TYPE> = writable({
  // classes     : '',
  disabled  : false,
  // rounded   : THEUI_CONFIG.isRounded,
  // reset     : THEUI_CONFIG.reset,
  // size      : 'md',
})

export { SITE_CONFIG, THEUI_CONFIG, ACCORDION_CONFIG, BUTTON_CONFIG, COLLAPSE_CONFIG, // DROPDOWN_ITEM_CONFIG,
  DROPDOWN_CONFIG, MODAL_CONFIG, NAV_CONFIG, NOTIFY_CONFIG, OFFCANVAS_CONFIG, PROGRESS_CONFIG,
  TAB_CONFIG, TABLE_CONFIG, TOOLTIP_CONFIG, INPUT_CONFIG, FILE_INPUT_CONFIG, LABEL_CONFIG, CHECKBOX_RADIO_CONFIG }
