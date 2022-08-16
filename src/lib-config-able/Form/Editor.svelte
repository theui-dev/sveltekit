<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { THEUI_CONFIG } from '../config'
  import { token, rounded, getConfig } from '../utility'
  import { getInputCls } from './controller'
  import { editorData } from './Store'
  import type { ROUNDED_TYPE } from '@theui/core/types'

  import { Editor, generateHTML } from '@tiptap/core'
  import StarterKit from '@tiptap/starter-kit'
  import Placeholder from '@tiptap/extension-placeholder'
  import Underline from '@tiptap/extension-underline'

  export let id = token()
  export let name: string
  export let value: string = ''
  export let classes: string = ''
  export let roundedTextBox: ROUNDED_TYPE = getConfig('isRounded')
  export let btnClass = 'bg-gray-300 dark:bg-gray-700' + 
        (getConfig('isRounded') && roundedTextBox && roundedTextBox !== 'none' ? ' rounded-sm': '')

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

{#if editor}
<div class='flex flex-wrap toolbar'>

  <button type='button' class={btnClass} on:click={() => editor.chain().focus().toggleHeading({ level: 2}).run()} class:active={editor.isActive('heading',{level:2})}><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path d='M7.638 13V3.669H6.38V7.62H1.759V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.022-6.733v-.048c0-.889.63-1.668 1.716-1.668.957 0 1.675.608 1.675 1.572 0 .855-.554 1.504-1.067 2.085l-3.513 3.999V13H15.5v-1.094h-4.245v-.075l2.481-2.844c.875-.998 1.586-1.784 1.586-2.953 0-1.463-1.155-2.556-2.919-2.556-1.941 0-2.966 1.326-2.966 2.74v.049h1.223z'/></svg></button>
  <button type='button' class={btnClass} on:click={() => editor.chain().focus().toggleHeading({ level: 3}).run()} class:active={editor.isActive('heading',{level:3})}><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path d='M7.637 13V3.669H6.379V7.62H1.758V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.625-4.272h1.018c1.142 0 1.935.67 1.949 1.674.013 1.005-.78 1.737-2.01 1.73-1.08-.007-1.853-.588-1.935-1.32H9.108c.069 1.327 1.224 2.386 3.083 2.386 1.935 0 3.343-1.155 3.309-2.789-.027-1.51-1.251-2.16-2.037-2.249v-.068c.704-.123 1.764-.91 1.723-2.229-.035-1.353-1.176-2.4-2.954-2.385-1.873.006-2.857 1.162-2.898 2.358h1.196c.062-.69.711-1.299 1.696-1.299.998 0 1.695.622 1.695 1.525.007.922-.718 1.592-1.695 1.592h-.964v1.074z'/></svg></button>
  <button type='button' class={btnClass} on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} class:active={editor.isActive('heading',{level:4})}>H4</button>
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

<div id='editor' class={getInputCls({size: 'none'}) + ' ' + classes} bind:this={element} />
<textarea class='hidden' id='{id||name}' name='{name}'>{$editorData[name]||''}</textarea>

<style lang='postcss'>
  .toolbar{
    @apply mb-2;
  }
  #editor {
    @apply h-auto min-h-[8rem];
  }
  button{
    @apply p-2 mr-1;
  }
  button.active{
    @apply bg-gray-500 text-white;
  }
  :global(.ProseMirror){
    @apply p-4 min-h-[7rem];
  }
  :global(.ProseMirror-focused){
    @apply border-0 outline-0;
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
  :global(#editor ol) {
    @apply list-decimal;
  }
</style>