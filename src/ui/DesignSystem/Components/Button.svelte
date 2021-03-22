<script lang="ts">
    import type { SvelteComponent } from "svelte";
    import type { ButtonVariant } from "../ts/style";

    export let variant: ButtonVariant = "primary";
    export let disabled: boolean = false;
    export let icon: typeof SvelteComponent | undefined = undefined;
    export let style = "";
    export let title = "";

    // This will create the Button class that will ajust it with CSS
    $: buttonClass = [variant, icon && "icon", disabled && "disabled"].join(" ");
</script>

<style>
    .button {
        white-space: nowrap;

        padding: 3px 33px;
        min-height: 40px;
        line-height: 22px;

        outline: none;
        border: none;
        border-radius: 5px;

        outline-style: none;
        cursor: pointer;

        display: flex;
        align-items: center;
        user-select: none;

        transition: background-color 0.333s ease;
    }

    .button:hover {
        transition: background-color 0.333s ease;
    }

    .button.disabled {
        opacity: .5;
        cursor: default;
        transition: none;
    }

    .button.disabled:hover {
        background-color: var(--color-button-primary);
        transition: none;
    }

    .button :global(svg),
    .primary :global(svg),
    .secondary :global(svg) {
        fill: var(--color-button-secondary);
    }

    .primary {
        background-color: var(--color-button-primary);
        color: var(--color-content-primary-a);
    }

    .primary:hover {
        background-color: var(--color-button-primary-hover);
    }

    .primary:active :global(svg) {
        fill: var(--color-button-primary);
    }

</style>

<button
    class="button typo-text-bold {buttonClass}"
    {title}
    {disabled}
    on:click
    on:mouseenter
    on:mouseleave
    {style}
>
    <svelte:component this={icon} />
    <div style={icon ? 'margin-left: 8px;' : ''}>
        <slot />
    </div>
</button>