import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';
//import { Redirect } from 'react-router-dom';
import Cookie from 'js-cookie';
//import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
//import { GoogleLogin } from "react-google-login";
//import { FacebookProvider, LoginButton } from "react-facebook";

export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:"",
            nameSocial: "",
            emailSocial: "",
            urlSocial: "",
            message: "",
            alert: ""
        };
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit = async (e) => {
        e.preventDefault(); // evita reiniciar la pagina
        const loginUser = {
            email: this.state.email,
            password: this.state.password
        }
        try {
            //const res = await axios.post("http://localhost:4000/api/user/login", loginUser);
            // Add a request interceptor
            const res = await axios({
                method: 'post',
                url: 'http://localhost:4000/api/user/login',
                data: loginUser,
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Cache': 'no-cache'
                  }
                
            });

            
            if(res.data.success){
                this.setState({
                    alert: "alert alert-success",
                    message: res.data.message
                });
                await Cookie.set('access_token');
                //const token =  Cookie.get("access_token") ? Cookie.get("access_token") : null;
                //to set a cookie

                console.log(res.data.token);
                window.location.replace("http://localhost:3000/");
                //return <Redirect to="/home" />
            } else {
                this.setState({
                    alert: "alert alert-danger",
                    message: res.data.message
                })
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }
        
        
    }

    responseGoogle = response => {
        console.log(response);
        this.setState({
            name: response.profileObj.name,
            email: response.profileObj.email,
            imageUrl: response.profileObj.imageUrl
        });
    };
    responseFacebook = response => {
        console.log(response);
    };
    responseErrorFacebook = error => {
        console.log(error);
    };

    render() {
        return (
            <div>
                <div className={this.state.alert} role="alert">
                    {this.state.message}
                </div>
                <Form className="login-form" onSubmit={this.onSubmit} method="post">
                    <h1 className="text-center">
                        <span className="font-weight-bold">Login Form</span>
                    </h1>
                    <h2 className="text-center">Welcome {this.state.name}</h2>
                    <h3>{this.state.email}</h3>
                    <img src={this.state.imageUrl} alt={this.state.name} />
                    <FormGroup>
                        <Label>Email</Label>
                        <Input 
                            name="email" 
                            type="email" 
                            placeholder="Email"
                            onChange={this.onInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input 
                            type="password" 
                            placeholder="Password"
                            name="password"
                            onChange={this.onInputChange}
                        />
                    </FormGroup>
                    <Button className="btn-lg btn-block">Log in</Button>
                    <div className="text-center pt-3">Or</div>
                    {/*<FacebookLoginButton className="mt-3 mb-3" />
                    <GoogleLoginButton buttonText="Login" className="mt-3 mb-3" />
                    
                    <GoogleLogin
                        clientId="315854245557-i0cjaqcqjmkd3lf61gdmup5hnh3qbroa.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={"single_host_origin"}
                    />
                    <FacebookProvider appId="123456789">
                        <LoginButton
                            scope="email"
                            onCompleted={this.responseFacebook}
                            onError={this.responseErrorFacebook}
                        >
                        <span>Login via Facebook</span>
                        </LoginButton>
                    </FacebookProvider>*/}

                    <div className="text-center">
                        <a href="/signup">Sign up</a>
                    </div>
                </Form>
            </div>
        )
    }
}
