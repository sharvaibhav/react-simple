import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      // Add your component markup and other subcomponent references here.
      <div className='application container-fluid'>
        <div className='row header'>
            <div className="col-md-4">Left section of Header</div>
            <div className="col-md-4 col-md-offset-4">Right Section of the Header</div>
        </div>
        <div className='row middle-section'>
            <h2> The navigation section </h2>
        </div>
      </div>  
    );
  }
}