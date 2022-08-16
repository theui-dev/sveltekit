<script lang='ts'>
  import { getConfig } from '../utility'
  export let circle   : boolean = false
  export let grow     : boolean = false
  export let text     : string = '';
  export let title    : string = text
  export let topFixed : boolean = false
</script>

<span
  class='badge {$$props.class||'bg-brand text-on-brand'}'
  class:circle={(circle && text == '') || (circle && getConfig('isRounded'))}
  class:badge-fixed={topFixed}
  class:border-primary={topFixed}
  class:rounded={getConfig('isRounded')}
  class:badge-grow={grow}>
  {text}
  <span class='sr-only'>{title}</span>
</span>

<style lang='postcss'>
  .badge {
    @apply inline-block text-[1em] leading-[1em] font-medium items-center justify-center whitespace-nowrap select-none p-[.35em];
  }
  .badge.circle {
    @apply rounded-full;
  }
  .badge.badge-fixed {
    @apply absolute transform -translate-x-1/2 -translate-y-1/2 top-0 left-full border-4;
  }
  .badge:not(.badge-grow) {
    @apply text-xs leading-[1em];
  }
  .badge.badge-grow {
    @apply text-[1em] leading-[1.2em];
  }
</style>
