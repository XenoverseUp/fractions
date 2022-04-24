import h from "h"

const LoadingView = () =>
  h(`
	<div id="loading-view">
		<div id="loader">
			<span class="spinner"></span>
			<span class="spinner"></span>
			<span class="spinner"></span>
			<h2 id="loading-text">
				Gimme a sec<span>.</span><span>.</span><span>.</span>
			</h2>
		</div>
	</div>
`)

export default LoadingView
