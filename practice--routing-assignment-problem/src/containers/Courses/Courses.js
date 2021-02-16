import React, {Component} from 'react';

import {Link} from 'react-router-dom';
import {Route} from 'react-router';

import './Courses.css';

import Course from '../Course/Course';


class Courses extends Component {
  state = {
    courses: [
      {id: 1, title: 'Angular - The Complete Guide'},
      {id: 2, title: 'Vue - The Complete Guide'},
      {id: 3, title: 'PWA - The Complete Guide'}
    ]
  }

  courseSelectedHandler = () => {
    console.log(this.props);

  }

  render() {

    // I HATE THIS STUPID BUG WTF?!???
    let url = this.props.match.url;
    if (!url.endsWith('/')) {
      url += '/';
    }

    return (
      <div>
        <h1>Amazing Udemy Courses</h1>
        <section className="Courses">
          {
            this.state.courses.map(course =>
              <Link
                to={url + course.id + '/' + course.title + '/'}
                key={course.id}>
                <article
                  className='Course'
                  onClick={this.courseSelectedHandler}>
                    {course.title}
                </article>
              </Link>
            )
          }
        </section>

        <Route
          path={url + ':id/:title'}
          component={Course}/>

      </div>
    );
  }
}

export default Courses;