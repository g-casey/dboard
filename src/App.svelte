<script>
import Home from "./Home.svelte";
import LoginStore from "./stores/LoginStore"
import Login from "./Login.svelte";
</script>

<div class="app">
{#if $LoginStore}
 <Home/>
{:else}
<Login/>
{/if}
</div>

<style>

</style>

