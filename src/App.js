import React from "react";
import "./App.css";

// userId: 1,
// id: 1,
// title: "quidem molestiae enim"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      pictures: [],
      thumbnail: []
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then(res => res.json())
      .then(albums => {
        this.setState({ albums });
      });
  }

  handleChange(e) {
    console.log(e.target.value);
    fetch(
      `https://jsonplaceholder.typicode.com/photos?albumId=${e.target.value}`
    )
      .then(res => res.json())
      .then(pictures => {
        this.setState({ pictures });
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Select an album:</h1>
        <select onChange={this.handleChange.bind(this)} className="albumSelect">
        <option label="Choose an Album..."></option>
          {this.state.albums.map(album => {
            return <option value={album.id}>{album.title}</option>;
          })}
        </select>
        <div>
          {this.state.pictures.map(picture => {
            return <a href={picture.url}><img src={picture.thumbnailUrl}></img></a>;
          })}
        </div>
      </div>
    );
  }
}

export default App;