<script>
    export let hint;
    export let type = "text";
    export let value = "";

</script>


<input {type} placeholder={hint} class="input" on:input={(v) => value = v.target.value} />

<style>
    .input{
        height: 3rem;
        width: 80%;
        max-width: 30rem;
        border: 1px solid grey;
        border-radius: 5px;
        font-size: 1.2rem;
    }
</style>

