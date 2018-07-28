import React from 'react';
import { connect } from 'react-redux';

import SlackChatUI from '../components/containers/SlackChatUI';
import LoginUI from '../components/containers/LoginUI';

const mapStateToProps = (state) => ({
    authorized: state.user.authorized
});

class CenterScreen extends React.Component {
  render() {
    if (this.props.authorized) {
    	this.props.navigator.setDrawerEnabled({
	      side: 'left',
	      enabled: true
	    }); 
	    this.props.navigator.setDrawerEnabled({
	      side: 'right',
	      enabled: true
	    }); 
	    this.props.navigator.toggleNavBar({
	      to: 'shown',
	      animated: false
	    });
        return (<SlackChatUI />);
    } else{
    	this.props.navigator.setDrawerEnabled({
	      side: 'left',
	      enabled: false
	    }); 
	    this.props.navigator.setDrawerEnabled({
	      side: 'right',
	      enabled: false
	    }); 
	    this.props.navigator.toggleNavBar({
	      to: 'hidden',
	      animated: false
	    });
    	return (<LoginUI />);
    }
  }
}

export default connect(mapStateToProps)(CenterScreen);
