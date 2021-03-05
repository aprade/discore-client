<script lang="ts">
	import type { SvelteComponent } from "svelte";
  
	import type { ButtonVariant as Variant } from "../../ts/style";
  
	export let variant: Variant = "primary";
  
	export let disabled: boolean = false;
	export let icon: typeof SvelteComponent | undefined = undefined;
	export let style = "";
	export let dataCy = "";
	export let title = "";

	$: buttonClass = [variant, icon && "icon", disabled && "disabled"].join(" ");
</script>
  
<style>
	.button {
		font-family: "Inter Regular";
		font-size: 15px;

		white-space: nowrap;

		background-color: #0078D4;
		color: #FFFFFF;

		border: none;
		cursor: pointer;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		min-height: 40px;
		padding: 13px 40px;

		line-height: 22px;
		outline-style: none;
		user-select: none;
	}

	.button :global(svg) {
		fill: #0078D4;
	}
</style>
  
<button
	data-cy={dataCy}
	class="button typo-text-bold {buttonClass}"
	{title}
	{disabled}
	on:click
	on:mouseenter
	on:mouseleave
	{style}>
	<svelte:component this={icon} />
	<div style={icon ? 'margin-left: 8px;' : ''}>
		<slot />
	</div>
</button>