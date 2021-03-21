<script>
    import { fade, fly } from "svelte/transition";

    import Welcome from "./Setup/Welcome.svelte";
    import Discord from "./Setup/Discord.svelte";

    let state = "WELCOME";

    let inY = 1000;
    let outY = -1000;
    const animateForward = () => {
        inY = 1000;
        outY = -1000;
    };
    const animateBackward = () => {
        inY = -1000;
        outY = 1000;
    };
</script>

<style>
    .modal {
        position: relative;
        width: 100vw;
        height: 100vh;
    }

    .content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .inner {
        width: 33.75rem;
    }
</style>

<div class="modal">
    {#if state === "WELCOME"}
        <div class="content" in:fade out:fly={{ y: outY }}>
            <div class="inner">
                <Welcome
                    on:next={() => {
                        state = "DISCORD";
                    }}
                />
            </div>
        </div>
    {:else if state === "DISCORD"}
        <div class="content" in:fly={{ y: inY }} out:fly={{ y: outY }}>
            <div class="inner">
                <Discord/>
            </div>
        </div>
    {/if}
</div>