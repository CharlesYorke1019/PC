import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from "react-native"
import {router } from "expo-router";
import Icon from 'react-native-vector-icons/Ionicons'

interface JoinGameWindowProps {
    socket: any
    display: any
    setDisplay: any
}

const JoinGameWindow: React.FC<JoinGameWindowProps> = ({socket, display, setDisplay}) => {

    let gameCodeHolder;
    let enteredGameCode = '';
    let [event2Fail, setEvent2Fail] = useState(false);
    let [responseText, setResponseText] = useState('');

    const gameCodeRef = useRef<TextInput>(null);

    // socket.on('event2JG', (obj: any) => {
    //     if (obj.gameType === 'Poker') {
    //         router.push({
    //             pathname: '/poker/playerInGameDisplays',
    //             params: {
    //                 maxBuyIn: obj.maxBuyIn,
    //                 minBuyIn: obj.minBuyIn
    //             }
    //         });
    //     } else if (obj.gameType === 'BlackJack') {
    //         router.push({
    //             pathname: '/blackjack/playerInGameDisplays',
    //             params: {
    //                 maxBuyIn: obj.maxBuyIn,
    //                 minBuyIn: obj.minBuyIn
    //             }
    //         });
    //     }
    // });

    socket.on('event2JG', (gameInfo: any) => {
        if (gameInfo.gameType === 'Poker') {
            router.push({
                pathname: '/poker/gameRoom',
                params: {
                    maxBuyIn: gameInfo.maxBuyIn,
                    minBuyIn: gameInfo.minBuyIn,
                    roomSize : gameInfo.roomSize,  
                    gameCode: gameInfo.gameCode,
                    playerDisplayNames: gameInfo.playerDisplayNames,
                    playerDisplayChips: gameInfo.playerDisplayChips,
                    totalPlayers: gameInfo.totalPlayers,
                    totalBuyIns: gameInfo.totalBuyIns,
                    host: gameInfo.host,
                    gameStarted: gameInfo.gameStarted,
                    gameStyle: gameInfo.gameStyle,
                    minBet: gameInfo.ante,
                    seatsActive: gameInfo.seatsActive,
                }
            });
        } else if (gameInfo.gameType === 'BlackJack') {
            router.push({
                pathname: '/blackjack/gameRoom',
                params: {
                    maxBuyIn: gameInfo.maxBuyIn,
                    minBuyIn: gameInfo.minBuyIn,
                    roomSize : gameInfo.roomSize,  
                    gameCode: gameInfo.gameCode,
                    playerDisplayNames: gameInfo.playerDisplayNames,
                    playerDisplayChips: gameInfo.playerDisplayChips,
                    totalPlayers: gameInfo.totalPlayers,
                    totalBuyIns: gameInfo.totalBuyIns,
                    host: gameInfo.host,
                    gameStarted: gameInfo.gameStarted,
                    gameStyle: gameInfo.gameStyle,
                    minBet: gameInfo.ante,
                    seatsActive: gameInfo.seatsActive
                }
            });
        }
    });
    
    socket.on('event2FailedJG', (reason: any) => {
        setEvent2Fail(true);  

        if (reason === 0) {
            setResponseText('Could not join game. Please make sure you entered to correct game code.')
        } else if (reason === 1) {
            setResponseText('The game is currently full please try again. ')
        }

        setTimeout(() => {
            setEvent2Fail(false);
        }, 3000);
    });

    const changeDisplay = () => {
        if (gameCodeRef.current) {
            gameCodeRef.current?.clear();
        }
        setEvent2Fail(false);
        setDisplay(false);
    };
    

    return (
        <KeyboardAvoidingView 
            style={{position: 'absolute', height: '100%', width: '100%', top: '0%', left: '0%'}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
        <TouchableWithoutFeedback style={{backgroundColor: '#2E3238'}} onPress={() => Keyboard.dismiss()}>
        <View style={{width: '80%', height: 275, position: 'absolute', display: display ? 'flex' : 'none', borderWidth: 2, backgroundColor: '#2E3238', alignSelf: 'center', top: '25%', opacity: 1, borderRadius: 10, borderColor: 'white'}}>
            <TouchableOpacity style={{alignSelf: 'center', marginBottom: '5%', marginTop: '5%'}} 
                onPress={() => changeDisplay()}
            >
                <Icon name="return-up-back-sharp" size={35} color="white"></Icon>
            </TouchableOpacity>

            <Text style={styles.joinGamePageTitle}>Enter Game Code</Text>

            <TextInput 
                value={gameCodeHolder}
                onChangeText={(gameCode) => enteredGameCode = gameCode}
                style={styles.inputStyle}
                autoCapitalize='none'
                autoCorrect={false}
                ref={gameCodeRef}
                placeholder="enter here"
                placeholderTextColor={'#96A190'}
            />

            <TouchableOpacity style={{borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', width: '45%', alignSelf: 'center', borderColor: 'lavender', marginTop: 20}}
                onPress={() => socket.emit('event3', enteredGameCode)}
            >
                <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 18, marginRight: 5, marginLeft: 5, color: 'black', paddingTop: 2, paddingBottom: 2}}>Join Lobby</Text>
            </TouchableOpacity>

            <View style={{display: event2Fail ? 'flex' : 'none', width: '95%', alignSelf: 'center', position: 'absolute', top: '38%'}}>
                <Text style={{fontFamily: 'Copperplate', textAlign: 'center', color: 'red'}}>*{responseText}</Text>
            </View>

        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default JoinGameWindow;

const styles = StyleSheet.create({
    container: {
      position: 'absolute', width: '100%', height: '120%', top: '0%', left: '0%', backgroundColor: '#2E3238'
    },
    joinGamePageTitle: {
      fontSize: 28, fontWeight: "bold", textAlign: 'center', fontFamily: 'Copperplate', color: 'white'
    },
    backBttn: {
      position: 'absolute', left: '5%', top: '8%'
    },
    inputStyle: {
      width: '70%',
      height: 40,
      padding: 10,
      marginVertical: 10,
      backgroundColor: 'transparent',
      alignSelf: 'center',
      borderBottomWidth: 2.5, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 2.5, fontSize: 14,
      borderTopRightRadius: 15, borderBottomLeftRadius: 15,
      borderColor: 'white',
      textAlign: 'center',
      marginBottom: '3%',
      marginTop: '18%',
      color: 'white'
    }
});