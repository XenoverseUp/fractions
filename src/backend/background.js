chrome.runtime.onMessage.addListener((request, sender, sendRes) => {
	if (request.getData) {
		getEarningData().then(res => {
			console.log(res);
			if (res.success) sendRes({ authenticated: true, data: res.payload });
			else if (res.success === false)
				sendRes({
					authenticated: false,
					error: "You must be logged in to perform this action.",
				});
		});
	}

	return true;
});

async function getEarningData() {
	const res = await fetch(
		"https://medium.com/me/partner/dashboard?format=json"
	);
	const text = await res.text();
	const validJson = text.split("</x>")[1];
	const data = await JSON.parse(validJson);

	return data;
}
