import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetail extends Component {
    renderDish(dish) {
        if (dish != null)
            return (
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle tag="h5">{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else return <div></div>;
    }

    renderComments(dish) {
        // custom function to format date
        // function formatDate(commentDate) {
        //     const date = new Date(commentDate);
        //     const options = { year: "numeric", month: "short", day: "2-digit" };
        //     return date.toLocaleDateString(undefined, options);
        // }

        if (dish?.comments?.length > 0) {
            return dish.comments.map((comment, index) => (
                <li className="" key={comment.id + "_" + index}>
                    <p>{comment.comment}</p>{" "}
                    <p>
                        -- {comment.author},{" "}
                        {new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "2-digit" }).format(
                            new Date(Date.parse(comment.date)),
                        )}
                    </p>
                </li>
            ));
        } else {
            return <div></div>;
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">{this.renderDish(this.props.dish)}</div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ol className="list-unstyled">{this.renderComments(this.props.dish)}</ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default DishDetail;
