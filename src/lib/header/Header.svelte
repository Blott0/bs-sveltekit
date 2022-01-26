<script>

	export let color;
	export let userinfo;

	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import { fly, fade, slide } from 'svelte/transition';
	import Userbox from '../Userbox.svelte';

	const dispatch = createEventDispatcher()
	const type = 1
	let openNav
	let toggleOptions
	$:title = $page.path == '/' ? 'Home' :
		$page.path == '/collection' ? 'Collection' :
		$page.path == '/games' ? 'Games' :
		$page.path == '/stats' ? 'Stats' :
		$page.path == '/friends' ? 'Friends' :
		$page.path == '/unauthenticated' ? 'unauthenticated' : '?';

	const pathOptions = {
		Collection: [
			{
				component: 'Addtocollection',
				title: 'Add a game to your collection',
				svg: '<svg style="width: 20px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 392.7 392.7" style="enable-background:new 0 0 392.663 392.663" xml:space="preserve"><path style="fill:#ffc10d" d="M165.2 21.8V138c0 6-4.8 10.9-10.9 10.9h-28.6l70.6 70.6L267 149h-28.6c-6 0-11-4.8-11-10.9V21.8h-62z"/><path style="fill:#56ace0" d="M21.9 223.2V338c0 18 14.6 32.7 32.7 32.7H338c18 0 32.7-14.7 32.7-32.7V223.2H349v93c0 18-14.6 32.7-32.7 32.7H76.5c-18 0-32.7-14.7-32.7-32.7v-93h-22z"/><path style="fill:#194f82" d="M188.6 242.8c4 4 11.4 4.2 15.4 0l97-97a10.9 10.9 0 0 0-7.8-18.5h-44V11c0-6-4.9-11-11-11h-83.8c-6 0-11 4.9-11 11v116.3h-44c-8.3-.7-15 11.3-7.7 18.6l96.9 96.9zM154.4 149c6 0 10.9-4.8 10.9-10.9V22h62.1v116.3c0 6 4.9 11 11 11h28.5l-70.6 70.5-70.5-70.5h28.6v-.2z"/><path style="fill:#194f82" d="M381.7 201.5h-43.5c-6 0-11 4.8-11 10.9v104c0 6-4.8 10.9-10.9 10.9H76.4c-6 0-11-4.9-11-11v-13h28.8a11 11 0 1 0 0-21.8H65.6v-21.8H116a11 11 0 1 0 0-21.8H65.6v-25.5c0-6-4.9-11-11-11H11c-6 0-10.9 5-10.9 11v125.7c0 30 24.5 54.5 54.6 54.5H338c30 0 54.6-24.5 54.6-54.5V212.5c-.1-6.1-5-11-11-11zM370.8 338c0 18-14.7 32.7-32.7 32.7H54.6C36.6 370.8 22 356 22 338V223.3h21.8v93c0 18 14.7 32.8 32.7 32.8h239.8c18 0 32.8-14.7 32.8-32.8v-93h21.7v114.8h.1z"/></svg>'
			}
		],
		Stats: [
			{
				component: 'Playadder',
				title: 'Log results of a game',
				svg: '<svg style="width: 20px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 392.7 392.7" style="enable-background:new 0 0 392.663 392.663" xml:space="preserve"><path style="fill:#ffc10d" d="M165.2 21.8V138c0 6-4.8 10.9-10.9 10.9h-28.6l70.6 70.6L267 149h-28.6c-6 0-11-4.8-11-10.9V21.8h-62z"/><path style="fill:#56ace0" d="M21.9 223.2V338c0 18 14.6 32.7 32.7 32.7H338c18 0 32.7-14.7 32.7-32.7V223.2H349v93c0 18-14.6 32.7-32.7 32.7H76.5c-18 0-32.7-14.7-32.7-32.7v-93h-22z"/><path style="fill:#194f82" d="M188.6 242.8c4 4 11.4 4.2 15.4 0l97-97a10.9 10.9 0 0 0-7.8-18.5h-44V11c0-6-4.9-11-11-11h-83.8c-6 0-11 4.9-11 11v116.3h-44c-8.3-.7-15 11.3-7.7 18.6l96.9 96.9zM154.4 149c6 0 10.9-4.8 10.9-10.9V22h62.1v116.3c0 6 4.9 11 11 11h28.5l-70.6 70.5-70.5-70.5h28.6v-.2z"/><path style="fill:#194f82" d="M381.7 201.5h-43.5c-6 0-11 4.8-11 10.9v104c0 6-4.8 10.9-10.9 10.9H76.4c-6 0-11-4.9-11-11v-13h28.8a11 11 0 1 0 0-21.8H65.6v-21.8H116a11 11 0 1 0 0-21.8H65.6v-25.5c0-6-4.9-11-11-11H11c-6 0-10.9 5-10.9 11v125.7c0 30 24.5 54.5 54.6 54.5H338c30 0 54.6-24.5 54.6-54.5V212.5c-.1-6.1-5-11-11-11zM370.8 338c0 18-14.7 32.7-32.7 32.7H54.6C36.6 370.8 22 356 22 338V223.3h21.8v93c0 18 14.7 32.8 32.7 32.8h239.8c18 0 32.8-14.7 32.8-32.8v-93h21.7v114.8h.1z"/></svg>'
			}
		],
		Friends: [
			{
				component: 'Friendadder',
				title: 'add a friend',
				svg: 'add a friend'
			}
		]
	}

	function toggleOption(o) {
		toggleOptions = !toggleOptions
		dispatch('toggle', o)
	}

	function login() {
		if (color !== "green") {
			dispatch('login', 'toggle');
		}
		else {
			dispatch('edituser', 'toggle');
		};
	};

</script>

<header>
	
	<input hidden id="navToggle" type="checkbox" bind:checked={openNav}>
	
	<label on:click="{e => toggleOptions = false}" for="navToggle">
		<span />
		<span />
		<span />
	</label>
	{#if openNav}
		<div transition:fade class="screen"  on:click="{ e => openNav = !openNav }" />
		<nav transition:fly="{{x: -1000}}">
			<ul>
				<li class:active={$page.path === '/'} on:click="{ e => openNav = false }">
					<a sveltekit:prefetch href="/">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 507.9 507.9" style="enable-background:new 0 0 507.93 507.93" xml:space="preserve"><path style="fill:#fff" d="M103.5 225.8h300.9v253.9H103.5zM53.4 197.5h401L253.9 32.4z"/><path style="fill:#56ace0" d="m254 69-20.2 16.5h12.7a14 14 0 1 1 0 28.2h-47l-21 17.3h20a14 14 0 1 1 0 28.2H144.3L132 169.2h243.8L254 69z"/><path style="fill:#ffc10d" d="M202.4 337h103v142.6h-103z"/><path style="fill:#194f82" d="M501.6 199.8 263 3.2a14 14 0 0 0-17.9 0L5.1 200.8a14.1 14.1 0 0 0 9 25h61.1v268A14 14 0 0 0 89.3 508h329.2a14 14 0 0 0 14.1-14v-268h61.2a14 14 0 0 0 14.1-14.2 14 14 0 0 0-6.3-11.9zM305.4 479.6h-103V337h103v142.6zm99 0h-70.8V323a14 14 0 0 0-14-14H188.2a14 14 0 0 0-14 14v156.7h-70.9V225.8h301v253.8zm-351-282L254 32.3l200.5 165.2h-401z"/></svg>
						Home
					</a>
				</li>
				<li class:active={$page.path === '/collection'} on:click="{ e => openNav = false }">
					<a sveltekit:prefetch href="/collection">
						<!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 392.6 392.6" style="enable-background:new 0 0 392.632 392.632" xml:space="preserve"><path style="fill:#fff" d="M321.3 238.2H26.1c1.5 5.5 2.8 10.8 3.8 16.3h263a11 11 0 1 1 0 21.9H32.6c.5 7.5.5 15 0 22.5H245a11 11 0 1 1 0 21.9H29.8c-1 5.5-2.2 11-3.8 16.3h295.3a49.4 49.4 0 0 0 0-98.9zM21.8 105a49.4 49.4 0 0 0 49.4 49.3h295.3c-1.6-5.4-2.8-10.8-3.9-16.3H98.4a11 11 0 1 1 0-21.8H360c-.5-7.5-.5-15 0-22.6H147.6a11 11 0 1 1 0-21.8h215.2c1-5.5 2.2-11 3.8-16.3H71.3a49.6 49.6 0 0 0-49.5 49.4z"/><path style="fill:#ffc10d" d="M53 315.2a202 202 0 0 0 0-55.1h268.5a27.6 27.6 0 1 1-.1 55.1H53z"/><path style="fill:#56ace0" d="M71.3 132.5a27.6 27.6 0 0 1 0-55.2h268.5a202 202 0 0 0 0 55.2H71.3z"/><path style="fill:#194f82" d="M.7 344A11 11 0 0 0 11 358.9h310.4a71.3 71.3 0 0 0 0-142.5H10.9c-7.6 0-12.7 7.4-10.2 14.9 14 36.3 14 76.3 0 112.7zm303-78.5c0-6-4.9-11-11-11H29.9c-1-5.5-2.2-11-3.8-16.3h295.3a49.4 49.4 0 0 1 0 98.8H26c1.5-5.4 2.8-10.8 3.8-16.3h215.2a11 11 0 1 0 0-21.8H32.6c.5-7.5.5-15 0-22.6h260c6.2 0 11-4.8 11-10.8zM391.9 48.6a10.9 10.9 0 0 0-10.3-14.8H71.3a71.3 71.3 0 0 0 0 142.4h310.4a11 11 0 0 0 10.2-14.8C378 125 378 85 392 48.6zm-244.3 45H360c-.5 7.6-.5 15 0 22.7H98.5a11 11 0 1 0 0 21.8h264.3c1 5.5 2.2 11 3.8 16.3H71.3a49.4 49.4 0 0 1 0-98.8h295.2c-1.5 5.4-2.8 10.8-3.8 16.3H147.6a11 11 0 1 0 0 21.8z"/></svg> -->
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 392.6 392.6" style="enable-background:new 0 0 392.598 392.598" xml:space="preserve"><path style="fill:#fff" d="M76.4 326.9h85c6.1 0 11-4.9 11-11V33c0-6-4.8-10.9-11-10.9h-85c-6 0-11 4.9-11 11v283c0 6 5 10.9 11 10.9z"/><path style="fill:#ffc10d" d="M231.6 326.9h85a11 11 0 0 0 10.6-8.3l.4-285.6c0-6-4.8-11-10.9-11h-85.1c-6 0-11 4.9-11 11v283c0 6 5 10.9 11 10.9z"/><path style="fill:#fff" d="M118.9 255.7a9.8 9.8 0 1 0 0 19.6 9.8 9.8 0 0 0 0-19.6zM274 255.7a9.8 9.8 0 1 0 0 19.6 9.8 9.8 0 0 0 0-19.6z"/><path style="fill:#194f82" d="M118.9 297a31.7 31.7 0 1 0-.1-63.4 31.7 31.7 0 0 0 0 63.3zm0-41.5a9.8 9.8 0 1 1 0 19.7 9.8 9.8 0 0 1 0-19.7zM98.2 87.1h41.4a11 11 0 1 0 0-21.8H98.2a11 11 0 1 0 0 21.8zM98.2 141h41.4a11 11 0 1 0 0-21.9H98.2a11 11 0 1 0 0 21.9zM274 297a31.7 31.7 0 1 0 0-63.4 31.7 31.7 0 0 0 0 63.3zm0-41.5a9.8 9.8 0 1 1 0 19.7 9.8 9.8 0 0 1 0-19.7zM253.3 87.1h41.5a11 11 0 1 0 0-21.8h-41.5a11 11 0 1 0 0 21.8zM253.3 141h41.5a11 11 0 1 0 0-21.9h-41.5a11 11 0 1 0 0 21.9z"/><path style="fill:#194f82" d="M381.7 203.4h-32.4V33c0-18-14.6-32.7-32.7-32.7h-85c-18 0-32.7 14.6-32.7 32.7v283c0 3.8.7 7.4 1.9 10.9h-8.4c1.2-3.5 2-7.2 2-11V33c0-18-14.7-32.6-32.8-32.6H76.4C58.4.3 43.7 14.9 43.7 33v170.4H10.9c-6 0-10.9 4.9-10.9 11v167c0 6 4.8 11 11 11h370.7c6 0 10.9-5 10.9-11v-167c0-6.1-4.9-11-10.9-11zM220.6 33c0-6 4.8-11 10.9-11h85c6 0 11 4.9 11 11l-.4 285.6a10.9 10.9 0 0 1-10.6 8.3h-85c-6 0-10.9-4.9-10.9-11V33zM65.5 33c0-6 4.8-11 11-11h85c6 0 11 4.9 11 11v283c0 6-5 10.9-11 10.9h-85c-6.1 0-11-4.9-11-11V33zm305.3 337.4h-349V225.2h21.8v112.4c0 6 4.9 11 11 11H338c6 0 11-4.9 11-11l.3-112.4H371v145.2z"/><path style="fill:#56ace0" d="M349 337.8c0 6-4.8 10.9-10.9 10.9H54.6c-6 0-10.9-4.8-10.9-11V225.4H21.9v145.3h349V225.2h-21.5l-.4 112.6z"/></svg>
						Collection
					</a>
				</li>
				<li class:active={$page.path === '/friends'} on:click="{ e => openNav = false }"><a sveltekit:prefetch href="/friends">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 392.6 392.6" style="enable-background:new 0 0 392.598 392.598" xml:space="preserve"><path style="fill:#ffc10d" d="M185.2 312.6 141.7 359a10.9 10.9 0 0 1-16 0l-43.3-46.3c-4 2.8-8.6 4.9-13.5 6.1-38.7 10-45.1 18.5-45.9 19.4-1.7 3.5-1.5 17.5.4 32.4H244c1.9-15 2-29 .3-32.5-.5-.8-7-9.2-45.2-19.2a41.5 41.5 0 0 1-13.9-6.4z"/><path style="fill:#ffc10d" d="M170.9 296c-.7-1.1-1.2-2.3-1.7-3.5a62.3 62.3 0 0 1-35.5 11.6 62.4 62.4 0 0 1-35-11.4l-1.8 3.7 36.8 39.2L171 296z"/><path style="fill:#fff" d="m275.7 181.1 26.8-31a54.3 54.3 0 0 1-26.8 7.4c-10.2 0-20-3.2-28.8-8.7l28.8 32.3z"/><path style="fill:#fff" d="M210.8 207.4c0 1.5 0 3-.2 4.4v.2h159c1.4-11.8 1.5-23 .2-26-1.6-2.4-11.8-8.9-38-15.8-4-1-7.9-2.8-11.4-5l-36.8 39.2a11 11 0 0 1-16 0L231 165.3a40 40 0 0 1-11 4.8c-5.4 1.5-10.4 2.9-14.9 4.4 3.7 10 5.7 21 5.7 32.9z"/><path style="fill:#56ace0" d="M133.7 282.4c27.3 0 52.3-31.8 55-68.5a91.9 91.9 0 0 1-50.9-26.8c-11 13.5-31.2 33.3-57.7 37.6 6.2 31.8 29 57.7 53.6 57.7z"/><path style="fill:#fff" d="M78.5 202.7c29.2-6.1 49.5-39.3 49.7-39.7 2-3.4 5.7-5.4 9.8-5.3a11 11 0 0 1 9.4 6c.4.8 11.3 20.2 40 27.6a53.4 53.4 0 0 0-53.7-44.2c-31.2 0-53.3 22.7-55.2 55.6z"/><path style="fill:#ffc10d" d="M275.7 135.7c22.6 0 43.2-26.1 46-56.4A80.3 80.3 0 0 1 279.3 57c-9.6 11.5-26.4 27.3-48.2 31.5 5.7 26.1 24.3 47 44.6 47z"/><path style="fill:#56ace0" d="M229.5 66.6c23.3-6 40-33 40.2-33.2a11 11 0 0 1 19.2.6c.4.7 8.8 16 31.2 22.5a44.5 44.5 0 0 0-44.3-34.7c-25.6 0-44 18.2-46.3 44.8z"/><path style="fill:#194f82" d="M359.5 263.6c-6 0-10.9 4.8-10.9 10.9v74h-49.2a11 11 0 1 0 0 22h60.1c6 0 11-5 11-11v-85c-.1-6-5-11-11-11zM33 124.8c6 0 11-4.9 11-11V44h89.7a11 11 0 1 0 0-21.9H33c-6 0-11 4.9-11 11v80.7c.1 6.1 5 11 11 11z"/><path style="fill:#194f82" d="M388.1 174.2c-4-6-13.8-15.3-50.7-25a19 19 0 0 1-13.7-17.8 96.2 96.2 0 0 0 20-59c0-42-28.6-72.4-68-72.4s-68.2 30.4-68.2 72.4c0 22.8 8 44.2 20.6 59.7-.7 8.2-6 15.1-13.5 17-7.4 2-14.1 4-20 6a74.2 74.2 0 0 0-61-29.9c-44.7 0-77.1 34.5-77.1 82 0 26.2 9.3 50.8 24 68.6a23.6 23.6 0 0 1-17 22c-48 12.4-56 24.5-58.6 28.5-8.3 12.3-4 44.1-1.7 57.2 1 5.2 5.4 9.1 10.7 9.1h239.4c5.3 0 9.8-3.8 10.8-9 2.2-13.1 6.5-45-1.7-57.3-2.7-4-10.7-16-57.8-28.3a23.7 23.7 0 0 1-17.2-22.7 107.2 107.2 0 0 0 20-41.4H379c5.3 0 9.9-3.8 10.8-9 2.5-14.3 5.6-40-1.6-50.7zm-254.4-27a53.4 53.4 0 0 1 53.6 44.2 63.9 63.9 0 0 1-40-27.7 10.9 10.9 0 0 0-9.3-5.9c-4 0-7.6 2-9.8 5.3-.2.4-20.5 33.6-49.7 39.6 1.9-33 24-55.6 55.2-55.6zM199 319c38 10 44.6 18.4 45.1 19.2 1.9 3.6 1.6 17.6-.3 32.5H23.4c-1.9-14.9-2.1-29-.4-32.4.7-1 7.2-9.4 46-19.4 4.8-1.2 9.4-3.4 13.4-6l43.4 46.2a10.8 10.8 0 0 0 15.9 0l43.5-46.5c4.1 2.9 8.8 5.1 13.9 6.4zM96.9 296.5l1.7-3.7a62.6 62.6 0 0 0 35 11.4c12.6 0 24.8-4.4 35.6-11.7.4 1.3 1 2.4 1.6 3.6l-37.2 39.7-36.7-39.3zm36.8-14.1c-24.7 0-47.4-25.8-53.7-57.7 26.6-4.4 46.8-24.2 57.7-37.6a91 91 0 0 0 51 26.9c-2.7 36.4-27.7 68.4-55 68.4zm142-146.7c-20.2 0-38.9-21-44.6-47 21.9-4.3 38.7-20.1 48.3-31.6a80.3 80.3 0 0 0 42.3 22.2c-2.8 30.3-23.4 56.4-46 56.4zm26.7 14.3-26.8 31.1-28.8-32.3a54.5 54.5 0 0 0 28.8 8.7 54 54 0 0 0 26.8-7.5zM275.7 21.8A44.5 44.5 0 0 1 320 56.5 53 53 0 0 1 288.8 34a10.9 10.9 0 0 0-9.4-6c-4 0-7.7 2-9.7 5.4-.2.3-16.9 27.1-40.2 33.2 2.4-26.6 20.7-44.8 46.2-44.8zm94 190.2h-159c0-1.6.3-3.1.3-4.5 0-11.9-2-23-5.7-32.8 4.4-1.5 9.5-3 15-4.4 3.9-1 7.5-2.7 11-4.8l36.6 39.1a11 11 0 0 0 15.9 0l36.8-39.3c3.5 2.3 7.3 4 11.4 5.1 26.2 6.9 36.4 13.4 38 15.8 1.2 2.9 1 14-.4 25.8z"/></svg>
					Friends</a></li>
				<li class:active={$page.path === '/stats'} on:click="{ e => openNav = false }"><a sveltekit:prefetch href="/stats">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 392.6 392.6" style="enable-background:new 0 0 392.598 392.598" xml:space="preserve"><path style="fill:#ffc10d" d="M92.8 207.3h31.8v163.6H92.8z"/><path style="fill:#fff" d="M201 94.5h31.8v276.3H201z"/><path style="fill:#56ace0" d="M309.1 37.7h31.8v333.1h-31.8z"/><path style="fill:#194f82" d="M381.7 370.8h-18.9v-344c0-6-4.9-11-11-11h-53.6c-6 0-11 4.9-11 11v344h-32.6V83.6c0-6-4.9-11-11-11H190c-6 0-10.9 5-10.9 11v287.2h-32.5V196.3c0-6-4.9-10.9-11-10.9H81.9c-6 0-10.9 4.9-10.9 11v174.4H21.8V11A11 11 0 1 0 0 11v370.8c0 6 4.8 10.9 11 10.9h370.7a11 11 0 1 0 0-21.8zm-257 0H92.7V207.3h31.8v163.5zm108 0H201V94.5h31.8v276.3zm108.3 0h-31.8V37.7H341v333.1z"/></svg>
					Stats</a></li>
			</ul>
		</nav>
	{/if}

	<div class="titlebar" on:click="{e => toggleOptions = !toggleOptions}">
		<h1>{title}</h1>
		<div class="options">
			{#if pathOptions[title]}
				{#each pathOptions[title] as o}
					<div title="{o.title}" on:click="{ toggleOption(o) }">
						{@html o.svg}
					</div>
				{/each}
			{/if}
		</div>
	</div>

	<div class="corner">
		<div style="cursor:pointer" on:loginAttempt on:click="{ e => login() }">
			<Userbox {userinfo} {type} {color} />
		</div>
	</div>
</header>

<style>

	header {
		position: -webkit-sticky;
		position: sticky;
		background-color: rgb(130, 160, 200);
		top: 0;
		padding: 8px;
		display: flex;
		justify-content: space-between;
		z-index: 1;
	}

	label {
		z-index: 1;
		padding: 23px;
		width: 27px;
    	height: 28px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-radius: 5px;
		background-color: rgba(255,255,255,.5);
		transition: background-color .2s;
		cursor: pointer;
	}

	label > span {
		width: 100%;
		border-bottom:2px solid rgb(25, 79, 130);
		transition: border-color .2s, transform .2s ease-in-out, border-color .2s ease-in-out, width .2s ease-in-out;
		transform-origin: left;
	}

	label:hover {
		background-color: rgba(255,255,255,.8);
	}

	label:hover > span {
		border-bottom:2px solid rgb(196, 149, 10);
	}

	input:checked + label > span:nth-of-type(1) {
		width: 136%;
		transform: rotate(45deg);
	}
	input:checked + label > span:nth-of-type(2) {
		border-color: rgba(0,0,0,0);
	}
	input:checked + label > span:nth-of-type(3) {
		width: 136%;
		transform: rotate(-45deg);
	}

	.screen {
		background-color: rgba(0,0,0,.2);
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	nav {
		display: none;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		box-shadow: 10px 0px 120px rgb(0, 0, 0, .8)
	}

	nav > ul {
		background-color: rgb(130, 160, 200);
		max-width: 80%;
		min-width: 180px;
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 0;
		margin: 0;
		padding: 8px;
	}

	input:checked ~ nav {
		background-color: rgba(0,0,0,.2);
		opacity: 1;
		display: flex;
	}

	nav > ul > li + li {
		margin-top: 8px;
	}

	nav > ul > li > a {
		display: flex;
		align-items: center;
		padding: 8px;
		color: rgb(25, 79, 130);
		background-color: rgba(255,255,255,.5);
		text-decoration: none;
		border-radius: 5px;
		transition: transform .2s, color .2s, background-color .2s;
	}

	nav > ul > li > a:hover {
		color: rgb(196, 149, 10);
		background-color: rgba(255,255,255,.8);
	}

	a > svg {
		height: 26px;
		width: 26px;
		margin-right: 4px;
		transition: margin-right .2s;
	}
	nav > ul > li > a:hover > svg {
		margin-right: 8px;
	}
	.options > div {
		padding: 3px;
		border-radius: 5px;
		background-color: rgba(255,255,255,.5);
		transition: background-color .2s;
		cursor: pointer;
		display: flex;
	}
	.options > div:hover {
		background-color: rgba(255,255,255,.8);
	}
	.titlebar {
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.options {
		color: white;
	}
	h1 {
		color: white;
		margin: 0;
	}
	</style>
