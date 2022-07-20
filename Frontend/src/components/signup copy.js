import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup(props) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState("")


    return (
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
    )
}
