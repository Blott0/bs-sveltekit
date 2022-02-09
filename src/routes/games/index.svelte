<script context="module">
	
	const escapes = {
		'&gt;': '>',
		'&lt;': '<',
		'&quot;': '"',
		'&amp;': '&'
	};

	function unesc(str) {
		let string = str
		Object.keys(escapes).forEach(esc => {
			const reg = new RegExp(esc, 'g')
			string = string.replace(reg, escapes[esc])
		});
		return string
	}
    
	export async function load({ page, fetch, session, stuff }) {

		const res = await fetch('/api/games', {method: 'get'})

        const data = await res.json()

        if (res.status === 200) {
            let itemsArray = data.map(da => {
				const u = unesc(da.description)
				da.description = u
				return da
            });
            return {
				props: { itemsArray }
			}
        } 
        else {			
            this.error(res.status, data.message)
        }

	}
    
</script>

<script>

    export let itemsArray;
	
	import Easylist from '$lib/Easylist.svelte';

	const listSettings = {
		sort: 'name',
		name: 'gameslist',
		search: [
			'name',
			'description',
			// 'boardgamepublisher'
		],
		columns: [
			{
				title: 'image',
				noSort: true,
				data: {
					key: 'image',
					function: img => {
						return '<div style="background: url(' + img + ') no-repeat top center;background-size:cover;height: 100%"></div>';
					}
				}
			},
			{
				title: 'name',
				width: 50,
				sort: [
					'name',
					'boardgamepublisher'
				],
				data: [
					{
						key: 'name'
					},
					{
						key: 'boardgamepublisher'
					}
				]
			},
			{
				title: 'weight',
				width: 11,
				sort: 'averageweight',
				data: {
					key: 'averageweight',
					function: aw => {
						return '<div title="weight: ' + aw + '"><svg viewBox="0 0 169.9 130.5"><path fill="hsl(' + (120 - (aw / 5 * 120)) + ',100%,50%)" fill-rule="evenodd" d="M78.1 0a66.2 40.6 0 0 0-66 38.3A41.4 28.3 0 0 0 0 58.3a41.4 28.3 0 0 0 41.4 28.3 41.4 28.3 0 0 0 10.4-1 34 22.9 0 0 0 29.6 11.7 34 22.9 0 0 0 .9 0 61.2 61.2 0 0 0 5 33.2l22-1s-2.4-8.3-2.5-19.5a35 21.9 25.5 0 0 35.7-8.9 35 21.9 25.5 0 0 .4-7.4 32 31.6 0 0 0 27-31.2 32 31.6 0 0 0-27.5-31.2A66.2 40.6 0 0 0 78.1 0z"/></svg></div>';
					}
				}
			},
			{
				title: 'players',
				width: 19,
				sort: [
					'minplayers',
					'maxplayers',
					'playingtime'
				],
				data: [
					{
						key: [
							'minplayers',
							'maxplayers'
						],
						function: (mip, map) => {
							let mi = mip;
							const fig = '<svg viewBox="0 -8 63 67"><path fill="black" fill-rule="evenodd" d="M31.5-7.3A25.2 25.2 0 0 0 6.3 17.9a25.2 25.2 0 0 0 5.6 15.8A31.5 31.5 0 0 0 0 58.2a31.5 31.5 0 0 0 0 1h63a31.5 31.5 0 0 0 0-1 31.5 31.5 0 0 0-12-24.6A25.2 25.2 0 0 0 56.7 18 25.2 25.2 0 0 0 31.5-7.3z"/></svg>';
							const fig2 = '<svg viewBox="0 -8 63 67"><path fill="black" fill-opacity=".6" fill-rule="evenodd" d="M31.5-7.3A25.2 25.2 0 0 0 6.3 17.9a25.2 25.2 0 0 0 5.6 15.8A31.5 31.5 0 0 0 0 58.2a31.5 31.5 0 0 0 0 1h63a31.5 31.5 0 0 0 0-1 31.5 31.5 0 0 0-12-24.6A25.2 25.2 0 0 0 56.7 18 25.2 25.2 0 0 0 31.5-7.3z"/></svg>';
							let result = '<div title="' + mip + ' - ' + map + ' players">';
							for (let ma = map; ma > 0; ma--) {
								if (mi > 0) {
									result = result + fig;
								}
								else {
									result = result + fig2;
								}
								mi--;
							}
							return result + '</div>';
						}
					},
					{
						key: 'playingtime'
					}
				]
			}
		],
		expand: [
			{
				key: 'boardgamemechanic'
			},
			{
				key: 'description'
			}
		]
	};

</script>

<svelte:head>
	<title>Games</title>
</svelte:head>

<section>
	<Easylist {itemsArray} {listSettings} />
</section>

<style>

</style>