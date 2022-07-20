import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Navbar from "./navbar";
require('dotenv').config();


export default class Login extends Component {
    
    constructor() {
        super()

        this.state = {
            email: "",
            password: "",
        }
    }


    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        var _histroy = this.props.history;
        axios.post(`${process.env.REACT_APP_PUBLIC_URL}login`, {
            email: this.state.email,
            password: this.state.password
        }).then(function (resp) {
            localStorage.setItem('authToken', resp.data.authToken);

            if (resp.data.authToken != null) {

                localStorage.setItem('authToken', resp.data.authToken);
                try {
                    _histroy.push('/dashboard');
                }
                catch (exx) {
                    alert(exx);
                }

            }
            else {
                alert('Invlid Username or Password!!!')
                // showAlert('message')
            }
        })

            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        var token = localStorage.getItem('authToken')
        if (token) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        const { email, password } = this.state;
        return (
            <>

                <Navbar />

                <div className="auth-inner">
                    <form onSubmit={this.onSubmit}>
                        <h3>Sign In</h3>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" onChange={this.onChange} value={email} name="email" className="form-control" placeholder="Enter email" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" onChange={this.onChange} value={password} name="password" className="form-control" placeholder="Enter password" />
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
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
