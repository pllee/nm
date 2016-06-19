import React from 'react';
import expect from 'expect.js';
import searchBuilder from './RepositorySearchBuilder';

let apiStart = 'https://api.github.com/search/repositories?';


describe('Search builder', function () {
	function validateCriteria(criteria, expected) {
		let query = 'a';
		let criteriaStart = `${apiStart}q=${query}`;
		let url = searchBuilder({query: query, criteria: criteria});

		expect(url).to.be(`${criteriaStart}${expected}`);
	}


	it('Builds a proper query without any criteria', function () {
		expect(searchBuilder({query: 'a'})).to.be(`${apiStart}q=a`);
	});

	it('Dates are formatted correctly', function () {

		validateCriteria({
			created: {
				equalityType: 'equals',
				from: new Date(2016, 2, 9)
			}
		}, '+created:2016-03-09');

	});

	it('Equals is formatted correctly', function () {

		validateCriteria({
			stars: {
				equalityType: 'equals',
				from: 5
			}
		}, '+stars:5');

	});

	it('Less than equals is formatted correctly', function () {

		validateCriteria({
			stars: {
				equalityType: 'lte',
				from: 5
			}
		}, '+stars:<=5');

	});

	it('Less than is formatted correctly', function () {

		validateCriteria({
			stars: {
				equalityType: 'lt',
				from: 5
			}
		}, '+stars:<5');

	});

	it('Greater than equals is formatted correctly', function () {

		validateCriteria({
			stars: {
				equalityType: 'gte',
				from: 5
			}
		}, '+stars:>=5');

	});

	it('Greater than is formatted correctly', function () {

		validateCriteria({
			stars: {
				equalityType: 'gt',
				from: 5
			}
		}, '+stars:>5');

	});

	it('Range is formatted correctly', function () {

		validateCriteria({
			stars: {
				equalityType: 'range',
				from: 5,
				to: 10
			}
		}, '+stars:5..10');
	});

	it('Range from is less than to', function () {

		validateCriteria({
			stars: {
				equalityType: 'range',
				from: 5,
				to: 1
			}
		}, '+stars:1..5');

	});

	it('Criteria is appended', function () {

		validateCriteria({
			stars: {
				equalityType: 'range',
				from: 5,
				to: 1
			},
			forks: {
				equalityType: 'equals',
				from: 5
			}
		}, '+forks:5+stars:1..5');

	});

});
