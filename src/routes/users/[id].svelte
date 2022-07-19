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
    
    <input bind:checked="{gamesopened}" id="games" type="checkbox" hidden>
    <label for="games"><span>user collection</span></label>
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
        width: 100%;
        background-color: rgb(25, 79, 130);
        display: block;
    }
    label > span {
        color: white;
        font-weight: bold;
    }
    label > span:after {
        margin-left: 4px;
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        border-bottom: 2px solid white;
        border-left: 2px solid white;
        transform: rotate(135deg);
        transition: transform .2s;
    }
    input:checked + label > span:after {
        transform: rotate(-45deg);
    
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