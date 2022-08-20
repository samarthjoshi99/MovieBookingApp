import { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, Text, FlatList, ActivityIndicator, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const NowPlayingScreen = ({navigation}) => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getMoviesFromAPI = () => {
        const apiURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=f79b2f0865e2a4bbd589a018b0723b2d&language=en-US&page=1';
        return fetch(apiURL)
        .then( (response) => response.json()
                            .then( (jsonData) => {
                                setMovies(jsonData.results);
                            })
                            .catch( (error) => {console.log(`Error while getting json from response : ${error}`);})
                            .finally( () => setLoading(false))
        )
        .catch( (error) => {console.log(`Error while getting response from server : ${error}`);})
        .finally( () => setLoading(false));
    }

    useEffect( () => {getMoviesFromAPI()}, []);

    const renderItem = ( {item} ) => (
        <Pressable onPress={ () => {
            navigation.navigate("MovieDetailsScreen", {movie: item});
        }
        }>
            <View style={styles.movie}>
                <View>
                    <Text style={{marginLeft:20, fontSize:18}}>{item.title}</Text>
                    <Text style={{marginLeft:20, fontSize:14}}>Release Date: {item.release_date}</Text>
                </View>
                <AntDesign name="right" size={20} color="tomato" style={{marginRight:20}}/>
            </View>
        </Pressable>
    );

    const ItemDivider = () => {
        return (
            <View style={{height: 1, width: "100%", backgroundColor: "#cccccc"}}/>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize:24, marginTop:10, marginBottom:10, alignSelf: 'center'}}>Now Playing</Text>
            { isLoading ? (
                <ActivityIndicator animating={true} size="large"/>
            ) : (
                <FlatList
                data={movies}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemDivider}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    movie: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center'
    },
});

export default NowPlayingScreen;
