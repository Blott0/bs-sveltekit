<script>

    export let stats;

    import { slide } from 'svelte/transition';

    let sortedStats = sortbygame(stats);
    let gamestats = sortedStats.sorted;
    let nameLookupTable = sortedStats.lookup;
    let itemsExpanded = [];
    let playsExpanded = [];

    function sortbygame(s) {
        
        let sorted = {};
        let lookup = {};
        s.forEach(r => {
            
            if (!sorted[r.game._id]) {
                sorted[r.game._id] = [];
                lookup[r.game._id] = r.game.name;
            }
            sorted[r.game._id].push(r);

        });
        
        return { sorted, lookup };

    };

    function toggleExpand(id) {
        if (itemsExpanded.includes(id)) {
            for (let i = 0; i < itemsExpanded.length; i++) {
                if (itemsExpanded[i] === id) {
                    itemsExpanded.splice(i, 1);
                    itemsExpanded = itemsExpanded;
                    return;
                }
            }
        }
        else {
            itemsExpanded.push(id);
            itemsExpanded = itemsExpanded;
        }
    }

    function togglePlayExpand(id) {
        if (playsExpanded.includes(id)) {
            for (let i = 0; i < playsExpanded.length; i++) {
                if (playsExpanded[i] === id) {
                    playsExpanded.splice(i, 1);
                    playsExpanded = playsExpanded;
                    return;
                }
            }
        }
        else {
            playsExpanded.push(id);
            playsExpanded = playsExpanded;
        }
    }

</script>

<h1>all plays logged:</h1>

<ul>
    { #each Object.keys(gamestats) as gameId }
        <li on:click='{e => toggleExpand(gameId)}'>
            {@html nameLookupTable[gameId] } ({ gamestats[gameId].length })
        </li>

        {#if itemsExpanded.includes(gameId)}
            <ul transition:slide>
                {#each gamestats[gameId] as play}
                    <li on:click='{e => togglePlayExpand(play._id)}'>
                        {play.date}
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