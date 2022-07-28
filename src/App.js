import  React, { Component } from 'react';
// import { Container, Carousel } from 'react-bootstrap';
import axios from 'axios'; 
import SearchForm from './components/SearchForm';
import Results from './components/Results';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      photos: [],
      loading: true
    };
  } 
  componentsDidMount(){
    this.performSearch();
  }

  performSearch = (query ='cats')=>{
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then(response => {
      this.setState({
        photos: response.data.data,
        loading: false
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }
  render() { 
    console.log(this.state.photos);
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">Search App</h1>
            <SearchForm onSearch={this.performSearch}/>  
            <Results />    
          </div>   
        </div>    
        <div className="main-content">
        {
          (this.state.loading)
            ? <p>Loading...</p>
            : <Results data={this.state.photos}/>

        }
        </div>
      </div>
    );
  }
}


export default App;