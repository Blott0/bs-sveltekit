<script>

    import { format } from 'date-fns'
    export let logs

</script>
<div class="logwrapper">
    <input id="0" name="index" data-index="0" hidden type="radio">
    <input id="1" name="index" data-index="1" hidden type="radio">
    <input id="2" name="index" data-index="2" hidden type="radio">
    <div class="logs">
    {#each logs as log, i}

        <div class="log">
            {format(new Date(log.date), 'MMMM do yyyy')}
            {log.user.username}
            {#if log.event.category === 'collection'}
                game added: <a href="games/{log.target._id}">{log.target.name}</a>
            {:else if log.event.category === 'plays'}
                result logged: {log.target._id}
            {/if}
            <label for="{(i - 1) > -1 ? (i - 1) : 2}"><span /></label>
            <label for="{(i + 1) > 2 ? 0 : (i + 1)}"><span /></label>
        </div>

    {/each}
</div>
</div>


<style>

    .logwrapper {
        overflow: hidden;
    }

    .logs {
        display: grid;
        grid-template: "a b b" 1fr;
        /* overflow-x: hidden; */
        width: calc(100vw - 20px);
        transition: transform .2s
    }

    .log {
        position: relative;
        width: calc(100vw - 20px);
        padding-left: 30px;
        padding-right: 30px;
        box-sizing: border-box;
    }

    .log:not(:first-of-type) {
        margin-left: 16px;
    }

    input[data-index = "1"]:checked ~ .logs {
        transform: translateX(calc(-100vw + 8px))
    }

    input[data-index = "2"]:checked ~ .logs {
        transform: translateX(calc(2*(-100vw + 8px)))
    }

    label {
        position: absolute;
        display: flex;
        align-items: center;
        top: 0;
        height: 100%;
        border: 1px solid black;
        border-radius: 5px;
        box-sizing: border-box;
    }

    label > span {
        height: 18px;
        width: 18px;
        box-sizing: border-box;
        display: block;
        border-left: 12px solid black;
        border-bottom: 12px solid black;
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
        right: 0;
    }

</style>