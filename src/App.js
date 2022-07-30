import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import apiKey from "./config";
import SearchForm from "./component/SearchForm";
import Results from "./component/Results";
import NotFound from "./component/NotFound";
import Nav from "./component/Nav";

class App extends Component {
  constructor() {
    super();
    this.state = {
      gifs: [],
      cats: [],
      autumn: [],
      coffee: [],
      sunset: [],
      query: "",
      loading: true
    };
  }
  componentDidMount() {
    this.performSearch("sunset");
    this.performSearch("cats");
    this.performSearch("autumn");
    this.performSearch("coffee");
  }

  performSearch = (query = "") => {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        if (query === "cats") {
          this.setState({ 
            cats: response.data.photos.photo,
            loading: false
         });
          console.log(response.data.photos.photo);
        } else if (query === "autumn") {
          this.setState({ autumn: response.data.photos.photo, 
            loading: false
          });
        } else if (query === "coffee") {
          this.setState({ coffee: response.data.photos.photo,
            loading: false
          });
        } else if (query === "sunset") {
          this.setState({ sunset: response.data.photos.photo,
            loading: false
          });
        }else {
          this.setState({
             gifs: response.data.photos.photo, 
             query: query,
             loading: false
            });
          console.log(response.data.photos.photo);
        }
      })

      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
      this.setState({loading:false})
  };

  // routes attached to paths to render image selected
  render() {
    // console.log(this.state.photos);
    return (
      <BrowserRouter>
        <SearchForm onSearch={this.performSearch} />
        <Nav />
        <div className="photo-container">
        {this.state.loading ? (
          <p>Loading...</p>
        ):
         
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Results data={this.state.sunset} />}
              // element={ <Results data={this.state.sunset} title={this.state.query} query={this.state.query} /> }

            />
            <Route
              exact
              path="/cats"
              render={(props) =>
                <Results
                  data={this.state.cats}
                  title={this.state.query}
                  query={this.state.query}
                />
              }
            />
            {/* render={() => <Results query="cats" title="cats" data={this.state.cats} />} /> */}
            <Route
              path="/autumn"
              render={() => (
                <Results
                  query="autumn"
                  title="autumn"
                  data={this.state.autumn}
                />
              )}
            />
            <Route
              path="/coffee"
              render={() => (
                <Results
                  query="coffee"
                  title="coffee"
                  data={this.state.coffee}
                />
              )}
            />
            <Route
            exact
              path=":query"
              render={() => (
                <Results query={this.state.query} data={this.state.gifs} title={this.state.query} />
              )}
            />
            <Route render={NotFound} />
          </Switch>
        }
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
