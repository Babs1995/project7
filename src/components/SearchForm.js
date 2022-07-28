import React, { Component } from 'react';
import {
    Form,
    FormGroup,
    FormControl,
    Button
} from 'react-bootstrap';

class SearchForm extends Component {
  
    state = {
      searchText: ''
    }
    
    onSearchChange = e => {
      this.setState({ searchText: e.target.value });
    }
    
    handleSubmit = e => {
      e.preventDefault();
      this.props.onSearch(this.query.value);
      e.currentTarget.reset();
    }
    
    render() {  
      return (
        <Form className="search-form" onSubmit={this.handleSubmit} >
          <FormGroup className="is-hidden" htmlFor="search">Search</FormGroup>
          <FormControl type="search" 
                 onChange={this.onSearchChange}
                 name="search" 
                 ref={(input) => this.query = input}
                 placeholder="Search..." />
          <Button type="submit" id="submit" className="search-button"><i className="material-icons icn-search">search</i></Button>
        </Form>      
      );
    }
  };
  
  export default SearchForm; 