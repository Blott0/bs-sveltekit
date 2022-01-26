import { writable } from 'svelte/store';

export const user = writable({
    username: 'click to log in',
    _id: 0
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