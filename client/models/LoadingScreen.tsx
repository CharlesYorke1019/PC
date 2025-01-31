import React, { useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import style from '@/assets/styles';
import { Image } from 'expo-image';
import Background from './Background';

interface LoadingScreenProps {
    loaded: any
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({loaded}) => {
    return (
        <SafeAreaView style={[style.safeAreaViewContainer, {display: !loaded ? 'flex' : 'none', zIndex: 1000}]}>
        <View style={{position: 'absolute', width: '100%', height: '115%', backgroundColor: '#2E3238', alignSelf: 'center', top: '0%', display: !loaded ? 'flex' : 'none', zIndex: 1000}}>
            <Image 
                source={require('@/assets/images/new_logo.png')}
                style={{position: 'absolute', alignSelf: 'center', top: '20%', width: 120, height: 120}}

            />
            <Text style={{color: 'white', textAlign: 'center', position: 'absolute', top: '43%', alignSelf: 'center', fontSize: 18, fontFamily: 'Copperplate'}}>Loading...</Text>
            <ActivityIndicator 
                style={{position: 'absolute', alignSelf: 'center', top: '45%'}}
                color={'white'}
                size={38}
            />
        <Background opacityChange={false} />

        </View>
        </SafeAreaView>
    )
}

export default LoadingScreen