import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [post, setPost] = useState({
    title: '',
    content: ''
  });

  const [postsArr, setPostsArr] = useState([]);

  const getPosts = () => {
    axios.get('http://localhost:8080/api')
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
      url: 'http://localhost:8080/api/save',
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
      url: 'http://localhost:8080/api/delete',
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


  return (
    <div className="app">
      <div className="header">
        <h1>Black And Techy</h1>
      </div>
      <form onSubmit={submit}>
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
          name="content"
          placeholder="content"
          rows={7}
          onChange={handleChange}
          value={post.content}
        />
        <br />
        <button>Submit Post</button>
      </form>
      <div className="posts">
        {postsArr.map((post, index) => {
          return (
            <div key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <button value={post._id} onClick={deletePost}>Delete Post</button>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default App;
