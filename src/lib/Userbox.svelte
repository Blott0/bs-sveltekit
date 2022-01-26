<script>
    
    export let userinfo;
    export let type;
    export let color;

</script>

<div style="border-color:{color ? color : 'blue'}" data-type="{type}" title="{userinfo.username}{userinfo.email ? ' - ' + userinfo.email : ''}" class="wrapper">

    <div class="image">
        {#if userinfo.image}
        {:else}
            <svg viewBox="0 -8 63 67"><path fill="black" fill-rule="evenodd" d="M31.5-7.3A25.2 25.2 0 0 0 6.3 17.9a25.2 25.2 0 0 0 5.6 15.8A31.5 31.5 0 0 0 0 58.2a31.5 31.5 0 0 0 0 1h63a31.5 31.5 0 0 0 0-1 31.5 31.5 0 0 0-12-24.6A25.2 25.2 0 0 0 56.7 18 25.2 25.2 0 0 0 31.5-7.3z"></path></svg>
        {/if}
    </div>
    <div class="name">
        <p style="background-color:{color ? color : 'blue'}">{userinfo.username}</p>
    </div>

</div>

<style>

.wrapper {
    display: flex;
    flex-wrap: wrap;
    overflow:hidden;
}

.wrapper[data-type = "1"] {
    height: 72px;
    width: 56px;
    border-width: 1px;
    border-style: solid;
    border-radius: 3px;
}

.wrapper[data-type = "2"] {
    height: 120px;
    width: 90px;
    border-width: 2px;
    border-style: solid;
    border-radius: 3px;
}

.image {
    width: 100%;
    background-color: white;
}

.name {
    width: 100%;
    align-self: flex-end;
}

.name > p {
    color: white;
    background-color: blue;
    text-align: center;
    user-select: none;
    transition: border-color .2s, background-color .2s;
}

.wrapper[data-type = "1"] > .name > p {
    margin: 0;
    transform: translateY(-4px);
    font-size: 10px;
    font-weight: 600;
}

.wrapper[data-type = "2"] > .name > p {
    margin: 0;
    padding: 6px;
    transform: translateY(-4px);
    font-size: small;
    font-weight: 600;
}

</style>