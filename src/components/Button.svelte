<script>
    export let text;
    export let upload = false;
</script>

{#if upload}
<div style="height:0px;width:0px;overflow:hidden">
   <input type="file" id="fileInput" name="fileInput" accept="image/*"/>
</div>
{/if}

<button class="button" on:click>{text}</button>

<style>
    .button{
        height: 3rem;
        min-width: 6rem;
        max-width: 9rem;
        font-size: 1.2rem;
        border-radius: 13px;
        background-color: var(--primary);
        color: var(--text);
        border: none;
    }

</style>