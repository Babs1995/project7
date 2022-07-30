import  React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from 'axios'; 
import apiKey from './config';
import SearchForm from './component/SearchForm';
import Results from './component/Results';
import NotFound from './component/NotFound';
import Nav from './component/Nav';


class App extends Component {
  
  constructor() {
    super();
    this.state = {
      photos: [],
      cats: [],
      autumn: [],
      coffee: [],
      loading: true
    };
  } 
  componentDidMount(){
    this.performSearch();
    this.performSearch('cats'); 
    this.performSearch('autumn'); 
    this.performSearch('coffee'); 
  }

  performSearch = (query ='cats')=>{
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&user_id=&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then((data) => {
      if (query === 'cats') {
        this.setState({cats: data.photos.photo, loading: false});
      } else if (query === 'autumn') {
        this.setState({autumn: data.photos.photo, loading: false});
      } else if (query === 'coffee') {
        this.setState({coffee: data.photos.photo, loading: false});
      } else {
        this.setState({
          photos: data.photos.photo,
          loading: false,
          query: query
        });
      }
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
    };

render(){
  return (
    <BrowserRouter>
      <SearchForm onSearch={this.performSearch} />
      <Nav />
      <div className="photo-container">
      (this.state.loading)
      ?<p>Loading...</p>
      :<Switch>   

        <Route exact path="/" component={() => <Results to="/cats" /> } />
        <Route path="/cats" component={() => <Results query="cats" title="cats" data={this.state.cats} />} />
        <Route path="/autumn" component={() => <Results query="autumn" title="autumn" data={this.state.autumn} />} />
        <Route path="/coffee" component={() => <Results query="coffee" title="coffee" data={this.state.coffee} />} />
        <Route path="/search/:query/" component={() => <Results query={this.state.query} data={this.state.photos} title= {this.state.query}/>} />
        <Route component={NotFound} />

      </Switch>
      </div>
    </BrowserRouter>
  );
  }
}
export default App;
