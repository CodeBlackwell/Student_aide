import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';

class SignIn extends Component {

    static _handleFormSubmit({ email, password }) {
        console.log({ email, password });
    }

    shouldComponentUpdate(){
        return false;
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(SignIn._handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email:</label>
                    <Field name="email" component="input" type="text" className="form-control"/>
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <Field name="password" component="input" type="password" className="form-control"/>
                </fieldset>
                <button action="submit" className="btn btn-primary">Log In</button>
            </form>
        )
    }
}

export default reduxForm({
    form: 'signin',
    fields: ['email', 'password']
})(SignIn);