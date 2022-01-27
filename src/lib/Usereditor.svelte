<script>

    import { fly } from 'svelte/transition'

    export let userinfo

    function logout() {
        
    }
    
</script>

    <form transition:fly="{{ y: -1000 }}">
        <fieldset>
            <legend>User</legend>
            <hr>
            <button on:click="{e => logout()}">logout</button>
        </fieldset>
    </form>

<style>

    * {
        border-radius: 5px;
    }

    form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        max-width: 200px;
        z-index: 1;
    }

    fieldset {
        border-style: solid;
        border-color: rgb(88, 88, 145);
        background-color: lightgray;
    }

    legend {
        background-color: rgb(88, 88, 145);
        color: white;
        font-weight: bold;
        padding: 6px 10px;
    }

    button {
        border: none;
    }
    
</style>