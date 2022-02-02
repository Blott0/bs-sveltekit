<script>

    import { format } from 'date-fns'
    export let logs

</script>

<div class="logs">
    {#each logs as log}

        <div class="log">
            {format(new Date(log.date), 'MMMM do yyyy')}
            {log.user.username}
            {#if log.event.category === 'collection'}
                game added: <a href="games/{log.target._id}">{log.target.name}</a>
            {:else if log.event.category === 'plays'}
                result logged: {log.target._id}
            {/if}
        </div>

    {/each}
</div>


<style>

</style>