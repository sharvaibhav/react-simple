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
            ]
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: [
                    { xValue: "React", yValue: 2 },
                    { xValue: "Relay", yValue: 8 },
                    { xValue: "GraphQL", yValue: 15 },
                    { xValue: "Radium", yValue: 27 },
                    { xValue: "Babel", yValue: 5 },
                ]
            })
        }, 3000);
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