
import React, { Component } from 'react';

import { TextInput } from '@shoutem/ui';


class Input extends Component {
    onChangeText = (text) => {
        if (this.props.textChangeAction) {
            this.props.textChangeAction(text);
        }
    }

    onSubmitEditing = () => {
        if (this.props.submitAction) {
            this.props.submitAction(this.props.text);
        }
    }

    render() {
        return (
            <TextInput placeholder={this.props.placeholder}
                       onChangeText={this.onChangeText}
                       onSubmitEditing={this.onSubmitEditing}
                       value={this.props.text}
                       ref="input"/>
        )
    }
}

export default Input;
