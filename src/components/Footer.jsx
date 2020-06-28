import React from 'react';
import style from './footer.module.css';


export class Footer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <div className={style.footer}>
			<input defaultValue={this.props.search} onChange={e => this.props.handleChange(e)} />
			{this.props.btn}
		</div>
	}
}