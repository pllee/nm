import React from 'react';

import {CriteriaPicker} from '../';

export default React.createClass({
	getData: function () {
		let data = {};
		Object.keys(this.refs).forEach(function (key) {
			let criteriaPicker = this.refs[key];

			data[key] = criteriaPicker.getData();
		}, this);

		return data;
	},

	validate: function () {
		let isValid = true;

		Object.keys(this.refs).forEach(function (key) {
			let isRefValid = !this.refs[key].validate();
			if (!isRefValid) {
				isValid = false;
			}
		}, this);

		return !isValid && 'One or more search criteria is invalid';
	},

	render: function () {
		return (
			<div className='criteria-container'>
				<CriteriaPicker ref='stars' inputType='number' displayName='Stars'></CriteriaPicker>
				<CriteriaPicker ref='pushed' inputType='date' displayName='Updated'></CriteriaPicker>
				<CriteriaPicker ref='created' inputType='date' displayName='Created'></CriteriaPicker>
				<CriteriaPicker ref='language' inputType='text' displayName='Language'></CriteriaPicker>
				<CriteriaPicker ref='forks' inputType='number' displayName='Forks'></CriteriaPicker>
			</div>
		);
	}
});
