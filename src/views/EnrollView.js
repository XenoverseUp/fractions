import h from "h";

const EnrollView = () =>
  h(
    `
		<div id="enroll">
			<div id="illustration">
				<img src="mpp_enroll.webp" alt="MPP Error" />
			</div>
			<div id="content">
				<h2>Not cool man...</h2>
				<p>
				To use <strong>Fractions</strong> you have to be enrolled in 
				Medium Partner Program. Go ahead, make sure 
				you enrolled in and come back to analyze your 
				data.
				</p>
				<a href="https://medium.com/earn" target="_blank">
					<button>ENROLL</button>
				</a>
			</div>
		</div>
	`
  );

export default EnrollView;
