<script context="module">

	export async function load({ page, fetch, session, stuff }) {

		const logsresult = await fetch('/api/logs', {method: 'get'})
		const logs = await logsresult.json()

		for (let index = 0; index < logs.length; index++) {
			const log = logs[index];
			if (log.event.category === 'collection') {
				const gameid = log.event.target
				const game = await fetch('/api/games/' + gameid, {method: 'get'})
				logs[index].target = await game.json()
			}
			else if (log.event.category === 'plays') {
				const playid = log.event.target
				const play = await fetch('/api/stats/' + playid, {method: 'get'})
				logs[index].target = await play.json()
			}
		}

		return {
			props: { logs }
		}
	}
	
</script>

<script>

	import Logviewer from '$lib/Logviewer.svelte'

	export let logs
	
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>

	<Logviewer {logs} />
	
</section>

<style>

</style>
