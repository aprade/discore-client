import { RendererMessage } from "../../discore/main/ipc-types";
import type { StoreObject } from "../../discore/main/ipc-types";

const writeStore = async (arg: StoreObject) => {
    window.electron.ipcRenderer.invoke(RendererMessage.WRITE_STORE, arg).then((result) => {
        console.log('Ress', result);
        return result
    })
}

export default {
    writeStore,
}