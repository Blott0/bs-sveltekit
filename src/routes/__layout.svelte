<script context="module">

	export async function load({session}) {
		return {
			props: {
				authenticated: session.authenticated,
				userinfo: {
					username: session.username,
					_id: session.uid,
					email: session.email,
					avatar: session.avatar
				}
			}
		}
	}

</script>

<script>
	
	import Header from '$lib/Header.svelte'
	import Screen from '$lib/Screen.svelte'
	import Popover from '$lib/Popover.svelte'
	import Usereditor from '$lib/Usereditor.svelte'
	import Logindialog from '$lib/Logindialog.svelte'
	import Dialog from '$lib/Dialog.svelte'
	import Playadder from '$lib/Playadder.svelte'
	import Addtocollection from '$lib/Addtocollection.svelte'
	import Friendadder from '$lib/Friendadder.svelte'
	import { onDestroy} from 'svelte'
	import { fade } from 'svelte/transition'
	import '../app.css'

	import { user, gameslist, ownedgames, friends } from './stores.js'

	export let authenticated
	export let userinfo

	user.set(authenticated ? userinfo : {username: 'login', _id: undefined})

	let fail = false
	let loginToggle = false
	let color = authenticated ? 'green' : 'orange'
	let edituser
	let popover
	let colors = {
		1: 'rgb(88, 88, 145)',
		2: 'orange',
		3: 'red'
	}

	let itemsArray
	const unsubgames = gameslist.subscribe(value => {
		itemsArray = value.itemsArray
	})

	let ownedGames
	const unsubowned = ownedgames.subscribe(value => {
		ownedGames = value.itemsArray
	})

	let friendslist
	const unsubfriends = friends.subscribe(value => {
		friendslist = value.itemsArray
	})

	let userstore
	const unsubuser = user.subscribe(value => {
		userstore = value
	})

	function setavatar(e) {
		const usr = {
			_id: userstore._id,
			username: userstore.username,
			email: userstore.email,
			avatar: e
		}
		user.set(usr)
	}

	// const unsuball = function name(params) {
		
	// }


	// onDestroy(
	// 	unsuball
	// )

	let games = ownedGames

	let optionstoggle = {}

	let toggle

	function toggleOption(o) {
		toggle = o
	}

	function gameaddfailed(message) {
		popover = {
			title: 'add game failed',
			message: message.error,
			severity: 2,
			options: [ 'ok' ]
		};
	}

	function gameAdded(result) {
		ownedGames.push(result)
		optionstoggle.Addtocollection = !optionstoggle.Addtocollection
		popover = {
			title: 'message',
			message: 'Game addded to collection',
			severity: 1,
			options: [ 'ok' ]
		}
	}

	async function login(info) {
		const res = await fetch('/api/login', {method: 'post', body: JSON.stringify(info)})
        const data = await res.json()
        if (res.status === 200) {
			if (!(data.result && data.result == 'fail') && data._id && data.username) {
				fail = false
				loginToggle = !loginToggle
				color = 'green'
				user.set({
					username: data.username,
					email: data.email,
					_id: data._id
				});
				popover = {
					title: 'success',
					message: 'you have successfully logged in',
					severity: 1,
					options: [ 'ok' ]
				} 
				toggle = false
			}
			else {
				fail = true
				popover = {
					title: 'fail',
					message: 'login failed',
					severity: 2,
					options: [ 'ok' ]
				} 
			}
            return;
        } 
        else {			
            this.error(res.status, data.message);
        }
	}

	function playadded(details) {
		popover = {
			title: 'success',
			message: 'play added',
			severity: 1,
			options: [ 'ok' ]
		}
		toggle = false
	}

	function friendadded(friend) {
		popover = {
			title: 'success',
			message: 'friend added',
			severity: 1,
			options: [ 'ok' ]
		}
		toggle = false
	}

	function failedaddfriend(error) {
		popover = {
			title: 'fail',
			message: error,
			severity: 2,
			options: [ 'ok' ]
		} 
	}

	// let colorschanged

</script>

<svelte:head>

</svelte:head>

<Header {color} {userstore} on:login='{ e => toggle = "login" }' on:toggle="{ e => toggleOption(e.detail.component) }" />

<main> 	<!-- class:colors="{colorschanged}" -->
	<!-- <input type="checkbox" bind:checked="{colorschanged}"> -->
	<slot />
</main>

<footer>
	<p>BlottSite - by Blotto</p>
</footer>

{#if (toggle || popover)}
	<div transition:fade class="screen" on:click="{ e => toggle = false }" />
	{#if toggle === 'login'}
		<Dialog on:loginAttempt="{ e => login(e.detail) }" />
		<!-- <Logindialog {fail} on:loginAttempt="{ e => login(e.detail) }" /> -->
	{:else if toggle === 'Addtocollection'}
		<Addtocollection on:gameaddfailed="{ e => gameaddfailed(e.detail) }" on:gameadded="{ e => gameAdded(e.detail) }" userinfo={userstore} {itemsArray} {ownedGames} />
	{:else if toggle === 'Friendadder'}
		<Friendadder on:friendadded="{e => friendadded(e.detail)}" on:failedaddfriend="{e => failedaddfriend(e.detail)}" userinfo={userstore} />
	{:else if toggle === 'Playadder'}
		<Playadder {ownedGames} {friendslist} userinfo={userstore} on:playadded="{e => playadded(e.detail)}" />
	{:else if toggle === 'Usereditor'}
		<Usereditor userinfo={userstore} on:avatarset="{e => setavatar(e.detail)}" />
	{/if}
{/if}

<Popover {popover} {colors} on:reply="{ e => popover = false }" />

<style>
	
	main {
    	margin-bottom: 24px;
		background-color: #ededed;
        min-height: calc(100vh - 90px);
		box-shadow: 0 4px 14px rgba(0,0,0,.4);
	}

	/* main.colors {
		background-color: rgb(255, 251, 255);
		color: rgb(46, 64, 87);
	}

	main.colors + footer {
		background-color: rgb(214, 244, 157);
	} */

	.screen {
		z-index: 1;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,.2);
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	footer {
		background-color: yellowgreen;
		padding: 16px 8px 2px 8px;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -1;
		text-align: center;
	}
	footer > p {
		margin: 0
	}
	
</style>
