<script lang="ts">
  import type { TOOLTIP_CONFIG_TYPE } from 'theui/types'
  import { animate, rounded } from "theui"

  export let text: string = ''
  export let config: TOOLTIP_CONFIG_TYPE = {}

  let C: TOOLTIP_CONFIG_TYPE = {
    animate : 'normal',
    bgColor: '#1F2937',
    inline: true,
    reset : false
  }
  Object.assign(C, config)

  let containerCls = () => {
    return  'tooltip-container relative ' + (C.inline ? 'inline-block ' : '') + (C?.animation ? 'fade' : '')
  }

  let tooltipCls = () => {
    let position = C?.position || 'top'
    let cls = ' tooltip z-[60] absolute min-w-[128px] max-w-[280px] ' +
    (C.reset ? '' : 'text-sm text-center ') +
    animate(C.animate) +
    (position === 'left' ? ' tooltip-left' : position === 'right' ? ' tooltip-right' : position === 'bottom' ?   ' tooltip-bottom' : ' tooltip-top') + rounded(C?.rounded||'sm')
    return cls
  }
</script>

<div class={containerCls()}>
  <span class={($$props.class||'p-2 text-white') + tooltipCls()} style="--bg-color: {C.bgColor};">
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