import React from 'react';
require('./index.scss');

let SearchResult = React.createClass({
	formatDateString: function (dateString) {
		let date = new Date(dateString),
			day = date.getDate(),
			year = date.getFullYear(),
			month = date.toLocaleString('en-us', {month: 'short'});

		return `${month} ${day}, ${year}`
	},

	render: function () {
		let data = this.props.data;
		return (<div className="search-result">
			<div className='search-result-header'>
				<a className="repo-link" href={data.html_url}>{data.full_name}</a>
				<div className='search-result-header-meta'>
					<span>{data.language}</span>
					<a className="search-result-header-link" href={data.html_url + '/stargazers'}>
						<i className="fa fa-star" aria-hidden="true"></i>
						{data.stargazers_count}
					</a>
					<a className="search-result-header-link" href={data.html_url + '/network'}>
						<i className="fa fa-code-fork" aria-hidden="true"></i>
						{data.forks}
					</a>
				</div>
			</div>
			<div className='search-result-description'>
				{data.description}
			</div>
			<div className='search-result-updated'>
				Updated on {this.formatDateString(data.pushed_at)}
			</div>
		</div>);
	}
});

export default React.createClass({

	getInitialState: function () {
		return {results: [], totalCount: undefined};
	},

	//define this function to wrap it because react warns about binding to a different context
	load(url) {
		this.props.loadUrl(url);
	},

	createStringCompareFn: function (property) {
		return function (v1, v2) {
			if (v1[property] < v2[property])
				return -1;
			if (v1[property] > v2[property])
				return 1;
			return 0;
		}
	},

	render: function () {
		let next, prev, total, currentPage;

		if (this.state.next) {
			next =
				<button className='results-page-next sa-button' onClick={this.load.bind(this, this.state.next)}>Next</button>
		}
		if (this.state.prev) {
			prev =
				<button className='results-page-prev sa-button' onClick={this.load.bind(this, this.state.prev)}>Prev</button>
		}
		if (this.state.currentPage) {
			currentPage = <span> Page # {this.state.currentPage}</span>
		}
		if (this.state.totalCount !== undefined) {
			total = (
				<div className="search-result-count">
					We’ve found {this.state.totalCount} repository results
				</div>)
			;
		}

		//sort alphabetically as per requirements, does not work great with paging.
		this.state.results.sort(this.createStringCompareFn('name'));

		return (
			<div>
				{total}
				<div className="results">

					{this.state.results.map(function (result) {
						return <SearchResult key={result.id} data={result}/>;
					})}
				</div>
				<div className="results-page-container">
					{prev}
					{currentPage}
					{next}
				</div>
			</div>
		);
	}
});
