import React, {Component} from 'react';
import './aaa.scss';
import {Button} from 'antd';

class Home extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <>
                Home
                <Button type="primary">button</Button>
            </>
        );
    }
}

export default Home;