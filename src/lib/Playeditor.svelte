<script>

    // export let ownedGames
    export let friendslist
    export let userinfo
    export let play
    import { createEventDispatcher } from 'svelte'
    import { fly, slide } from 'svelte/transition'

    const dispatch = createEventDispatcher()

    let date = play.date
    let selectedplayers = []
    let selectedgame = play.game._id
    let playerscores = []
    let playerswin = []
    let playersteam = {}
    let playLegal = true

    play.result.forEach(r => {
        selectedplayers.push(r.player._id)
        playerswin.push(r.result.win)
        playerscores.push(r.result.points)
    })

    // async function getgames(users) {
    //     let newlist = ownedGames
    //     for (let index = 0; index < selectedplayers.length; index++) {
    //         const user = selectedplayers[index]
    //         if (user !== userinfo._id) {
    //             const response = await fetch("/api/collection/" + user, {method: 'get'})
    //             const usercollection = await response.json()
    //             newlist = newlist.concat(usercollection)
    //         }
    //     }
    //     groupgames = newlist
    // }

    function getLookup(list) {
        const table = {}
        table[userinfo.uid] = userinfo.username
        list.forEach(item => {
            table[item._id] = item.name ? item.name : item.username
        })
        return table
    }

    // $: groupgames = selectedplayers.length > 0 ? getgames(selectedplayers) : ownedGames
    // $: gameslookup = groupgames.length > 0 ? getLookup(groupgames) : {}
    const playerlookup = getLookup(friendslist)
    console.log(playerlookup)

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
            if (playersteam[i]) {
                newscore.team = playersteam[i]
            }
            newresults.push({ result: newscore, player: newplayer, team: false })
        })
        return newresults
    }

    $: newplay = {
        game: {
            name: play.game.name,
            _id: play.game._id
        },
        result: compileResults(playerscores, playerswin),
        addedby: userinfo._id,
        date: date,
        legal: playLegal
    }

    $:console.log(newplay)

    // async function addPlay() {
    //     const result = await fetch("/api/stats", { method: "post", body: JSON.stringify(newplay)})
    
    //     switch(result.status) {
    //         case 201:
    //             const data = await result.json();
    //             dispatch('playadded', result.status )
    //             break
    //         case 403:
    //             dispatch('playaddfailed', { error: 'user not authenticated or login has expired'} )
    //             break
    //         default:
    //             dispatch('gameaddfailed', { error: 'unspecified error'} )
    //     }
    
    // }

    async function editPlay() {
    }


</script>

<form action="/api/stats" method="post" transition:fly="{{ y: -1000 }}" on:submit|preventDefault="{e => editPlay()}">
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
            <option value="{userinfo.uid}">{userinfo.username}</option>
            {#each friendslist as friend}
                <option value="{friend._id}">{friend.username}</option>
            {/each}
        </select>
        {#if selectedplayers.length > 0}
        <label for="game">select game:</label>
        <select disabled transition:slide id="game">
            <option>{play.game.name}</option>
        </select>
        {/if}

        {#if selectedplayers.length > 0}
        <hr>
        <div class="playerwrapper">

            {#each selectedplayers as player, i}
                {#if i > 0}
                    <hr>
                {/if}
                <span transition:slide>
                    
                    <p>{playerlookup[player]}</p>
                    <span>
                        <label for="score{i}">score:</label>
                        <input id="score{i}" bind:value="{playerscores[i]}" type="number">
                    </span>
                    <span>
                        <label for="win{i}">victory:</label>
                        <input id="win{i}" bind:checked="{playerswin[i]}" type="checkbox">
                    </span>
                    <span>
                        <label for="team{i}">team:</label>
                        <input id="team{i}" bind:value="{playersteam[i]}" type="text">
                    </span>
                </span>
            {/each}

        </div>
        <hr>
            
        {/if}
        <span class="button">
            {#if Number.isInteger(selectedgame)}
                <input type="submit">
            {/if}
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

    .playerwrapper > span > p {
        margin: 0;
    }

    .playerwrapper > span > span {
        display: flex;
    }

    .playerwrapper > span > span:first-of-type > label {
        padding: 8px 0;
    }

    .playerwrapper > span > span > label + input {
        margin-left: 6px;
    }

    .playerwrapper {
        max-height: 45vh;
        overflow-y: scroll;
        overflow-x: hidden;
    }

</style>