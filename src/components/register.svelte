<script>
  import { microgen } from '../lib/microgen';
  import { goto } from '$app/navigation';

  let firstName;
  let lastName;
  let username;
  let email;
  let password;

  const handleRegister = async () => {
    const { user, error } = await microgen.auth.register({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const { error: ErrorProfile } = await microgen.service('profile').create({
      Users: [user._id],
    });

    if (ErrorProfile) {
      alert(ErrorProfile.message);
      return;
    }

    goto('/profile');
  };
</script>

<form on:submit|preventDefault={handleRegister}>
  <div class="form-group">
    <label for="firstname">First Name</label>
    <input
      type="text"
      id="firstname"
      name="firstname"
      required
      bind:value={firstName}
    />
  </div>
  <div class="form-group">
    <label for="lastname">Last Name</label>
    <input type="text" id="lastname" name="lastname" bind:value={lastName} />
  </div>
  <div class="form-group">
    <label for="username">Username</label>
    <input
      type="text"
      id="username"
      name="username"
      required
      bind:value={username}
    />
  </div>
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required bind:value={email} />
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      required
      bind:value={password}
    />
  </div>
  <div class="form-button">
    <button type="submit" class="button button-primary">Submit</button>
  </div>
</form>
