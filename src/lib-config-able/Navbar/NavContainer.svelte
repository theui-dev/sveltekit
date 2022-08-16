<script lang="ts">
  export let position: 'left' | 'right' | 'center' = 'left'
  let cls = $$props.class ? $$props.class : 'flex items-center gap-x-8 font-semibold'
</script>
<div class={cls}
     class:mr-auto={position==undefined || position=='left'}
     class:ml-auto={position=='right'}
     class:mx-auto={position=='center'}>
  <slot />
</div>