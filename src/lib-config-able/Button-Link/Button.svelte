<script lang='ts'>
  import type { BUTTON_CONFIG_TYPE } from '@theui/core/types'
  import { animate, rounded, shadow, getConfig, token } from '../utility'
  import { BUTTON_CONFIG } from '../config'

  export let config     : BUTTON_CONFIG_TYPE = {}
  export let label      : string = ''
  export let type       : 'button' | 'submit' | 'reset' = 'button'

  let C: any = {}
  Object.assign(C, $BUTTON_CONFIG, config)

  let size = (size: string|0): string => {
    let reset = getConfig('reset') || $$props.class
    return  size=='xs' ? 'btn-xs ' + (reset ? '' : 'py-1 px-2 text-xs ') :
      size=='sm' ? 'btn-sm ' + (reset ? '' : 'px-3 py-2 text-sm ') :
      size=='md' ? 'btn-md ' + (reset ? '' : 'px-4 py-2.5 text-base ') :
      size=='lg' ? 'btn-lg ' + (reset ? '' : 'px-6 py-3 text-lg ') :
      size=='xl' ? 'btn-xl ' + (reset ? '' : 'px-8 py-4 text-xl ') : (reset ? 'btn-0 ' : 'p-0 ')
  }

  $: classes = (C?.outline ? 'btn-outline ' : '') + size(C?.size||'md')
  $: if(getConfig('reset')){
    classes += 'btn-reset ' + (C?.activeClass ? 'btn-active' : '')
  }else{
    classes += 'inline-flex items-center justify-center gap-2 select-none border no-underline ' +
    (!C?.activeClass
      ? ((C?.outline === true ? (C?.class||'border-brand text-brand') : (C?.class||'bg-brand border-brand text-on-brand')) + ' hover:bg-brand-active hover:border-brand-active hover:text-on-brand ')
      : 'btn-active ' + (C?.activeClass == true ? 'border-brand-active bg-brand-active text-on-brand ' : C?.activeClass)
    ) +
    rounded(C?.rounded||getConfig('isRounded')) + animate(getConfig('animateSpeed')) + shadow(C?.shadow)
  }

</script>

<button class={$$props.class ? $$props.class : classes} {type} {...$$restProps}
  aria-disabled={$$restProps.disabled && $$restProps.disabled==true}
  on:blur on:click on:focus on:dblclick>
  <slot name='beforeLabel'></slot>
  <slot name='label'>{label}</slot>
  <slot name='afterLabel'></slot>
</button>

<style lang='postcss'>
  .btn.btn-md{
    @apply px-4 py-2.5 text-base;
  }
  .btn.btn-xs{
    @apply py-1 px-2 text-xs;
  }
  .btn.btn-sm{
    @apply px-3 py-2 text-sm;
  }
  .btn.btn-lg{
    @apply px-6 py-3 text-lg;
  }
  .btn.btn-xl{
    @apply px-8 py-4 text-xl;
  }
  .btn.btn-0{
    @apply p-0;
  }
  button[disabled]:not(.btn-outline){
    @apply opacity-75 pointer-events-none;
  }
  button[disabled].btn-outline{
    @apply opacity-50 pointer-events-none;
  }
</style>
