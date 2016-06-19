import React from 'react';

export default  React.createClass({
	validate: function() {},

	getData: function() {
		return this.refs.input.value;
	},

	render: function () {
		return (
			<input ref='input' className='input' type='text' onBlur={this.props.onBlur}/>
		)
	}
});
