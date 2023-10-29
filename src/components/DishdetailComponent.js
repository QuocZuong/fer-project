import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";

function RenderDish(dish) {
    if (dish != null) {
        return (
            <Card>
                <CardImg top src={dish.dish.image} alt={dish.dish.name} />
                <CardBody>
                    <CardTitle tag="h5">{dish.dish.name}</CardTitle>
                    <CardText>{dish.dish.description}</CardText>
                </CardBody>
            </Card>
        );
    } else return <div></div>;
}

function RenderComments(dish) {
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

const DishDetail = (props) => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DishDetail;
