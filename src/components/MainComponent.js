import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Menu from "./MenuComponent";
import About from "./AboutComponent";
import Contact from "./ContactComponent";
import { DISHES } from "../shared/dishes";
import DishDetail from "./DishdetailComponent";
import Home from "./HomeComponent";

import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS,
        };
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }

    render() {
        const DishWithId = ({ match }) => {
            return (
                <DishDetail
                    dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments={this.state.comments.filter(
                        (comment) => comment.dishId === parseInt(match.params.dishId, 10),
                    )}
                />
            );
        };

        const HomePage = () => {
            return (
                <Home
                    dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        };

        const MenuPage = () => {
            return <Menu dishes={this.state.dishes} />;
        };

        const AboutPage = () => {
            return <About leaders={this.state.leaders} />;
        };

        return (
            <div>
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/aboutus" component={AboutPage} />
                    <Route exact path="/menu" component={MenuPage} />
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Route exact path="/contactus" component={Contact} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default Main;
