<script>
    
    export let userinfo
    export let itemsArray
    export let ownedGames

    import { createEventDispatcher } from 'svelte'
    import { fly, slide } from 'svelte/transition'

    const dispatch = createEventDispatcher()

    let gametoadd
    let options
    let optionselected

    function createlookuptable() {
        let table = []
        itemsArray.forEach(item => {
            table.push(item.name)
        });
        return table
    }

    let gamesLookup = createlookuptable()

    function composeIdList(ownedGames) {
        let list = []
        ownedGames.forEach(game => {
            list.push(game._id)
        });
        return list
    }

    async function addgame() {
        let query
        if (optionselected) {
            // an option was selected from searchresults..
            query = parseInt(optionselected)
        }
        else if (gamesLookup.includes(gametoadd)) {
            // game known.. looking up id
            query = itemsArray[gamesLookup.indexOf(gametoadd)]._id
        }
        else if (parseInt?.(gametoadd)) {
            // int entered.. assuming bgg id
            query = parseInt(gametoadd)
        }
        else {
            // send query as is for bgg search
            query = gametoadd
        }

        const res = await fetch('/api/collection/' + userinfo._id,  { method: 'put', body: query });
        
        switch(res.status) {
            case 200:
                const data = await res.json();
                // console.log(data)
                dispatch('gameadded', query )
                gametoadd = undefined
                break
            case 201:
                const data2 = await res.json();
                // console.log(data2)
                dispatch('gameadded', query )
                gametoadd = undefined
                options = undefined
                break
            case 218:
                options = undefined
                dispatch('gameaddfailed', { error: 'game already in collection'} )
                break
            case 219:
                const data3 = await res.json();
                options = data3.boardgames.boardgame
                break
            case 403:
                dispatch('gameaddfailed', { error: 'user not authenticated or login has expired'} )
                break
            case 406:
                dispatch('gameaddfailed', { error: 'no game found'} )
                break
            default:
                dispatch('gameaddfailed', { error: 'unspecified error'} )
        }
    }

    $:ownedIds = composeIdList(ownedGames)

</script>

    <form transition:fly="{{y: -1000}}" on:click|stopPropagation on:submit|preventDefault={addgame}>
        <fieldset>
            <legend>Collection</legend>
            {#if !options}
                <label hidden for="gameinput">select game from list, enter boardgamegeek id or enter boardgame name:</label>
                <input id="gameinput" list="gameslist" bind:value={gametoadd} type="text" placeholder="e.g. 122515 or keyflower">
                <datalist id="gameslist">
                    {#each itemsArray as game}
                        {#if !ownedIds.includes(game._id)}
                            <option value="{game.name}">
                        {/if}
                    {/each}
                </datalist>
            {:else}
                <label hidden for="gameoptions">select a game to add from search result:</label>
                <select id="gameoptions" transition:slide bind:value={optionselected}>
                    {#each options as option}
                        <option value="{option.$.objectid}">{option.name[0]._} - {option.yearpublished[0]}</option>
                    {/each}
                </select>
            {/if}
            <input type="submit">
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
        border-color: rgb(88, 88, 145);
        background-color: lightgray;
    }

    legend {
        color: white;
        font-weight: bold;
        background-color: rgb(88, 88, 145);
        padding: 6px 10px;
    }

    input, select {
        border: none;
        box-sizing: border-box;
        padding: 6px 10px;
    }

    datalist + input, select + input {
        margin-top: 4px;
    }

    input:not(:last-of-type), select {
        width: 100%;
    }

    input:last-of-type {
        background-color: rgb(88, 88, 145);
        color: white;
        float: right;
        cursor: pointer;
        font-weight: bold;
        transition: .2s ease-in-out;
    }

    input:last-of-type:hover {
        background-color: rgb(140, 140, 220);
    }

</style>