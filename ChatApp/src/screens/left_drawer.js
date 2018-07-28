import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

class LeftDrawer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
      	  Hello
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  }
});

export default LeftDrawer;
