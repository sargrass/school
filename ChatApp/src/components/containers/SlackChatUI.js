
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative, { Platform } from 'react-native';
import PropTypes from 'prop-types';

import { View, Title, Screen } from '@shoutem/ui';
import { GiftedChat } from 'react-native-gifted-chat';

import { sendMessage } from '../../actions/chatroom_actions';
import SlackMessage from '../presentationals/SlackMessage';

const mapStateToProps = (state) => ({
    user: state.user,
    messages: state.chatroom.messages,
    isFetching: state.chatroom.meta.isFetching
});

const mapDispatchToProps = dispatch => {
  return {
    dispatchSendMessage: (msg, user) =>
      dispatch(sendMessage(msg, user))
  }
}

class SlackChatUI extends Component {
    onSend(messages = []) {
        console.log('message length: ' + messages.length);
        messages.forEach(msg => {
            this.props.dispatchSendMessage(msg, this.props.user);
        });
    }

    renderMessage(props) {
        return (
          <SlackMessage {...props} />
        );
    }

    render() {
        return (
          <GiftedChat
            messages={this.props.messages}
            onSend={messages => this.onSend(messages)}
            user={{
                _id: this.props.user._id
            }}
            renderMessage={this.renderMessage}
            renderAvatarOnTop={true}
          />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SlackChatUI);
