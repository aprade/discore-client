<script>
    import { createEventDispatcher } from "svelte";

    import { DiscoreLogo, Button } from "../../DesignSystem/Components";

    const dispatch = createEventDispatcher();
    let ran = false;

    const onKeydown = event => {
        if (!ran && event.key === "Enter") {
            next();
            ran = true;
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

    p {
        font-family: var(--typeface-light);
        color: var(--color-content-secondary-b);

        width: 50%;
        text-align: center;

        margin-top: 20px;
        margin-bottom: 30px;
    }
</style>

<svelte:window on:keydown={onKeydown} />
<div class="container">
    <DiscoreLogo/>

    <p>An easy way to share files in your Discord guild.</p>

    <Button
        style="flex-shrink: 0; margin-bottom: 1.5rem;"
        on:click={next}
    >
        Get started
    </Button>
</div>