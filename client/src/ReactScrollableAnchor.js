import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';
import {Jumbotron} from 'react-bootstrap';
import HomeSection from './components/Home';
import axios from 'axios';
import {configureAnchors} from 'react-scrollable-anchor';

export default class Page extends Component {

    constructor() {
        super();
        this.state = {}
    };


    // handleChange(event) {
    //   const obj = {};
    //   obj['rsvpForm'] = {...this.state.rsvpForm}
    //   obj['rsvpForm'][event.target.name] = event.target.value;
    //   this.setState(obj);
    // };

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
        axios.get(`/github/access_token/` + code)
            .then((res) => {
                console.log(res);
                // this.setState({greetings: res.data.data.greetings});
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount() {
        this.getGreetings();
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        if (code) {
            console.log('yes');
            console.log(`${process.env.REACT_APP_USERS_SERVICE_URL}`);
            localStorage.setItem('code', code);
            this.getAccessToken(code);
        }
    }

    render() {
        return (
            <div>
                <HomeSection></HomeSection>
            </div>
        )
    }
}
