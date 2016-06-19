/**
 *
 * @param criteria
 */
import {isFalsy, isDate} from 'luc-is';
let url = 'https://api.github.com/search/repositories?',
	operators = {
		equals: '',
		lt: '<',
		lte: '<=',
		gt: '>',
		gte: '>=',
		range: '..'
	},
	and = '+',
	equals = ':';

export default function (data) {
	return url + ['q=' + data.query, ...buildParametersFromCriteria(data.criteria)].join(and);
};


function buildParametersFromCriteria(criteria) {
	let parameters = [],
	//sort for testing, key order is not deterministic on all browsers
		keys = Object.keys(criteria || {}).sort();

	keys.forEach(function (criteriaName) {
		let criteriaData = criteria[criteriaName],
			from = criteriaData.from,
			hasValue = !isFalsy(from);

		if (hasValue) {
			parameters.push(buildParameter(criteriaName, criteriaData));
		}

	});

	return parameters;
}

function buildParameter(criteriaName, criteriaData) {
	let parameter = criteriaName + equals,
		equalityType = criteriaData.equalityType;

	if (equalityType === 'range') {
		parameter += buildRangeParameter(criteriaData);
	}
	else {
		parameter += operators[equalityType] + formatValue(criteriaData.from);
	}

	return parameter;
}

function sortAndHandleDates(v1, v2) {
	if (isDate(v1)) {
		v1 = v1.getTime();
		v2 = v2.getTime();
	}
	return v1 - v2;
}

//github's api needs with parameters to be in order from least to grea
function buildRangeParameter(criteriaData) {
	let values = [criteriaData.from, criteriaData.to];

	return values.sort(sortAndHandleDates)
		.map(formatValue)
		.join(operators.range);
}

function pad(number) {
	if (number < 10) {
		return '0' + number;
	}
	return number;
}

function formatValue(value) {

	if (isDate(value)) {
		let year = value.getFullYear();
		let month = pad(value.getMonth() + 1);
		let day = pad(value.getDate());

		value = `${year}-${month}-${day}`;
	}

	return value;
}
