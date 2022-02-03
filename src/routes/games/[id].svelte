<script context="module">

    const escapes = {
		'&gt;': '>',
		'&lt;': '<',
		'&quot;': '"',
		'&amp;': '&'
	}

    function unesc(str) {
		let string = str;
		Object.keys(escapes).forEach(esc => {
			const reg = new RegExp(esc, 'g')
			string = string.replace(reg, escapes[esc])
		})
		return string
	}

    export async function load({ page, fetch, session, stuff }) {

        const res = await fetch('/api/games/' + page.params.id, { method: 'get' })
        const game = await res.json()

        if (res.status === 200) {
            game.description = unesc(game.description)
            let minplayers = []
            for (let index = 0; index < game.minplayers; index++) {
                minplayers.push('player')
            }
            let maxplayers = []
            for (let index = 0; index < (game.maxplayers - game.minplayers); index++) {
                maxplayers.push('player')
            }
            game.minplayers = minplayers
            game.maxplayers = maxplayers
            return {
				props: { game }
			}
        } 
        else {			
            this.error(res.status, data.message)
        }
    }

</script>

<script>

    export let game

    const fig = '<svg viewBox="0 -8 63 67"><path fill="black" fill-rule="evenodd" d="M31.5-7.3A25.2 25.2 0 0 0 6.3 17.9a25.2 25.2 0 0 0 5.6 15.8A31.5 31.5 0 0 0 0 58.2a31.5 31.5 0 0 0 0 1h63a31.5 31.5 0 0 0 0-1 31.5 31.5 0 0 0-12-24.6A25.2 25.2 0 0 0 56.7 18 25.2 25.2 0 0 0 31.5-7.3z"/></svg>';
    const fig2 = '<svg viewBox="0 -8 63 67"><path fill="black" fill-opacity=".6" fill-rule="evenodd" d="M31.5-7.3A25.2 25.2 0 0 0 6.3 17.9a25.2 25.2 0 0 0 5.6 15.8A31.5 31.5 0 0 0 0 58.2a31.5 31.5 0 0 0 0 1h63a31.5 31.5 0 0 0 0-1 31.5 31.5 0 0 0-12-24.6A25.2 25.2 0 0 0 56.7 18 25.2 25.2 0 0 0 31.5-7.3z"/></svg>';
    
</script>

<section>

    <img src="{game.image}">

    <h2>{game.name}</h2>

    <p>{game.boardgamepublisher}</p>

    <div class="players" title="{game.minplayers.length} - {game.minplayers.length + game.maxplayers.length} players">
        {#each game.minplayers as player}
            {@html fig}
        {/each}
        {#each game.maxplayers as player}
            {@html fig2}
        {/each}
    </div>

    <div class="weight" title="weight: {game.averageweight}">
        <svg viewBox="0 0 169.9 130.5">
            <path fill="hsl({(120 - game.averageweight / 5 * 120)},100%,50%)" fill-rule="evenodd" d="M78.1 0a66.2 40.6 0 0 0-66 38.3A41.4 28.3 0 0 0 0 58.3a41.4 28.3 0 0 0 41.4 28.3 41.4 28.3 0 0 0 10.4-1 34 22.9 0 0 0 29.6 11.7 34 22.9 0 0 0 .9 0 61.2 61.2 0 0 0 5 33.2l22-1s-2.4-8.3-2.5-19.5a35 21.9 25.5 0 0 35.7-8.9 35 21.9 25.5 0 0 .4-7.4 32 31.6 0 0 0 27-31.2 32 31.6 0 0 0-27.5-31.2A66.2 40.6 0 0 0 78.1 0z"/>
        </svg>
        <span>{game.averageweight}</span>
    </div>

    <ul>
        {#each game.boardgamedesigner as des}
            <li>
                {des}
            </li>
        {/each}
    </ul>

    <ul>
        {#each game.boardgamecategory as cat}
            <li>
                {cat}
            </li>
        {/each}
    </ul>

    <ul>
        {#each game.boardgamemechanic as mec}
            <li>
                {mec}
            </li>
        {/each}
    </ul>

    <p>{@html unesc(game.description)}</p>

</section>

<style>

    img {
        max-width: 100%;
    }

    .weight {
        display: flex;
        align-items: center;
    }

    .weight > span {
        margin-left: 4px;
    }


</style>