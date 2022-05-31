<script>
  import Button from "./components/Button.svelte";
  import TextInput from "./components/TextInput.svelte";
  import { authenticateUser, createUser } from "./stores/LoginStore";

  let username = "";
  let password = "";
</script>

<div class="login">
  <div class="inside">
    <h1 class="title">Login</h1>
    <TextInput hint="Username" bind:value={username} />
    <TextInput hint="Password" type="password" bind:value={password} />
    <div class="buttons">
      <Button text="Sign Up" on:click={createUser(username, password)} />
      <Button text="Login" on:click={authenticateUser(username, password)}/>
    </div>
  </div>
</div>

<style>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
  }

  .inside {
    height: 33%;
    max-height: 33.9rem;
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 4rem;
  }

  .title {
    font-size: 4rem;
	color: var(--text);
  }
</style>
