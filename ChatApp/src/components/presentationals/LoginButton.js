
import React, { Component } from 'react';

import { Button, Text } from '@shoutem/ui';

class LoginButton extends Component {
    render() {
        return (
            <Button styleName="light" onPress={this.props.onLogin}>
                <Text>Start Chatting</Text>
            </Button>
        )
    }
}

export default LoginButton;
