<script>

    export let stats

    import { slide } from 'svelte/transition'

    let sortedStats = sortbygame(stats)
    let gamestats = sortedStats.sorted
    let nameLookupTable = sortedStats.lookup
    const highscores = gethighscores(gamestats)
    const gamedominance = getdominance(gamestats)
    let itemsExpanded = []
    let playsExpanded = []

    function gethighscores(stats) {
        let highscores = {}
        Object.keys(nameLookupTable).forEach(gameid => {
            highscores[gameid] = { result: { points: 0 } }
            stats[gameid].forEach(result => {
                result.result.forEach(res => {
                    if (res.result.points && (res.result.points > highscores[gameid].result.points)) {
                        highscores[gameid] = res
                    }
                })
                
            })
        })
        return highscores
    }

    function getdominance(stats) {
        let dominance = {}
        Object.keys(nameLookupTable).forEach(gameid => {
            dominance[gameid] = {}
            stats[gameid].forEach(stat => {
                stat.result.forEach(playerresult => {
                    if (playerresult.result.win) {

                        if (!dominance[gameid][playerresult.player.name]) {
                            dominance[gameid][playerresult.player.name] = 1
                        }
                        else {
                            dominance[gameid][playerresult.player.name] ++
                        }
                    }
                })
            })
            let highest = 0
            Object.keys(dominance[gameid]).forEach(name => {
                if (dominance[gameid][name] > highest) {
                    highest = dominance[gameid][name]
                }
            })
            Object.keys(dominance[gameid]).forEach(name => {
                if (dominance[gameid][name] < highest) {
                    delete dominance[gameid][name]
                }
            })
            if (!Object.keys(dominance[gameid]).length) {
                delete dominance[gameid]
            }
        })
        return dominance
    }

    function sortbygame(s) {
        
        let sorted = {}
        let lookup = {}
        s.forEach(r => {
            
            if (!sorted[r.game._id]) {
                sorted[r.game._id] = []
                lookup[r.game._id] = r.game.name
            }
            sorted[r.game._id].push(r)

        });
        
        return { sorted, lookup }

    };

    function toggleExpand(id) {
        if (itemsExpanded.includes(id)) {
            for (let i = 0; i < itemsExpanded.length; i++) {
                if (itemsExpanded[i] === id) {
                    itemsExpanded.splice(i, 1)
                    itemsExpanded = itemsExpanded
                    return
                }
            }
        }
        else {
            itemsExpanded.push(id)
            itemsExpanded = itemsExpanded
        }
    }

    function togglePlayExpand(id) {
        if (playsExpanded.includes(id)) {
            for (let i = 0; i < playsExpanded.length; i++) {
                if (playsExpanded[i] === id) {
                    playsExpanded.splice(i, 1)
                    playsExpanded = playsExpanded
                    return
                }
            }
        }
        else {
            playsExpanded.push(id)
            playsExpanded = playsExpanded
        }
    }

</script>

<h2>all plays logged:</h2>

<ul>
    { #each Object.keys(gamestats) as gameId }
        <li on:click='{e => toggleExpand(gameId)}'>
            {@html nameLookupTable[gameId]} ({ gamestats[gameId].length })
        </li>

        {#if itemsExpanded.includes(gameId)}
            <ul transition:slide>
                {#each gamestats[gameId] as play}
                    <li on:click='{e => togglePlayExpand(play._id)}'>
                        {play.date} <a href="/stats/{play._id}">-></a>
                        {#if playsExpanded.includes(play._id)}
                            <div transition:slide>

                                {#each play.result.sort((a, b) => { if (a.result.win) { return -1 } else {return b.result.points - a.result.points} } ) as p}
                                    <div class="playBox" data-win="{p.result.win}" data-points="{p.result.points}">
                                        {p.player.name}
                                    </div>
                                {/each}

                            </div>
                        {/if}
                    </li>
                {/each}
            </ul>
        {/if}

    { /each }
</ul>

<h2>highscores</h2>
<ul>
    {#each Object.keys(nameLookupTable) as id}
        {#if highscores[id].result.points}
            <li>
                {nameLookupTable[id]}: {highscores[id].result.points} {highscores[id].player.name}
            </li>
        {/if}
    {/each}
</ul>

<h2>most wins</h2>
<ul>
    {#each Object.keys(gamedominance) as gameid}
        <li>
            {nameLookupTable[gameid]}:
            {#each Object.keys(gamedominance[gameid]) as winner, i}
                {#if i > 0}
                , 
                {/if}
                {winner} {gamedominance[gameid][winner]}
            {/each}
            
        </li>
    {/each}
</ul>


<style>

    .playBox[data-win = true] {
        color: green;
        font-weight: bold;
    }

    .playBox[data-points]::after {
        margin-left: 10px;
        content: attr(data-points);
    }

    .playBox[data-points = false]::after {
        content: '';
    }

</style>