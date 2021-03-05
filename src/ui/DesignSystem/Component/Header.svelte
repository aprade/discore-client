<script>
    function HandleClick(event) {
        if (event.srcElement.id.startsWith("cls")) window.electron.ipcRenderer.invoke("IPC_CLOSE_WINDOW");
        else if (event.srcElement.id.startsWith("min")) window.electron.ipcRenderer.invoke("IPC_MINIMIZE_WINDOW");
        else if (event.srcElement.id.startsWith("max")) window.electron.ipcRenderer.invoke("IPC_MAXIMIZE_WINDOW");
    }
</script>

<style>
    #titlebar {
        display: block;
        position: fixed;
        height: 50px;
        width: 100%;
        /* background: #254053; */
    }

    #titlebar #drag-region {
        width: 100%;
        height: 100%;
        -webkit-app-region: drag;
    }

    #window-controls {
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;

        margin-left: 10.5px;

        -webkit-app-region: no-drag;
    }

    #window-controls .button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 13px;
        height: 13px;
        user-select: none;

        margin-top: auto;
        margin-bottom: auto;
        margin-left: 8px;

        border-radius: 100%;
    }

    #window-controls .button#cls-button {
        background-color: #EF233C;
    }

    #window-controls .button#min-button {
        background-color: #97DB4F;
    }

    #window-controls .button#max-button {
        background-color: #FFC478;
    }
</style>

<header id="titlebar">
    <div id="drag-region">
        <div id="window-controls">
            <div class="button" id="cls-button" on:click={HandleClick}>
            </div>
            <div class="button" id="max-button" on:click={HandleClick}>
            </div>
            <div class="button" id="min-button" on:click={HandleClick}>
            </div>
        </div>
    </div>
</header>