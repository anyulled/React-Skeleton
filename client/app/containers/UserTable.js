import React, { PropTypes } from "react";
import { Link } from "react-router";
import { Table, Column, Cell } from "fixed-data-table";
import { Glyphicon } from "react-bootstrap";
import TextCell from '../components/TextCell';
//import SortHeaderCell from '../components/SortHeaderCell';
import { connect } from "react-redux";
import * as userActions from "../actions/users/users";
import "fixed-data-table/dist/fixed-data-table-base.css";
import "fixed-data-table/dist/fixed-data-table-style.css";
import "fixed-data-table/dist/fixed-data-table.css";
import * as uiActions from "../actions/ui/ui";

class UserTable extends React.Component {
	constructor(props) {
		super(props);
	}
	componentWillMount(){
		this.props.usersLoad();
	}
	render() {
		let { users, onEditClick, onRemoveClick, edit } = this.props;
		let rowHeight = 30;
		return(
				<Table
					height={users.length * rowHeight}
					rowsCount={users.length}
					width={800 + (edit ? 100 : 0)}
					rowHeight={rowHeight}
					headerHeight={rowHeight}
					{...this.props}
				>
					<Column cell={<TextCell data={users} col="id" />} width={150} header={<Cell>ID</Cell>} />
					<Column cell={<TextCell data={users} col="name" />} width={200} header={<Cell>Name</Cell>} />
					<Column cell={<TextCell data={users} col="yearOfBirth" />} width={150} header={<Cell>Year of Birth</Cell>} />
					<Column cell={<TextCell data={users} col="country" />} width={150} header={<Cell>Country</Cell>} />
					<Column cell={<TextCell data={users} col="username" />} width={150} header={<Cell>Username</Cell>} />
					{ edit ? <Column  width={100} header="Actions"
						cell={({rowIndex, ...props}) => (
								<Cell>
									<div style={{cursor: "pointer", display:"inline"}} onClick={() => { onEditClick(users[rowIndex])}}><Glyphicon glyph="pencil" /></div>
								</Cell>
							)}  
					/> : null }
				</Table>
		);
	}
	
}

UserTable.defaultProps= {
	edit: false
};

UserTable.propTypes = {
	users: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		yearOfBirth: PropTypes.string.isRequired,
		country: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired
	}).isRequired).isRequired,
	usersLoad: PropTypes.func.isRequired,
	onRemoveClick: PropTypes.func.isRequired,
	onEditClick: PropTypes.func.isRequired,
	edit: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
	return {
		users: state.users.items
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		usersLoad: () => {
			dispatch(userActions.usersLoad());
		},
		onRemoveClick: (id) => {
			dispatch(userActions.userRemove(id));
		},
		onEditClick: (user) => {
			dispatch(userActions.userEdit(user));
			dispatch(uiActions.editingUserChanged(true));
		}
	};
};

UserTable = connect(
	mapStateToProps,
	mapDispatchToProps
)(UserTable);

export default UserTable;