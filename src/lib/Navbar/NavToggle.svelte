<script lang="ts">
  import { getContext } from "svelte"
  import { NAV } from "../index"
  import { Button, Svg } from "../index"
  const { config, id, mobileNav } = getContext(NAV)

  let toggle = () => {
    if ($mobileNav.includes(id)) {
      let D = $mobileNav.filter(i => i !== id)
			mobileNav.update(d => D)
    }else{
      mobileNav.update(d=> [...d, id])
    }
  }
</script>

{#if config.responsive !== false}
<Button on:click={()=>toggle()} class="{$$props.class||'bg-transparent'} {config.responsive == 'xl' ? 'xl:hidden' : config.responsive == 'md' ? 'md:hidden' : config.responsive == 'lg' ? 'lg:hidden' : 'hidden'}">
  <slot name="menuIcon" slot="label">
    <Svg size=1.75 fill="none" viewBox="0 0 24 24" stroke-width="2" class=" stroke-gray-700 dark:stroke-gray-300">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </Svg>
  </slot>
</Button>
{/if}