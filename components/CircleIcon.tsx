import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';

const CircleIconView = ({url}: {url: string}) => {
  return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image
                    source={{ uri: url }}
                    style={styles.circleImage}
                />
            </TouchableOpacity>
        </View>

  );
}

export default CircleIconView

const iconSize = 42

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circleImage: {
    width: iconSize,
    height: iconSize,
    borderRadius: iconSize,
    borderWidth: 2,
    borderColor: '#ccc',
  },
});