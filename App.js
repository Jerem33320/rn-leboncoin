import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { Platform } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export default function App() {

  const [showSearch, setShowSearch] = useState(false)
  const [loading, setLoading] = useState(true);

  const [ searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query)
  setTimeout(() => {
    setLoading(false);
  }, 3000)

  const annonces = [
    {
      name: "a",
      prix: 10
    },
    {
      name: "b",
      prix: 10
    },
    {
      name: "c",
      prix: 10
    },
    {
      name: "d",
      prix: 10
    },
    {
      name: "e",
      prix: 10
    },
  ]

  return (
    <PaperProvider>
      <Appbar.Header>
       <Appbar.Content title="Le bon coin" subtitle={'Petites annonces'} />
        <Appbar.Action icon="magnify" onPress={() => {setShowSearch(!showSearch)}} />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
      </Appbar.Header>
      {
        showSearch && 
        <View>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
      }
      <View style={styles.container}>
        {
          loading &&
          <ActivityIndicator animating={true} color={Colors.red800} size="large"/>
        }
        {
          !loading &&
          annonces.filter(annonce => {
            return !searchQuery || searchQuery && annonce.name.includes(searchQuery)
          }).map(annonce => {
            return (
              <View>
                <Text>{annonce.name}</Text>
                <Text>{annonce.prix}</Text>
              </View>
            )
          })
        }
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
