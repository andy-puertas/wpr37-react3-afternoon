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
    this.searchFn = this.searchFn.bind( this );
  }
  
  componentDidMount() {
   let promise = axios.get(`${this.state.baseUrl}/posts`)
   promise.then((res) => {
     this.setState({
       posts: res.data
     })
   })

  }

  updatePost(id, text) {
    let promise = axios.put(`${this.state.baseUrl}/posts?id=${id}`, { text } )
    promise.then((res) => {
      this.setState({
        posts: res.data
      })
    })
  
  }

  deletePost( id ) {
    let promise = axios.delete(`${this.state.baseUrl}/posts?id=${id}`)
    promise.then((res) => {
      this.setState({
        posts: res.data
      })
    })

  }

  createPost( text ) {
    let promise = axios.post(`${this.state.baseUrl}/posts`, { text })
    promise.then((res) => {
      this.setState({
        posts: res.data
      })
    })

  }

  searchFn( text ) {
    console.log(text)
    let promise = axios.get(`${this.state.baseUrl}/posts/filter?text=${text}`)
    promise.then((res) => {
      this.setState({
        posts: res.data
      })
    })
  }

  render() {
  const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header searchFn={ this.searchFn}/>

        <section className="App__content">

          <Compose createPostFn={ this.createPost } />
          {
          posts.map( post => 
            (<Post key={ post.id }
                   text={ post.text }
                   date={ post.date }
                   id={ post.id }
                   updatePostFn={ this.updatePost }
                   deletePostFn={ this.deletePost }
                   />
            ))
          }
        </section>
      </div>
    );
  }
}

export default App;
