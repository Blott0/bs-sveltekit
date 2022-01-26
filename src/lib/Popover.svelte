<script>

    export let popover;

    import { createEventDispatcher } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    const dispatch = createEventDispatcher();

</script>

{#if popover}

    <div transition:fade class="screen" on:click="{e => dispatch('reply', 'ok')}" />

    <div transition:fly="{{ x: 1000 }}" on:click|stopPropagation data-severity="{popover.severity ? popover.severity : 0}" class="messagebox">
        <span class="title">{popover.title}</span>
        <p>{popover.message}</p>

        <div class="buttons">
            {#if popover.options.includes('ok')}
                <button on:click="{e => dispatch('reply', 'ok')}">
                    ok
                </button>
            {/if}
        </div>
    </div>

    

{/if}

<style>

    .screen {
        position: fixed;
        left: 0;
        width: 100%;
        top: 0;
        height: 100%;
        background-color: rgba(30,30,30,.4);
    }

    .messagebox {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translateY(-50%) translateX(-50%);
        padding: 10px;
        display: flex;
        background-color: white;
        flex-direction: column;
        border-radius: 5px;
        overflow: hidden;
    }

    .title {
        font-size: smaller;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 2px;
    }

    .messagebox[data-severity = '0'] {
        border: 2px solid rgb(100,100,170);
    }

    .messagebox[data-severity = '0'] > .title {
        background-color: rgb(100,100,170);
        color: white;
    }

    .messagebox[data-severity = '1'] > .title {
        background-color: orange;
    }

    .buttons {
        width: 100%;
        display: flex;
    }

</style>