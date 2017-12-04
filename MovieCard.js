//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';

// create a component
class MovieCard extends Component {
  render() {

    const img = {
      uri: `https://image.tmdb.org/t/p/w1000_and_h563_bestv2/${this.props.poster_path}`
    }

    return (
      <TouchableHighlight onPress={this.props.loadProfile}>
        <View style={styles.container}>
          <Image style={{width:400, height: 150}} source={img} />
          <Text style={styles.textContainer}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    bottom: 0,
    width: 400,
    height: 30,
    fontSize: 24,
    textAlign: 'center',
    color: 'white'
  }
});

//make this component available to the app
export default MovieCard;
