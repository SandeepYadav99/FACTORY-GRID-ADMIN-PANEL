import React, {Component} from 'react';
import styles from './Style.module.css';
import {ButtonBase, IconButton} from "@material-ui/core";
import {AddCircleOutline, ControlPointRounded,Edit} from "@material-ui/icons";
import csx from 'classnames';
import QuestionsView from "../Questions/Questions.view";

class TopicView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            active: 0
        };
        this.list = ['Topic Question 1 can be there in 2 lines at max after which it will be truncated','Topic Question 1 can be there in 2 lines at max after which it will be truncated']
        this._handleAddTopic = this._handleAddTopic.bind(this)
    }

    _handleChangeType(index){
        this.setState({
            active: index
        })
    }

    _renderList(){
        const {active} = this.state;
        return this.list.map((val,index) => {
            return (
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <ButtonBase className={index == active ? csx(styles.selected,styles.active) : csx(styles.notSelected)} onClick={this._handleChangeType.bind(this,index)}>
                            <span>{val}</span>
                        </ButtonBase>
                        <IconButton>
                            <Edit color={'primary'} fontSize={'small'}/>
                        </IconButton>
                    </li>
                    <hr className={styles.line}/>
                </ul>
            )
        })
    }

    _renderQuestions(){
        switch(this.state.active){
            case 0 : {
                return <QuestionsView/>
            }
            case 1 : {
                return null
            }

            default: {
                return null;
            }
        }
    }

    _handleAddTopic(type){
        this.props.handleSideToggle(type);
    }

    render() {
        return(
            <div className={styles.outerFlex}>
                <div className={styles.left}>
                    <div className={styles.plainBg}>
                        <div className={styles.upperFlex}>
                            <div className={styles.title}>Browse By Topic</div>
                            <div>
                                <IconButton onClick={this._handleAddTopic.bind(this,'TOPIC')}>
                                    <AddCircleOutline color={'primary'}/>
                                </IconButton>
                            </div>
                        </div>

                        <div>
                            {this._renderList()}
                        </div>
                    </div>
                </div>


                <div className={styles.right}>
                    <div className={styles.plainBg}>
                        <div className={styles.upperFlex}>
                            <div className={styles.title}>Topic Question 1 can be there in 2 lines at max after which it will be truncated</div>
                            <div>
                                <IconButton onClick={this._handleAddTopic.bind(this,'QUESTION')}>
                                    <AddCircleOutline color={'primary'}/>
                                </IconButton>
                            </div>
                        </div>

                        <div>
                            {this._renderQuestions()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopicView
