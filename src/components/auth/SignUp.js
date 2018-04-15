import React, {Component} from 'react';
import {reduxForm} from 'redux-form';


class SignUp extends Component {
    render() {
        const {
            handleSubmit,
            fields: {email, password, passwordConfirm}
        } = this.props;
        return (
            <form>
                <fieldset className="form-group" type="email">
                    <label>Email:</label>
                    <input className="form-control" {...email} />
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <input className="form-control" {...password} type="password"/>
                </fieldset>
                <fieldset className="form-group">
                    <label>Confirm Password:</label>
                    <input className="form-control" {...passwordConfirm} type="password"/>
                </fieldset>
                <button action="submit" className="btn btn-primary"> Sign Up!</button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm']
})(SignUp);