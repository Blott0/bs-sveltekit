<script>

    export let popover;
    export let colors = {
        1: 'green',
        2: 'orange',
        3: 'red'
    }

    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';
    const dispatch = createEventDispatcher();

</script>

{#if popover}

    <form on:click|stopPropagation transition:fly="{{ x: 1000 }}">
        <fieldset style="border-color:{colors[popover.severity]}">
            <legend style="background-color:{colors[popover.severity]}">{popover.title}</legend>
            <p>{popover.message}</p>
            {#if popover.options.includes('ok')}
                <button on:click|preventDefault="{e => dispatch('reply', 'ok')}">
                    ok
                </button>
            {/if}
        </fieldset>
    </form>

{/if}

<style>

    * {
        border-radius: 5px;
    }

    form {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translateY(-50%) translateX(-50%);
        display: flex;
        flex-direction: column;
        z-index: 1;
    }

    fieldset {
        border-style: solid;
        background-color: lightgray;
    }

    legend {
        background-color: rgb(88, 88, 145);
        color: white;
        font-weight: bold;
        padding: 6px 10px;
    }

    input, button {
        border: none;
        box-sizing: border-box;
        padding: 6px 10px;
    }

    button {
        background-color: rgb(88, 88, 145);
        color: white;
        float: right;
        cursor: pointer;
        font-weight: bold;
        transition: .2s ease-in-out;
    }
    
    button:hover {
        background-color: rgb(140, 140, 220);
    }

</style>