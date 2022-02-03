<script>

    export let items = []
    let selected = 0

</script>

{#each items as item, i}
    <input hidden id="{i}" value="{i}" bind:group="{selected}" name="index" type="radio" class:selected="{selected === i}">
{/each}

<carousel>
    {#each items as item, i}
        <div class="item" class:selected="{selected === i}">
            <!-- this needs improvement -->
            <span class="date">
               {item.date} 
            </span>
            <span class="user">
                {item.user.username}
            </span>
            <span class="action">
                {#if item.event.category === 'collection'}
                    game added:<br><a href="games/{item.target._id}">{item.target.name}</a>
                {:else if item.event.category === 'plays'}
                    result logged:<br><a href="stats/{item.target._id}">{item.target._id}</a>
                {/if}
            </span>
            <!-- ^^^^^^^^^^^^^^^^^^^^^^^^ -->
        </div>
    {/each}
    {#each items as item, i}
        {#if selected === ( i + 1 > items.length - 1 ? 0 : i + 1 )}
            <label for="{i}" class="button left">
                <div class="button">
                    <span />
                </div>
            </label>
        {/if}
        {#if selected === ( i - 1 > -1 ? i - 1 : items.length - 1 )}
            <label for="{i}" class="button right">
                <div class="button">
                    <span />
                </div>
            </label>
        {/if}
    {/each}
</carousel>

<div class="progress">
    {#each items as item, i}
        <label id="{i}" for="{i}"></label>
    {/each}
</div>

<style>

    carousel {
        position: relative;
        display: flex;
        overflow-x: hidden;
    }

    .item {
        min-width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
    
    .progress {
        position: relative;
        width: calc(100% - 16px);
        height: 12px;
        background-color: white;
        display: flex;
        border-radius: 3px;
        overflow: hidden;
        margin-left: 8px;
        margin-right: 8px;
        box-sizing: border-box;
    }

    .progress > label {
        height: 12px;
        flex-grow: 1;
        transition: background-color .4s;
        cursor: pointer;
    }

    .progress > span {

    }

    .item {
        transition: transform .2s
    }

    .item > span {
        padding: 8px;
        padding-left: 36px;
        padding-right: 36px;
    }

    .item > span.date {
        background-color:rgb(25, 79, 130);
        color: white;
        /* padding:  */
    }

    .item > span.user {
        font-size: 1.3rem;
        font-weight: bold;
        color: rgb(25, 79, 130);
    }

    input[value = "1"]:checked ~ carousel > .item {
        transform: translateX(-100%)
    }

    input[value = "2"]:checked ~ carousel > .item {
        transform: translateX(-200%)
    }

    input[value = "3"]:checked ~ carousel > .item {
        transform: translateX(-300%)
    }

    input[value = "4"]:checked ~ carousel > .item {
        transform: translateX(-400%)
    }

    input[value = "5"]:checked ~ carousel > .item {
        transform: translateX(-500%)
    }

    input[value = "6"]:checked ~ carousel > .item {
        transform: translateX(-600%)
    }

    input[value = "7"]:checked ~ carousel > .item {
        transform: translateX(-700%)
    }

    input[value = "8"]:checked ~ carousel > .item {
        transform: translateX(-800%)
    }

    input[value = "0"]:checked ~ .progress > label:first-of-type {
        background-color: rgb(25, 79, 130);
    }

    input[value = "1"]:checked ~ .progress > label:nth-of-type(2) {
        background-color: rgb(25, 79, 130);
    }

    input[value = "2"]:checked ~ .progress > label:nth-of-type(3) {
        background-color: rgb(25, 79, 130);
    }

    input[value = "3"]:checked ~ .progress > label:nth-of-type(4) {
        background-color: rgb(25, 79, 130);
    }

    input[value = "4"]:checked ~ .progress > label:nth-of-type(5) {
        background-color: rgb(25, 79, 130);
    }

    input[value = "5"]:checked ~ .progress > label:nth-of-type(6) {
        background-color: rgb(25, 79, 130);
    }

    input[value = "6"]:checked ~ .progress > label:nth-of-type(7) {
        background-color: rgb(25, 79, 130);
    }

    input[value = "7"]:checked ~ .progress > label:nth-of-type(8) {
        background-color: rgb(25, 79, 130);
    }

    label.button {
        position: absolute;
        top: 0;
        height: 100%;
        display: block;
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    
    label.button:hover > .button > span {
        border-color: rgb(196, 149, 10);
    }

    label.button:hover > .button {
        background-color: rgb(227, 234, 243);
    }

    label.button > .button {
        border-radius: 3px;
        background-color: rgb(186, 203, 225);
        width: 20px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background-color .2s;
    }

    label.button > .button > span {
        box-sizing: border-box;
        display: block;
        height: 10px;
        width: 10px;
        border-left: 4px solid rgb(25, 79, 130);
        border-bottom: 4px solid rgb(25, 79, 130);
        transition: border-color .2s;
    }

    label.left {
        left: 8px;
    }

    label.right {
        right: 8px;
    }

    label.left > .button > span {
        transform: translateX(2px) rotate(45deg);
    }

    label.right > .button > span {
        transform: translateX(-2px) rotate(225deg);
    }

</style>