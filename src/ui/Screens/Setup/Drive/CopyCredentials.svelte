<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import { Button, Input } from "../../../DesignSystem/Components";
    import { storedDriveAccountsPaths } from "../../../ts/store";
    // import { storedDriveAccounts } from "../../../ts/store";

    export let accountName = '';
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

    const saveCredentials = () => {
        $storedDriveAccountsPaths[accountName] = {
            credentials: `C:\\Windows\\Users\\jakor\\.discore\\data\\${accountName}\\credentials.json`
        }

        // Call IPC and tells main process to write the content to the desired path
    }

    const next = async () => {
        if (!handle) {
            nameInput.focus();
            return;
        }

        console.log('accountName', accountName);
        if (!$storedDriveAccountsPaths[accountName]) {
            console.log("There's no credentials for this account");
            saveCredentials();
            console.log('stored Value ACCONT', $storedDriveAccountsPaths);
        }
        // if (!$storedDriveAccounts.includes(handle) && handle.trim().toLowerCase() !== "jason citron") {
        //     localStorage.setItem("DriveAccounts", JSON.stringify([ ...$storedDriveAccounts, handle ]));
        //     storedDriveAccounts.update(() => [ ...$storedDriveAccounts, handle ]);

        //     dispatch("next");
        // } else {
        //     dispatch("error", "There is already an account with that nickname!");
        // }
        dispatch("back");
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
        width: 33rem;

        margin-bottom: 40px;
    }

    p {
        font-family: var(--typeface-light);
        color: var(--color-content-secondary-b);

        width: 40rem;

        margin-bottom: 50px;
    }

    .form-drive-credentials {
        display: flex;
        justify-content: space-between;

        width: calc(100% + 100px);
    }
</style>

<svelte:window on:keydown={onKeydown} />
<div class="container">
    <h1>Paste the credentials from the last step</h1>

    <p>
        This content is needed to validate your application within Google’s API, without this credentials we would be unable to verify for new files.
    </p>

    <div class="form-drive-credentials">
        <Input
            autofocus
            placeholder="is discore stolling my data ? duuh yes"
            bind:inputElement={nameInput}
            bind:value={handle}
            on:keydown={onKeydown}
            style="margin-right: 15px"
        />

        <Button
            style="flex-shrink: 0; margin-bottom: 1.5rem;"
            disabled={!handle}
            on:click={next}
        >
            Continue
        </Button>
    </div>
</div>