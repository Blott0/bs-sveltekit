<script context="module">
    export async function load({ session, fetch, page }) {
        if (!session.authenticated) {
            return {
                status: '302',
                redirect: '/unauthenticated'
            }
        }
        const response = await fetch('/api/users/' + page.params.id)
        const user = await response.json()
        return {
            props: { user }
        }
    }
</script>

<script>

    import { slide } from 'svelte/transition'

    export let user

    let gamesopened
    console.log(user)
    
</script>

<svelte:head>
	<title>User: {user.username}</title>
</svelte:head>

<section>
    {#if user.avatar?.base64}
        <img src="{user.avatar.base64}">
    {/if}
    
    <h3>{user.username}</h3>
    <span>{user._id}</span><br>
    <span>{user.email}</span><br>
    <label for="games">user owns:</label>
    <input bind:checked="{gamesopened}" id="games" type="checkbox" hidden>
    {#if gamesopened}
        <ul transition:slide>
            {#if user.owns && user.owns.length}
                {#each user.owns as game}
                    <li><a href="/games/{game}">{game}</a></li>
                {/each}
            {/if}
        </ul>
    {/if}
    
</section>

<style>
    img {
        max-width: 100%;
    }
    label {
        cursor: pointer;
    }
    ul {
        list-style: none;
        background-color: rgb(117, 150, 194);
        padding: 0;
        margin: 0;
    }
    li:nth-last-of-type(even) {
        background-color: rgba(255,255,255,.4);
    }
    li:nth-last-of-type(odd) {
        background-color: rgba(255,255,255,.5);
    }
    a {
        text-decoration: none;
        display: block;
        width: 100%;
        height: 100%;
        background-color: rgba(255,255,255,.1);
        transition: background-color .2s;
    }
    a:hover {
        background-color: rgba(255,255,255,.3);
    }
</style>