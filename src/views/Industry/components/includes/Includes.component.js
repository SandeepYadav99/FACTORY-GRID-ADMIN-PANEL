/**
 * Created by charnjeetelectrovese@gmail.com on 5/13/2020.
 */
import React, {Component} from 'react';
import IncludeFields from './IncludeFields.component';

const TEMP_OBJ = {
    is_included: false,
    title: '',
    apply:''
};

class IncludeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: [JSON.parse(JSON.stringify(TEMP_OBJ))],
        };
        this._changeData = this._changeData.bind(this);
        this._handlePress = this._handlePress.bind(this);
        this.getState = this.getState.bind(this);
    }

    getState() {
        return this.state.fields;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const newData = this.props.data;
        const oldData = prevProps.data;
        if (oldData == null && newData) {
            this.setState({
                fields: newData
            })
        }
    }

    componentDidMount() {
        const { data } = this.props;
        if (data) {
            this.setState({
                fields: data
            })
        }
    }

    _changeData(index, data) {
        const tempData = this.state.fields;
        tempData[index] = {...tempData[index], ...data};
        this.setState({
            fields: tempData
        });
    }

    _handlePress(type, index = 0) {
        const oldState = this.state.fields;
        if (type == 'ADDITION') {
            oldState.push(JSON.parse(JSON.stringify(TEMP_OBJ)));
        } else {
            oldState.splice(index, 1);
        }
        this.setState({
            fields: oldState
        });
    }

    _renderFields() {
        return this.state.fields.map((val, index) => {
            return (
                <IncludeFields changeData={this._changeData} handlePress={this._handlePress}
                               data={val} index={index}/>
            )
        });
    }

    render() {
        return (
            <>
                {this._renderFields()}
            </>
        )
    }
}

export default IncludeForm;
