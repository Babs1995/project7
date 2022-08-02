import React from 'react'
import Photo from './Photo';
import NotFound from './NotFound';
// import Nav from './Nav';
// import SearchForm from './SearchForm';

//photo container that maps over array if a photo is found return the key and results otherwise return not found component
const Results = (props) => {
    // console.log(this.props);
    const results = props.data;
// console.log(results);
  let gifs;
  
  if(results.length > 0) {
    gifs = results.map(gif => {
      return(
        <Photo 
        key={gif.id} 
        url={`https://live.staticflickr.com/${gif.server}/${gif.id}_${gif.secret}_z.jpg`} />
      );
     
    });

  } else {
     gifs = <NotFound/>
 
  } 
  return (
    <div className="results-container">

      
    <h2>Results</h2>
    <ul>
      { gifs }
    </ul>
  </div>
  )
}

export default Results;