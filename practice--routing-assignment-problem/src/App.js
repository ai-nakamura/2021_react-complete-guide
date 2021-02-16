import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';

import Course from './containers/Course/Course';
import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';


class App extends Component {
  render() {

    const done = {
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid'
    }

    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <ul>
              <li><NavLink
                to='/users/'
                exact>
                Users
              </NavLink></li>
              <li><NavLink
                to='/courses/'
                exact>
                Courses
              </NavLink></li>
            </ul>
          </header>

          <Switch>
            <Route path='/users' exact component={Users}/>
            {/*<Route path='/courses/:id/:title' component={Course}/>*/}
            <Route path='/courses' component={Courses}/>
            <Redirect from='/all-courses' to='courses'/>
            <Route render={() => <p>404 not found</p>}/>
          </Switch>

          <ol style={{textAlign: 'left'}}>
            <li style={done}>Add Routes to load "Users" and "Courses" on different pages (by entering a URL, without
              Links)
            </li>
            <li style={done}>Add a simple navigation with two links => One leading to "Users", one leading to
              "Courses"
            </li>
            <li style={done}>Make the courses in "Courses" clickable by adding a link and load the "Course" component in
              the place of "Courses" (without passing any data for now)
            </li>
            <li style={done}>Pass the course ID to the "Course" page and output it there
            </li>
            <li style={done}>Pass the course title to the "Course" page - pass it as a param or score bonus points by passing it as
              query params (you need to manually parse them though!)
            </li>
            <li style={done}>Load the "Course" component as a nested component of "Courses"
            </li>
            <li style={done}>Add a 404 error page and render it for any unknown routes</li>
            <li style={done}>Redirect requests to /all-courses to /courses (=> Your "Courses" page)</li>
          </ol>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
