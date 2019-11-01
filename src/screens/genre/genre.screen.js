import React, { useState, useEffect } from 'react'
import {
    SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Text, Dimensions,
    Modal, TouchableHighlight, View, Alert, ImageBackground,
} from 'react-native';
import { connect } from 'redux'
import * as Parameters from '../../utils/parameters';


const numColumns = 3;
const movieColumns = 2;
const { width, height } = Dimensions.get('window')
const getWidthSizeByPercentage = percentage => (percentage / 100) * width
const getHeightSizeByPercentage = percentage => (percentage / 100) * height
const movieWidth = getWidthSizeByPercentage(80)
const movieHeight = getHeightSizeByPercentage(60);



const GenreScreen = () => {

    let [genres, setGenres] = useState();
    let [visible, setVisible] = useState(false)
    let [genreList, setGenreList] = useState(null);
    let [selected, setSelected] = React.useState(null);

    useEffect(() => {
        var data = "{}";

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                // console.log(JSON.parse(this.responseText))
                let result = JSON.parse(this.responseText);
                setInGenres(result.genres)
            }
        });

        xhr.open("GET", `https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=${Parameters.API_KEY}`);

        xhr.send(data);
    }, [selected])

    useEffect(() => {
        var data = "{}";

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                // console.log(JSON.parse(this.responseText))
                let result = JSON.parse(this.responseText);
                setInGenresList(result.results)
            }
        });

        xhr.open("GET", `https://api.themoviedb.org/3/discover/movie?api_key=${Parameters.API_KEY}&language=zu-US&sort_by=original_title.asc&include_adult=false&include_video=false&primary_release_year=2019&year=2019&vote_count.gte=6&with_original_language=en&with_genres${selected}`);

        xhr.send(data);
    }, [selected])


    let setModalVisible = (visible) => {
        setVisible(visible);
    }

    let setInGenres = (infor) => {
        console.log(genres)
        console.log(infor)
        if (!genres) {
            setGenres(infor)
        }
    }


    let setInGenresList = (infor) => {
        // console.log('==== setInGenresList:  ',infor)
        if (!genreList && infor !== genreList) {
            setGenreList(infor)
        }
    }


    function GenreItem({ title, id }) {
        return (
            <TouchableOpacity
                onPress={() => {
                    console.log('onpress', id)
                    // onSelect(id)
                    setSelected(id);
                    setVisible(true);
                }}
                style={[
                    styles.item,
                    { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
                ]}
            >
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
        );
    }

    function MovieItem(props) {
        const { id, title, backdrop_path, vote_count } = props
        console.log('props', props)
        return (
            <TouchableOpacity
            style={[
                styles.movieItem,
                { backgroundColor: selected ? '#000' : '#212121' },
            ]}
            onPress={() => {
                console.log('onpress', id)
                // onSelect(id)
                // setSelected(id);
            }}>
            <ImageBackground
                source={{
                    uri: `https://image.tmdb.org/t/p/w500/${backdrop_path}`,
                }}
                style={[
                    styles.movieImage, 
                ]}
            /><View
            
        >
            <Text style={styles.title}>{title}</Text>
        </View>
             </TouchableOpacity>   
            

        );
    }

    let RenderMovieCard = () => {
        return (<ImageBackground
            source={{
                uri: `https://image.tmdb.org/t/p/w500/${backdrop_path}`,
            }}
            style={styles.movieImage}
        >
        </ImageBackground>)
    }


    let RenderMovieList = () => {
        console.log(' --- RenderMovieList---')
        return (<FlatList
            data={genreList}
            renderItem={({ item }) => (
                <MovieItem
                    id={item.id}
                    title={item.title}
                    {...item}
                // selected={!selected.get(item.id)}
                // onSelect={onSelect}
                />
            )}
            keyExtractor={(item, index) => { index }}
            numColumns={movieColumns}
        />)
    }

    let RenderGenreList = () => {
        console.log(' --- RenderGenreList---', genres)
        console.log(' --- RenderGenreList---', selected)
        return (<FlatList
            data={genres}
            renderItem={({ item }) => (
                <GenreItem
                    id={item.id}
                    title={item.name}
                />
            )}
            keyExtractor={(item, index) => { index }}
            // numColumns={numColumns}
        />)
    }



    return (
        <SafeAreaView style={styles.container}>
            

            <RenderGenreList />
            <RenderMovieList />
            {/* <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{ marginTop: 42 }}>

                    <View>
                        <TouchableHighlight
                            onPress={() => {
                                setVisible(!visible);
                            }}
                        >
                            <Text style={{margin:15, fontWeight: 'bold', fontStyle:'italic', fontSize:24}}>back</Text>
                        </TouchableHighlight>
                        <RenderMovieList />
                    </View>
                </View>
            </Modal> */}
        </SafeAreaView>

    )
}

export default GenreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', 
        marginTop: 15,
    },
    item: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 5,
        height: height / 10,
        backgroundColor: '#ccc',
        //   padding: 10,
        margin: 4,
    },
    title: {
        fontSize: 12,
    },

    movieItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        width: width / 3,
        height: height / 5,
        backgroundColor: '#ccc',
        margin: 4,
    },
    title: {
        fontSize: 15,
        color: 'white',
    },
    movieImage: {
        width: width / 3,
        height: height / 6,
        flex: 1,
        paddingLeft: 15,
        paddingTop: 10,
        margin: 1,
    },
    icon: {
        paddingRight: 10,
    },
});
