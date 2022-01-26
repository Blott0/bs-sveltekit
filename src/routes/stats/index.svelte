<script context="module">
    
	export async function load({ page, fetch, session, stuff }) {

        if (!session.authenticated) {
			return {
				status: '302',
				redirect: '/unauthenticated'
			}
		}

		const res = await fetch('api/stats', {method: 'get'})
        const data = await res.json()

		const res2 = await fetch('api/friends/' + session.uid, {method: 'get'})
        const data2 = await res2.json()

		const res3 = await fetch('api/collection/' + session.uid, {method: 'get'})
        const data3 = await res3.json()

        if (res.status === 200) {
            let stats = data
			let friendslist = data2
			let ownedGames = data3
            return {
				props: { stats, friendslist, ownedGames }
			};
        } 
        else {			
            this.error(res.status, data.message)
        };

	}
    
</script>

<script>

    export let stats
    export let friendslist
	export let ownedGames

	import { friends, ownedgames } from '../stores.js'
	friends.set({itemsArray: friendslist})
	ownedgames.set({itemsArray: ownedGames})
	
	import Gamestats from '$lib/Gamestats.svelte'

</script>

<svelte:head>
	<title>Stats</title>
</svelte:head>

<section>
    <Gamestats {stats} />
</section>

<style>

</style>