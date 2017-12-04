import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MovieList from './MovieList.js';
import MovieProfile from './MovieProfile.js'
import {StackNavigator} from 'react-navigation';

const apiKey = 'c80d4ec3595ddc1835ea6ef7e2caf0f9';

const Routes = StackNavigator({
  MovieList: {screen: MovieList},
  MovieProfile: {screen: MovieProfile, navigationOptions: ({navigation}) => ({
    title: `${navigation.state.params.title}`
  })}
});

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.fetchWithpage = this.fetchWithpage.bind(this);
    this.refreshWithPage = this.refreshWithPage.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.state = {
      movies: [],
      loading: false,
      page: 1
    }
  }

  refreshWithPage() {
    const currentPage = this.state.page;
    this.fetchWithpage(currentPage)
  }

  fetchWithpage(page) {
      this.setState({
        loading: true
      }, () => {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`)
        .then((data) => data.json())
        .then((json) => {
          return new Promise ((resolve, reject) => {
            setTimeout(() => {
              resolve(json);
            }, 2000);
          })
        })
        .then((json) => {
          const mSet = new Set([...this.state.movies.map((m) => m.id)]);
          const plusSet = json.results.filter((m) => !mSet.has(m.id));
          const newResults = this.state.movies.concat(plusSet);
          this.setState({
            movies: newResults,
            loading: false
          });
        })
      });
  }

  loadMore() {
    const newPage = this.state.page + 1;
    this.setState({
      page: newPage
    }, () => this.fetchWithpage(newPage))
  }

  componentWillMount(props) {
    this.fetchWithpage(1)
  }

  componentDidCatch(error, info) {
    alert(`${info}`, error)
  }

  render() {

    return (
      <Routes screenProps={{
        movies: this.state.movies,
        loading: this.state.loading,
        loadMore: this.loadMore,
        refresh: this.refreshWithPage
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
