<script>

    import { fly, slide } from 'svelte/transition'

    export let userinfo

    let newavatar
    // let form

    $:console.log(newavatar)
    function logout() {
        
    }
    
    function ok() {
        
    }

    async function setavatar(file) {
        // console.log(file[0])
        const response = await fetch('/api/images', {method: "post", body: file[0], meta: JSON.stringify({ name: file[0].name, type: file[0].type })})
        const result = await response.json()
        console.log(result)
        // const a = new FormData(form)
        // console.log(a)
    }
    
</script>

    <form on:click|stopPropagation transition:fly="{{ y: -1000 }}">
        <fieldset>
            <legend>User</legend>
            <label for="username">username:</label>
            <input value="{userinfo.username}" id="username" type="text" disabled><br>
            <label for="email">email:</label>
            <input value="{userinfo.email}" id="email" type="text" disabled><br>
            <label for="id">id:</label>
            <input value="{userinfo._id}" id="id" type="text" disabled>
            <hr>
            option to change password goes here
            <hr>
            <label for="avatar">choose a new avatar:</label>
            <input accept="image/*" bind:files="{newavatar}" id="avatar" type="file">
            {#if newavatar}
                <button transition:slide on:click|preventDefault="{e => setavatar(newavatar)}">set avatar</button>
            {/if}
            <hr>
            <button on:click|preventDefault="{e => logout()}">logout</button>
            <button on:click|preventDefault="{e => ok()}">ok</button>
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
        /* max-width: 200px; */
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

    button, input {
        border: none;
    }
    
</style>