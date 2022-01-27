<script>

    import { createEventDispatcher } from 'svelte'
    import { fly } from 'svelte/transition'

    const dispatch = createEventDispatcher()
    
    let email
    let password

    function submitLogin() {
        dispatch( 'loginAttempt', { email, password })
    }

</script>

<form transition:fly="{{ y: -1000 }}" on:click|stopPropagation on:submit|preventDefault="{e => submitLogin()}" action="/api/login" method="post">
    <fieldset>
        <legend>Login</legend>
        <label for="email" hidden>email:</label>
        <input bind:value={email} placeholder="email" id="email" name="email" type="email">
        <label for="password" hidden>password</label>
        <input bind:value={password} placeholder="password" id="password" name="password" type="password">
        <input type="submit">
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

    input {
        border: none;
        box-sizing: border-box;
        padding: 6px 10px;
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

    input:not(:last-of-type) {
        width: 100%;
        margin-bottom: 4px;
    }

</style>