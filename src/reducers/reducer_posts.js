import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action) {
  switch(action.type) {
    case DELETE_POST:
      // try to remove the key for the deleted post
      // from our local state object, so that the UI
      // may be faster.
      // recall that action.payload contains the id' of the deleted
      // post, which we assigned in our deletePost ActionCreator.
      // _.omit simply removes the selected key from the object (state) it is
      // supplied in the first parameter and returns a new state object.
      return _.omit(state, action.payload);
    case FETCH_POST:
      const post = action.payload.data;
      // don't trash all the previous posts in state that we've
      // previously retrieved. Instead, add a new key/value pair
      // for the post that was fetched.
      //
      // A non-ES6 implementation"
      // const newState = { ...state };
      // newState[post.id] = post;
      // return newState;

      // below is the ES6 refactored version of the above.
      // it returns a new object which injects the current properties of
      // state, and creates a new property using the post data's id ([action.paylod.data.id])
      // and assigns its value to be the post data (action.paylod.data)
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_POSTS:
      // from [post1, post2] transform to { postId: postData } using lodash
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}