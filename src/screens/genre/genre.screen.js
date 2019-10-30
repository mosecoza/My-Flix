import React, { useState, useEffect } from 'react'
import { SafeAreaView, FlatList, StyleSheet, View, Text } from 'react-native';
import { connect } from 'redux'
import * as Parameters from '../../utils/parameters';


const numColumns = 3;
const GenreScreen = () => {

    let [genres, setGenres] = useState();

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
    })


    let setInGenres = (infor) => {
        if (!genres) {
            setGenres(infor)
        }
    }



    function Item({ title }) {
        return (
            <View style={styles.item}>
                <Text style={styles.title}>{title}</Text>
            </View>
        );
    }

    function formatData (data, cols){
        const numberOfCompleteRows = Math.floor(data.length/cols)
        let numOfElementsLastRow = data.length-(numberOfCompleteRows*numOfElementsLastRow)
        while (numOfElementsLastRow!==cols && numOfElementsLastRow!==0){
            data.push({key:`blank-${numOfElementsLastRow}`, empty:true})
            numOfElementsLastRow=numOfElementsLastRow+1;
        }

        return data;
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={formatData(genres, numColumns)}
                renderItem={({ item }) => <Item title={item.name} />}
                keyExtractor={item => item.id}
                numColumns={numColumns}
            />
        </SafeAreaView>

    )
}

export default GenreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    item: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        width: 120,
        height: 90,
        backgroundColor: '#ccc',
        //   padding: 10,
        margin: 4,
    },
    title: {
        fontSize: 15,
    },
});
