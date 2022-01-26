<script>

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let fail
    let loginInfo = {};
    let problems = {
        email: 0,
        password: 0
    };
    

    function submitLogin() {
        if (!loginInfo.email) {
            problems.email = 1;
            if (!loginInfo.password) {
                problems.password = 1;
            }
            else {
                problems.password = 0;
            }
        }
        else if ( !loginInfo.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ) {
            problems.email = 2;
            problems.password = 0;

            if (!loginInfo.password) {
                problems.password = 1;
            }
            else {
                problems.password = 0;
            }
        }
        else {
            problems.email = 0;
            dispatch('loginAttempt', loginInfo);
            // loginInfo = {};
        };
    };

</script>

<div on:click|stopPropagation class="loginBox"> <!-- style='background-image: url("./loginbg.png");' -->
    <div data-fail="{fail}" class="inputs">
        <div data-problem="{problems.email}" class="inputwrapper">
            <input bind:value={loginInfo.email} placeholder="email" type="email">
        </div>
        <div data-problem="{problems.password}" class="inputwrapper">
            <input bind:value={loginInfo.password} placeholder="password" type="password">
        </div>
        <div class="buttonwrap">
            <button on:click="{ e => submitLogin() }" class="button">submit</button>
        </div>
    </div>
</div>

<style>
    
    .loginBox {
        padding: 6px;
        padding-top: 180px;
        border: 2px solid black;
        border-radius: 3px;
        position: absolute;
        top: 50%;
        background-size: cover;
        background-position: center;
        background-color: grey;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
    }
    .inputs {
        display: inline-flex;
        flex-direction: column;
    }
    .inputs[data-fail = "true"]::before {
        content: "login failed";
        color: white;
        background-color: red;
        text-align: center;
    }
    input {
        margin-bottom: 4px;
    }
    .inputwrapper[data-problem="1"] > input {
        border-color: red;
    }
    .inputwrapper[data-problem="2"] > input {
        border-color: red;
    }
    .inputwrapper[data-problem="1"]::after {
        content: "missing entry";
        font-size: 13px;
        position: absolute;
        right: 6px;
        transform: translateY(-25px);
        display: block;
        background-color: brown;
        color: white;
    }
    .inputwrapper[data-problem="2"]::after {
        content: "not email";
        font-size: 13px;
        position: absolute;
        right: 6px;
        transform: translateY(-25px);
        display: block;
        background-color: brown;
        color: white;
    }
    .buttonwrap {
        display: flex;
        flex-direction: row-reverse;
    }
    .button {
        cursor: pointer;
        padding: 2px 4px;
        font-size: 14px;
        border: 1px solid black;
    }

</style>