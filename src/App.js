import React, { Component } from "react";
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
            <div className="App">
                <Main />
            </div>
        );
    }
}
