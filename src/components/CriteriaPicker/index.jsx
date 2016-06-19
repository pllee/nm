import React from 'react';
import {DateInput, NumberInput, StringInput} from './inputs';
import {buildErrorClass} from '../utils';
require('./index.scss');

function selfRef(instance, name) {
	return function (component) {
		instance[name] = component;
	}.bind(instance);
}

export default React.createClass({
	inputTypes: {
		text: StringInput,
		date: DateInput,
		number: NumberInput
	},

	getInitialState: function () {
		return {equalityOperator: 'equals', errors: {}};
	},

	validate: function () {
		let isValid = true;

		Object.keys(this.refs).forEach(function (key) {
			let input = this.refs[key];
			let errorMessage = input.validate();
			this.state.errors[key] = errorMessage;

			if (errorMessage) {
				isValid = false;
			}
		}, this);

		let isRangeValid = this.validateRange();

		if (!isRangeValid) {
			isValid = false;
		}

		return !isValid && 'A field is invalid';
	},

	isRange: function () {
		return this.state.equalityOperator === 'range';
	},

	validateRange: function () {
		let isValid = true,
			isRangeOnlyError;

		if (this.isRange()) {
			isValid = this.validateRangeValues();

			isRangeOnlyError = !isValid && !this.state.errors.from && !this.state.errors.to;
		}

		this.state.errors.rangeError = isRangeOnlyError ? 'Range values must both be valid or empty' : '';

		this.setState({errors: this.state.errors});

		return isValid;
	},

	validateRangeValues: function () {
		let from = this.refs.from.getData(),
			to = this.refs.to.getData();

		//Both empty or both have a value
		return (!from && !to) || (from && to);
	},

	onChange: function (event) {
		this.setState({equalityOperator: event.target.value}, this.validateRange);
	},

	getData: function () {
		let equalityType = this.state.equalityOperator,
			type = this.props.inputType,
			from = this.refs.from.getData(),
			to = this.refs.to && this.refs.to.getData();

		return {equalityType, type, from, to};
	},

	onBlur: function () {
		this.validate();
	},

	renderInput: function (refName) {
		let inputType = this.props.inputType,
			error = this.state.errors[refName],
			input = React.createElement(this.inputTypes[inputType], {ref: refName, onBlur: this.onBlur});

		return (
			<div className={buildErrorClass(error, 'input-wrapper')} aria-label={error}>
				{input}
			</div>
		);
	},

	renderSelect() {
		/* Don't render the select with jsx because adjacent tags do not work in jsx.
		 Something like the following won't work in jsx:

		 <select ref={selfRef(this, 'select')} onChange={this.onChange}>
		 {this.renderOptions()}
		 </select>

		 renderOptions: function() {
		 return (
		 <option value="equals">Equals</option>,
		 <option value="gt">Greater than</option>,
		 <option value="lt">Less than</option>,
		 <option value="range">In between</option>
		 )
		 }
		 */

		return React.createElement("select",
			{
				className: 'criteria-picker-select',
				ref: selfRef(this, 'select'),
				onChange: this.onChange
			}, ...this.buildOptions());
	},

	buildOptions: function () {
		return this.props.inputType === 'text' ? this.buildTextEqualityOptions() : this.buildEqualityOptions();
	},

	buildOption: function (optionConfig) {
		return React.createElement("option", {value: optionConfig.value}, optionConfig.text);
	},

	buildTextEqualityOptions: function () {
		return [{value: 'equals', text: '='}].map(this.buildOption);
	},

	buildEqualityOptions: function () {
		let options = [
			{value: 'equals', text: '='},
			{value: 'gt', text: '>'},
			{value: 'gte', text: '>='},
			{value: 'lt', text: '<'},
			{value: 'lte', text: '<='},
			{value: 'range', text: 'in'}
		];

		return options.map(this.buildOption);
	},

	render: function () {
		let isBetween = this.isRange();
		let rangeError = this.state.errors.rangeError;

		return (
			<div className={buildErrorClass(rangeError, 'criteria-picker')} aria-label={rangeError}>
				<label className="criteria-picker-label"> {this.props.displayName}:
				</label>

				<div className="criteria-picker-inputs">
					{this.renderSelect()}
					{isBetween ? <div className="range">{this.renderInput('from')} <span>-</span> {this.renderInput('to')}
					</div> : this.renderInput('from') }
				</div>
			</div>
		)
	}
});

