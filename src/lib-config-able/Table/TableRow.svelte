<script lang="ts">
  import { getContext } from "svelte"
  import { TABLE } from "../index"
  import { getConfig } from "../utility"
  const { config } = getContext(TABLE)

  export let element: 'td' | 'th' = 'td'
  export let data: Array<string> = []
  export let keys: Array<string> = []

   let getRowClass = () => {
    let cls = config?.borderColor + ' ' + (config?.trClasses||'')
    if(config?.reset || getConfig('reset')) return cls
    return ((element == 'td' && (config?.border == 'both' || config?.border == 'y')) ? 'border-y ' : '') + 
           ((config?.hover && element == 'td') ? 'hover:bg-gray-100 dark:hover:bg-gray-800 ' : '') +
           ((config?.stripe) ? 'even:bg-gray-50 dark:even:bg-gray-800/50 ' : '') +
           (config?.trClasses||'') + ' ' + cls
   }

   let getCellClass = (i = undefined) => {
    let cls = config?.borderColor + ((i!=0 && !config?.reset) ? ' text-gray-600 dark:text-gray-400' : '')
    if(config?.reset) return cls
    return ((config?.border == 'both' || config?.border == 'x') ? 'border-x ' : '') + sizeCls(config?.size||'md') +
           (element == 'th'||i==0 ? ' font-medium text-sm ' : ' font-normal ') + ' ' + cls
   }

   let sizeCls = (size) => {
    return element == 'th' ?  (size=='sm' ? 'px-1 py-2' : (size=='lg' ? 'px-4 py-5' : 'px-2 py-3')) :
                              (size=='sm' ? 'p-1' : (size=='lg' ? 'p-4' : 'p-2'))
   }
</script>

{#if element == 'th'}
  <tr class={getRowClass()}>
    {#each data as th} <th class={getCellClass()}>{@html th}</th> {/each}
  </tr>
{:else}
  {#each data as rowData, i}
    <tr class={getRowClass()}>
      {#if Array.isArray(rowData)}
        {#each rowData as cell, i}
          {#if i == 0} <th scope="row" class={getCellClass(i)}>{@html cell}</th>
          {:else} <td class={getCellClass(i)}>{@html cell}</td> {/if}
        {/each}
      {:else}
        {#each keys as key, i}
          {#if i == 0} <th scope="row" class={getCellClass(i)}>{@html rowData[key]}</th>
          {:else} <td class={getCellClass(i)}>{@html rowData[key]}</td> {/if}
        {/each}
      {/if}
    </tr>
  {/each}
{/if}