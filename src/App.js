import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import { DISHES } from "./shared/dishes";
import Main from "./components/MainComponent";
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
        };
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Main />
                </div>
            </BrowserRouter>
        );
    }
}
