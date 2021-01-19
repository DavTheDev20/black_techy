import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [post, setPost] = useState({
    title: '',
    content: ''
  });

  const [postsArr, setPostsArr] = useState([]);

  const getPosts = () => {
    axios.get('https://blackandtechy.herokuapp.com/api')
      .then((res) => {
        setPostsArr(res.data);
      })
      .catch(() => alert('Error recieving posts'));
  }

  useEffect(() => {
    getPosts();
  }, [])

  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (name === 'title') {
      setPost((prevValue) => {
        return {
          title: value,
          content: prevValue.content
        }
      });
    } else if (name === 'content') {
      setPost((prevValue) => {
        return {
          title: prevValue.title,
          content: value
        }
      });
    }
  }

  const submit = (event) => {
    event.preventDefault();

    axios({
      url: 'https://blackandtechy.herokuapp.com/api/save',
      method: 'POST',
      data: {
        title: post.title,
        content: post.content
      }
    })
      .then(() => {
        console.log('Sent post to server');
        setPost({
          title: '',
          content: ''
        });
        getPosts();
      })
      .catch(() => {
        console.log('Internal server error');
      });
  }

  const deletePost = ({ target }) => {
    const { value } = target;
    axios({
      url: 'https://blackandtechy.herokuapp.com/api/delete',
      method: 'DELETE',
      data: {
        _id: value
      }
    })
      .then(() => {
        console.log('Delete request sent to server.')
        getPosts();
      })
      .catch(() => console.log('Internal server error'));
  }

  const date = new Date();
  const currentYear = date.getFullYear();


  return (
    <div className="app">
      <div className="wrapper">
        <div className="header">
          <h1>Black And Techy</h1>
          <img
            src="/images/blkpower.png"
            alt="Black Power Fist"
          />
        </div>
        <form onSubmit={submit}>
          <h2>Create Post</h2>
          <input
            type="text"
            name="title"
            placeholder="Title"
            autoComplete="off"
            onChange={handleChange}
            value={post.title}
          />
          <br />
          <textarea
            className="content-section"
            name="content"
            placeholder="content"
            rows={10}
            cols={30}
            onChange={handleChange}
            value={post.content}
          />
          <br />
          <button className="submit-button">Submit Post</button>
        </form>
        <h2 className="posts-heading">Posts</h2>
        <hr />
        <div className="posts">
          {postsArr.map((post, index) => {
            return (
              <div className="post" key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <button className="delete-button" value={post._id} onClick={deletePost}>Delete Post</button>
              </div>
            );
          })}
        </div>
        <div className="push"></div>
      </div>
      <footer>© Davin Reid {currentYear}</footer>
    </div>
  )
}

export default App;
