<script lang="ts">
  import { getContext } from "svelte"
  import { TABLE } from "../index"
  import Cell from "./TableCell.svelte"
  const { config } = getContext(TABLE)

  export let data       : object | string[] | (object | string[])[] | null	= null
  export let keys       : string[]|null = null
  export let headingRow : boolean = false

  let getRowClass = () => {
  let cls = config?.borderColor + ' ' + (config?.trClass||'')
  if(config.reset) return cls
  return  ((!headingRow && (config?.border == 'both' || config?.border == 'y')) ? 'border-y ' : '') + 
          ((config?.hover && !headingRow) ? 'hover:bg-gray-100 dark:hover:bg-gray-800 ' : '') +
          ((config?.stripe) ? 'even:bg-gray-50 dark:even:bg-gray-800/50 ' : '') +
          (config?.trClass||'') + ' ' + cls
  }

  let isRows = () => (Array.isArray(data) && typeof data[0] === 'object' || Array.isArray(data[0]))
</script>

{#if !data}       <!-- if data available -->
  <tr {...$$restProps} class={getRowClass()}>
    <slot/>
  </tr>
{:else}           <!-- else if no data available -->
  {#if isRows()}  <!-- if multi rows -->
    {#each data as r}
      <tr {...$$restProps} class={getRowClass()}>
        <Cell data={r} {keys} headingCell={headingRow} />
      </tr>
    {/each}
  {:else}         <!-- else if multi rows -->
    <tr {...$$restProps} class={$$props.class || getRowClass()}>
      <Cell {data} {keys} headingCell={headingRow} />
    </tr>
  {/if}
{/if}
