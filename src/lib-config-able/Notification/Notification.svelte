<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  import { notifications, removeNotification, getClasses } from './Store'
  import { rounded, getConfig } from '../utility'
  import type { ROUNDED_TYPE } from '@theui/core/types'
  
  export let position : 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left' = 'top-right'
</script>

{#if $notifications.length}
<ul class='notifications {position}'>
  {#each $notifications as notification}
  <li>
    {#if getConfig('animate')}
      <div class={getClasses(notification.CONFIG, notification.type)} role='alert' aria-live='assertive' aria-atomic='true'
        in:fly={{ y: 16 }} out:fade on:click={() => {notification.CONFIG.removeOnClick===false ? false : removeNotification(notification.CONFIG.id)}}>
        <span role='alert' aria-live='assertive' aria-atomic='true'>{@html notification.msg}</span>
      </div>
    {:else}
      <div class={getClasses(notification.CONFIG, notification.type)} role='alert' aria-live='assertive' aria-atomic='true' on:click={() => {notification.CONFIG.removeOnClick === false ? false : removeNotification(notification.CONFIG.id)}}>
        <span role='alert' aria-live='assertive' aria-atomic='true'>{@html notification.msg} {notification.CONFIG.id}</span>
      </div>
    {/if}
  </li>
  {/each}
</ul>
{/if}

<style lang='postcss'>
  .notifications{
    @apply fixed list-none flex flex-col p-4 z-50;
  }
  .notifications.top-left, .notifications.top-center, .notifications.top-right{
    @apply justify-start top-0;
  }
  .notifications.bottom-left, .notifications.bottom-center, .notifications.bottom-right{
    @apply justify-end bottom-0;
  }
  .notifications.bottom-center, .notifications.top-center{
    @apply items-center left-0 right-0 w-full;
  }
  .notifications.bottom-right, .notifications.top-right{
    @apply items-end right-0;
  }
  .notifications.bottom-left, .notifications.top-left{
    @apply items-start left-0;
  }
  .notifications.top-left .notification, .notifications.top-center .notification, .notifications.top-right .notification{
    @apply mb-4;
  }
  .notifications.bottom-left .notification, .notifications.bottom-center .notification, .notifications.bottom-right .notification{
    @apply mt-4;
  }
</style>