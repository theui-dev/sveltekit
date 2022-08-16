import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'

export let activeAccordionID: Writable<string> = writable('')
export let collapseID: Writable<[]> = writable([])