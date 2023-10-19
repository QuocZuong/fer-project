import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

function RenderDish(dish) {
    console.log("render dish" + dish);
    if (dish != null) {
        return (
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle tag="h5">{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    } else return <div></div>;
}

function RenderComments(dish) {
    // custom function to format date
    // function formatDate(commentDate) {
    //     const date = new Date(commentDate);
    //     const options = { year: "numeric", month: "short", day: "2-digit" };
    //     return date.toLocaleDateString(undefined, options);
    // }

    if (dish?.comments?.length > 0) {
        console.log("render comments");
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

const DishDetail = (props) => {
    console.log("dish detail ", props.dish);
    return (
        props.dish && (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">{RenderDish(props.dish)}</div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ol className="list-unstyled">{RenderComments(props.dish)}</ol>
                    </div>
                </div>
            </div>
        )
    );
};

export default DishDetail;
