import h from "h"
import Fractions from "a/fractions.svg"
import Close from "a/close.svg"
import Kofi from "a/kofi.svg"

const Drawer = author => {
  const date = new Date()

  return h(`
		<div id="drawer">
			<div id="menu">
				<header>
					<a href="https://medium.com/fractions" target="_blank">
						<img id="menu-name" src="${Fractions}" alt="Fractions" />
					</a>
					<img id="menu-close" src="${Close}" alt="Close" data-toggle-drawer/>
				</header>
				<div id="menu-content">
					<div id="author">
						<img src="${author.profilePic}"/>
						<div id="author-content">
							<a href="${author.profileLink}">
								<h2>${author.userName}</h2>
							</a>
							<div id="info">
								<p>${author.followers} followers</p>
								<p>${author.postCount} posts</p>
							</div>
						</div>
					</div>
					<div id="links">
						<div class="menu-link">
							<p>Your Profile</p>
						</div>
						<div class="menu-link">
							<p>Post Stats Page</p>
						</div>
						<div class="menu-link">
							<p>Audience Stats Page</p>
						</div>
						<div class="menu-link">
							<p>Partner Dashboard</p>
						</div>
						<div class="separator"></div>
						<div class="menu-link">
							<p>Connect With Developer</p>
						</div>
						<div class="menu-link">
							<p>About Fractions</p>
						</div>
					</div>
				</div>
				<footer>
					<a href="https://ko-fi.com/candurmuss" target="_blank" id="kofi">
						<img src="${Kofi}" alt="Coffe Cup" />
						<div id="kofi-content">
							<h4>Buy Me A Coffee</h4>
							<p>You can support my work with a cup of coffee.</p>
						</div>
					</a>
					<span>Xenoverse ${date.getFullYear()}</span>
				</footer>
			</div>
			<div id="backdrop"></div>
			<div id="overlay" data-toggle-drawer></div>
		</div>
`)
}

export default Drawer
