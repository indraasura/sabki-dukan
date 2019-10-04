import React, { Component } from "react";
import Success from './success'


class ShopkeeperForm extends Component {
  state = {
    isRouted: false,
    shop_name: "",
    shop_type: "",
    theme: "light",
    isSubmitted: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

 
  handleSubmit = () => {
    fetch("url", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        shop_name: this.state.shop_name,
        shop_type: this.state.shop_type,
        theme: this.state.theme
      })
    });
    this.setState({ isSubmitted: true });
    console.log(this.state)
  };

  

  render() {
    if (this.state.isSubmitted) {
      return (<Success />);
    } else {
      return (
        <React.Fragment>
          <div style={{ height: "250px" }}></div>
          <div className="card row">
            <div className="col s12 m8 l8 offset-l2 offset-m2">
              <br />
              <br />
              <form onSubmit={this.submitForm}>
                <input
                  name="shop_name"
                  placeholder="Name of the shop"
                  value={this.state.shop_name}
                  onChange={this.handleChange}
                />
                <input
                  name="shop_type"
                  placeholder="Type of the shop"
                  value={this.state.shop_type}
                  onChange={this.handleChange}
                />

                <h4 style={{ fontSize: "18px", textAlign: "center" }}>
                  Select theme
                </h4>
                <br />
                <div className="row">
                  <div className="col s12 m6 l6">
                    <p>
                      <label>
                        <input
                          name="theme"
                          type="radio"
                          value="dark"
                          checked={this.state.theme === "dark"}
                          onChange={this.handleChange}
                        />
                        <span>Dark</span>
                      </label>
                    </p>
                    <div>
                      <img
                        src="https://i.pinimg.com/originals/ac/e0/7c/ace07c6c338c91b621d1d736ca8c40ec.jpg"
                        alt="dark_theme"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col s12 m6 l6">
                    <p>
                      <label>
                        <input 
                          name="theme"
                          type="radio"
                          value="light"
                          checked={this.state.theme === "light"}
                          onChange={this.handleChange}
                        />
                        <span>Light</span>
                      </label>
                    </p>
                    <div style={{ height: "100%" }}>
                      <img
                        src="https://i.pinimg.com/originals/ac/e0/7c/ace07c6c338c91b621d1d736ca8c40ec.jpg"
                        alt="dark_theme"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              </form>
              <div style={{ textAlign: "center" }}>
                <button
                  className="btn btn-large green darken-3"
                  style={{ marginBottom: "30px" }}
                  onClick={this.handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default ShopkeeperForm;
