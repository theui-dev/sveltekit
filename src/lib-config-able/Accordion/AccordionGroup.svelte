<script lang="ts">
  import { getConfig } from '../utility'
  export let gap: 0|2|4|8 = 0
</script>

<div class="accordion-group flex flex-col"
  class:gap-0={gap==0}
  class:gap-2={gap==2}
  class:gap-4={gap==4}
  class:gap-8={gap==8}
  class:rounded-group={getConfig('isRounded')}
>
  <slot></slot>
</div>

<style lang="postcss">
  :global(.accordion-group .accordion) {
    @apply mb-0;
  }
  :global(.accordion-group .accordion:first-child .accordion-title button) {
    @apply rounded-b-none;
  }
  :global(.accordion-group .accordion:last-child .accordion-title button) {
    @apply rounded-t-none;
  }
  :global(.accordion-group .accordion:not(:first-child):not(:last-child) .accordion-title button) {
    @apply rounded-none;
  }
  :global(.accordion-group .accordion.accordion-active:last-of-type .accordion-title button) {
    @apply rounded-b-none;
  }
  :global(.accordion-group .accordion:not(:last-child) .accordion-body,.accordion-group .accordion:not(:last-child) .accordion-content) {
    @apply rounded-b-none;
  }
</style>