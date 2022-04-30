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
							<a href="${author.profileLink}" target="_blank">
								<h2>${author.username}</h2>
							</a>
							<div id="info">
								<p>${author.followers} followers</p>
								<p>${author.postCount} posts</p>
							</div>
						</div>
					</div>
					<div id="links">
						<a href="${author.profileLink}" target="_blank" class="menu-link">
							<p>Your Profile</p>
						</a href="">
						<a href="https://medium.com/me/stats" target="_blank" class="menu-link">
							<p>Post Stats Page</p>
						</a>
						<a href="${author.audienceStatsLink}" target="_blank" class="menu-link">
							<p>Audience Stats Page</p>
						</a>
						<a href="https://medium.com/me/partner/dashboard" target="_blank" class="menu-link">
							<p>Partner Dashboard</p>
						</a>
						<div class="separator"></div>
						<a href="https://candurmuss.bio.link/" target="_blank"  class="menu-link">
							<p>Connect With Developer</p>
						</a>
						<div class="menu-link" data-about-trigger data-toggle-drawer>
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
