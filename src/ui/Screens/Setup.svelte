<script>
    import { fade, fly } from "svelte/transition";

    import { setState } from "../ts/session";
    import { session } from "../ts/session";

    import { Notifications } from "../DesignSystem/Components";

    import Welcome from "./Setup/Welcome.svelte";
    import Discord from "./Setup/Discord";
    import Drive from "./Setup/Drive";

    let notification = {
        error: false,
        success: false,
        message: "",
    };

    let accountName;
    export let state;

    const unsubscribeState = session.subscribe(storeState => {
        state = storeState;
    });

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

    const createNotificaction = (type, message) => {
        if (type === 'error') {
            notification.error = true;
        } else {
            notification.success = true;
        }

        notification.message = message;

        setTimeout(() => {
            notification.error = false;
            notification.success = false;
        }, 5000);
    }

    $: accountName;
    $: console.log('accountName', accountName);
    $: notification;
    $: state;
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
                        setState("DISCORD_INVITE");
                    }}
                />
            </div>
        </div>
    {:else if state === "DISCORD_INVITE"}
        <div class="content" in:fly={{ y: inY }} out:fly={{ y: outY }}>
            <div class="inner">
                <Discord.Invite
                    on:next={() => {
                        setState("DISCORD_GET_ID");
                    }}
                />
            </div>
        </div>
    {:else if state === "DISCORD_GET_ID"}
        <div class="content" in:fly={{ y: inY }} out:fly={{ y: outY }}>
            <div class="inner">
                <Discord.GetId
                    on:error={(event) => {
                        createNotificaction('error', event.detail);
                    }}
                    on:success={(event) => {
                        createNotificaction('success', event.detail);
                    }}
                    on:back={(event) => {
                        animateBackward();
                        setState("DISCORD_INVITE");
                        createNotificaction('error', event.detail);
                    }}
                    on:next={(event) => {
                        setState("GOOGLE_DRIVE_ACCOUNT_NAME");
                    }}
                />
            </div>
        </div>
    {:else if state === "GOOGLE_DRIVE_ACCOUNT_NAME"}
        <div class="content" in:fly={{ y: inY }} out:fly={{ y: outY }}>
            <div class="inner">
                <Drive.AccountName
                    on:error={(event) => {
                        createNotificaction('error', event.detail);
                    }}
                    on:next={(event) => {
                        setState("GOOGLE_DRIVE_ENABLE_API");
                        accountName = event.detail;
                    }}
                />
            </div>
        </div>
    {:else if state === "GOOGLE_DRIVE_ENABLE_API"}
        <div class="content" in:fly={{ y: inY }} out:fly={{ y: outY }}>
            <div class="inner">
                <Drive.EnableApi
                    on:next={(event) => {
                        setState("GOOGLE_DRIVE_COPY_CREDENTIALS");
                    }}
                />
            </div>
        </div>
    {:else if state === "GOOGLE_DRIVE_COPY_CREDENTIALS"}
        <div class="content" in:fly={{ y: inY }} out:fly={{ y: outY }}>
            <div class="inner">
                <Drive.CopyCredentials
                    bind:accountName
                    on:next={(event) => {
                        setState("GOOGLE_DRIVE_AUTHORIZE");
                    }}
                    on:back={(event) => {
                        animateBackward();
                        setState("GOOGLE_DRIVE_ACCOUNT_NAME");
                    }}
                />
            </div>
        </div>
    {/if}

    {#if notification.error}
        <div in:fly out:fly>
            <Notifications.Error message={notification.message} />
        </div>
    {:else if notification.success}
        <div in:fly out:fly>
            <Notifications.Success message={notification.message} />
        </div>
    {/if}
</div>