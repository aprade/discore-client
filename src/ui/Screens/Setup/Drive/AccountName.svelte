<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { Button, Input } from "../../../DesignSystem/Components";
    import { storedDriveAccountsNames } from "../../../ts/store";

    export let handle = "";

    let nameInput: HTMLInputElement;

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

        if (!$storedDriveAccountsNames.includes(handle.trim().toLowerCase()) && handle.trim().toLowerCase() !== "jason citron") {
            localStorage.setItem("DriveAccountsNames", JSON.stringify([ ...$storedDriveAccountsNames, handle ]));
            storedDriveAccountsNames.update(() => [ ...$storedDriveAccountsNames, handle ]);

            dispatch("next", handle);
        } else {
            dispatch("error", "There is already an account with that nickname!");
        }
    };

    $: handle;
    $: console.log('StoredAccounts', $storedDriveAccountsNames);
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

        width: 37rem;

        margin-bottom: 50px;
    }

    .form-drive-nick {
        display: flex;
        justify-content: space-between;

        width: calc(100% + 100px);
    }
</style>

<svelte:window on:keydown={onKeydown} />
<div class="container">
    <h1>Let’s set a nickname for your Google account</h1>

    <p>
        This is required to show your account on the UI with the name you want, also because Discore can’t identify your account name by default.
    </p>

    <div class="form-drive-nick">
        <Input
            autofocus
            placeholder="Jason Citron"
            bind:inputElement={nameInput}
            bind:value={handle}
            on:keydown={onKeydown}
            style="margin-right: 15px"
        />

        <Button
            style="flex-shrink: 0; margin-bottom: 1.5rem;"
            disabled={!handle && !$storedDriveAccountsNames.includes(handle)}
            on:click={next}
        >
            Continue
        </Button>
    </div>
</div>