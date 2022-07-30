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
    .then(response => { 
console.log(response)
      if (query === 'cats') {
        this.setState({cats: response.data.photos.photo});
      } else if (query === 'autumn') {
        this.setState({autumn: response.data.photos.photo});
      } else if (query === 'coffee') {
        this.setState({coffee: response.data.photos.photo});
      } else {
        this.setState({photos:response.data.photos.photo});
        }
   })
    
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
    };

 // routes attached to paths to render image selected 
 render(){ 
  console.log(this.state.photos);
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
