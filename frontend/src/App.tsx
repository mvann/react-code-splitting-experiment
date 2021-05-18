import React, { Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
const LazyLoaded = React.lazy(() => import('./LazyLoaded'));
const NotRoute = Route as any;

function Login({isLoggedIn, toggleLogin}: any) {
  return (
    <div className="Login">
      This is the login page. You are currently {isLoggedIn ? "logged in" : "not logged in"}.
      <br/>
      <button onClick={toggleLogin}>
        Toggle Login
      </button>
    </div>
  );
}

interface AppProps{}

const ProtectedRoute:any = ({condition, children, rest}: any) => {
  console.log(`Attempting to access a protected route. The conditions is ${condition}`);
  
  return(
    <Route
      {...rest}
      render={({ location }) =>
        condition ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    >  
    </Route>
  );
};

const App: React.FC<AppProps> = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState<Boolean>(false); 

  const handleEnterSecuredComponent = (nextState: any, replace: any) => {
    console.log("entereed");
    if (!isLoggedIn){
      console.log("Not Logged in, redirecting to /login.")
      replace("/login");
    }
  };

  return (
    <div className="App">
      <Router>
        <nav>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/secured">Secured</Link>
          </li>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route
              key="home"
              exact path="/"
            >
              <div>
                Home
              </div>
            </Route>
            <Route
              key="login"
              path="/login"
            >
              <Login
                isLoggedIn={isLoggedIn}
                toggleLogin={() => {setIsLoggedIn(!isLoggedIn)}}
              />
            </Route>
            <ProtectedRoute 
              condition={isLoggedIn} 
              path="/secured" 
            >
              <LazyLoaded />
            </ProtectedRoute>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
