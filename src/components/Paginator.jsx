import React from 'react';
import style from './paginator.module.css';

export class Paginator extends React.Component {
	constructor(props) {
		super(props);
	}

	handleChangePageArow(symb, page) {
		if (symb == '+') this.props.event(page == this.props.maxPage ? this.props.maxPage : page + 1, true);
		else this.props.event(page == 1 ? 1 : page - 1, true);
	}

	render() {
		const page = this.props.page;
		const pages = () => {
			if (this.props.page > 4) {
				let mas = [];
				let maxInPaginator = this.props.page == this.props.maxPage ? this.props.maxPage : this.props.page + 2;
				for (let i = 0; i < 5; i++) {
					mas.unshift(maxInPaginator - i);
				}
				return mas;
			}
			else return [1, 2, 3, 4, 5];
		}
		console.log(page);
		return <div className={style.paginator}>
			<a onClick={() => this.handleChangePageArow('-', page)}>◁</a>
			{pages().map((val, index) => {
				if (this.props.page == val) return <i key={index} className={style.activePage} onClick={() => this.props.event(val, true)}>{val}</i>;
				return <i key={index} onClick={() => this.props.event(val, true)}>{val}</i>
			})}
			<a onClick={() => this.handleChangePageArow('+', page)}>▷</a>
		</div>;
	}
}