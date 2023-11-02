import React, { Component } from "react";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Row,
    Label,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
} from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";

import { Link } from "react-router-dom";

const required = (val) => val?.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val?.length >= len;

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>
                                    Rating
                                </Label>
                                <Col md={12}>
                                    <Control.select
                                        model=".rating"
                                        id="rating"
                                        name="rating"
                                        className="form-control"
                                        defaultValue="1"
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>
                                    Your Name
                                </Label>
                                <Col md={12}>
                                    <Control.text
                                        model=".author"
                                        id="author"
                                        name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15),
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: "Required ",
                                            minLength: "Must be greater than 2 characters",
                                            maxLength: "Must be 15 characters or less",
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>
                                    Comment
                                </Label>
                                <Col md={12}>
                                    <Control.textarea
                                        model=".comment"
                                        id="comment"
                                        name="comment"
                                        rows="6"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">
                                Submit
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
            </div>
        );
    }
}

function RenderDish(dish) {
    if (dish != null) {
        return (
            <Card>
                <CardImg top src={baseUrl + dish.dish.image} alt={dish.dish.name} />
                <CardBody>
                    <CardTitle tag="h5">{dish.dish.name}</CardTitle>
                    <CardText>{dish.dish.description}</CardText>
                </CardBody>
            </Card>
        );
    } else return <div></div>;
}

function RenderComments({ comments, postComment, dishId }) {
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
                <h4>Comments</h4>
                {renderComments}
                <CommentForm dishId={dishId} postComment={postComment} />
            </>
        );
    } else {
        return <div></div>;
    }
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
                            postComment={props.postComment}
                            dishId={props.dish.id}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

export default DishDetail;
