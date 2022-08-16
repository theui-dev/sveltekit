<script lang="ts">
  export let title          : string    = null
  export let titleSeperator : string    = ' | '
  export let description    : string    = null
  export let keywords       : string    = null
  export let url            : string    = null
  export let canonical      : string[]  = []
  export let imgPath        : string    = null
  export let video          : string    = null
  export let pageSchema     : string    = null
  export let reset          : boolean   = false
  export let config         : object    = {}

  let commonTitle = config?.siteName + titleSeperator + config?.slogan
  let pageTitle = (reset ? title : (title ? (title + titleSeperator + commonTitle) : commonTitle))
  let pageDescription = description||config?.description||""
  let pageKeywords = keywords||config?.keywords||""
  let pageImg = imgPath||config?.imgPath||config?.logoPath
</script>

<svelte:head>
	<title>{pageTitle}</title>
  <meta name="title"        content={pageTitle}>
  <meta name="description"  content={pageDescription}>
  <meta name="keywords"     content={keywords||config?.keywords||""}>
  {#if pageImg}<meta name="image"        content={pageImg}>{/if}

  <!-- Schema.org for Google -->
  <meta itemprop="name" content={pageTitle}>
  <meta itemprop="description" content={pageDescription}>
  {#if pageImg}<meta itemprop="image" content={pageImg}>{/if}
  {#if canonical.length > 0}
    {#each canonical as curl}
    <link rel="canonical" href={curl}/>
    {/each}
  {/if}

  {#if config?.fbAppID}
    <!-- Open Graph general (Facebook, Pinterest & Google+) -->
    <meta name="og:title" content={pageTitle}>
    <meta name="og:description" content={pageDescription}>
    {#if pageImg}<meta name="og:image" content={pageImg}>{/if}
    {#if url}<meta name="og:url" content={url}>{/if}
    <meta name="og:site_name" content={config?.siteName}>
    <meta name="og:locale" content={config?.lang}>
    <meta name="fb:app_id" content={config?.fbAppID}>
    {#if url}<meta name="og:type" content={config?.pageType}>{/if}
  {/if}

  {#if config?.twitterID}
    <!-- Twitter -->
    <meta name="twitter:card" content={config?.twitterCardType}>
    <meta name="twitter:title" content={pageTitle}>
    <meta name="twitter:description" content={pageDescription}>
    <meta name="twitter:site" content={config?.twitterID}>
    {#if config?.twitterCreatorID != ""}<meta name="twitter:creator" content={config?.twitterCreatorID}>{/if}
    {#if pageImg}<meta name="twitter:image:src" content={pageImg}>{/if}
  {/if}

  {#if video || config?.video}
    <meta name="og:video" content={video || config?.video}>
    <meta name="twitter:player" content={video || config?.video}>
  {/if}
  
  {#if pageSchema}
    {@html '<script type="application/ld+json">'+ pageSchema + '</script>'}
  {/if}
  
  {#if config?.siteSchema}
    {@html '<script type="application/ld+json">'+ config?.siteSchema + '</script>'}
  {/if}
  
  {#if config?.businessSchema}
    {@html '<script type="application/ld+json">'+ config?.businessSchema + '</script>'}
  {/if}

  {@html `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${config?.gtmCode}');</script>`}

  {#if $$slots.gtm}<slot name="gtm" />{/if}
  <slot></slot>

</svelte:head>

{@html `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${config?.gtmCode}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`}