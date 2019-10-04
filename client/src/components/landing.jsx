import React, { Component } from 'react'
import '../css/style.css'
import M from 'materialize-css';
import ShopkeeperForm from './shopkeeperForm'

class Landing extends Component {
    state = { 
        isRouted: true
    }
    componentDidMount(){
        M.AutoInit();
    }
    changeRoute = () =>{
        this.setState({isRouted:false})
    }
    render() { 
        if(this.state.isRouted){
            return (
              <React.Fragment>
                <h1 className="white-text customHeader">"Some Quote"</h1>
                <div style={{ textAlign: "center" }}>
                  <button
                    className="btn btn-large z-depth-0 customButton white-text"
                    onClick={this.changeRoute}
                  >
                    Continue
                  </button>
                </div>
              </React.Fragment>
            );
        }else{
            return <ShopkeeperForm/>
        }
       
    }
}
 
export default Landing