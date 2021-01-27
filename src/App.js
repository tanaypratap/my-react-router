import React, { useEffect, useState } from "react";
import "./styles.css";

function RoutePubSub() {
  let subscribers = [];

  function subscribe(cb) {
    subscribers.push(cb);
  }

  function publish() {
    subscribers.forEach((cb) => cb());
  }

  return { subscribe, publish };
}

const routerPubSub = RoutePubSub();

function Router({ children }) {

  const getCurrentRoute = () => window.location.pathname;
  const currentPath = getCurrentRoute();
  const [route, setRoute] = useState(currentPath);

  /**
   * subscribe to changes and update route 
   * whenever there's a click on Link 
   */
  useEffect(() => {
    routerPubSub.subscribe(() => setRoute(getCurrentRoute()));
  }, []);

  return <div>{children.find((child) => child.props.path === route)}</div>;
}

function Link({ children, to }) {
  return (
    <span
      style={{
        textDecoration: "underline",
        cursor: "pointer",
        padding: "1rem"
      }}
      onClick={changeRoute}
    >
      {children}
    </span>
  );

  function changeRoute() {
    window.history.pushState({}, "", to);
    routerPubSub.publish();
  }
}

function Home() {
  return <div>Home </div>;
}

function About() {
  return <div>About </div>;
}

export default function App() {
  return (
    <div className="App">
      <nav style={{ textAlign: "left" }}>
        <Link to="/"> Home </Link>
        <Link to="/about"> About </Link>
      </nav>
      <Router>
        <Home path="/" />
        <About path="/about" />
      </Router>
    </div>
  );
}
