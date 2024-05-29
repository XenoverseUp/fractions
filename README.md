<p>
	<img src="https://img.shields.io/github/languages/count/XenoverseUp/fractions" />
	<img src="https://img.shields.io/tokei/lines/github/XenoverseUp/fractions" >
	<img src="https://img.shields.io/github/languages/code-size/XenoverseUp/fractions" >
	<img src="https://img.shields.io/github/languages/top/XenoverseUp/fractions" >
	<img src="https://img.shields.io/github/last-commit/XenoverseUp/fractions" >
<p>

<p>
	<img src="https://img.shields.io/chrome-web-store/users/fileepgfmlpabmkbocijoaggdmlhenbf?color=dark-green&label=chrome%20web%20store%20users" >
	<img src="https://img.shields.io/chrome-web-store/v/fileepgfmlpabmkbocijoaggdmlhenbf?label=version" >
	<img src="https://img.shields.io/chrome-web-store/rating/fileepgfmlpabmkbocijoaggdmlhenbf" >
<p>
<br />
<a href="https://github.com/XenoverseUp">
	<img src="https://img.shields.io/github/followers/XenoverseUp?style=social" >
</a>
<br />

# Fractions

<p align="center">
	<a href="https://medium.com/better-marketing/a-better-medium-partner-dashboard-fractions-c68cc211fbc1">
		<img src="docs/cover.png"  >
	</a>
</p>

[Here](https://bettermarketing.pub/a-better-medium-partner-dashboard-fractions-c68cc211fbc1) is the blog post about it.

<br />

<p>
  <a href="https://chrome.google.com/webstore/detail/fractions-medium-partner/fileepgfmlpabmkbocijoaggdmlhenbf" > 
     <img height="60" src="https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/HRs9MPufa1J1h5glNhut.png" alt="Get it on Chrome Web Store" />
  </a>
  <a href="https://addons.mozilla.org/en-US/firefox/addon/fractions-medium-earnings/">
    <img height="60" alt="Get it on Firefox Add-ons" src="https://raw.githubusercontent.com/0xRustlang/Save-Tabs/1f3e5cee31e9abe2710bc0e23948079611d15447/assets/firefox_addon.png" />
  </a>
</p>

<br>

**Fractions** is a fully-featured Chromium | Firefox extension that helps you analyze and visualize your Medium Partner Program earnings. It is way more powerful than the default Partner Program Dashboard, Medium provides. Using this extension, you can inspect the data about your,

- lifetime earnings since you enrolled into Medium Partner Program,
- monthly earnings,
- daily total member reading time,
- yesterday's total earnings,
- yesterday's top-earning post,
- estimated earnings by the end of the month---_with a special algortihm_,
- daily average earnings,
- percent difference from the previous month,
- this month's top-earning post,
- total tax you pay,
- monthly predicted tax,
- net earnings.

<br/>

<p align="center">
	<a href="https://ko-fi.com/candurmuss" >
		<img src="docs/kofi.svg" height="50">
	</a>
	<a href="https://candurmuss.bio.link/" >
		<img src="docs/biolink.svg" height="50">
	</a>
	<a href="https://www.patreon.com/candurmuss" >
		<img src="docs/patreon.svg" height="50">
	</a>
	<a href="https://mailchi.mp/a45f8fb96cc9/subscribe" >
		<img src="docs/mail.svg" height="50">
	</a>
</p>

<br/>

---

<br/>

### Contents

- [Why I created Fractions?](#why-i-created-fractions)
- [How is it different from Partner Dashboard?](#how-is-it-different-from-partner-dashboard)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Who am I?](#who-am-i)
- [Downloads](https://github.com/XenoverseUp/fractions/releases)
- [Future Fixes and Features](#future-fixes-and-bugs)
- [Known Issues](#known-issues)  
  <br />

## Why I created Fractions?

Lately, I've started a blog on Medium and tried to share my programming knowledge, even though it is not so much. One day, while wandering around my MPP Dashboard, I looked up the sources (JSON) of the page and noticed there is a bulk of unusued data about almost anyhting about my page, and Medium doesn't even bother to show them to me.

So, I decided to use this data to create a browser extension for anyone who is interested. The primary concern of this extension is to show you your **net** earnings, without the taxes you have to pay. To make things interesting, I added a level system on top of stats that you can pass each level, simply by earning or writing more.

<p align="center">
	<a href="https://medium.com/better-marketing/a-better-medium-partner-dashboard-fractions-c68cc211fbc1">
		<img src="docs/ss.png" >
	</a>
</p>

By the way, you might be thinking what the duck is **Fractions**? Well, it is the name of tech publication I run. Feel free to [check it out](https://medium.com/fractions), as well.

<br/>

## How is it different from Partner Dashboard?

In Partner Dashboard, all we get is monthly and referred member earnings. There's no stat about what I earned yesterday, total member time, or the net earnings without taxes. So, I made this Chrome extension as a total replacement for Partner Dashboard. It includes everything Partner Dashboard, but adds more [features](#features) on top of them, using the data scattered around.

## Features

- Daily total member reading time
- Monthly earning estimation
- Daily earning amount (yesterday)
- Realtime currency converter
- Daily average earning
- Net earnings, calculated without taxes
- Daily top earning story
- Monthly top earning story
- Total earning
- Monthly earning report
- Earning levels
- Percent difference from previous period
- Dark Mode
- Direct links to your official Medium stats

## Tech Stack

- Vanilla JavaScript
- Python
- NodeJS
- HTML
- SASS
- Parcel
- Express

In this project, I decided to use nothing but Vanilla JavaScript for frontend. I created a kind of reactive rendering system that renders based on the current state. I fetch the data from Medium in the background and present it in the pop-up. For styling, I used SASS, since I find it more useful than plain CSS. In the end, there is Parcel bundler to build and distribute everything up. In addition, I wrote a Python script for Firefox compatibility.

Apart from extension itself, I set up a reporting server that collects the reported logs from the users so that I can track the errors and improve the **Fractions** accordingly.

## Who am I?

I am a 21-year old sophomore Electric and Electronics Engineering student in Koc University, Turkey. Besides, I am doing double major on Computer Sciences. I have a [blog](https://candurmuss.medium.com/) that I write about tech, programming and art. If you liked my work, you can [support](https://ko-fi.com/candurmuss) me.

## Future fixes and bugs

- Support for Safari
- Opera, Edge and Safari web store publishing
- Report the problem button
- Email subscriber and referred member analysis
- Partial request from backend and skeleton loading
- A better estimation algorithm

## **Known issues**

### **Slow loading time**

I tried this extension for a bunch of accounts which have roughly 450+ story, and it takes a few seconds to fetch the data. As the number of stories grow, the retrieving time also increases since I make a request for each story, separately. I'll find a way to get around this. Please try the extension and give me feedback about it.

### **Monthly estimation is not close to real**

I implemented an algortihm that approximately estimates earnings based on your previous month's data. It is just a silly algortihm for now but it'll get better gradually.

<br>
<br>

<p align="center">
  <a href="https://chrome.google.com/webstore/detail/fractions-medium-partner/fileepgfmlpabmkbocijoaggdmlhenbf" > 
     <img height="70" src="https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/HRs9MPufa1J1h5glNhut.png" alt="Get it on Chrome Web Store" />
  </a>
  <a href="https://addons.mozilla.org/en-US/firefox/addon/fractions-medium-earnings/">
    <img height="70" alt="Get it on Firefox Add-ons" src="https://ffp4g1ylyit3jdyti1hqcvtb-wpengine.netdna-ssl.com/addons/files/2015/11/get-the-addon.png" />
  </a>
</p>
