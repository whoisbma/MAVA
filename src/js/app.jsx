import React from 'react';
import ReactDOM from 'react-dom';

require('../sass/style.scss');


// app
// 		submit
//		view


class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			formVisible: false,
		};
	}

	componentWillMount() {
		document.addEventListener("keydown", this.handleKeyDown.bind(this));
	}

	handleKeyDown() {
		switch( event.keyCode ) {
			case 13:
				console.log('enter');
				this.setState({formVisible: true});
				break;
			default: 
				break;
		}
	}

	render() {
		return (
			<div>
				<h1>Make Anything Video Art</h1>
				<h4>Press return to submit a video</h4>
				<Form visible={this.state.formVisible}/>
			</div>
		);
	}
}

class Context extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {


		return (
			<div id='context'></div>
		);
	}
}

class Form extends React.Component {
	constructor(props) {
		super(props);
	}

	submit(e) {
		e.preventDefault();
		console.log('hi');
	}

	render() {
		let style = {};
		if (this.props.visible) {
			style.display = 'initial';
		} else {
			style.display = 'none';
		}


		return (
			<form style={style}>
				<input type='url' name='url' id='url-form' placeholder="http://www.example.com" size="60"/>
				<button onClick={ this.submit }>hi</button>
			</form>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));