import React, { Component } from 'react'
import '../css/style.css'
import M from 'materialize-css';
import ShopkeeperForm from './shopkeeperForm'
import axios from "axios/index";

class Landing extends Component {
    state = { 
        isRouted: true,
        isToken: false,
    };

    getGreetings = () => {
        // axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/greetings`)
        axios.get(`/users/ping`)
            .then((res) => {
                console.log(res);
                // this.setState({greetings: res.data.data.greetings});
            })
            .catch((err) => {
                console.log(err);
            });
    };

    getAccessToken = (code) => {
        // axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/greetings`)
        console.log('FETCHING');
        axios.get(`/github/access_token/` + code)
            .then((res) => {
                const token = res.data.token;
                console.log('token', token);
                if (token) {
                    localStorage.setItem('token', token);
                    this.setState({token: token});
                    this.setState({
                        'isToken': true
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount() {
        M.AutoInit();
        const token = localStorage.getItem('token');
        if (token) {
            this.setState({
                'isToken': true
            })
        }
        this.getGreetings();
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        if (code === null && localStorage.getItem('token') !== null) {
            this.setState({token: localStorage.getItem('token')})
        } else if (code !== null && localStorage.getItem('code') === code) {
            console.log('ignore');
        } else {
            console.log('Accessing Token');
            localStorage.setItem('code', code);
            this.getAccessToken(code);
        }
    }

    changeRoute = () =>{
        this.setState({isRouted:false})
    };
    render() { 
        if(this.state.isRouted){
            return (
              <React.Fragment>
                <h1 className="white-text customHeader">"Some Quote"</h1>
                <div style={{ textAlign: "center" }}>
                    {this.state.isToken ? (
                        <button
                            className="btn btn-large z-depth-0 customButton white-text"
                            onClick={this.changeRoute}
                        >
                            Continue
                        </button>
                    ) : (
                        <h3>
                            <a href={"https://github.com/login/oauth/authorize?client_id=df3fabd3fb15c419f578&scope=public_repo"}>Github</a>
                        </h3>
                    )}
                </div>
              </React.Fragment>
            );
        }else{
            return <ShopkeeperForm/>
        }
       
    }
}
 
export default Landing