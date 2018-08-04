import React from 'react';
import { connect } from 'react-redux';
import {ListView, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Typography, View, Text, Modal} from 'react-native-ui-lib';//eslint-disable-line
import autobind from 'react-autobind';

import { selectChannel, fetchChannels } from '../../actions/channel_actions';


const mapStateToProps = (state) => {
  var props = {
    title: '',
    channels: {},
    current_channel_id: state.chatroom.channel.current_channel_id
  };
  if (state.chatroom.group.current_group_id) {
    if (state.chatroom.group.groups) {
      for (i in state.chatroom.group.groups) {
        group = state.chatroom.group.groups[i]
        if (group.id == state.chatroom.group.current_group_id) {
          props.title = group.name;
          break;
        }
      }
    }
    if (state.chatroom.channel.group_to_channels) {
      props.channels = state.chatroom.channel.group_to_channels[state.chatroom.group.current_group_id];
    }
  }
  
  console.log(state);
  return props;
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchSelectChannel: (channel_id) =>
      dispatch(selectChannel(channel_id)),
    dispatchFetchChannels: () =>
      dispatch(fetchChannels()),
  }
}

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

class ChannelList extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {
      dataSource: ds,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.channels !== this.props.channels) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.channels)
      });
    }
  }

  onItemPressed(row) {
    console.log(row); // eslint-disable-line
  }

  renderSectionHeader(sectionData, sectionID) {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>{sectionID}</Text>
      </View>
    );
  }

  renderSeparator(sId, id) {
    return (<View style={styles.separator} key={`s${sId}_${id}`} />);
  }

  renderRow(row, index) {
    return (
      <TouchableOpacity
        testID={index}
        style={styles.row}
        onPress={() => this.onItemPressed(row)}
      >
        <Text style={styles.rowText}>
          {row.title}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal.TopBar
          title={this.props.title}
          cancelButtonProps={{
            disabled: true,
          }}
          doneButtonProps={{
            disabled: true,
          }}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          renderSectionHeader={this.renderSectionHeader}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: Colors.dark80
  },
  row: {
    paddingVertical: 15, 
    paddingLeft: 12,
    justifyContent: 'center',
  },
  rowText: {
    ...Typography.text70,
  },
  separator: {
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.dark70,
  },
  sectionContainer: {
    backgroundColor: Colors.purple30,
    paddingVertical: 8,
    paddingLeft: 4,
  },
  sectionText: {
    ...Typography.text70,
    color: Colors.white,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
