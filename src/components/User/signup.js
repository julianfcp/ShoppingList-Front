import React, { Component } from 'react';
import { Button, Form, FormGroup, Input} from 'reactstrap';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import axios from 'axios';

export default class signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            conf_password: "",
            alert: "",
            message: ""
        }
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            conf_password: this.state.conf_password
        }
        console.log(newUser);
        try {
            const res = await axios.post('http://localhost:4000/api/user/register', newUser);
            if(res.data.success){
                this.setState({
                    alert: "alert alert-success",
                    message: res.data.message
                })
                window.location.replace("http://localhost:3000/login");
            } else {
                this.setState({
                    alert: "alert alert-danger",
                    message: res.data.message
                })
                console.log(res.data);
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }

    }

    render() {
        return (
            <div>
                <div className={this.state.alert} role="alert">
                    {this.state.message}
                </div>
                <Form className="signup-form" onSubmit={this.onSubmit} method="post">
                    <h1 className="text-center">
                        <span className="font-weight-bold">Sign Up Form</span>
                    </h1>
                    <h2 className="text-center">Welcome</h2>
                    <FormGroup>
                        <Input type="text" placeholder="Name" name="name" onChange={this.onInputChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="email" placeholder="Email" name="email" onChange={this.onInputChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" placeholder="Password" name="password" onChange={this.onInputChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" placeholder="Re-Password" name="conf_password" onChange={this.onInputChange}/>
                    </FormGroup>
                    <Button className="btn-lg btn-block">Sign Up</Button>
                    <div className="text-center pt-3">
                        Or
                    </div>
                    <FacebookLoginButton className="mt-3 mb-3">
                        <span>Sign up with Facebook</span>
                    </FacebookLoginButton>
                    <GoogleLoginButton className="mt-3 mb-3">
                        <span>Sign up with Google</span>
                    </GoogleLoginButton>
                    <div className="text-center">
                        <a href="/login">back to login</a>
                    </div>
                </Form>
            </div>
        )
    }
}
