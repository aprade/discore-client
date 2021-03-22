<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import discore from "../../../ts/discore"

    import { Button, Input } from "../../../DesignSystem/Components";

    export let handle = "";

    let nameInput: HTMLInputElement;
    let tries = 1;

    const dispatch = createEventDispatcher();

    const onKeydown = (event: KeyboardEvent) => {
        switch (event.code) {
            case "Enter":
                next();
                break;
        }
    };
    
    const next = async () => {
        if (!handle) {
            nameInput.focus();
            return;
        }

        let discoreResponse = await discore.checkDiscordGuildisOn(handle);
        if (discoreResponse && discoreResponse.guildName) {
            dispatch("success", discoreResponse.message);
            // Save the Guild ID on internal store
        } else if (discoreResponse && !discoreResponse.guildName) {
            if (discoreResponse.status === 404 && tries < 5) {
                dispatch("error", discoreResponse.message);
                tries += 1;
            } else if (discoreResponse.status === 500) {
                dispatch("error", discoreResponse.message);
            } else if (tries >= 5) {
                dispatch("back", "You tried to check for the guild ID so many times that now I thing you added me to the wrong guild. Try adding me again, but on the correct place LoL.");
            } else {
                dispatch("error", "Contact support, I don't know what's happening to me.. maybe it's contagious!");
            }
        }

        dispatch("next");
    };

    $: handle;
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

        width: 37rem;

        margin-bottom: 50px;
    }

    a {
        color: #409BFF;
    }

    .form-discord-id {
        display: flex;
        justify-content: space-between;

        width: calc(100% + 100px);
    }
</style>

<svelte:window on:keydown={onKeydown} />
<div class="container">
    <h1>Alright, I need your guild`s ID</h1>

    <p>
        The ID is needed to verify if the bot was successfuly added to your guild and to get the guild name and icon. Click <a href="https://google.com">here</a> to see how to get the ID.
    </p>

    <div class="form-discord-id">
        <Input
            autofocus
            placeholder="Your guild's ID"
            bind:inputElement={nameInput}
            bind:value={handle}
            on:keydown={onKeydown}
            style="text-transform:uppercase; margin-right: 15px"
        />

        <Button
            style="flex-shrink: 0; margin-bottom: 1.5rem;"
            disabled={!handle}
            on:click={next}
        >
            Check
        </Button>
    </div>
</div>