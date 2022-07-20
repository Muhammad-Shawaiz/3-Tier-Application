import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
require('dotenv').config();

export default class ResetPassword extends Component {
    state = {
        password: "",
        confirmPassword: ""
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = async (e) => {
        e.preventDefault()

        if (this.state.password === this.state.confirmPassword) {
            var uid = window.location.pathname.split("/").pop()
            await axios.post(`${process.env.REACT_APP_PUBLIC_URL}resetPassword`, {
                newPassword: this.state.confirmPassword,
                id: uid
            }).then(function (resp) {
                alert(resp.data.message)

            })
                .catch(function (error) {
                    console.log(error);
                });
            this.props.history.push('/');
        }
        else {
            alert('Password and confirm password must be same!')
        }
    }

    

    render() {
        const { password, confirmPassword } = this.state;
        return (
            <>
                <div className="auth-inner">

                    <form onSubmit={this.onSubmit}>
                        <h3>Reset Password</h3>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" onChange={this.onChange} value={password} name="password" className="form-control" placeholder="Enter password" />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" onChange={this.onChange} value={confirmPassword} name="confirmPassword" className="form-control" placeholder="Enter password again" />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Confirm</button>
                        <p className="forgot-password text-right">
                            Forgot <Link to="/forgetpassword" className="forgot pull-right" >password?</Link>
                        </p>
                        <br></br>
                        <div className="signup-wrapper text-center">
                            Don't have an accout? <Link to="/signup" className="text-primary" >  Create One</Link>

                        </div>
                    </form>
                </div>
            </>
        );
    }
}
