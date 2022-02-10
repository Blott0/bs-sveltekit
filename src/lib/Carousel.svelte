<script>

    import Userbox from "$lib/Userbox.svelte"
    export let items = []
    let selected = 0

    let touch = false
    let dragging = false
    $:draggingleft = dragging && (touch - dragging > 50) ? true : false
    $:draggingright = dragging && (touch - dragging < -50) ? true : false

    function dragstart(event) {
        touch = event.touches[0].clientX
    }

    function drag(event) {
        dragging = event.touches[0].clientX
    }

    function dragend(event) {
        event.stopPropagation()
        if ((touch - dragging) > 70) {
            selected = selected + 2 > items.length ? 0 : selected + 1
        }
        else if ((touch - dragging) < -70) {
            selected = selected - 1 < 0 ? items.length - 1 : selected - 1
        }
        dragging = false
        touch = false
    }

</script>

{#each items as item, i}
    <input hidden id="{i}" value="{i}" bind:group="{selected}" name="index" type="radio" class:selected="{selected === i}">
{/each}

<carousel>
    {#each items as item, i}
        <div on:touchmove="{e => drag(e)}" on:touchend="{e => dragend(e)}" on:touchstart="{e => dragstart(e)}" class="item" class:draggingleft class:draggingright class:selected="{selected === i}">
            <!-- this needs improvement -->
            <span class="date">
               {item.date} 
            </span>
            <div class="grid">
                <span class="user">
                    <a href="/users/{item.user._id}">
                        <Userbox userstore={item.user} type={1} />
                    </a>
                </span>
                <span class="action">
                    <a href="/users/{item.user._id}">
                        <h3>{item.user.username}</h3>
                    </a>
                    {#if item.event.category === 'collection'}
                        has added <a href="games/{item.target._id}">{item.target.name}</a> to his or her collection<br>
                    {:else if item.event.category === 'plays'}
                        has <a href="stats/{item.target._id}">logged results</a> of a game of {item.target.game.name}<br>
                    {/if}
                </span>
                <span class="game">
                    <a href="{item.target.image ? '/games/' + item.target._id : '/games/' + item.target.game._id}">
                        <img src="{item.target.image?.base64 || item.target.game?.image.base64}" alt="">
                    </a>
                </span>
            </div>
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
        height: 16px;
        display: flex;
        justify-content: center;
        border-radius: 3px;
        overflow: hidden;
        margin-left: 8px;
        margin-right: 8px;
        box-sizing: border-box;
    }

    .progress > label {
        box-sizing: border-box;
        display: block;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background-color: white;
        transition: background-color .4s;
        cursor: pointer;
    }

    .progress > label + label {
        margin-left: 4px;
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
    }

    .item > span.user {
        font-size: 1.3rem;
        font-weight: bold;
        color: rgb(25, 79, 130);
    }

    .action > a {
        text-decoration: none;
    }

    .action > a > h3 {
        margin: 0;
    }

    .item > .grid {
        display: grid;
        grid-template-columns: 1fr 4fr 2fr;
        grid-column-gap: 8px;
        margin: 8px 36px;
    }

    
    .item > .grid > span.game > a {
        height: 100%;
        display: flex;
        overflow: hidden;
        justify-content: center;
        align-items: center;
    }

    .item > .grid > span.game > a > img {
        max-width: 100%;
        max-height: 60px;
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

    .item.draggingleft {
        transform: translateX(-20%)
    }

    input[value = "1"]:checked ~ carousel > .item.draggingleft {
        transform: translateX(-120%)
    }

    input[value = "2"]:checked ~ carousel > .item.draggingleft {
        transform: translateX(-220%)
    }

    input[value = "3"]:checked ~ carousel > .item.draggingleft {
        transform: translateX(-320%)
    }

    input[value = "4"]:checked ~ carousel > .item.draggingleft {
        transform: translateX(-420%)
    }

    input[value = "5"]:checked ~ carousel > .item.draggingleft {
        transform: translateX(-520%)
    }

    input[value = "6"]:checked ~ carousel > .item.draggingleft {
        transform: translateX(-620%)
    }

    input[value = "7"]:checked ~ carousel > .item.draggingleft {
        transform: translateX(-720%)
    }

    input[value = "8"]:checked ~ carousel > .item.draggingleft {
        transform: translateX(-820%)
    }

    .item.draggingright {
        transform: translateX(20%)
    }

    input[value = "1"]:checked ~ carousel > .item.draggingright {
        transform: translateX(-80%)
    }

    input[value = "2"]:checked ~ carousel > .item.draggingright {
        transform: translateX(-180%)
    }

    input[value = "3"]:checked ~ carousel > .item.draggingright {
        transform: translateX(-280%)
    }

    input[value = "4"]:checked ~ carousel > .item.draggingright {
        transform: translateX(-380%)
    }

    input[value = "5"]:checked ~ carousel > .item.draggingright {
        transform: translateX(-480%)
    }

    input[value = "6"]:checked ~ carousel > .item.draggingright {
        transform: translateX(-580%)
    }

    input[value = "7"]:checked ~ carousel > .item.draggingright {
        transform: translateX(-680%)
    }

    input[value = "8"]:checked ~ carousel > .item.draggingright {
        transform: translateX(-780%)
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