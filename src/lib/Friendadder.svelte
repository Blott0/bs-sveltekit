<script>

    import { fly } from 'svelte/transition'
    import { createEventDispatcher } from 'svelte'

    export let userinfo

    const dispatch = createEventDispatcher()
    let query

    async function addfriend() {
        const result = await fetch("/api/friends/" + userinfo._id,  { method: 'put', body: query })
        
        switch (result.status) {
            case 201:
                const friend = await result.json()
                dispatch(
                    'friendadded', friend
                )
                break
            case 218:
                dispatch(
                    'failedaddfriend', { error: 'user already added' }
                )
                break
            case 406:
                dispatch(
                    'failedaddfriend', { error: 'no user found' }
                )
                break
            default:
        }
    }

</script>

<form transition:fly="{{y: -1000}}" on:click|stopPropagation on:submit|preventDefault={addfriend}>
    <fieldset>
        <legend>Friends</legend>
        <label for="friendinput" hidden>enter user email or id:</label>
        <input id="friendinput" bind:value="{query}" type="text" placeholder="enter user email or id">
        <input type="submit">
    </fieldset>
</form>

<style>

    * {
        border-radius: 5px;
    }

    form {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        z-index: 1;
    }

    fieldset {
        border-color: rgb(88, 88, 145);
        background-color: lightgray;
    }

    legend {
        color: white;
        font-weight: bold;
        background-color: rgb(88, 88, 145);
        padding: 6px 10px;
    }

    input {
        border: none;
        box-sizing: border-box;
        padding: 6px 10px;
    }

    input + input {
        margin-top: 4px;
    }

    input:not(:last-of-type) {
        width: 100%;
    }

    input:last-of-type {
        background-color: rgb(88, 88, 145);
        color: white;
        float: right;
        cursor: pointer;
        font-weight: bold;
        transition: .2s ease-in-out;
    }

    input:last-of-type:hover {
        background-color: rgb(140, 140, 220);
    }

</style>