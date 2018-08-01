import React from 'react';
import { connect } from 'react-redux';
import {ListView, StyleSheet} from 'react-native';
import {Avatar, Colors, Typography, View} from 'react-native-ui-lib';//eslint-disable-line
import autobind from 'react-autobind';

import { selectGroup, fetchGroups } from '../../actions/group_actions';


const mapStateToProps = (state) => ({
    groups: state.groups,
    current_group_id: state.current_group_id
});

const mapDispatchToProps = dispatch => {
  return {
    dispatchSelectGroup: (group_id) =>
      dispatch(selectGroup(group_id)),
    dispatchFetchGroups: () =>
      dispatch(fetchGroups()),
  }
}

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

class GroupList extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {
      dataSource: ds,
    };
    this.props.dispatchFetchGroups().then(result => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(result.groups)
      });
    })
  }

  onItemPressed(item) {
    this.props.dispatchSelectGroup(item.id);
  }

  renderRow(row, index) {
    return (
      <Avatar 
        imageSource={row.icon}
        size={60}
        containerStyle={styles.icon}
        onPress={() => this.onItemPressed(row)} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  icon: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  badgeText: {
    ...Typography.text80,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
