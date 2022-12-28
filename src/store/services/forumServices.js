import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {setPosts} from '../reducers/forumReducer';
import {STRIX_URL} from './services';

export const getForumPostsAsync = createAsyncThunk(
  'forums/getForumPostsAsync',
  ({dispatch}) => {
    return axios
      .get(STRIX_URL + '/api/forums')
      .then(function (response) {
        //console.log(' getForumPostsAsync response: data', response);
        dispatch(setPosts(response.data));
      })
      .catch(function (error) {
        console.log('getForumPostsAsync error: ', error);
      });
  },
);

export const postForumPostAsync = createAsyncThunk(
  'forums/postForumPostAsync',
  ({name, content, likes, date, comments, userId}) => {
    return axios
      .post(STRIX_URL + '/api/forums', {
        name: name,
        content: content,
        likes: likes,
        date: date,
        comments: comments,
        userId: userId,
      })
      .then(function (response) {
        console.log('response: postForumPostAsync', response);
      })
      .catch(function (error) {
        console.log('error: postForumPostAsync', error);
      });
  },
);

export const postCommentAsync = createAsyncThunk(
  'forums/postCommentAsync',
  ({name, content, id}) => {
    console.log('id: ', id);
    return axios
      .put(`${STRIX_URL}/api/forums/comments/${id}`, {
        name: name,
        content: content,
      })
      .then(function (response) {
        console.log('response: postCommentAsync', response);
      })
      .catch(function (error) {
        console.log('error: postCommentAsync', error);
      });
  },
);

export const updatePostLikesAsync = createAsyncThunk(
  'forums/updatePostLikesAsync',
  id => {
    console.log(' updatePostLikesAsync id: ', id);
    return axios
      .put(`${STRIX_URL}/api/forums/likes/${id}`, {
        likes: 1,
      })
      .then(function (response) {
        console.log('response: updatePostLikesAsync', response);
      })
      .catch(function (error) {
        console.log('error: updatePostLikesAsync', error);
      });
  },
);
