import React, {Component} from "react";
import Success from './success'


class ShopkeeperForm extends Component {
    state = {
        isRouted: false,
        shop_name: "",
        shop_type: "",
        theme: "light",
        isSubmitted: false,
        finalData: {
            'template_base': null,
            'template_nav': null,
            'tempalte_footer': null,
            'name': null,
            'phone_number': null
        },
        isTemplateBase: true,
        isTemplateNav: false,
        isTemplateFooter: false,
    };

    handleImageChange = e => {
        const allData = document.getElementsByClassName("template_base");
        for (let i = 0; i < allData.length; i++) {
            allData[i].classList.remove('select-border');
        }

        document.getElementById(e.target.id).classList.add('select-border');
        this.setState({
            "template": e.target.name
        })
    };

    handleChange = e => {
        console.log('change', e.target.name, e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleTemplateBase = e => {
        this.setState({
            'isTemplateBase': true,
            'isTemplateNav': false,
            'isTemplateFooter': false,
        })
    };

    handleTemplateNav = e => {
        this.setState({
            'isTemplateNav': true,
            'isTemplateBase': false,
            'isTemplateFooter': false
        })
    };

    handleTemplateFooter = e => {
        this.setState({
            'isTemplateFooter': true,
            'isTemplateNav': false,
            'isTemplateBase': false
        })
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
        this.setState({isSubmitted: true});
        console.log(this.state);
    };


    render() {
        if (this.state.isSubmitted) {
            return (<Success/>);
        } else {
            let btn_dark = "";
            let btn_light = "";
            if (this.state.template === "dark") {
                btn_dark = "border-image";
                btn_light = "";
            } else if (this.state.template === "light") {
                btn_dark = "";
                btn_light = "border-image";
            }
            return (
                <React.Fragment>
                    {/*<div style={{height: "50px"}}></div>*/}
                    <div className={"white picker-background"}>
                        {this.state.isTemplateBase ? (
                        <div className={"picker-row"}>
                            <img
                                name="base_dark"
                                id={"base_dark"}
                                className={"template_base"}
                                src="https://i.pinimg.com/originals/ac/e0/7c/ace07c6c338c91b621d1d736ca8c40ec.jpg"
                                alt="dark_theme"
                                onClick={this.handleImageChange}
                                style={{
                                    width: "auto",
                                    height: "60vh",
                                    marginBottom: "25vh",
                                    marginLeft: "100px",
                                    cursor: "pointer"
                                }}
                            />
                            <img
                                name="base_light"
                                id={"base_light"}
                                className={"template_base"}
                                src="https://i.pinimg.com/originals/ac/e0/7c/ace07c6c338c91b621d1d736ca8c40ec.jpg"
                                alt="dark_theme"
                                onClick={this.handleImageChange}
                                style={{
                                    width: "auto",
                                    height: "60vh",
                                    marginBottom: "25vh",
                                    marginLeft: "100px",
                                    cursor: "pointer"
                                }}
                            />
                            <img
                                name="base_solaris"
                                id={"base_solaris"}
                                className={"template_base"}
                                src="https://i.pinimg.com/originals/ac/e0/7c/ace07c6c338c91b621d1d736ca8c40ec.jpg"
                                alt="dark_theme"
                                onClick={this.handleImageChange}
                                style={{
                                    width: "auto",
                                    height: "60vh",
                                    marginBottom: "25vh",
                                    marginLeft: "100px",
                                    cursor: "pointer"
                                }}
                            />
                        </div>
                        ) : (<div></div>)}
                    </div>
                    <div className={"white picker-menu"}>
                        <div className={"row center"}>
                            <div className={"col l2"}>
                                <i className="large material-icons medium picker-icon" onClick={this.handleTemplateBase}>texture</i>
                            </div>
                            <div className={"col l2"}>
                                <i className="large material-icons medium picker-icon" onClick={this.handleTemplateNav}>web</i>
                            </div>
                            <div className={"col l2"}>
                                <i className="large material-icons medium picker-icon" onClick={this.handleTemplateFooter}>video_label</i>
                            </div>
                            <div className={"col l2"}>
                                <i className="large material-icons medium picker-icon">toc</i>
                            </div>
                            <div className={"col l2"}>
                                <i className="large material-icons medium picker-icon">view_carousel</i>
                            </div>
                            <div className={"col l2"}>
                                <i className="large material-icons medium picker-icon">filter</i>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }
}

export default ShopkeeperForm;
