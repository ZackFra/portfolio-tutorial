import React from 'react';
import Menu from './menu';
import './layout.css';

import { Container } from 'react-bootstrap';

const Layout = (props) => (
    <Container>
        <div className='Layout-main'>
            <Menu />
            {props.children}
        </ div>
    </ Container>
);



export default Layout;