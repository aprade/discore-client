<script lang="ts">
    export let style = "";
    export let placeholder = "";
    export let value = "";
    export let disabled: boolean = false;
    export let autofocus: boolean = false;
    export let inputElement: HTMLInputElement | undefined = undefined;

    // Can't use normal `autofocus` attribute on the `inputElement`:
    // "Autofocus processing was blocked because a document's URL has a fragment".
    // preventScroll is necessary for onboarding animations to work.
    $: if (autofocus) inputElement && inputElement.focus({ preventScroll: true });
</script>

<style>
    input {
        color: var(--color-content-tertiary-a);
        background-color: var(--color-input);

        width: 100%;
        max-height: 40px;
        padding: 0 15px;

        border-radius: 5px;
        border: solid 0.833px #404040;

        outline-style: none;
    }

    input::placeholder {
        color: #404040;
    }

    input:focus, input:hover {
        outline: none;
        background-color: var(--color-input-focused);
    }
</style>

<input
    class="input typo-text"
    {placeholder}
    bind:value
    {disabled}
    on:change
    on:input
    on:keydown
    bind:this={inputElement}
    {style}
/>