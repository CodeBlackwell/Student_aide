import React, { Component } from 'react';
import { connect } from 'react-redux';
import {signOutUser} from '../../actions';


class SignOut extends Component {

    componentWillMount() {
        this.props.dispatch(signOutUser());
    }
    render() {
        return (
            <div>Thanks for trying out the Student Aid Portal Beta</div>
        )
    }
}

export default connect()(SignOut)