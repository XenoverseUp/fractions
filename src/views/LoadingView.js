import h from "../utils/h.js"

const LoadingView = () =>
  h(`
	<div id="loader">
		<span class="spinner"></span>
		<span class="spinner"></span>
		<span class="spinner"></span>
		<h2 id="loading-text">
			Gimme a sec <span>.</span><span>.</span><span>.</span>
		</h2>
	</div>
`)

export default LoadingView
