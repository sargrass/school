
import React, { Component } from 'react';
import {
    ListView, Text, Row, Image,
    View, Subtitle, Caption, Heading
} from '@shoutem/ui';
import moment from 'moment';

const Message = ({ msg }) => (
    <Row>
        <Image styleName="small-avatar top"
               source={{ uri: msg.author ? msg.author.avatar : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png'}} />
        <View styleName="vertical">
            <View styleName="horizontal space-between">
                <Subtitle>{msg.author ? msg.author.name : 'Unknown'}</Subtitle>
                <Caption>{moment(msg.time).from(Date.now())}</Caption>
            </View>
            <Text styleName="multiline">{msg.text}</Text>
        </View>
    </Row>
);

const MessageList = ({ messages, onLayout }) => (
    <ListView data={messages}
              autoHideHeader={true}
              renderRow={msg => <Message msg={msg} />}
              onLayout={onLayout}
              />
);

export default MessageList;
