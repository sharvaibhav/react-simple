import React from "react";
import homeIcon from './logo.png';
export default class Header extends React.Component {
    constructor(props) {
        super(props);

        
    }

    componentDidMount() {
        
    }


    render() {
        return (<div className='row header'>
        <img src={homeIcon}/>
                    <div className="col-md-4">Left section of Header</div>
                    <div className="col-md-4 col-md-offset-4">Right Section of the Header</div>
                </div>);
    }
}
