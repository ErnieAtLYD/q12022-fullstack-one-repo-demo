import { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    shoes: [],
  };

  componentDidMount() {
    axios.get('/api/v1/shoes').then((response) => {
      console.log(response);
      this.setState({ shoes: response.data });
    });
  }

  render() {
    return (
      <main className="container">
        <h1>Client app</h1>
        <div className="grid">
          {this.state.shoes.map((shoe) => (
            <article key={shoe.id}>
              <h2>{shoe.brand}</h2>
              <p>{shoe.model}</p>
              <p>{shoe.color}</p>
            </article>
          ))}
        </div>
        <h2>Static Assets</h2>
        <img
          src="http://localhost:5500/images/dog.jpg"
          width="300"
          alt="A dog"
        />
      </main>
    );
  }
}

export default App;
