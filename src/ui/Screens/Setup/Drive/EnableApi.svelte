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
        width: 38rem;

        margin-bottom: 40px;
    }

    p {
        font-family: var(--typeface-light);
        color: var(--color-content-secondary-b);

        width: 30rem;
        text-align: center;

        margin-top: 40px;
        margin-bottom: 50px;
    }
</style>

<svelte:window on:keydown={onKeydown} />
<div class="container">
    <h1>I think it’s time to enable the Drive API on your account</h1>

    <Textarea value="https://developers.google.com/drive/api/v3/quickstart/nodejs"/>

    <p>
        You need to enable and create an application to use the Drive API on your Google account, that way we’ll be able to lookup for new folders.
        <span style="background-color: var(--color-background-primary-b);padding:3px;border-radius:4px;">Ps. </span> You need to download the <span style="background-color: var(--color-background-primary-b);padding:3px;border-radius:4px;">credentials.json</span> and paste it's content on the next step.
    </p>

    <Button
        style="flex-shrink: 0; margin-bottom: 1.5rem;"
        on:click={next}
    >
        Continue
    </Button>
</div>