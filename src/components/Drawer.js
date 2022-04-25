import h from "h"
import Fractions from "a/fractions.svg"
import Close from "a/close.svg"

const Drawer = () =>
  h(`
		<div id="drawer">
			<div id="menu">
				<header>
					<a href="https://medium.com/fractions" target="_blank">
						<img id="menu-name" src="${Fractions}" alt="Fractions" />
					</a>
					<img id="menu-close" src="${Close}" alt="Close" data-toggle-drawer/>
				</header>
			</div>
			<div id="backdrop"></div>
			<div id="overlay" data-toggle-drawer></div>
		</div>
`)

export default Drawer
