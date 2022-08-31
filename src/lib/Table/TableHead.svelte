<script lang="ts">
  import { getContext } from "svelte"
  import { TABLE } from "../index"
  const { config } = getContext(TABLE)
  import Row from "./TableRow.svelte"

  export let headers  : string[]|null = null
</script>

<thead {...$$restProps} class={$$props.class||config?.theadClass||'bg-gray-100 dark:bg-gray-800 text-left uppercase'}>
  {#if headers && headers.length > 0}
    <Row data={headers} headingRow={true} />
  {:else}
    <slot/>
  {/if}
</thead>