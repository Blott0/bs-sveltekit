<script>

    export let ownedGames
    export let friendslist
    export let userinfo

    import { createEventDispatcher } from 'svelte'
    import { fly, slide } from 'svelte/transition'

    const dispatch = createEventDispatcher()

    let date = new Date().toISOString().slice(0,10);
    let selectedplayers = []
    let selectedgame
    let playerscores = {}
    let playerswin = {}
    let playLegal = true

    async function getgames(users) {
        let newlist = ownedGames
        for (let index = 0; index < selectedplayers.length; index++) {
            const user = selectedplayers[index];
            if (user !== userinfo._id) {
                const response = await fetch("/api/collection/" + user, {method: 'get'})
                const usercollection = await response.json()
                newlist = newlist.concat(usercollection)
            }
        }
        groupgames = newlist
    }

    function getLookup(list) {
        const table = {}
        table[userinfo._id] = userinfo.username
        list.forEach(item => {
            table[item._id] = item.name ? item.name : item.username
        });
        return table
    }

    $: groupgames = selectedplayers.length > 0 ? getgames(selectedplayers) : ownedGames
    $: gameslookup = groupgames.length > 0 ? getLookup(groupgames) : {}
    const playerlookup = getLookup(friendslist)

    function compileResults(scores) {
        let newresults = []
        selectedplayers.forEach((player, i) => {
            const newplayer = {
                name: playerlookup[player], 
                _id: player
            }
            const newscore = {
                points: playerscores[i] ? playerscores[i] : false,
                win: playerswin[i] ? true : false
            }
            newresults.push({ result: newscore, player: newplayer, team: false })
        });
        return newresults
    }

    $: play = {
        game: {
            name: selectedgame ? gameslookup[selectedgame] : false,
            _id: selectedgame ? selectedgame : false
        },
        result: compileResults(playerscores, playerswin),
        date: date,
        legal: playLegal
    };

    async function addPlay() {
        const result = await fetch("api/stats", { method: "post", body: JSON.stringify(play)})
    }

</script>

<form action="/api/stats" method="post" transition:fly="{{ y: -1000 }}" on:submit|preventDefault="{e => addPlay()}">
    <fieldset>
        <legend>Log a game</legend>
        <span>
            <label for="legal">legal:</label>
            <input id="legal" bind:checked="{playLegal}" type="checkbox">
        </span>
        <label for="date">select date:</label>
        <input id="date" type="date" bind:value="{date}">
        <label for="players">select players:</label>
        <select id="players" bind:value="{selectedplayers}" multiple>
            <option value="{userinfo._id}">{userinfo.username}</option>
            {#each friendslist as friend}
                <option value="{friend._id}">{friend.username}</option>
            {/each}
        </select>
        {#if selectedplayers.length > 0}
        <label for="game">select game:</label>
        <select transition:slide id="game" bind:value="{selectedgame}">
            <option disabled selected>select a game</option>
            {#if groupgames.length}
                {#each groupgames as game}
                    {#if (game.minplayers <= selectedplayers.length) && (game.maxplayers >= selectedplayers.length)}
                        <option value="{game._id}">{game.name}</option>
                    {/if}
                {/each}
            {/if}
        </select>
        {/if}

        {#if selectedplayers.length > 0}
            {#each selectedplayers as player, i}
                <span transition:slide>
                    <hr>
                    <p>{playerlookup[player]}</p>
                    <span>
                        <label for="score{i}">score:</label>
                        <input id="score{i}" bind:value="{playerscores[i]}" type="number">
                    </span>
                    <span>
                        <label for="win{i}">victory:</label>
                        <input id="win{i}" bind:checked="{playerswin[i]}" type="checkbox">
                    </span>
                </span>
            {/each}
            <hr>
        {/if}
        <span class="button">
            <input type="submit">
        </span>
    </fieldset>
</form>

<style>

    * {
        border-radius: 5px;
    }

    form {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        z-index: 1;
    }

    fieldset {
        background-color: lightgray;
        border-color: rgb(88, 88, 145);
        display: flex;
        flex-direction: column;
    }

    legend {
        background-color: rgb(88, 88, 145);
        color: white;
        padding: 6px 10px;
        font-weight: bold;
    }

    input {
        border: none;
        box-sizing: border-box;
        padding: 6px 10px;
    }

    select {
        padding: 6px 10px;
        border: none;
        box-sizing: border-box;
    }

    span + label, span + span, span.button, input + label, select + label {
        margin-top: 4px;
    }

    hr {
        width: 100%;
    }

    hr + p {
        margin: 0;
        font-size: 1.15rem;
    }

    fieldset > span.button > input {
        background-color: rgb(88, 88, 145);
        color: white;
        float: right;
        cursor: pointer;
        font-weight: bold;
        transition: .2s ease-in-out;
    }

    fieldset > span.button > input:hover {
        background-color: rgb(140, 140, 220);
    }

</style>