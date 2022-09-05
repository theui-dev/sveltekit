<script lang="ts">
  export let href: string = '/'
</script>

<a {href} data-sveltekit-prefetch class="navbar-brand {$$props.class||'flex items-center gap-4 h-full max-w-[144px] font-semibold text-default'}">
  <slot/>
</a>