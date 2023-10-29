import React from "react";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    Row,
    Label,
    Col,
    Button,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";

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

function RenderComments({ comments, addComment, dishId }) {
    if (comments?.length > 0) {
        const renderComments = comments.map((comment, index) => (
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

        return (
            <>
                {renderComments}
                <CommentForm dishId={dishId} addComment={addComment} />
            </>
        );
    } else {
        return <div></div>;
    }
}

const handleSubmit = (values, dishId, addComment) => {
    addComment(dishId, values.rating, values.author, values.comment);
};

function CommentForm({ dishId, addComment }) {
    return (
        <LocalForm onSubmit={(values) => handleSubmit(values, dishId, addComment)}>
            <Row>
                <Col md={10}>
                    <Control.text
                        model=".comment"
                        id="comment"
                        name="comment"
                        placeholder="Comment"
                        className="form-control"
                    />
                </Col>
            </Row>
            <Row>
                <Col md={10}>
                    <Control.text
                        model=".author"
                        id="author"
                        name="author"
                        placeholder="Author"
                        className="form-control"
                    />
                </Col>
            </Row>
            <Row>
                <Col md={10}>
                    <Control.text
                        model=".rating"
                        id="rating"
                        name="rating"
                        placeholder="Rating"
                        className="form-control"
                    />
                </Col>
            </Row>
            <Row className="form-group mt-3">
                <Col md={{ size: 10, offset: 2 }}>
                    <Button type="submit" color="primary">
                        Send Feedback
                    </Button>
                </Col>
            </Row>
        </LocalForm>
    );
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.dish != null) {
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
                            <RenderComments
                                comments={props.comments}
                                addComment={props.addComment}
                                dishId={props.dish.id}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default DishDetail;
