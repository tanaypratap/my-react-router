import "./styles.css";

function Router({ children }) {
  return <div> {
    children.find(route => route.props.path === window.location.pathname)
  } </div>;
}

function Home() {
  return (<div>Home </div>)
}

function About() {
  return (<div>About </div>)
}


export default function App() {
  return (
    <div className="App">
      <Router> 
        <Home path="/" />
        <About path="/about"/>
      </Router>
    </div>
  );
}
