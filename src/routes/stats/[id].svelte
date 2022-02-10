<script context="module">

    export async function load({ page, fetch, session, stuff }) {
        if (!session.authenticated) {
			return {
				status: '302',
				redirect: '/unauthenticated'
			}
		}
        const result = await fetch('/api/stats/' + page.params.id, {method: 'get'})
        const play = await result.json()

        for (let index = 0; index < play.result.length; index++) {
            const r = play.result[index]
            const player = await fetch('/api/users/' + r.player._id)
            r.player = await player.json()            
        }

        return {
            props: { play }
        }
    }

</script>

<script>
    import Userbox from '$lib/Userbox.svelte'
    export let play

    const medal = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 392.7 392.7" style="enable-background:new 0 0 392.663 392.663" xml:space="preserve"><path style="fill:#fff" d="M196.3 154.4a108.3 108.3 0 1 0 0 216.4 108.3 108.3 0 0 0 0-216.4z"/><path style="fill:#56ace0" d="M171.6 21.9h49.5v70.9h-49.5z"/><path style="fill:#194f82" d="M268 154.2v-50.6c0-6-4.8-10.9-10.8-10.9h-14.3V10.9c0-6-4.9-10.9-11-10.9h-71.3c-6 0-10.9 4.8-10.9 11v81.7h-14.3c-6 0-11 4.9-11 11v50.5a129.9 129.9 0 0 0 72 238.5A130.2 130.2 0 0 0 268 154.2zm-71.7 216.6a108.3 108.3 0 1 1 0-216.4 108.3 108.3 0 0 1 0 216.4zm-24.7-349h49.5v70.9h-49.5V21.9zm-25.2 92.7h100v28a130 130 0 0 0-100 0v-28z"/><path style="fill:#ffc10d" d="M196.3 349a86.4 86.4 0 1 1 .2-172.9 86.4 86.4 0 0 1-.2 173z"/><path style="fill:#fff" d="m201.8 250.9-5.5-16.7L191 251a11 11 0 0 1-10.3 7.5H163l14.3 10.3a11 11 0 0 1 3.9 12.3l-5.4 16.6 14.2-10.3c3.8-2.8 9-2.8 12.8 0l14.2 10.3-5.4-16.6a11 11 0 0 1 4-12.3l14.2-10.3h-17.6c-4.8 0-9-3-10.4-7.5z"/><path style="fill:#194f82" d="M273.6 244.2a11 11 0 0 0-10.4-7.5h-43.1l-13.4-41.1a11 11 0 0 0-20.7 0l-13.4 41h-43.2a11 11 0 0 0-6.4 19.8l35 25.4-13.5 41a11 11 0 0 0 16.8 12.3l34.9-25.4 35 25.4a10.9 10.9 0 0 0 16.7-12.3l-13.4-41 34.9-25.5c4.1-2.7 5.7-7.7 4.2-12.1zm-58.1 24.5a11 11 0 0 0-4 12.3l5.5 16.6-14.3-10.3c-3.8-2.8-9-2.8-12.8 0l-14.2 10.3 5.4-16.6a11 11 0 0 0-3.9-12.3L163 258.4h17.5c4.7 0 8.9-3 10.3-7.5l5.5-16.7 5.4 16.7a11 11 0 0 0 10.3 7.5h17.6l-14.1 10.3z"/></svg>'
    console.log(play)
</script>

<section>

    <div class="result">

        <span class="name"><h2>{play.game.name}</h2></span>
        
        <h3>Played on: {play.date}</h3>
        <ul class="players">
            {#each play.result.sort((a,b) => { return b.result.points - a.result.points }) as res}
                <li>
                    <Userbox userstore={res.player} type=1 />
                    {#if res.result.points}
                        <span class="points">{res.result.points}</span>
                    {/if}
                    <span class="win">
                        {@html res.result.win ? medal : ''}
                    </span>
                </li>
                
            {/each}
        </ul>

    </div>
    
</section>

<style>
    ul.players {
        padding: 0;
    }
    ul.players > li {
        display: flex;
        list-style: none;
        background-color: rgb(200, 223, 253);
        border-radius: 5px;
        height: 74px;
        justify-content: space-between;
    }
    ul.players > li + li {
        margin-top: 4px;
    }
    ul.players > li:nth-of-type(even) {
        background-color: rgb(215, 233, 255);
    }
    span.name {
        display: block;
        color: white;
        background-color: rgb(25, 79, 130);
        margin: -8px;
        padding: 4px 8px;
    }
    span.name > h2 {
        margin: 0;
    }
    span.points {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        font-size: 1.4rem;
    }
    span.win {
        display: flex;
        height: 66px;
        padding: 4px;
        width: 90px;
    }
</style>
