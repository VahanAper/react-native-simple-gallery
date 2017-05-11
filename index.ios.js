import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

const Images = [
  {
    uri: 'https://cdn.spacetelescope.org/archives/images/wallpaper2/heic1509a.jpg',
    label: 'Westerlund 2 — Hubble’s 25th anniversary image',
  },
  {
    uri: 'https://cdn.spacetelescope.org/archives/images/wallpaper2/heic1501a.jpg',
    label: 'New view of the Pillars of Creation — visible',
  },
  {
    uri: 'https://cdn.spacetelescope.org/archives/images/wallpaper2/heic1107a.jpg',
    label: 'A rose made of galaxies',
  },
  {
    uri: 'https://cdn.spacetelescope.org/archives/images/wallpaper2/heic0715a.jpg',
    label: 'Extreme star cluster bursts into life in new Hubble image',
  },
  {
    uri: 'https://cdn.spacetelescope.org/archives/images/wallpaper2/heic1608a.jpg',
    label: 'The Bubble Nebula',
  },
  {
    uri: 'https://cdn.spacetelescope.org/archives/images/wallpaper2/potw1345a.jpg',
    label: 'Antennae Galaxies reloaded',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  image: {
    flex: 99,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageLabel: {
    textAlign: 'center',
    backgroundColor: 'rgba(100, 100, 100, 0.5)',
    color: 'white',
    padding: 2,
  },
});

export default class gallery extends Component {
  constructor(props) {
    super(props);
    this.onImageLayout = this.onImageLayout.bind(this);
    this.nextImage = this.nextImage.bind(this);
  }

  state = {
    index: 0,
    imageWidth: null,
    width: Dimensions.get('window').width,
  }

  onImageLayout(event) {
    this.setState({
      imageWidth: event.nativeEvent.layout.width,
      width: Dimensions.get('window').width,
    });
  }

  nextImage(event) {
    const { index, imageWidth } = this.state;
    const X = event.nativeEvent.locationX;
    const delta = (X < imageWidth / 2) ? -1 : 1;

    let newIndex = (index + delta) % Images.length;

    if (newIndex < 0) {
      newIndex = Images.length - Math.abs(newIndex);
    }

    this.setState({
      index: newIndex,
    });
  }

  render() {
    const image = Images[this.state.index];
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={[styles.image, { width: this.state.width }]}
          onPress={this.nextImage}
        >
          <Image
            source={{ uri: image.uri }}
            style={[styles.image, { width: this.state.width }]}
            onLayout={this.onImageLayout}
            resizeMode="contain"
          >
            <Text style={[styles.imageLabel, { width: this.state.imageWidth }]}>{image.label}</Text>
          </Image>
        </TouchableHighlight>
      </View>
    );
  }
}

AppRegistry.registerComponent('gallery', () => gallery);
