import searchBuilder from './RepositorySearchBuilder';
import parse from 'parse-link-header';
import $ from "jquery";

export class Search {
	search(criteria, callback) {
		let url = searchBuilder(criteria);
		this.load(url, callback);
	}

	load(url, callback) {
		$.ajax(url, {complete: this.createCallback(callback)});
	}

	createCallback(callback) {
		return function (ajaxData, status) {

			if (status === 'success') {
				callback(this.parseAjaxData(ajaxData), status);
			}
			else {
				alert('Github rate limit of 10 per minute exceeded.  Please wait a bit.');
			}

		}.bind(this);
	}

	parseAjaxData(ajaxData) {
		let json = ajaxData.responseJSON,
			linkData = parse(ajaxData.getResponseHeader('Link')),
			next = linkData && linkData.next && linkData.next.url,
			prev = linkData && linkData.prev && linkData.prev.url,
			currentPage = 1;

		if (prev) {
			currentPage = parseInt(linkData.prev.page) + 1;
		}

		return Object.assign({next, prev, currentPage}, json);
	}

}
