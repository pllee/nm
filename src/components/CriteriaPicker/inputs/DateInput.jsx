import React from 'react';
import DatePicker  from 'react-datepicker';
require('react-datepicker/dist/react-datepicker.css');

export default React.createClass({
	getInitialState: function () {
		return {}
	},

	validate: function () {
		let dateValue = this.getData();

		if (dateValue && isNaN(dateValue.getTime())) {
			return 'Invalid date';
		}

	},

	getData: function () {
		let dateString = this.state.date;
		return dateString ? new Date(dateString) : undefined;
	},

	handleChange: function (date) {
		this.setState({
			date: date
		});
	},

	render: function () {
		return <DatePicker
			selected={this.state.date}
			onChange={this.handleChange}
			onBlur={this.props.onBlur}/>;
	}
});
