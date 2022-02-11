import React, { Component } from 'react';
import styles from './Style.module.css';
import Accordion from "../../../../components/Accordion/Accordion.component";

class QuestionsView extends Component{
    constructor(props) {
        super(props);
    }

    _renderFAQ(){
        return  null
        return(
            ['Topic Question 1 can be there in 2 lines at max after which it will be truncated','Topic Question 1 can be there in 2 lines at max after which it will be truncated'].map((val)=> {
                return(
                    <div>
                        <Accordion title={val} initial="hide">
                            Answer the questions shall be shown here under the question when expanded with an indentation
                        </Accordion>
                    </div>
                )
            })
        )
    }

    render() {
        return (
            <div>
                <div>
                    {this._renderFAQ()}
                </div>
            </div>
        )
    }
}

export default QuestionsView
