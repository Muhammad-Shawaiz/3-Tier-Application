import React, { Component } from 'react'
import Screenshot from '../Screenshot.png'
import Navbar from "./navbar";

import axios from 'axios';

export default class Dashboard extends Component {

  handleLogout = () => {
    localStorage.clear();
    this.props.history.push('/');
  };


  style = {
    display: "block",
    marginLeft: "80%",
    width: "10%"
  }
  img = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  }

  // componentDidMount() {
  //   let config = {
  //     headers: {
  //       bearer: localStorage.getItem('authToken'),
  //     }
  //   }

  //   axios.get(`${process.env.REACT_APP_PUBLIC_URL}dashboard`, config).then((resp) => {
  //     if (resp.data.verified) {
  //     }
  //     else {
  //       this.props.history.push('/login');

  //     }
  //   })

  // }

  checkToken = () => {
    let config = {
      headers: {
        bearer: localStorage.getItem('authToken'),
      }
    }

    axios.get(`${process.env.REACT_APP_PUBLIC_URL}dashboard`, config).then((resp) => {
      console.log(resp.data);
      if (!resp.data.verified) {
        // this.props.history.push('/login');
        this.handleLogout()
      }
    })
  }
  componentDidMount() {
    var token = localStorage.getItem('authToken')
    if (!token) {
      this.props.history.push('/login');
    }
    else {
      this.checkToken()
    }
  }
  render() {
    return (
      <>
        <Navbar />

        <img style={this.img} src={Screenshot} alt='Screenshot' />
        <button className='btn btn-primary btn-block' style={this.style} onClick={this.handleLogout}>logout</button>
      </>
    )
  }
}
