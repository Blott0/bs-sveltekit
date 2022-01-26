<script context="module">

    export async function load({ page, fetch, session, stuff }) {
        if (!session.authenticated) {
            return {
                status: '302',
                redirect: '/unauthenticated'
            }
        }

        const res = await fetch('api/friends/' + session.uid, {method: 'get'});
        const friendslist = await res.json();
        
        return {
            props: { friendslist }
        };
    }

</script>

<script>

    export let friendslist

    console.log(friendslist)

</script>

{#each friendslist as friend}
    <p>{friend.username} - {friend._id}</p>
{/each}