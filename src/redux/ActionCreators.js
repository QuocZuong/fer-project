import * as ActionTypes from "./ActionTypes";
import { DISHES } from "../shared/dishes";
import { baseUrl } from "../shared/baseUrl";

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment,
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + "comments", {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "same-origin",
    })
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error("Error " + response.status + ": " + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            (error) => {
                throw error;
            },
        )
        .then((response) => response.json())
        .then((response) => dispatch(addComment(response)))
        .catch((error) => {
            console.log("post comments", error.message);
            alert("Your comment could not be posted\nError: " + error.message);
        });
};

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment,
});

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + "dishes")
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error("Error " + response.status + ": " + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            (error) => {
                throw new Error(error.message);
            },
        )
        .then((response) => response.json())
        .then((dishes) => dispatch(addDishes(dishes)))
        .catch((error) => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess,
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes,
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + "comments")
        .then((response) => response.json())
        .then((comments) => dispatch(addComments(comments)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess,
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments,
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading());

    return fetch(baseUrl + "promotions")
        .then((response) => response.json())
        .then((promos) => dispatch(addPromos(promos)));
};

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess,
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos,
});

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());

    return fetch(baseUrl + "leaders")
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error("Error " + response.status + ": " + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            (error) => {
                throw new Error(error.message);
            },
        )
        .then((response) => response.json())
        .then((leaders) => dispatch(addLeaders(leaders)))
        .catch((error) => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess,
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders,
});

export const postFeedback = (formValues) => (dispatch) => {
    return fetch(baseUrl + "feedback", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "same-origin",
    })
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error("Error " + response.status + ": " + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            (error) => {
                throw error;
            },
        )
        .then((response) => response.json())
        .then((response) => alert("Thank you for your feedback!\n " + JSON.stringify(response)))
        .catch((error) => {
            console.log("post comments", error.message);
            alert("Your comment could not be posted\nError: " + error.message);
        });
};
