import React from 'react';

import { Footer } from './components/Footer.jsx';
import { SearchRes } from './components/SearchRes.jsx';
import { Paginator } from './components/Paginator.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search: 'react',
			res: [],
			page: 1,
			maxPage: 0,
		};
		this.Button = (
			<button onClick={() => this.handleFetch(1, false)} type='text'>
				Search
			</button>
		);
	}
	handleSearchChange = (e) => {
		this.setState({ search: e.target.value });
	};
	handleFetch = (page, isPaging) => {
		const request = `https://api.github.com/search/repositories?q=${this.state.search}&per_page=20&page=${page}`;
		fetch(request)
			.then((res) => res.json())
			.then((json) => {
				if (!json.message) {
					if (isPaging) this.setState({ res: json.items, page: page });
					else
						this.setState({
							res: json.items,
							maxPage: Math.ceil(json.total_count / 20),
							page: page,
						});
				} else console.log('Request limit');
			});
	};
	componentDidMount = () => {
		this.handleFetch(1, false);
	};
	componentDidCatch = (error) => {
		console.log(error);
	};
	render() {
		return (
			<React.Fragment>
				<Footer
					search={this.state.search}
					handleChange={this.handleSearchChange}
					btn={this.Button}
				/>
				<SearchRes res={this.state.res} />
				<Paginator
					page={this.state.page}
					event={this.handleFetch}
					maxPage={this.state.maxPage}
				/>
			</React.Fragment>
		);
	}
}

export default App;
