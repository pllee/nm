import React from 'react';
require('./index.scss');

export default React.createClass({
	getData: function () {
		return this.refs.input.value;
	},

	getInitialState: function () {
		return {error: false};
	},

	validate: function () {
		let value = this.getData().trim(),
			isValid = value.length !== 0,
			errorMessage = isValid ? '' : 'Search must contain at least one character';

		this.state.error = errorMessage;
		this.setState(this.state);
		return errorMessage;
	},

	onBlur: function () {
		this.validate();
	},

	handleSubmit: function (e) {
		e.preventDefault();
		this.props.onSubmit();
	},

	render: function () {
		let error = this.state.error;
		return (
			<form onSubmit={this.handleSubmit}>
				<h1 className="search-label">Search</h1>
				<div className="search-box">
					<input onBlur={this.onBlur} className={'search-input' + (error ? ' error' : '')} type='text' ref='input'/>
					<button className={'sa-button'}>
						Search
					</button>
				</div>
			</form>
		);
	}
});
