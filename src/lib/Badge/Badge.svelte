<script lang='ts'>
  import type { ROUNDED_TYPE } from '@theui/core/types'
  import { rounded } from '../utility'

  export let grow     : boolean = false
  export let round    : ROUNDED_TYPE = 'full'
  export let text     : string = '';
  export let title    : string = text
  export let topFixed : boolean = false
</script>

<span
  class='badge {$$props.class||'bg-brand text-on-brand'} {rounded(round)}'
  class:badge-fixed={topFixed}
  class:border-primary={topFixed}
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
    @apply text-xs leading-[.8em];
  }
  .badge.badge-grow {
    @apply text-[1em] leading-[1.2em];
  }
</style>
