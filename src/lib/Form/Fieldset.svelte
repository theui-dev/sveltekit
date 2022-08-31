<script lang="ts">
  export let label  : string = ''
</script>

<fieldset class={$$props.class||''}>
	<legend class="sr-only">{label}</legend>
  <slot/>
</fieldset>