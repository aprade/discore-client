import { Readable, derived, get } from "svelte/store";

export enum Status {
    NoSession = "NO_SESSION",
    SealedSession = ""
}