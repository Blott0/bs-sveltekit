<script context="module">

    export async function load({ page, fetch, session, stuff }) {
        const result = await fetch('/api/stats/' + page.params.id, {method: 'get'})
        // console.log(result)
        const play = await result.json()
        return {
            props: { play }
        }
    }

</script>

<script>
    export let play
    console.log(play)
</script>

<h2>{play.game.name}</h2>
<h3>{play.date}</h3>
<div class="players">
    {#each play.result as res}
        {res.player.name}
        {res.result.points}
        {res.result.win ? 'won' : ''}
        <br>
    {/each}
</div>