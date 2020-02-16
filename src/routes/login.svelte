<form action="/login" method="POST" on:submit="{handleSubmit}">
  <input bind:value="{password}" class:error type="password" />
  <button disabled="{submitting}" type="submit">Log In</button>
</form>

<script>
  import { goto, stores } from '@sapper/app';
  const { session } = stores();

  let error;
  let password;
  let submitting;

  async function handleSubmit (e) {
    e.preventDefault()

    error = false
    submitting = true

    try {
      const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) throw new Error(await response.text())
      const { user = false } = await response.json();

      session.set({ user });
      goto('/');
    } catch (err) {
      error = true
      submitting = false

      throw err
    }
  }
</script>
