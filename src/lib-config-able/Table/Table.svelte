<script context="module">
	export const TABLE = {}
</script>

<script lang="ts">
	import { setContext, onDestroy } from 'svelte'
  import { token, getConfig } from '../utility'
  import { TABLE_CONFIG } from '../config'
  import type { TABLE_CONFIG_TYPE } from '@theui/core/types'
  import Row from './TableRow.svelte'

  export let id       : string            = token()
  export let headers  : Array<string>     = []
  export let data     : Array<string>	    = []
  export let keys     : Array<string>	    = []
  export let config   : TABLE_CONFIG_TYPE = {}

  let CONFIG: PROGRESS_CONFIG_TYPE = {}
  Object.assign(CONFIG, $TABLE_CONFIG, config)

  setContext(TABLE, {config: CONFIG})
</script>

<div class="w-full overflow-x-auto {CONFIG?.containerClasses||''}">
  <table {id} class="w-full {CONFIG?.tableClasses}" class:border-collapse={!(CONFIG?.reset||getConfig('reset'))}>
    <thead class={CONFIG?.theadClasses||''}>
      <Row data={headers} element="th" />
    </thead>
    <tbody class="dark:font-light {CONFIG?.tbodyClasses||'text-left'}">
      <Row {data} {keys}/>
    </tbody>
  </table>
</div>
