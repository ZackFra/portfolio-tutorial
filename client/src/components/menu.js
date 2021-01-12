import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { Form, Button } from 'react-bootstrap';

import './menu.css';

const MenuLink = (props) => (
    <li className='Menu-item' key={uuid()}>
        <Link to={props.to}>{props.children}</Link>
    </li>
)

class LoginForm extends React.Component {

    state = {
        username: '',
        password: ''
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    // @feature : handles event changes
    // @e       : <event>
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    // @feature : handle a login request
    // @e       : <event>
    onSubmit = (e) => {
        e.preventDefault();

        // TODO: make post request to back-end
    }

    render() {
        const { onChange, onSubmit } = this;
        const { username, password } = this.state;

        return (
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="user">Username: </Form.Label>
                    <Form.Control 
                        type='text'
                        value={username}
                        onChange={onChange}
                        name='username'
                        id='user'
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor='pass'>Password: </Form.Label>
                    <Form.Control
                        type='password'
                        value={password}
                        onChange={onChange}
                        name='password'
                        id='pass'
                    />
                </Form.Group>
                <Button type='submit'>Log in</Button>
            </Form>
        )
    }

}

const Menu = () => (
    <ul className='Menu-list'>
        <MenuLink to='/'>
            Home
        </MenuLink>
        <MenuLink to='/projects'>
            Projects
        </MenuLink>
        <MenuLink to='/bio'>
            Bio
        </MenuLink>
        <MenuLink to='/blog'>
            Blog
        </MenuLink>
        <MenuLink to='/login'>
            Login
        </MenuLink>

        <li className='Menu-item' key={uuid()}>
            <LoginForm />
        </li>
    </ul>
)

export default Menu;