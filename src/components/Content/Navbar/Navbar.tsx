import React from 'react';
import {Nav, NavItem, NavLink} from "reactstrap";

export default class Navbar extends React.Component<{activeTab: string, toggle: Function}, any> {
    render() {
        return (
            <Nav tabs className="d-flex justify-content-center">
                <NavItem className="hover-pointer">
                    <NavLink
                        active={ this.props.activeTab === 'teams' }
                        onClick={() => { this.props.toggle('teams'); }}
                    >Teams
                    </NavLink>
                </NavItem>
                <NavItem className="hover-pointer">
                    <NavLink
                        active={ this.props.activeTab === 'players' }
                        onClick={() => { this.props.toggle('players'); }}
                    >Players
                    </NavLink>
                </NavItem>
                <NavItem className="hover-pointer">
                    <NavLink
                        active={ this.props.activeTab === 'create_match' }
                        onClick={() => { this.props.toggle('create_match'); }}
                    >Create match
                    </NavLink>
                </NavItem>
                <NavItem className="hover-pointer">
                    <NavLink
                        active={ this.props.activeTab === 'huds' }
                        onClick={() => { this.props.toggle('huds'); }}
                    >HUDS
                    </NavLink>
                </NavItem>
                <NavItem className="hover-pointer">
                    <NavLink
                        active={ this.props.activeTab === 'config' }
                        onClick={() => { this.props.toggle('config'); }}
                    >Config
                    </NavLink>
                </NavItem>
            </Nav>
        );
    }
}
