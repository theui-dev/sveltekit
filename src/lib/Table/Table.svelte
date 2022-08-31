<script context="module">
	export const TABLE = {}
</script>

<script lang="ts">
  import type { TABLE_CONFIG_TYPE } from "theui/types"
	import { setContext, onDestroy } from "svelte"
  import { token } from "theui"
  import TableHead from "./TableHead.svelte"
  import TableBody from "./TableBody.svelte"

  export let config   : TABLE_CONFIG_TYPE           = {}
  export let id       : string                      = token()
  export let headers  : string[]|null               = null
  export let data     : (object | string[])[]|null	= null
  export let keys     : string[]|null               = null

  let C: TABLE_CONFIG_TYPE = {
    animate       : true,
    border        : 'y',
    borderColor   : 'border-gray-200/80 dark:border-gray-800/80',
    hover         : false,
    reset         : false,
    stripe        : false,
  }
  Object.assign(C, config)
  setContext(TABLE, {config: C})
</script>

<div class="table-container w-full overflow-x-auto {C?.containerClass||''}">
  <table {...$$restProps} {id} class="table w-full {$$props.class||' text-left'} {C?.border=='x' ? 'border-y ' + C.borderColor : ''}" class:border-collapse={!(C.reset)}>

    {#if headers && headers.length > 0} <TableHead {headers}/> {/if}
    {#if data && data.length > 0} <TableBody {data} {keys}/> {/if}

    <slot />

  </table>
</div>
