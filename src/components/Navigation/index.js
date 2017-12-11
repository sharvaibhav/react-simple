import React from "react";

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        
    }

    componentDidMount() {
        
    }


    render() {
        return (<div className='row navigation'>
                    <ul>
                        <li> Bar Charts   </li>
                        <li>  Pie Charts  </li>
                        <li>  Mixed Charts  </li>
                        <li>  Imaginative Charts  </li>
                    </ul>

                </div>);
    }
}
