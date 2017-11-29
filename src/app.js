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
                { xValue: "Angular", yValue: 2 },
                { xValue: "Polymer", yValue: 4 },
                { xValue: "Prune", yValue: 9 },
                { xValue: "Babel21", yValue: 12 },
                { xValue: "Babel23", yValue: 18 },
                { xValue: "Srune", yValue: 3 },
            ],
            dataStack:[
                { xValue: "React", yValue: 2,yValue2: 71,yValue3: 3 },
                { xValue: "Angular", yValue: 24,yValue2: 43,yValue3: 3 },
                { xValue: "Polymer", yValue: 12,yValue2: 54,yValue3: 3 },
                { xValue: "Jquery", yValue: 43,yValue2: 17,yValue3: 3 },
                { xValue: "D3", yValue: 24,yValue2: 47,yValue3: 3 },
                { xValue: "Redux", yValue: 21,yValue2: 27,yValue3: 3 },
                { xValue: "Flux", yValue: 54,yValue2: 47,yValue3: 3 },
                { xValue: "Trux", yValue: 34,yValue2: 17,yValue3: 3 },
            ]
        };
    }
    componentDidMount() {
        setTimeout(() => {
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
                    { xValue: "Babel21", yValue: (Math.random())*5 },
                    { xValue: "Babel23", yValue: (Math.random())*5 },
                    { xValue: "Srune", yValue: (Math.random())*5 },
                ],
                dataStack:[
                    { xValue: "React", yValue: 23,yValue2: 21,yValue3: 3 },
                    { xValue: "Angular", yValue: 54,yValue2: 13,yValue3: 13 },
                    { xValue: "Polymer", yValue: 12,yValue2: 54,yValue3: 32 },
                    { xValue: "Jquery", yValue: 53,yValue2: 87,yValue3: 31 },
                    { xValue: "D3", yValue: 24,yValue2: 58,yValue3: 23 },
                    { xValue: "Redux", yValue: 31,yValue2: 27,yValue3: 3 },
                    { xValue: "Flux", yValue: 54,yValue2: 47,yValue3: 54 },
                    { xValue: "Trux", yValue: 14,yValue2: 70,yValue3: 3 },
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
            <div className='cols'>
                <div className='col-md-4'>
                    <h2> The Bar Chart </h2>
                    <Chart
                        type={"bar"}
                        width={300}
                        height={300}
                        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                        showTooltips={true}
                        data={this.state.data}
                    />
                </div>
                <div className='col-md-4'>
                    <h2> The Stacked Bar Chart </h2>
                    <Chart
                        type={"stackedBarChart"}
                        width={300}
                        height={300}
                        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                        showTooltips={true}
                        data={this.state.dataStack}
                        xData={['yValue','yValue2','yValue3']}
                        yVal={'xValue'}
                    />
                </div>
                
            </div>
        </div>
      </div>  
    );
  }
}