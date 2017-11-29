import React, { Component } from 'react';
import Chart from '../src/components/Charts/Chart';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                { xValue: "React", yValue: 2 },
                { xValue: "Relay", yValue: 12 },
                { xValue: "GraphQL", yValue: 5 },
                { xValue: "Radium", yValue: 7 },
                { xValue: "Babel", yValue: 5 },
                { xValue: "Angular", yValue: (Math.random())*5 },
                { xValue: "Polymer", yValue: (Math.random())*5 },
                { xValue: "Prune", yValue: (Math.random())*5 },
                { xValue: "Babel", yValue: (Math.random())*5 },
                { xValue: "Babel", yValue: (Math.random())*5 },
                { xValue: "Srune", yValue: (Math.random())*5 },
            ]
        };
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({
                data: [
                    { xValue: "React", yValue: (Math.random() )*2 },
                    { xValue: "Relay", yValue: (Math.random() ) * 8 },
                    { xValue: "GraphQL", yValue: (Math.random() ) * 15 },
                    { xValue: "Radium", yValue: (Math.random() )*27 },
                    { xValue: "Babel", yValue: (Math.random())*5 },
                    { xValue: "Angular", yValue: (Math.random())*5 },
                    { xValue: "Polymer", yValue: (Math.random())*5 },
                    { xValue: "Prune", yValue: (Math.random())*5 },
                    { xValue: "Babel", yValue: (Math.random())*5 },
                    { xValue: "Babel", yValue: (Math.random())*5 },
                    { xValue: "Srune", yValue: (Math.random())*5 },
                ]
            })
        }, 6000);
    }
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
            <Chart
                    type={"bar"}
                    width={300}
                    height={300}
                    margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                    showTooltips={true}
                    data={this.state.data}
                />
        </div>
      </div>  
    );
  }
}