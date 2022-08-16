<script lang="ts">
  import { getContext } from "svelte"
  import { TABLE } from "../index"
  const { config } = getContext(TABLE)

  import Row from './TableRow.svelte'

  export let data     : (object | string[])[]|null	= null
  export let keys     : string[]|null               = null
</script>

<tbody {...$$restProps} class="{$$props.class||config?.tbodyClass||'text-left'}">
  {#if data && data.length > 0}
    <Row {data} {keys}/>
  {:else}
    <slot/>
  {/if}
</tbody>