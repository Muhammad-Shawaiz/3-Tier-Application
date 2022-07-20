import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Navbar from "./navbar";

require('dotenv').config();

export default class SignUp extends Component {
    state = {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = async (e) => {
        e.preventDefault()

        await axios.post(`${process.env.REACT_APP_PUBLIC_URL}signup`, {
            data: this.state
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


    // componentDidMount() {
    //     let config = {
    //         headers: {
    //             bearer: localStorage.getItem('authToken'),
    //         }
    //     }

    //     axios.get(`${process.env.REACT_APP_PUBLIC_URL}dashboard`, config).then((resp) => {
    //         if (resp.data.verified) {
    //             this.props.history.push('/dashboard');

    //         }
    //         else {

    //             this.props.history.push('/signup');
    //         }
    //     })

    // }

    componentDidMount() {
        var token = localStorage.getItem('authToken')
        if (token) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        const { email, password, firstName, lastName, phone } = this.state;
        return (
            <>
                <Navbar />
                <div className="auth-inner" style={{ marginTop: '10%' }}>
                    <form onSubmit={this.onSubmit} >
                        <br></br>
                        <h3>Sign Up</h3>

                        <div className="form-group">
                            <label>First name</label>
                            <input type="text" onChange={this.onChange} value={firstName} name="firstName" className="form-control" placeholder="First name" />
                        </div>

                        <div className="form-group">
                            <label>Last name</label>
                            <input type="text" onChange={this.onChange} value={lastName} name="lastName" id="lastName" className="form-control" placeholder="Last name" />
                        </div>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" onChange={this.onChange} value={email} name="email" id="email" className="form-control" placeholder="Enter email" />
                        </div>

                        <div className="form-group">
                            <label>Contact</label>
                            <input type="tel" onChange={this.onChange} value={phone} name="phone" id="phone" className="form-control" placeholder="Enter Phone number" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" onChange={this.onChange} value={password} name="password" className="form-control" placeholder="Enter password" />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                        <p className="forgot-password text-right">
                            Already registered? <Link to="/login" className="text-primary" >sign in?</Link>

                        </p>
                    </form>
                </div>
            </>
        );
    }
}