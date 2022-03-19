const is = val => ({
	if: expr => {
		if (expr)
			return {
				else: () => val,
				is: function is() {
					return {
						if: () => ({ else: () => val, is }),
					};
				},
			};
		else return { else: e => e, is };
	},
});

export default is;
