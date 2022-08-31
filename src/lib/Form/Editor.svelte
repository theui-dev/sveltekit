<script lang="ts">
  import { onMount, onDestroy } from "svelte"
  import { token, rounded } from "theui"
  import { getContext } from "svelte"
  import { FORM       } from "../index"
  import { editorData } from "$lib/Stores"
  import { Label, Dropdown, Button } from "../index"
  const ctx = getContext( FORM || {} )
  import { getContainerClass, getInputClass, getSize, getStyle } from "./controller"

  import { Editor, generateHTML } from '@tiptap/core'
  import StarterKit from '@tiptap/starter-kit'
  import Placeholder from '@tiptap/extension-placeholder'
  import Underline from '@tiptap/extension-underline'

  export let id = token()
  export let config : INPUT_CONFIG_TYPE = {}
  export let label  : string|undefined = undefined
  export let name   : string
  export let value  : string = ''
  
  let C:INPUT_CONFIG_TYPE = {rounded : 'md', inputGrow: true, size: 'md', variant: 'bordered' }
  Object.assign(C, ctx?.formConfig||{}, config)
  
  export let btnClass = 'bg-gray-200 dark:bg-gray-800 p-2' + (C?.rounded ? ' rounded': '')
  let inputClass = getInputClass(C, $$restProps) + getStyle(C?.variant) + getSize(C?.size)

  let element
  let editor
  $editorData[name] = value

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [
        StarterKit,
        Underline,
      ],
      content: value,
      onTransaction: () => {
        editor = editor
      },
      onInit: ({ getJSON, getHTML }) => {
        $editorData[name] = editor.getHTML()
      },
      onUpdate: ({ getJSON, getHTML }) => {
        $editorData[name] = editor.getHTML()
      }
    })
  })

  onDestroy(() => {if (editor) editor.destroy()})
</script>

<div class={getContainerClass(C)}>
  {#if editor}
    {#if label}<Label labelStyle={config.labelStyle} labelFor={id} label={label}/>{/if}
    <div class='flex flex-wrap toolbar gap-1'>

      <Dropdown config={{ animation: 'fade', closeOnEsc: false }} >
        <Button slot="label" label="Headings" class={btnClass} config={{ size: "sm", rounded: "sm"}} />
        <div slot="items" class="flex flex-col">
          <button type='button' class="bg-transparent text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" on:click={() => editor.chain().focus().toggleHeading({ level: 1}).run()} class:active={editor.isActive('heading',{level:1})}>Heading 1</button>
          <button type='button' class="bg-transparent text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" on:click={() => editor.chain().focus().toggleHeading({ level: 2}).run()} class:active={editor.isActive('heading',{level:2})}>Heading 2</button>
          <button type='button' class="bg-transparent text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" on:click={() => editor.chain().focus().toggleHeading({ level: 3}).run()} class:active={editor.isActive('heading',{level:3})}>Heading 3</button>
          <button type='button' class="bg-transparent text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800" on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} class:active={editor.isActive('heading',{level:4})}>Heading 4</button>
        </div>
      </Dropdown>

      <button type='button' class={btnClass} on:click={() => editor.chain().focus().toggleBold().run()} class:active={editor.isActive('bold')}><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path d='M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z'/></svg></button>
      <button type='button' class={btnClass} on:click={() => editor.chain().focus().toggleItalic().run()} class:active={editor.isActive('italic')}><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path d='M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z'/></svg></button>
      <button type='button' class={btnClass} on:click={() => editor.chain().focus().toggleUnderline().run()} class:active={editor.isActive('underline') ? 'is-active' : ''}><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path d='M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136zM12.5 15h-9v-1h9v1z'/></svg></button>
      <button type='button' class={btnClass} on:click={() => editor.chain().focus().toggleBulletList().run()} class:active={editor.isActive('bulletList')?'is-active':''}><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'/></svg></button>
      <button type='button' class={btnClass} on:click={() => editor.chain().focus().toggleOrderedList().run()} class:active={editor.isActive('orderedList')?'is-active':''}><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z'/><path d='M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z'/></svg></button>
      <button type='button' class={btnClass} on:click={() => editor.chain().focus().sinkListItem('listItem').run()} disabled={!editor.can().sinkListItem('listItem')}><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z'/></svg></button>

      <!-- <button type='button' on:click={() => editor.chain().focus().liftListItem('listItem').run()} disabled={!editor.can().liftListItem('listItem')}>
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
          <path fill-rule='evenodd' d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'/>
        </svg>
      </button> -->

      <button type='button' class={btnClass} on:click={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z'/><path d='M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z'/></svg></button>
      <button type='button' class={btnClass} on:click={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z'/><path d='M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z'/></svg></button>

    </div>
  {/if}
  <div id='editor' class={$$props.class ? $$props.class : inputClass} bind:this={element} />
  <textarea class='hidden' {id} {name}>{$editorData[name]||''}</textarea>
</div>


<style lang='postcss'>
  #editor {
    @apply h-auto min-h-[8rem];
  }
  button.active{
    @apply bg-gray-500 text-white;
  }
  :global(.ProseMirror){
    @apply min-h-[7rem];
  }
  :global(.ProseMirror-focused){
    @apply border-0 outline-0;
  }
  :global(#editor h1) {
    @apply text-4xl;
  }
  :global(#editor h2) {
    @apply text-3xl;
  }
  :global(#editor h3) {
    @apply text-2xl;
  }
  :global(#editor h4) {
    @apply text-xl;
  }
  :global(#editor ul, #editor ol) {
    @apply px-4;
  }
  :global(#editor ul) {
    @apply list-disc;
  }
  :global(#editor ul ul) {
    @apply list-[circle];
  }
  :global(#editor ul ul ul) {
    @apply list-[square];
  }
  :global(#editor ul ul ul ul) {
    @apply list-disc;
  }
  :global(#editor ol) {
    @apply list-decimal;
  }
  :global(#editor ol ol) {
    @apply list-[lower-alpha];
  }
  :global(#editor ol ol ol) {
    @apply list-[lower-roman];
  }
  :global(#editor ol ol ol ol) {
    @apply list-decimal;
  }
</style>