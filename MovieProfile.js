//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// create a component
class MovieProfile extends Component {
  render() {
    const props = this.props.navigation.state.params;
    const img = {
      uri: `https://image.tmdb.org/t/p/w1000_and_h563_bestv2/${props.poster_path}`
    }
    return (
      <View>
        <Image style={styles.image} source={img}></Image>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.overview}>{props.overview}</Text>
          <Text style={styles.overview}>❤️ {props.vote_average} average rating</Text>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    width: 400,
    height: 725
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    bottom: 0,
    padding: 15
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10
  },
  overview: {
    color: 'white',
    marginBottom: 10
  }
});

//make this component available to the app
export default MovieProfile;
