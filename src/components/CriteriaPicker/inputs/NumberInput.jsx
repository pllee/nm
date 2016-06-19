import React from 'react';

export default React.createClass({
	validate: function () {
		let value = this.getData();

		if (value) {
			let isValidNumber = !isNaN(value) && value >= 0;
			if (!isValidNumber) {
				return 'Number must be valid and positive';
			}
		}
	},

	getData: function () {
		let value = this.refs.input.value.trim(),
			numberValue = parseInt(value);

		return !value ? undefined : numberValue;
	},

	render: function () {
		return (
			<input ref='input' className='input' min={0} type='number' onBlur={this.props.onBlur}/>
		)
	}
});
