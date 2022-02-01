<script>

    import { fly, slide } from 'svelte/transition'

    export let userinfo

    let newavatar
    let newpass1
    let newpass2
    let passchanged
    $: same = newpass1 ? newpass1 === newpass2 ? true : false : false
    $: legal = newpass1 ? newpass1.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&-_])[A-Za-z\d@$!%*#?&-_]{8,}$/) : false

    function logout() {
        
    }
    
    // function ok() {
        
    // }

    async function setpass(pass) {
        const response = await fetch('/api/login', {method: "put", body: newpass1})
        const result = await response.json()
        if (result.result === 'success') {
            passchanged = true
        }
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
            <label for="avatar">choose a new avatar:</label>
            <input accept="image/*" bind:files="{newavatar}" id="avatar" type="file">
            {#if newavatar}
                <button transition:slide on:click|preventDefault="{e => setavatar(newavatar)}">set avatar</button>
            {/if}
            <hr>
            {#if !passchanged}
                <label for="new1">change password:</label>
                <input bind:value="{newpass1}" id="new1" type="password" placeholder="password"><br>
                <label for="new2">retype password:</label>
                <input bind:value="{newpass2}" id="new2" type="password" placeholder="password">
                {#if !legal}
                    <br>
                    <p transition:slide>password needs at least 1 number and letter, 1 special character (@$!%*#?&-_)</p>
                {/if}
                {#if same && legal}
                    <button transition:slide on:click|preventDefault="{e => setpass(newpass1)}">set new password</button>
                {:else if newpass1 && !newpass2}
                    <p transition:slide>retype password</p>
                {:else if newpass1 && newpass2 && legal}
                    <p transition:slide>passwords dont match</p>
                {/if}
            {:else}
                <p>password changed</p>
            {/if}
            <hr>
            <button on:click|preventDefault="{e => logout()}">logout</button>
            <!-- <button on:click|preventDefault="{e => ok()}">ok</button> -->
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

    input:not(:first-of-type) {
        margin-top: 4px;
    }

    button, input {
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
    
</style>