<script lang="ts">
  import { getContext } from "svelte"
  import { TABLE } from "../index"
  const { config } = getContext(TABLE)

  export let data         : object|string[]|null	= null
  export let keys         : string[]|null         = null
  export let headingCell  : boolean               = false

  let getCellClass = () => {
    let cls = config?.borderColor + ((!headingCell && !config?.reset) ? ' text-gray-600 dark:text-gray-400' : '')
    if(config?.reset) return cls
    return ((config?.border == 'both' || config?.border == 'x') ? 'border-x ' : '') + sizeCls(config?.space||'default') +
            (headingCell ? ' font-medium text-sm ' : ' font-normal ') + ' ' + cls
  }

  let sizeCls = (space) => {
    return headingCell ?  (space=='compact' ? 'px-1 py-2' : (space=='comfortable' ? 'px-4 py-5' : 'px-2 py-3')) :
                          (space=='compact' ? 'p-1' : (space=='comfortable' ? 'p-4' : 'p-2'))
  }
</script>

{#if !data}
  {#if headingCell}
    <th {...$$restProps} scope={headingCell ? "col" : "row"} class={getCellClass()}><slot/></th>
  {:else}
    <td {...$$restProps} class={getCellClass()}><slot/></td>
  {/if}
{:else}
  {#if Array.isArray(data)}
    {#each data as c, i}
      {#if i == 0 || headingCell}
        <th {...$$restProps} scope={headingCell ? "col" : "row"} class={getCellClass()}>{@html c}</th>
      {:else}
        <td {...$$restProps} class={getCellClass()}>{@html c}</td>
      {/if}
    {/each}
  {:else}
    {#each keys as key, i}
      {#if i == 0 || headingCell}
        <th {...$$restProps} scope={headingCell ? "col" : "row"} class={getCellClass()}>{@html data[key]}</th>
      {:else}
        <td {...$$restProps} class={getCellClass()}>{@html data[key]}</td>
      {/if}
    {/each}
  {/if}
{/if}

