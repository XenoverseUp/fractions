import h from "h";
import Button from "c/Button";

import Dominoes from "a/dominoes.svg";

const LoginView = () =>
  h(
    `
		<div id="login">
			<div id="illustration">
				<img src=${Dominoes} alt="3 Stacked Dominoes" title="Illustration by Ihor Hedz on Dribbble" />
			</div>
			<div id="content">
				<h2>Hi Mate :)</h2>
				<p>
					Seeing you are not logged in to Medium. 
					Go ahead, login and come back to start 
					your journey with <strong>Fractions</strong>.
				</p>
				<a href="https://medium.com/m/signin" target="_blank">
					${Button("LOGIN")}
				</a>
			</div>
		</div>
	`
  );

export default LoginView;
