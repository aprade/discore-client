<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { Button, Textarea } from "../../../DesignSystem/Components";

    const dispatch = createEventDispatcher();

    const onKeydown = (event: KeyboardEvent) => {
        switch (event.code) {
            case "Enter":
                next();
                break;
        }
    };

    const next = () => {
        dispatch("next");
    };
</script>

<style>
    .container {
        color: var(--color-content-primary-a);
        
        height: 100%;

        display: flex;
        justify-content: center;
        flex-direction: column;

        align-items: center;
    }

    h1 {
        text-align: center;
        width: 44rem;

        margin-bottom: 40px;
    }

    p {
        font-family: var(--typeface-light);
        color: var(--color-content-secondary-b);

        width: 26rem;
        text-align: center;

        margin-top: 40px;
        margin-bottom: 50px;
    }
</style>

<svelte:window on:keydown={onKeydown} />
<div class="container">
    <h1>What do you think about invinting Discore to your guild ?</h1>

    <Textarea value="https://discord.com/api/oauth2/authorize?client_id=805948954365526067&permissions=2048&scope=bot"/>

    <p>
        That’s the Discord invite url, you’ll add Discore to your server and it’ll be able to share your files in the configured channels.
    </p>

    <Button
        style="flex-shrink: 0; margin-bottom: 1.5rem;"
        on:click={next}
    >
        Done
    </Button>
</div>