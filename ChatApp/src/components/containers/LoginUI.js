
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { Screen, Title, Text, Divider, Button, Spinner } from '@shoutem/ui';

import Input from '../presentationals/Input';
import LoginButton from '../presentationals/LoginButton';
import { login, setUserName, setUserAvatar, checkUserExists } from '../../actions/user_actions';

const mapStateToProps = (state) => ({
    authorizing: state.user.authorizing,
    name: state.user.name,
    avatar: state.user.avatar
});

const mapDispatchToProps = dispatch => {
  return {
    dispatchCheckUserExists: () =>
      dispatch(checkUserExists()),
    dispatchLogin: () =>
      dispatch(login()),
    dispatchSetUserName: (text) =>
      dispatch(setUserName(text)),
    dispatchSetUserAvatar: (text) =>
      dispatch(setUserAvatar(text))
  }
}


class LoginUI extends Component {
    componentDidMount() {
      this.props.dispatchCheckUserExists();
    }

    render() {
        return (
            <Screen style={{alignItems: 'center', justifyContent: 'center'}}>
                <Title>Who are you?</Title>
                <Divider />

                <Input placeholder="Your name here"
                       text={this.props.name}
                       textChangeAction={this.props.dispatchSetUserName}
                       ref="username"/>
                <Divider />

                {this.props.authorizing ? <Spinner /> 
                  : <LoginButton onLogin={this.props.dispatchLogin}/>}
            </Screen>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginUI);
