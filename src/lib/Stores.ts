import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'

export let activeAccordionID: Writable<string> = writable('')
export let collapseID: Writable<string[]> = writable([])
export let activeDropdownID: Writable<string[]> = writable([])
export const modalIdStore: Writable<string[]> = writable([])
export const mobileNav: Writable<string[]> = writable([])
export let editorData = writable([])
