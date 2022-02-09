<script context="module">

    export async function load({ page, fetch, session, stuff }) {
        if (!session.authenticated) {
            return {
                status: '302',
                redirect: '/unauthenticated'
            }
        }

        const res = await fetch('/api/friends/' + session.uid, {method: 'get'})
        const friendslist = await res.json()
        
        return {
            props: { friendslist }
        }
    }

</script>

<script>

    import { fade } from 'svelte/transition'
	import Userbox from '$lib/Userbox.svelte'

    export let friendslist


    const friendlookup = friendslist.map(f => {return f._id})
    let display = false

    $:console.log(friendlookup)

</script>

<section>
    {#each friendslist as friend}
        <a on:click|preventDefault="{() => {display = friend._id}}" href="/friends/{friend._id}">
            <Userbox userstore="{friend}" type="1" />
        </a>
    {/each}
    {#if display}
        <form transition:fade on:click="{() => {display = false}}">
            <fieldset>
                <legend>{friendslist[friendlookup.indexOf(display)].username}</legend>
                {#if friendslist[friendlookup.indexOf(display)].avatar?.base64}
                    <img src="{friendslist[friendlookup.indexOf(display)].avatar.base64}">
                {:else}
                    user has no avatar
                {/if}
                <label for="iud">user id:</label>
                <input on:click|stopPropagation id="uid" disabled value="{friendslist[friendlookup.indexOf(display)]._id}" type="text">
                <label for="umail">user email:</label>
                <input on:click|stopPropagation id="umail" disabled value="{friendslist[friendlookup.indexOf(display)].email}" type="text">
                <!-- <label for="iud">user id:</label>
                <input id="uid" disabled value="{friendslist[friendlookup.indexOf(display)]._id}" type="text">
                -->
                {#if friendslist[friendlookup.indexOf(display)].owns?.length > 0}
                    <ul on:click|stopPropagation>
                        {#each friendslist[friendlookup.indexOf(display)].owns as game}
                            <li><a href="/games/{game}">{game.name}</a></li>
                        {/each}
                    </ul>
                {/if}
            </fieldset>
        </form>
    {/if}
</section>

<style>
    section {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-row-gap: 12px;
        place-items: center;
    }
    section > a {
        transition: transform .2s;
    }
    section > a:hover {
        transform: scale(1.05);
    }
    form {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    fieldset {
        background-color: rgb(21, 211, 72);
    }
</style>
