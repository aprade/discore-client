<script>
    import Router, { push, location } from "svelte-spa-router";

    // The header that contain the tile {buttons}
    import Header from "./DesignSystem/Component/Header.svelte";

	import WelcomeScreen from "./Screen/Setup/Welcome.svelte";
</script>

<style>
</style>

<Header></Header>
<WelcomeScreen></WelcomeScreen>