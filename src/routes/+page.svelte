<script>
  import Login from '../components/login.svelte';
  import Register from '../components/register.svelte';

  let switchAuthForm = 'login';

  const handleSwitchloginForm = () => {
    switchAuthForm = 'login';
  };

  const handleSwitchRegisterForm = () => {
    switchAuthForm = 'register';
  };
</script>

<div class="auth-page">
  <div class="auth-button">
    <button on:click={handleSwitchloginForm}>Login</button>
    <button on:click={handleSwitchRegisterForm}>Register</button>
    <div>
      {#if switchAuthForm === 'login'}
        <Login />
      {:else}
        <Register />
      {/if}
    </div>
  </div>
</div>
