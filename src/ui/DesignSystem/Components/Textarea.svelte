<script>
    export let style = null;
    export let value = "";
</script>

<style>
    .textarea {
        color: #404040;

        border: none;
        outline: none;
        padding: 10px;

        min-height: 10px;
        width: max-content;

        border-radius: 5px;
        border: solid 0.833px #404040;

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<div
    class="textarea typo-text"
    {style}
    on:change
>
    {@html value}
</div>