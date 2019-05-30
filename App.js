/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import NetInfo from "@react-native-community/netinfo";

export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      Internet: false
    };

    NetInfo.fetch().then(state => {
      this.setState({ Internet: state.isConnected });
    });
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({ Internet: state.isConnected });
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.Internet ? (
          <WebView
            source={{
              uri: "https://www.google.com/"
            }}
          />
        ) : (
          <Text>Internet is not connected</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
