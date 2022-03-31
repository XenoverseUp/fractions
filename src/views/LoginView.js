import h from "../utils/h.js"

const LoginView = () =>
  h(
    `
		<div id="login">
			<div id="illustration">
				<img src="login_illustration.png" alt="3 Stacked Dominoes" title="Illustration by Ihor Hedz on Dribbble" />
			</div>
			<div id="content">
				<h2>Hi Mate :)</h2>
				<p>
					Seeing you are not logged in to Medium. 
					Go ahead, login and come back to start 
					your journey with <strong>Fractions</strong>.
				</p>
				<a href="https://medium.com/m/signin" target="_blank">
					<button>LOGIN</button>
				</a>
			</div>
		</div>
	`
  )

export default LoginView
