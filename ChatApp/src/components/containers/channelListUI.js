import React from 'react';
import {ListView, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Typography, View, Text} from 'react-native-ui-lib';//eslint-disable-line
import autobind from 'react-autobind';

import channels from '../../data/channels';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

class ChannelList extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(channels),
    };
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
    paddingVertical: 16, 
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

export default ChannelList;
