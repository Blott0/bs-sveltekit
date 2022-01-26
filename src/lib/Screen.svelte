<script>

    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

</script>

<div on:click='{dispatch("togglescreen", "toggle")}' class="bg" style="background-color: rgba(0,0,0,.1);">
    <slot />
</div>

<style>

.bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

</style>
