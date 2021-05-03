import { writable } from "svelte/store";

export type StoreObject = {
	key: string,
	value: string,
};

export const storedSession = writable(localStorage.getItem("CurrentSession") || "WELCOME");

export const storedGuildName = writable(localStorage.getItem("GuildName") || undefined);
export const storedGuildId = writable(localStorage.getItem("GuildID") || undefined);

export const storedDriveAccountsNames = writable(JSON.parse(localStorage.getItem("DriveAccountsNames") || "[]"));
export const storedDriveAccountsPaths = writable(JSON.parse(localStorage.getItem("DriveAccountsPaths") || "{}"));