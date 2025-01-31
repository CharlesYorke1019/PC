import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, Animated, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ChipIncrements from './poker/ChipIncrements';

interface ChipSetProps {
    player: any
    value: any
    leftValue: any
    imgUrl: any
}

const ChipSet: React.FC<ChipSetProps> = ({player, value, leftValue, imgUrl}) => {
    const position = 
            useRef(new Animated.ValueXY({x: 0, y: 0})).current;
    const [dragging, setDragging] = 
            useState(false);
    const [offSetValue, setOffSetValue] = useState({x: 0, y: 100})
    const [displayChips, setDisplayChips] = useState(true);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                setDragging(true);
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    {
                        dx: position.x,
                        dy: position.y,
                    },
                ],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: (e, gestureState) => {

                player.dropsChips(gestureState.dx, gestureState.dy, setDisplayChips, value);

                Animated.spring(position, {
                    toValue: {x: 0, y: 0},
                    useNativeDriver: false,
                }).start();

                // leaves draggable in position it was dropped 
                // position.extractOffset();
            },
        })
    ).current;

    return (
        <Animated.View
            style={[
                styles.imageContainer,
                {
                    transform: position.getTranslateTransform(),
                    opacity: dragging ? 0.8 : 1,
                    left: leftValue,
                    display: displayChips ? 'flex' : 'none'
                },
            ]}
            {...panResponder.panHandlers}
        >
            {/* <View style={{borderRadius: 50, width: 90, height: 90, backgroundColor: 'black'}}>
                <Icon name="poker-chip" size={75} color={color}></Icon>
                <Image 
                    source={imgUrl}
                    style={{width: '100%', height: '100%', alignSelf: 'center'}}
                />
            </View> */}
                <Image 
                    source={imgUrl}
                    style={{width: 90, height: 90, alignSelf: 'center'}}
                />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        top: '0%',
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignSelf: 'center',
    },
    imageContainer: {
        width: 75,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        position: 'absolute',
        top: '78.6%',
       
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
});

export default ChipSet;