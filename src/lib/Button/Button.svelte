<script lang='ts'>
  import type { BUTTON_CONFIG_TYPE } from "theui/types"
  import { animate, rounded, shadow, token } from "theui"
  import { Svg } from "../index"

  export let config     : BUTTON_CONFIG_TYPE = {}
  export let label      : string = ''
  export let type       : 'button' | 'submit' | 'reset' = 'button'

  export let href         : string = undefined
  export let externalIcon : boolean = true
  export let prefetch     : boolean = ""

  let C = {animate : 'fast', outline : false, shadow : 'none'}
  Object.assign(C, config)

  let size = (size: string|0): string => {
    return  size=='xs' ? 'btn-xs ' + ($$props.class ? '' : 'py-1 px-2 text-xs ') :
      size=='sm' ? 'btn-sm ' + ($$props.class ? '' : 'px-3 py-2 text-sm ') :
      size=='md' ? 'btn-md ' + ($$props.class ? '' : 'px-4 py-2.5 text-base ') :
      size=='lg' ? 'btn-lg ' + ($$props.class ? '' : 'px-6 py-3 text-lg ') :
      size=='xl' ? 'btn-xl ' + ($$props.class ? '' : 'px-8 py-4 text-xl ') : ($$props.class ? 'btn-0 ' : 'p-0 ')
  }

  $: classes = 'btn ' + (C?.outline ? 'btn-outline ' : '') + size(C?.size||'md')
  $: if($$props.class){
    classes += $$props.class + (C?.activeClass ? ' btn-active' : '')
  }else{
    classes += 'inline-flex items-center justify-center gap-2 select-none border no-underline ' +
    (!C?.activeClass
      ? ((C?.outline === true ? (C?.class||'border-brand text-brand hover:bg-brand hover:border-brand hover:text-on-brand') : (C?.class||'bg-brand border-brand text-on-brand hover:bg-brand-active hover:border-brand-active hover:text-on-brand ')))
      : 'btn-active ' + (C?.activeClass == true ? (C?.outline ? 'border-brand bg-brand text-on-brand ' : 'border-brand-active bg-brand-active text-on-brand ') : C?.activeClass)
    )
  }
  $: classes += rounded(C?.rounded||'md') + animate(C?.animate) + shadow(C?.shadow)
</script>

{#if href}
  <a {href} {...$$restProps} class={$$props.class ? $$props.class : classes}
    data-sveltekit-prefetch={prefetch} on:blur on:click on:focus on:dblclick
    aria-label={label} aria-disabled={$$restProps.disabled && $$restProps.disabled==true}>
    <slot name='beforeLabel'></slot>
    <slot name='label'>{label}</slot>
    <slot name='afterLabel'></slot>
    {#if externalIcon && $$restProps.target}
    <span class="self-start">
      <Svg size=.6>
        <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
        <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
      </Svg>
    </span>
    {/if}
  </a>
{:else}
  <button {...$$restProps} class={classes} {type}
    aria-disabled={$$restProps.disabled && $$restProps.disabled==true}
    on:blur on:click on:focus on:dblclick>
    <slot name='beforeLabel'></slot>
    <slot name='label'>{label}</slot>
    <slot name='afterLabel'></slot>
  </button>
{/if}

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
