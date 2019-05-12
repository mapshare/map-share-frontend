import axios from "axios";
import keys from "../data/key";

export const joinGroup = (groupId, userId) => {
  return dispatch => {
    axios
      .put("https://map-share-dev-api.herokuapp.com/api/users/" + userId, {
        addGroup: groupId
      })
      .then(res => {
        dispatch(
          addGroupToUser(res.data.userGroups[res.data.userGroups.length - 1])
        );
      })
      .catch(err => {
        dispatch(
          joinGroupError(
            err.response.data.error.message || err.response.data.error
          )
        );
      });
  };
};

export const createGroup = (groupName, userId) => {
  return dispatch => {
    axios
      .post("https://map-share-dev-api.herokuapp.com/api/groups", {
        userId,
        groupName
      })
      .then(res => {
        dispatch(addGroupToUser(res.data._id));
      })
      .catch(err => console.log(err.response));
  };
};

export const addGroupToUser = data => {
  return {
    type: keys.ADD_GROUP,
    data
  };
};

export const joinGroupError = data => {
  return {
    type: keys.JOIN_GROUP_ERROR,
    data
  };
};
