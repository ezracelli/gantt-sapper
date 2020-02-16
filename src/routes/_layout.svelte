<script context="module">
  export async function preload (page, { user }) {
    // make sure we're not blocking css, js, images, .html files
    if (!/\.\w+$/.test(page.path) && !/\.html$/.test(page.path)) {
      if (page.path !== '/login' && !user) this.redirect(302, '/login');
      else if (page.path === '/login' && user) this.redirect(302, '/');
    }

    else return { user };
  }
</script>

<main>
	<slot></slot>
</main>

<style global lang="scss">
  @import 'normalize.css';

	main {
		background-color: white;
		margin: 0 auto;
		padding: 2em;
		position: relative;
    box-sizing: border-box;
    min-height: 100vh;

    * {
      box-sizing: inherit;
    }
	}
</style>
