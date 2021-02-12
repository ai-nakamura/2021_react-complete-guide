import React, {Component} from 'react';

import axios from '../../../axios';

import Post from '../../../components/Post/Post';

import './Posts.module.css';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
  state = {
    posts: []
  }

  componentDidMount(prevProps, prevState, snapshot) {
    console.log(this.props);
    axios
      .get('/posts')
      .then(response => {
        // console.log(response);
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'me'
          }
        });
        this.setState({posts: updatedPosts});
      })
      .catch(error => {
        console.log(error);
        // this.setState({error: true});
      });
  }

  postSelectedHandler = id => {
    // these both work
    // this.props.history.push({pathname: '/posts/' + id});
    this.props.history.push('/posts/' + id);

    // this.setState({
    //   selectedPostId: id
    // });
  }

  render() {
    let posts = <p style={{textAlign: 'center'}}>something went wrong!</p>

    if (!this.state.error) {


      posts = this.state.posts.map(post => {
        return (
          // <Link
          //   to={'/posts/' + post.id}
          //   key={post.id}> <Post ...> </Link>
          <Post key={post.id}
                title={post.title}
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)}/>
        );
      });
    }
    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <Route path={this.props.match.url + '/:id'}      exact component={FullPost} />
      </div>
    );
  }

}

export default Posts;
