<script context="module">
    export async function load({ page, fetch, session, stuff }) {
        if (session.authenticated) {
            return {
                status: '302',
                redirect: '/'
            }
        }
        
        const user = session
        return { props: user }

    }
</script>

<script>
    export let user
</script>

<section>
    <h1>User not authenticated or login has expired</h1>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 392.5 392.5" style="enable-background:new 0 0 392.533 392.533" xml:space="preserve"><path style="fill:#fff" d="M41.2 359.6c0 6 4.8 10.9 10.9 10.9h288.3c6 0 11-4.9 11-11v-148c0-6-4.9-10.8-11-10.8H52.1c-6 0-11 4.8-11 10.9"/><path style="fill:#ffc10d" d="M63 222.4h266.6v126.2H63z"/><path style="fill:#56ace0" d="M304 178.9v-49.5c0-59.5-48.3-107.8-107.7-107.8S88.5 69.9 88.5 129.4v49.5h21.8v-49.5a86 86 0 0 1 172 0v49.5H304z"/><path style="fill:#fff" d="M196.3 248.2a18.7 18.7 0 1 0 0 37.4 18.7 18.7 0 0 0 0-37.4z"/><path style="fill:#194f82" d="M196.3 226.8a40.5 40.5 0 0 0-10.9 79.4V334a11 11 0 1 0 21.9 0v-27.8a40.6 40.6 0 0 0 29.6-39 40.7 40.7 0 0 0-40.6-40.4zm0 59.2a18.7 18.7 0 1 1 0-37.4 18.7 18.7 0 0 1 0 37.4z"/><path style="fill:#194f82" d="M340.4 179.2h-14.6v-49.5a129.6 129.6 0 1 0-259.2 0v49.5H52c-18 0-32.7 14.7-32.7 32.7v148c0 18 14.7 32.6 32.7 32.6h288.3c18 0 32.7-14.6 32.7-32.7v-148c0-18-14.6-32.6-32.7-32.6zM88.5 129.7a107.9 107.9 0 0 1 215.5 0v49.5h-21.8v-49.5a86 86 0 0 0-172 0v49.5H88.6v-49.5zm172 0v49.5H132v-49.5a64.3 64.3 0 0 1 128.4 0zm90.9 230.1c0 6-4.9 11-11 11H52.1c-6 0-11-4.9-11-11V332h35a11 11 0 1 0 0-21.8H41v-21.8H98a11 11 0 1 0 0-21.9H41.2v-54.7c0-6 4.8-10.9 10.9-10.9h288.3c6 0 11 4.9 11 11v148z"/></svg>
    <h2>please log in</h2>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    svg {
        width: 200px;
    }
</style>