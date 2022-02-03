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

	import Carousel from '$lib/Carousel.svelte'
    import { format } from 'date-fns'

	export let logs

	function correctdates(items) {
		items.forEach((item, i) => {
			items[i].date = format(new Date(item.date), 'MMMM do yyyy')
		})
		return items
	}

	let logscorrected = correctdates(logs)
	
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h2>WELCOME TO DICEY POINT</h2>
</section>

<section class=carousel>
	<h2>BEHOLD RECENT ACTIVITY:</h2>
	<Carousel items = {logscorrected} />
	
</section>

<style>

	h2 {
		color: rgb(25, 79, 130);
		font-weight: 900;
		text-align: center;
	}

	section.carousel > h2 {
		padding: 8px;
	}

	section.carousel {
		padding: 0;
	}

</style>
