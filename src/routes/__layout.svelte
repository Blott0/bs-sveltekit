<script context="module">

	export async function load({session}) {
		console.log('_layout:', session)
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
	
	// import { user } from './stores.js';
	import Header from '$lib/header/Header.svelte'
	import Screen from '$lib/Screen.svelte'
	import Popover from '$lib/Popover.svelte'
	import Usereditor from '$lib/Usereditor.svelte'
	import Logindialog from '$lib/Logindialog.svelte'
	import Dialog from '$lib/Dialog.svelte'
	import Playadder from '$lib/Playadder.svelte'
	import Addtocollection from '$lib/Addtocollection.svelte'
	import Friendadder from '$lib/Friendadder.svelte'
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
	let popover = false

	let itemsArray
	gameslist.subscribe(value => {
		itemsArray = value.itemsArray
	})

	let ownedGames
	ownedgames.subscribe(value => {
		ownedGames = value.itemsArray
	})

	let friendslist
	friends.subscribe(value => {
		friendslist = value.itemsArray
	})

	let userstore
	user.subscribe(value => {
		userstore = value
	})

	$:console.log(userstore)


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
			severity: 1,
			options: [ 'ok' ]
		};
	}

	function gameAdded(result) {
		ownedGames.push({ _id: result })
		optionstoggle.Addtocollection = !optionstoggle.Addtocollection
		popover = {
			title: 'message',
			message: 'Game addded to collection',
			severity: 0,
			options: [ 'ok' ]
		};
	}

	async function login(info) {
		const res = await fetch('api/login', {method: 'post', body: JSON.stringify(info)});
        const data = await res.json();
        if (res.status === 200) {
			if (!(data.result && data.result == 'fail') && data._id && data.username) {
				fail = false
				loginToggle = !loginToggle;
				color = 'green';
				user.set({
					username: data.username,
					email: data.email,
					_id: data._id
				});
			}
			else {
				// console.log(data.result)
				fail = true
			}
            return;
        } 
        else {			
            this.error(res.status, data.message);
        };
	};

	function friendadded(friend) {
		console.log(friend)
	}

	function failedaddfriend(error) {
		console.log(error)
	}

</script>

<svelte:head>

</svelte:head>

<Header {color} {userinfo} on:login='{ e => toggle = "login" }' on:toggle="{ e => toggleOption(e.detail.component) }" />

<main>
	<slot />
</main>

<footer>
	<p>BlottSite - by Blotto</p>
</footer>

{#if toggle}
	<div transition:fade class="screen" on:click="{ e => toggle = false }" />
	{#if toggle === 'login'}
		<Dialog on:loginAttempt="{ e => login(e.detail) }" />
		<!-- <Logindialog {fail} on:loginAttempt="{ e => login(e.detail) }" /> -->
	{:else if toggle === 'Addtocollection'}
		<Addtocollection on:gameaddfailed="{ e => gameaddfailed(e.detail) }" on:gameadded="{ e => gameAdded(e.detail) }" {userinfo} {itemsArray} {ownedGames} />
	{:else if toggle === 'Friendadder'}
		<Friendadder on:friendadded="{e => friendadded(e.detail)}" on:failedaddfriend="{e => failedaddfriend(e.detail)}" {userinfo} />
	{:else if toggle === 'Playadder'}
		<Playadder {ownedGames} {friendslist} {userinfo} />
	{:else if toggle === 'Usereditor'}
		<Usereditor {userinfo} />
	{/if}
{/if}

<Popover {popover} on:reply="{ e => popover = false }" />

<style>
	
	main {
		padding: 8px;
    	margin-bottom: 18px;
		background-color: #ededed;
        min-height: calc(100vh - 100px);
	}

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
		padding: 0 8px;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: -1;
	}
	footer > p {
		margin: 0
	}
	
</style>
