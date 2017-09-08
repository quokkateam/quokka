import React, { Component } from 'react';
import { DropdownButton } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
import Session from '../../utils/Session';

class UserDropdown extends Component {
  render() {
    return (
      <DropdownButton bsStyle='default' title={Session.userName()} id="userDropdown">
        <MenuItem eventKey='1' href="/signout">Sign Out</MenuItem>
      </DropdownButton>
    );
  }
}

export default UserDropdown;