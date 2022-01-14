import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground
} from "react-native";

export function SettingsScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(
        "https://api.sampleapis.com/presidents/presidents"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  function handleSettingsPress() {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.screen}>
    <ImageBackground source={require('../assets/pozadina.png')} resizeMode="cover" style={styles.image}>
     
    
     
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={styles.itemWrapper}>
                <View style={styles.item}>
                  <View style={styles.image}>
                    <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: `${item.photo}`,
                      }}
                    />
                  </View>
                  <View style={styles.text}>
                    <Text style={styles.textbold}>{item.name}</Text>
                    <Text>{item.yearsInOffice}</Text>
                    <Text>Vice president:</Text>
                    <Text>{item.vicePresidents}</Text>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
    
      </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
     alignItems: 'center',
  },
  tinyLogo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  item: {
    flexDirection: "row",
    margin: 10,
  },
  text: {
    padding: 11,
  },
  textbold:{
    fontWeight: "bold",
    fontSize: 15
  },
  image: {
   
  },
});
