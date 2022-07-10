import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { galleryphotos } from './Api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Entypo } from '@expo/vector-icons';

const ImageScreen = () => {
    const [photos, setPhotos] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [currentImage,setCurrentImage]=useState('')
    const[loader,setLoader]=useState(false)
    const callGalleryApi=()=>{
        setLoader(true)
        galleryphotos().then(async(response) => {
            setPhotos(response?.data)
            setLoader(false)
            console.log('length',photos?.photos?.photo?.length)
             await AsyncStorage.setItem('data',JSON.stringify (response?.data))
           
        }).catch((error) => {
            setLoader(false)
            console.log(error)
        })
    }
    useEffect (() => {
        callGalleryApi()
        setTimeout(async()=>{
            let asyncgalleryData= await AsyncStorage.getItem('data')
            console.log( 'data', asyncgalleryData)
            
        },2000)
       
      

        
       
     
    },[])

    // let imageXml = <Image
    //   style={ styles.photo}
    //   source={{uri:item?.url_s}}
    // />;
    return (
        <View>
            <Modal
                style={styles.modal}
                animationType="slide"
                transparent={modalVisible}
                visible={modalVisible}
                onRequestClose={() => {
                    
                    setModalVisible(!modalVisible);
                }}>
                <View style={{flex:1,backgroundColor:'white'}}>
                    <View >
                        
                        
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}><Entypo name="cross" size={50} color="black" /></Text>
                        </Pressable>
                        <View style={styles.modal}>
                        <Image style={styles.modal} source={{ uri:currentImage }}/>
                        </View>
                    </View>
                </View>
            </Modal>
           {loader? <ActivityIndicator size={'small'}/>
:
            <FlatList
                data={photos?.photos?.photo}
                initialNumToRender={2}
                numColumns={3}
                maxToRenderPerBatch={2}
                onEndReachedThreshold={0.1}
                renderItem={({ item }) => {
                    // console.log(item)
                    return (
                        <TouchableOpacity onPress={() => {setModalVisible(!modalVisible); setCurrentImage(item?.url_s)}} >
                            <Image style={styles.photo} source={{ uri: item?.url_s }} />
                        </TouchableOpacity>
                    )
                }}
            />}

        </View>
    )
}
const styles = StyleSheet.create({
    photo: {
        height: 200,
        width:120,
        borderRadius:1
    },
    modal: {
        backgroundColor: 'white',
        alignSelf:'center',
       height:300,
       width:250,
       borderRadius:1,
       justifyContent:'center'
    }
})
export default ImageScreen