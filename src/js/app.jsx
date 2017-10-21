import React from 'react';
import ReactDOM from 'react-dom';
import { Context } from './context.jsx';

require('../sass/style.scss');

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			formVisible: false,
		};

		this.openForm = this.openForm.bind(this);
	}

	componentWillMount() {
		document.addEventListener("keydown", this.openForm);
	}

	openForm() {
		console.log('h');
		if (this.state.formVisible === false) {	
			this.setState({ formVisible: true });
		}
	}

	render() {
		return (
			<div id='wrap'>
				<div className='title'>
					<h1>Make Anything Video Art</h1>
				</div>
				<div className='instructions' onClick={ this.openForm }>
					<h4>Press any key to enter youtube url</h4>
				</div>
				<div id='overlay' style={ 'display: ' + this.state.formVisible ? 'block' : 'none'}>
					<Form visible={ this.state.formVisible }/>
				</div>
				<Context animate={ true }/>
			</div>
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
			style.display = 'block';
		} else {
			style.display = 'none';
		}

		return (
			<form style={ style }>
				<input autoFocus type='url' name='url' id='url-form' placeholder="http://www.example.com" size="60" />
				<button onClick={ this.submit }>hi</button>
			</form>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));