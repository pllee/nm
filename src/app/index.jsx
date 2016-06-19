import React from 'react';
import ReactDOM from 'react-dom';
import {CriteriaContainer, SearchBar, ResultsContainer} from './../components';
import {Search} from './../data/search/github/Search';

require('./shared.scss');
require('hint.css/hint.css');
require("font-awesome-webpack");

function selfRef(instance, name) {
	return function (component) {
		instance[name] = component;
	}.bind(instance);
}

let SearchApp = React.createClass({
	componentWillMount: function () {
		this.provider = new this.props.provider();
	},

	onSubmit: function () {
		let isValid = !this.validate();
		if (isValid) {
			this.provider.search(this.getData(), this.onSearch);
		}
	},

	loadUrl: function (url) {
		this.provider.load(url, this.onSearch);
	},

	onSearch: function (jsonData) {
		this.displaySearchResults(jsonData);
	},

	displaySearchResults: function (jsonData) {
		let next = jsonData.next,
			prev = jsonData.prev,
			totalCount = jsonData.total_count,
			results = jsonData.items,
			currentPage = jsonData.currentPage;

		this.resultsContainer.setState({next, prev, totalCount, currentPage, results});
	},

	getData: function () {
		let query = this.refs.searchBar.getData(),
			criteria = this.refs.criteriaContainer.getData();

		return {query, criteria};
	},

	validate: function () {
		let isValid = true;

		Object.keys(this.refs).forEach(function (key) {
			let isRefValid = !this.refs[key].validate();
			if (!isRefValid) {
				isValid = false;
			}
		}, this);

		return !isValid && 'A field is invalid';
	},

	render: function () {
		return (
			<div className="container">
				<header className="header">
					<div className='container-wrapper'>
						<div className="logo"></div>
					</div>
				</header>
				<main className="main">
					<div className="search-container">
						<div className='container-wrapper'>
							<SearchBar ref='searchBar' onSubmit={this.onSubmit}></SearchBar>
						</div>
					</div>
					<div className='container-wrapper'>
						<div className="search-criteria">
							<CriteriaContainer ref='criteriaContainer'></CriteriaContainer>
						</div>
						<div className="search-results">
							<ResultsContainer loadUrl={this.loadUrl} ref={selfRef(this, 'resultsContainer')}></ResultsContainer>
						</div>
					</div>
				</main>
				<footer className="footer">
					<div className="container-wrapper">
						<div className="footer-wrapped"></div>
					</div>
				</footer>
			</div>
		);
	}
});

ReactDOM.render(
	<SearchApp provider={Search}/>,
	document.body
);

