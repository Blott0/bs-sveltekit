<script>

    import { format } from 'date-fns'
    export let logs

</script>
<div class="logwrapper">
    <input id="0" name="index" data-index="0" hidden type="radio">
    <input id="1" name="index" data-index="1" hidden type="radio">
    <input id="2" name="index" data-index="2" hidden type="radio">
    <div class="logs">
        {#if logs.length === 3}
            {#each logs as log, i}

                <div class="log">
                    {format(new Date(log.date), 'MMMM do yyyy')}
                    {log.user.username}
                    {#if log.event.category === 'collection'}
                        game added: <a href="games/{log.target._id}">{log.target.name}</a>
                    {:else if log.event.category === 'plays'}
                        result logged: <a href="stats/{log.target._id}">{log.target._id}</a>
                    {/if}
                    <label for="{(i - 1) > -1 ? (i - 1) : 2}"><span /></label>
                    <label for="{(i + 1) > 2 ? 0 : (i + 1)}"><span /></label>
                </div>

            {/each}
        {/if}
    </div>
</div>


<style>

    .logwrapper {
        overflow: hidden;
    }

    .logs {
        padding: 8px;
        display: grid;
        grid-template: "a b b" 1fr;
        /* overflow-x: hidden; */
        width: calc(100vw - 16px);
        transition: transform .2s;
    }

    .log {
        position: relative;
        width: calc(100vw - 16px);
        padding-left: 30px;
        padding-right: 30px;
        box-sizing: border-box;
    }

    .log:not(:first-of-type) {
        margin-left: 16px;
    }

    input[data-index = "1"]:checked ~ .logs {
        transform: translateX(-100vw)
    }

    input[data-index = "2"]:checked ~ .logs {
        transform: translateX(-200vw)
    }

    label {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        height: 100%;
        width: 24px;
        border: 1px solid black;
        border-radius: 5px;
        box-sizing: border-box;
    }

    label > span {
        height: 8px;
        width: 8px;
        box-sizing: border-box;
        display: block;
        border-left: 2px solid black;
        border-bottom: 2px solid black;
    }

    label:first-of-type {
        left: 0;
    }

    label:not(:first-of-type) {
        right: 0;
    }

    label:first-of-type > span {
        transform: rotate(45deg);
    }

    label:not(:first-of-type) > span {
        transform: rotate(225deg);
    }

</style>