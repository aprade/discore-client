<script>
    import { session } from "./ts/session";
    
    import Setup from "./Screens/Setup.svelte";

    let state;
    const unsubscribeState = session.subscribe(storeState => {
        state = storeState;
    });

    $: state
    $: console.log('App State', state);
</script>

<style>
</style>

{#if
    state === "WELCOME" ||
    state.includes("DISCORD") ||
    state.includes("DRIVE")
}
    <Setup {state} />
{:else}
    <h1>Error loading application State</h1>
{/if}