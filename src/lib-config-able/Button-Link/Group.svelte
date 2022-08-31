<script lang="ts">
  import { getConfig } from "../utility"
  export let label: string = ''
  export let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md'
</script>

<div
  class="btn-group inline-flex"
  role="group"
  aria-label={label}
  class:rounded-md={getConfig('isRounded') && (size == 'md' || size == 'lg' || size == 'xl')}
  class:rounded={getConfig('isRounded') && (size == 'xs' || size == 'sm')}
>
  <slot {size}></slot>
</div>

<style lang="postcss">
  :global(.btn-group > *, .btn-group > .rounded, .btn-group > .rounded, .btn-group > .rounded-md){
    @apply rounded-none;
  }
  :global(.btn-group.rounded :first-child){
    @apply rounded-l;
  }
  :global(.btn-group.rounded :last-child){
    @apply rounded-r;
  }
  :global(.btn-group.rounded-md :first-child){
    @apply rounded-l-md;
  }
  :global(.btn-group.rounded-md :last-child){
    @apply rounded-r-md;
  }
</style>