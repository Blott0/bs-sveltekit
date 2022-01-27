import { writable } from 'svelte/store';

export const user = writable({
    username: 'login',
    _id: undefined
});

export const gameslist = writable({
    itemsArray: []
});

export const ownedgames = writable({
    itemsArray: []
});

export const friends = writable({
    itemsArray: []
});