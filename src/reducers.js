import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_POST":
      return state.concat([action.payload]);

    case "DELETE_POST":
      return state.filter(post => post.id !== action.id);

    case "EDIT_POST":
      return state.map(
        post =>
          post.id === action.id ? { ...post, editing: !post.editing } : post
      );

    case "UPDATE_POST":
      return state.map(post => {
        if (post.id === action.id) {
          return {
            ...post,
            title: action.payload.newTitle,
            category: action.payload.newCategory,
            content: action.payload.newContent
          };
        } else return post;
      });

    default:
      return state;
  }
};
export const rootReducer = combineReducers({
  myApp: reducer,
  form: formReducer
});
