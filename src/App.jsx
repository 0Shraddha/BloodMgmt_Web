import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './Layout/Layout';

function App() {
  return (
    <Router>  {/* Wrap the entire app with Router */}
      <Layout />  {/* The Layout component contains routes */}
    </Router>
  );
}

export default App;
