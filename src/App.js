import React from 'react';
import './App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

//input element
var Input = React.createClass({
	render: function() {
		return (
			<div className="Input">
				<input 
					id={this.props.name}
					autoComplete="false"
					required
					type={this.props.type}
					placeholder={this.props.placeholder}
				/>	
				<label htmlFor={this.props.name}></label>
			</div>
		);
	}
});

//modal component
var Modal = React.createClass({
	render: function() {
		return (
			<div className="Modal">
				<form 
				//in our form the onSubmit event handler is given the submit callback function we passed down as a prop
					onSubmit={this.props.onSubmit}
					className="ModalForm">
					<Input
						id="name"
						type="text"
						placeholder="Please enter your name" />
					<Input
						id="username"
						type="email"
						placeholder="Please enter email id" />
					<Input
						id="DOB"
						type="date"
						placeholder="Please enter your date of birth" />
					<Input
						id="password"
						type="password"
						placeholder="Please enter your password" />
					<button>
						Log in <i className="fa fa-fw fa-chevron-right"></i>
					</button>
				</form>
			</div>
		);
	}
});

var App = React.createClass({
	//single item in local state : mounted
	getInitialState: function() {
		return { mounted: false };
	},
	//executed just after the component has been rendered to the page
	componentDidMount: function() {
		this.setState({ mounted: true });
	},
	//When the user clicks the submit button this event handler is called and the mounted variable gets set back to false.
	handleSubmit: function(e) {
		this.setState({ mounted: false });
		e.preventDefault();
	},

	render: function() {
		var child;
		//conditional statement creates the child component if the App component has been rendered to the DOM
		if(this.state.mounted) {
			//When our Modal component is created, we pass down the App component's handleSubmit function as a prop
			child = (<Modal onSubmit={this.handleSubmit} />);
		}
		
		return(
			<div className="App">
			//Adding animations via CSS files aren't always straight-forward. 
			//To address this problem, React provides an addon library to ease with the difficulties: ReactCSSTransitionGroup
				<ReactCSSTransitionGroup 
					transitionName="example"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}>
						{child}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
});

export default App;
