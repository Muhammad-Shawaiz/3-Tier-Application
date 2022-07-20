import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

import axios from 'axios';
require('dotenv').config();

export default class ForgetPassword extends Component {
    state = {
        email: ""
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = async (e) => {
        e.preventDefault()
        await axios.post(`${process.env.REACT_APP_PUBLIC_URL}forgetPassword`, {
            email: this.state.email
        }).then(function (resp) {
            if (resp.data.id === 1) {
                alert(resp.data.message)

            }
            else {
                alert(resp.data.message)
            }
        })
            .catch(function (error) {
                console.log(error);
            });
        this.props.history.push('/');

    }
    checkToken = () => {
        let config = {
            headers: {
                bearer: localStorage.getItem('authToken'),
            }
        }

        axios.get(`${process.env.REACT_APP_PUBLIC_URL}dashboard`, config).then((resp) => {
            if (!resp.data.verified) {
                this.props.history.push('/login');
            }
            else {
                this.props.history.push('/dashboard');
            }
        })
    }


    componentDidMount() {
        var token = localStorage.getItem('authToken')
        if (token) {
            this.checkToken()
        }
    }
    render() {
        const { email } = this.state;

        return (
            <>

                <Navbar />
                <div className="auth-inner">
                    <form onSubmit={this.onSubmit}>
                        <h3>Forget your Password?</h3>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" onChange={this.onChange} value={email} name="email" className="form-control" placeholder="Enter email" />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-check box">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Get a Recovery Email</button>
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
