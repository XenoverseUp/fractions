import htmlToNode from "../utils/htmlToNode.js";

const DailyView = props => {
	return htmlToNode(
		`
			<div id="daily">
				This is daily view.
			</div>
		`
	);
};

export default DailyView;
