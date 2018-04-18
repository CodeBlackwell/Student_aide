import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {signUpUser} from '../../actions'

const error = "Invalid Input!";
const required = value => (value ? undefined : 'Required');
const emailValidate = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;
const passwordValidate = value => {
    if(value.length < 5) {
        return 'invalid password'
    }
    return undefined;
};

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: ''
        };

        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
    }


    changeEmail(e) {
        this.setState({email: e.target.value})
    }

    changePassword(e) {
        this.setState({password: e.target.value})
    }

    changeConfirmPassword(e) {
        this.setState({confirmPassword: e.target.value})
    }

    handleFormSubmit(formProps) {
        this.props.dispatch(signUpUser(formProps))
    }

    renderPasswordError(state){
        if (state.password !== state.confirmPassword) {
            return <h5 className="error">Passwords must match</h5>;
        } else {
         return <button action="submit" className="btn btn-primary"> Sign Up!</button>;
        }
    }
    renderAlert(props) {
        if(props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {props.errorMessage}
                    </div>
            )
        }
    }

    render() {
        console.log(this.props);
        const {handleSubmit} = this.props;
        const {
            email,
            password,
            confirmPassword
        } = this.state;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group" type="email">
                    <label>Email:</label>
                    <Field
                        type="text"
                        className="form-control"
                        name="email"
                        validate={[required, emailValidate]}
                        component="input"
                        label="Email:"
                        value={email}
                        onChange={this.changeEmail}
                    />
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <Field
                        type="password"
                        className="form-control"
                        name="password"
                        validate={[required, passwordValidate]}
                        component="input"
                        label="Password:"
                        onChange={this.changePassword}
                        value={password}
                    />
                </fieldset>
                <fieldset className="form-group">
                    <label>Confirm Password:</label>
                    <Field
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        validate={[required, passwordValidate]}
                        component="input"
                        label="Confirm Password:"
                        onChange={this.changeConfirmPassword}
                        value={confirmPassword}
                    />
                </fieldset>
                {this.renderAlert(this.props)}
                {this.renderPasswordError(this.state)}
            </form>
        );
    }
}

function mapStateToProps(state) {
    const {
        auth: {
            error
        }
    } = state;

    return {
        errorMessage: error
    }
}
export default reduxForm({
    form: 'signup'
}, mapStateToProps)(SignUp);