export const STORY_STATS_QUERY = `query StatsPostChart($postId: ID!, $startAt: Long!, $endAt: Long!) {
	post(id: $postId) {
			id
			...StatsPostChart_dailyStats
			...StatsPostChart_dailyEarnings
			__typename
	}
}

fragment StatsPostChart_dailyStats on Post {
	dailyStats(startAt: $startAt, endAt: $endAt) {
			periodStartedAt
			views
			internalReferrerViews
			memberTtr
			__typename
	}
	__typename
}

fragment StatsPostChart_dailyEarnings on Post {
	earnings {
			dailyEarnings(startAt: $startAt, endAt: $endAt) {
					periodEndedAt
					periodStartedAt
					amount
					__typename
			}
			lastCommittedPeriodStartedAt
			 __typename
			}
			__typename
	}`;
