// import ipc from "./ipc";
import * as store from "./store";

export enum Sessions {
    SETUP_WELCOME = "WELCOME",
    SETUP_DISCORD_INVITE = "DISCORD_INVITE",
    SETUP_DISCORD_GET_ID = "DISCORD_GET_ID",
}

export const session = store.storedSession;

export const writeSession = (newSession: store.StoreObject) => {
    console.log('New session is', newSession);
    localStorage.setItem(newSession.key, newSession.value);
    session.update(() => newSession.value);
}

export const setState = (stateValue: string) => {
    writeSession({
        key: 'CurrentSession',
        value: stateValue,
    });
}