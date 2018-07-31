import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native-ui-lib';//eslint-disable-line

import ChannelList from '../components/containers/channelListUI'; 
import GroupList from '../components/containers/groupListUI'; 


class LeftDrawer extends React.Component {
  render() {
    return (
      <View useSafeArea style={styles.rowContainer}>
        <GroupList style={styles.groupContainer} />
        <ChannelList style={styles.channelContainer} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  groupContainer: {
    flex: 0
  },
  channelContainer: {
    flex: 1,
  },
});

export default LeftDrawer;
