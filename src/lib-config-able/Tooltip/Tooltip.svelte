<script lang="ts">
  import { animate, rounded, getConfig } from '../utility'
  import { TOOLTIP_CONFIG } from '../config'
  import type { TOOLTIP_CONFIG_TYPE } from '@theui/core/types'

  export let text: string = ''
  export let config: TOOLTIP_CONFIG_TYPE = {}

  let CONFIG: TOOLTIP_CONFIG_TYPE = {}
  Object.assign(CONFIG, $TOOLTIP_CONFIG, config)

  let containerCls = () => {
    let inline = CONFIG.inline === undefined ? true : CONFIG.inline
    return  'tooltip-container relative ' +
            (inline ? 'inline-block ' : '') +
            (CONFIG?.animation||'fade')
  }

  let tooltipCls = () => {
    let position = CONFIG?.position || 'top'
    let cls = ' tooltip absolute min-w-[128px] max-w-[280px] ' +
    (CONFIG?.reset || getConfig('reset') ? '' : 'z-50 text-sm text-center ') +
    animate(CONFIG?.animateSpeed||'normal', CONFIG?.animate||getConfig('animate')) +
    (position === 'left' ? ' tooltip-left' : position === 'right' ? ' tooltip-right' : position === 'bottom' ?   ' tooltip-bottom' : ' tooltip-top') + rounded((getConfig('isRounded') ? CONFIG?.rounded || 'sm' : false))
    return cls
  }
</script>

<div class={containerCls()}>
  <span class={($$props.class||'p-2 text-white') + tooltipCls()} style="--bg-color: {CONFIG?.bgColor||"#1F2937"};">
    {@html text}
  </span>
  <slot></slot>
</div>

<style lang="postcss">
  .tooltip {
    background-color: var(--bg-color);
    @apply invisible transform;
  }
  .tooltip-container:hover .tooltip {
    @apply visible;
  }
  /* Animation */
  .tooltip-container.fade .tooltip {
    @apply opacity-0;
  }
  .tooltip-container:hover .tooltip {
    @apply opacity-100;
  }
  /* Position */
  .tooltip.tooltip-top {
    @apply -top-3 left-1/2 -translate-x-1/2 -translate-y-full;
  }
  .tooltip.tooltip-right {
    @apply -right-3 top-1/2 translate-x-full -translate-y-1/2;
  }
  .tooltip.tooltip-bottom {
    @apply -bottom-3 left-1/2 -translate-x-1/2 translate-y-full;
  }
  .tooltip.tooltip-left {
    @apply -left-3 top-1/2 -translate-x-full -translate-y-1/2;
  }
  /* Arrow */
  .tooltip::after {
    content: " ";
    @apply absolute h-0 w-0 transform border-transparent border-8;
  }
  .tooltip.tooltip-top::after {
    border-top-color: var(--bg-color);
    @apply border-b-0 -bottom-2 left-1/2 -translate-x-1/2;
  }
  .tooltip.tooltip-right::after {
    border-right-color: var(--bg-color);
    @apply border-l-0 -left-2 top-1/2 -translate-y-1/2;
  }
  .tooltip.tooltip-bottom::after {
    border-bottom-color: var(--bg-color);
    @apply border-t-0 -top-2 left-1/2 -translate-x-1/2;
  }
  .tooltip.tooltip-left::after {
    border-left-color: var(--bg-color);
    @apply border-r-0 -right-2 top-1/2 -translate-y-1/2;
  }
</style>