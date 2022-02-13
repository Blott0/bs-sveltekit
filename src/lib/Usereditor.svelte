<script>

    import { fly, slide } from 'svelte/transition'
    import { createEventDispatcher } from 'svelte'

    export let userinfo

    const dispatch = createEventDispatcher()
    let newavatar
    let canvas
    let newpass1
    let newpass2
    let passchanged
    $: same = newpass1 ? newpass1 === newpass2 ? true : false : false
    $: legal = newpass1 ? newpass1.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&-_])[A-Za-z\d@$!%*#?&-_]{8,}$/) : false

    function logout() {
        
    }

    async function setpass(pass) {
        const response = await fetch('/api/login', {method: "put", body: newpass1})
        const result = await response.json()
        if (result.result === 'success') {
            passchanged = true
        }
    }
    
    let base64

    async function setavatar(file) {
        
        const ctx = canvas.getContext('2d')
        let img = new Image()
        img.src = URL.createObjectURL(file[0], 1)
        img.onload = async function() {
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)
            base64 = canvas.toDataURL(file[0].type)
            const response = await fetch('/api/users/' + userinfo._id + '/avatar/' + file[0].name, {method: "post", body: base64})
            const result = await response.json()
            dispatch(
                'avatarset', {
                    base64: base64,
                    name: file[0].name
                }
            )
        }
        newavatar = false
        // const ui = {
        //     username: userinfo.username,
        //     _id: userinfo._id,
        //     email: userinfo.email,
        //     avatar: {
        //         base64: base64,
        //         name: file[0].name
        //     }
        // }
        
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
                <canvas hidden bind:this="{canvas}"></canvas>
                <!-- {#if base64}
                    <img src="{base64}">
                {/if} -->
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
                    <br>
                    <button class="password" transition:slide on:click|preventDefault="{e => setpass(newpass1)}">set new password</button>
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
        transform: translateY(-50%) translateX(-50%);
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
        cursor: pointer;
        font-weight: bold;
        transition: .2s ease-in-out;
    }

    button.password {
        margin-top: 4px;
    }

    button:not(.password) {
        float: right;
    }
    
</style>