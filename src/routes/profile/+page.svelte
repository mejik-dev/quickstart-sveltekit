<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { microgen } from '../../lib/microgen';

  let firstName;
  let lastName;
  let username;
  let profileId;
  let phoneNumber;
  let image;
  let company;
  let position;
  let location;
  let website;
  let loading;
  let files;

  const getProfile = async () => {
    const { user, error } = await microgen.auth.user({
      lookup: '*',
    });

    if (error) {
      console.log(error);
      return;
    }

    if (user) {
      const profile = user?.profile?.[0];
      firstName = user.firstName;
      lastName = user.lastName;
      phoneNumber = user.phoneNumber;
      username = user.username;
      profileId = profile._id;
      image = profile.image;
      company = profile.company;
      location = profile.location;
      position = profile.position;
      website = profile.website;
    }
  };

  const handleChangeImage = async () => {
    loading = true;
    const { data, error: uploadError } = await microgen.storage.upload(
      files[0]
    );

    const { error: updateError } = await microgen
      .service('profile')
      .updateById(profileId, {
        image: data?.url,
      });

    if (uploadError || updateError) {
      alert('Failed to change image profile');
      return;
    }

    image = data?.url;
    loading = false;
  };

  const handleUpdate = async () => {
    const { error: userError } = await microgen.auth.update({
      lastName,
      firstName,
      phoneNumber,
    });
    const { error: profileError } = await microgen
      .service('profile')
      .updateById(profileId, {
        company,
        location,
        position,
        website,
      });

    if (userError || profileError) {
      console.log(userError, profileError);
      alert('Failed to update profile');
    } else {
      alert('Profile updated!');
    }
  };

  const handleLogout = async () => {
    const { error } = await microgen.auth.logout();

    if (error) {
      console.log(error);
      return;
    }

    goto('/');
  };

  onMount(() => {
    getProfile();
  });
</script>

<div class="profile-page">
  <div class="button-top">
    <a class="button" href={username}>View Profile</a>
    <button on:click={handleLogout}>Logout</button>
  </div>
  <div class="profile-wrapper">
    <div class="profile-header">
      <label class="label-file" for="file">
        <img
          class="image-avatar"
          width="90"
          height="90"
          src={image || 'https://via.placeholder.com/90'}
          alt=""
        />
        {#if loading}
          <span v-if="loading">Uploading...</span>
        {:else}
          <span v-else="loading">Change Image</span>
        {/if}
      </label>
      <input
        name="file"
        id="file"
        type="file"
        accept="image/*"
        bind:files
        on:change={handleChangeImage}
      />
    </div>
    <div class="card">
      <form on:submit|preventDefault={handleUpdate}>
        <div class="card-field">
          <label for="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            bind:value={firstName}
          />
        </div>
        <div class="card-field">
          <label for="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            bind:value={lastName}
          />
        </div>
        <div class="card-field">
          <label for="phonenumber">Phone Number</label>
          <input
            type="text"
            id="phonenumber"
            name="phonenumber"
            bind:value={phoneNumber}
          />
        </div>
        <div class="card-field">
          <label for="company">Company</label>
          <input type="text" id="company" name="company" bind:value={company} />
        </div>
        <div class="card-field">
          <label for="position">Position</label>
          <input
            type="text"
            id="position"
            name="position"
            bind:value={position}
          />
        </div>
        <div class="card-field">
          <label for="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            bind:value={location}
          />
        </div>
        <div class="card-field">
          <label for="website">Website</label>
          <input type="url" id="website" name="website" bind:value={website} />
        </div>
        <div class="form-button">
          <button type="submit" class="button button-primary">Update</button>
        </div>
      </form>
    </div>
  </div>
</div>
