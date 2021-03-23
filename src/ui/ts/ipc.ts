import { MainProcess, mainProcessMethods, RendererMessage } from "../../discore/main/ipc-types";

const makeMainProcessClient = (): MainProcess => {
    const client: any = {};
    mainProcessMethods.forEach(method => {
        client[method] = (arg: RendererMessage) =>
            window.electron.ipcRenderer.invoke(method as RendererMessage, arg);
    });
    return client;
}

const mainProcess = makeMainProcessClient();

const getStore = mainProcess.getStore,
      writeStore = mainProcess.writeStore;

export default {
    getStore,
    writeStore,
    mainProcessMethods,
}