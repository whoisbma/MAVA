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

		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	componentWillMount() {
		document.addEventListener("keydown", this.handleKeyDown);
	}

	handleKeyDown() {
		if (this.state.formVisible === false) {	
			switch( event.keyCode ) {
				case 13:
					console.log('enter');
					this.setState({formVisible: true});
					break;
				default: 
					break;
			}
		}
	}

	render() {
		return (
			<div id='wrap'>
				<div className='title'>
					<h1>Make Anything Video Art</h1>
				</div>
				<div className='instructions'>
					<h4>Press any key to enter youtube url</h4>
				</div>
				<div id='overlay'>
					<Form visible={this.state.formVisible}/>
				</div>
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
		this.textInput = null;
	}

	componentWillUpdate(nextProps, nextState) {

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
				<input autoFocus type='url' name='url' id='url-form' placeholder="http://www.example.com" size="60" />
				<button onClick={ this.submit }>hi</button>
			</form>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));