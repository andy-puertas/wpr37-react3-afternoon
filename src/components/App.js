import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      baseUrl: 'https://practiceapi.devmountain.com/api'
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
   let promise = axios.get(`${this.state.baseUrl}/posts`)
   promise.then((res) => {
     this.setState({
       posts: res.data
     })
   })

  }

  updatePost() {
  
  }

  deletePost() {

  }

  createPost() {

  }

  render() {
  const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose />
          {
          posts.map( post => 
            (<Post key={ post.id }
                   text={ post.text }
                   date={ post.date } />
            ))
          }
        </section>
      </div>
    );
  }
}

export default App;
