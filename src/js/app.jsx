import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	render() {
		return (
			<div>
				<Something iam='hi'/>
				<Something iam='hiii'/>
				<Something iam='hijasdasj'/>
				<Something iam='hasdasdasi'/>
			</div>
		);
	}
}

class Something extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			iam: props.iam,
		};
	}

	render() {
		return (
			<p>I am a { this.state.iam }</p>
		);
	}

}

ReactDOM.render(<App />, document.getElementById('app'));