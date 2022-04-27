import h from "h"
import Fractions from "a/fractions.svg"
import FractionsIcon from "a/fractions_icon.svg"
import Back from "a/back.svg"
import Github from "a/github.svg"

const AboutView = () =>
  h(`
	<div id="about-view">
		<button id="about-back-button">
			<img src="${Back}" alt="Back" />
		</button>
		<header>
			<img src="${FractionsIcon}" alt="Fractions Icon" />
			<img src="${Fractions}" alt="Fractions" />
			<span>version ${process.env.VERSION}</span>
		</header>
		<p>
		  <b>Fractions</b> is an open-source browser extension that helps Medium writers have a
			better grasp on their Medium Partner Program Earnings. It's first released on
			11 April 2022 by <b><a href="https://candurmuss.medium.com/" target="_blank"> Can Durmus </a></b> and
			still under a high development and improvement process.
		</p>
		<a href="https://github.com/XenoverseUp/fractions" target="_blank" id="star">
			<img src="${Github}" alt="Star this project on Github" />
			<aside>
				<h4>Star This Project On GitHub</h4>
				<p>You can motivate me develop Fractions by giving a star to it on GitHub.</p>
			</aside>
		</div>
	</div>
`)

export default AboutView
