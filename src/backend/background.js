chrome.runtime.onMessage.addListener((request, _, sendRes) => {
	if (request.getData) {
		getEarningData().then(res => {
			if (res.success) {
				const { payload } = res;
				console.log(payload);
				const thisMonth =
					payload.currentMonthAmount.amount +
					safe(payload.currentMonthAmount?.hightowerConvertedMemberEarnings) +
					safe(payload.currentMonthAmount?.hightowerUserBonusAmount);

				const monthlyTax =
					thisMonth *
					safe(payload.userTaxWithholding.withholdingPercentage / 100);

				const data = {
					userId: payload.userId,
					username: payload.username,
					country: payload.userTaxWithholding.treatyCountry,
					taxRate: payload.userTaxWithholding.withholdingPercentage,
					total:
						[...payload.completedMonthlyAmounts].reduce(
							(aggr, month) =>
								aggr +
								month.amount +
								safe(month?.hightowerConvertedMemberEarnings) +
								safe(month?.hightowerUserBonusAmount),
							0
						) + thisMonth,
					totalTax:
						[...payload.completedMonthlyAmounts].reduce(
							(aggr, month) => aggr + safe(month?.withholdingAmount),
							0
						) + monthlyTax,
					thisMonth,
					monthlyTax,
				};

				console.log(data);

				sendRes({ authenticated: true, data });
			} else if (res.success === false)
				sendRes({
					authenticated: false,
					error: "You must be logged in to perform this action.",
				});
		});
	}

	return true;
});

function safe(dangerousData) {
	return dangerousData ?? 0;
}

async function getEarningData() {
	const res = await fetch(
		"https://medium.com/me/partner/dashboard?format=json"
	);
	const text = await res.text();
	const validJson = text.split("</x>")[1];
	const data = await JSON.parse(validJson);

	return data;
}
