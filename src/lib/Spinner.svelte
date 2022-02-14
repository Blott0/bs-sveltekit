<script>

</script>

<div class="spinner">
    <span class="s1"></span>
    <span class="s2"></span>
    <span class="s3"></span>
    <span class="txt">loading..</span>
</div>

<style>

    .spinner {
        position: relative;
        min-height: 80vh;
    }

    .spinner > span {
        display: block;
        border-style: solid;
        position: absolute;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        animation-iteration-count: infinite;
    }

    .spinner > span:not(.txt) {
        animation-name: rotate;
        animation-timing-function: linear;
    }

    @keyframes rotate {
        0% { transform: translate(-50%,-50%) rotate(0deg) }
        50% { transform: translate(-50%,-50%) rotate(180deg) }
        100% { transform: translate(-50%,-50%) rotate(360deg) }
    }

    @keyframes blink {
        0% { opacity: 1; }
        50% { opacity: 0; }
        100% { opacity: 1; }
    }

    span.txt {
        border: none;
        animation-name: blink;
        animation-duration: 2s;
    }

    span.s1 {
        border-color: rgb(117, 150, 194);
        border-width: 0 4px 0 0;
        width: 120px;
        height: 120px;
        animation-duration: 2s;
    }

    span.s2 {
        border-color: yellowgreen;
        border-width: 0 0 0 4px;
        width: 116px;
        height: 116px;
        animation-duration: 3s;
    }

    span.s3 {
        border-color: rgb(196, 149, 10);
        border-width: 4px 0 0 0;
        width: 112px;
        height: 112px;
        animation-duration: 4s;
        animation-direction: reverse;
    }

</style>