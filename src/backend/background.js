getEarningData().then(res => console.log(res));

async function getEarningData() {
	const res = await fetch(
		"https://medium.com/me/partner/dashboard?format=json"
	);
	const text = await res.text();
	const validJson = text.split("</x>")[1];
	const data = await JSON.parse(validJson);

	return data;
}
