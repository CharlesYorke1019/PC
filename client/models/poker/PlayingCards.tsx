import React, { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, Animated, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


interface PlayingCardsProps {
    display: any
    setDisplay: any
    player: any
}

const PlayingCards: React.FC<PlayingCardsProps> = ({display, setDisplay, player}) => {
    const position = 
        useRef(new Animated.ValueXY({x: 0, y: 0})).current;
    const [dragging, setDragging] = 
            useState(false);
    const [offSetValue, setOffSetValue] = useState({x: 0, y: 100})

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

                player.checkForFold(gestureState.dx, gestureState.dy, setDisplay);

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
                    display: display ? 'flex' : 'none'
                },
            ]}
            {...panResponder.panHandlers}
        >
            <Image 
                source={require('@/assets/images/playing_cards.png')}
                style={{width: 200, height: 200}}
                alt='img'
            />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        top: '0%',
        width: 200, height: 200,
        alignSelf: 'center',
    },
    imageContainer: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        position: 'absolute',
        top: '52.6%',
        left: '51.7%',
       
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
});

export default PlayingCards
