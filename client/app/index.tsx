import React, { useState, memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { router } from "expo-router";
import JoinGameWindow from "@/models/JoinGameWindow";
import socket from "@/models/Socket";
import Background from "@/models/Background";

export default memo (function Index() {

  socket.emit('userConnects');

  const [displayJoinGameWindow, setDisplayJoinGameWindow] = useState(false);
  const [gameType, setGameType] = useState(1);
  const [gameTypeStr, setGameTypeStr] = useState('Poker');
  const [initNotAvailable, setInitNotAvailable] = useState(false);
  
  function selectGameType (arg: any, argStr: any) {
    setGameType(arg);
    setGameTypeStr(argStr);
  };

  function createGame(){
    if (gameType === 1) {
      router.push({
        pathname: '/poker/createGame',
      });
    } else if (gameType === 2) {
      router.push({
        pathname: '/blackjack/createGame',
      });
    };
  }

  return (
    <TouchableWithoutFeedback style={{backgroundColor: '#2E3238', position: 'absolute'}} onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        
        <Text style={[styles.title, {opacity: displayJoinGameWindow || initNotAvailable ? 0.3 : 1}]}>Pocket</Text>
        <Text style={[styles.title2, {opacity: displayJoinGameWindow || initNotAvailable ? 0.3 : 1}]}>Chips</Text>

        <View style={{height: 1, width: '95%', backgroundColor: 'transparent', alignSelf: 'center', borderWidth: 3, borderColor: 'white', borderStyle: 'solid', borderRadius: 5, opacity: displayJoinGameWindow || initNotAvailable ? 0.3 : 1}}>

        </View>

        <View style={{alignSelf: 'center', flex: 1, flexDirection: 'row', justifyContent: 'center', width: '100%', marginBottom: '5%'}}>

          <TouchableOpacity style={[styles.pokerSelectionButton, {backgroundColor: gameType === 1 ? 'lightcoral' : 'transparent', borderColor: gameType === 1 ? 'lightcoral' : 'transparent', opacity: displayJoinGameWindow || initNotAvailable ? 0.3 : 1}]} disabled={displayJoinGameWindow}
            onPress={() => selectGameType(1, 'Poker')}
          >
            <Text style={styles.gameTypeSelectionButtonText}>Poker</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.blackJackSelectionButton, {backgroundColor: gameType === 2 ? 'lightcoral' : 'transparent', borderColor: gameType === 2 ? 'lightcoral' : 'transparent', opacity: displayJoinGameWindow || initNotAvailable ? 0.3 : 1}]} disabled={displayJoinGameWindow}
            onPress={() => selectGameType(2, 'BlackJack')}
          >
            <Text style={styles.gameTypeSelectionButtonText}>Black Jack</Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity style={[{opacity: displayJoinGameWindow || initNotAvailable ? 0.3 : 1, borderWidth: 1, borderColor: 'lavender', borderTopRightRadius: 15, borderBottomLeftRadius: 15, width: '45%', alignSelf: 'center', backgroundColor: 'lavender', marginBottom: '10%'}]} disabled={displayJoinGameWindow}
          onPress={() => createGame()}
        >
          <Text style={[styles.createGameBttnText, , {opacity: displayJoinGameWindow || initNotAvailable ? 0.3 : 1}]}>Create Game</Text>
        </TouchableOpacity>

        <View style={{height: 1, width: '95%', backgroundColor: 'transparent', alignSelf: 'center', borderWidth: 3, borderColor: 'white', borderStyle: 'solid', borderRadius: 5, marginBottom: '-5%', opacity: displayJoinGameWindow || initNotAvailable ? 0.3 : 1}}>

        </View>

        <TouchableOpacity style={[styles.joinGameBttn, {opacity: displayJoinGameWindow || initNotAvailable ? 0.3 : 1}]} disabled={displayJoinGameWindow}
          onPress={() => {
            setDisplayJoinGameWindow(true);
          }}
        >
          <Text style={[styles.joinGameBttnText, {opacity: displayJoinGameWindow || initNotAvailable ? 0.3 : 1}]} numberOfLines={1}>Join Game</Text>
        </TouchableOpacity>

        <View style={{height: 1, width: '95%', backgroundColor: 'transparent', alignSelf: 'center', borderWidth: 3, borderColor: 'white', borderStyle: 'solid', borderRadius: 5, marginBottom: '55.5%', marginTop: '15%', opacity: displayJoinGameWindow || initNotAvailable ? 0.3 : 1}}>

        </View>

        <View style={{display: initNotAvailable ? 'flex' : 'none', position: 'absolute', alignSelf: 'center', width: '80%', height: '10%', top: '40%', backgroundColor: 'lavender', borderWidth: 1, borderColor: 'black', borderRadius: 5, justifyContent: 'center'}}>
          <Text style={{fontFamily: 'Copperplate', fontSize: 18, textAlign: 'center', color: 'black', paddingRight: 10, paddingLeft: 10}}>Game mode not available! Blairs a cuck! Every hotel room has a Blair chair!</Text>
        </View>

        <Background opacityChange={displayJoinGameWindow}/>

        <JoinGameWindow socket={socket} display={displayJoinGameWindow} setDisplay={setDisplayJoinGameWindow} />

      </View>
    </TouchableWithoutFeedback>
  );
})

const styles = StyleSheet.create({
  container: {
    width: '100%', height: '120%', top: '0%', left: '0%', backgroundColor: '#2E3238', position: 'absolute'
  },
  title: {
    fontSize: 80, fontWeight: "bold", textAlign: 'center', marginTop: '30%', color: 'white', fontFamily: 'Copperplate', lineHeight: 60, zIndex: -50
  },
  title2: {
    fontSize: 60, fontWeight: "bold", textAlign: 'center', color: 'white', fontFamily: 'Copperplate', marginTop: '-4%', marginBottom: '9.5%', zIndex: -50
  },
  subtitle: {
    fontSize: 36, color: "#38434D",
  },
  createGameBttn: {
    borderWidth: 1, borderColor: 'lavender', borderTopRightRadius: 15, borderBottomLeftRadius: 15, width: '47%', marginTop: '40%', marginLeft: '27.5%', backgroundColor: 'lavender'
  },
  createGameBttnText: {
    paddingTop: 10, paddingBottom: 10, textAlign: 'center', fontSize: 20, fontFamily: 'Copperplate', color: 'black'
  },
  joinGameBttn: {
    borderWidth: 1, borderColor: 'lavender', borderTopRightRadius: 15, borderBottomLeftRadius: 15, width: '47%', marginTop: '26%', alignSelf: 'center', backgroundColor: 'lavender'
  },
  joinGameBttnText: {
    paddingTop: 10, paddingBottom: 10, textAlign: 'center', fontSize: 20, fontFamily: 'Copperplate', color: 'black'
  },
  border: {
    position: 'absolute', height: 1, width: '95%', backgroundColor: 'transparent', alignSelf: 'center', borderWidth: 3, borderColor: 'white', borderStyle: 'solid', borderRadius: 5
  },
  gameTypeSelectionContainer: {
    position: 'absolute', alignSelf: 'center', flex: 1, flexDirection: 'row', justifyContent: 'center', width: '100%', top: '36%'
  },
  pokerSelectionButton: {
    borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, alignSelf: 'center', marginRight: 10, borderTopRightRadius: 15, borderBottomLeftRadius: 15, height: 60, justifyContent: 'center', width: '30%'
  },
  blackJackSelectionButton: {
    borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, alignSelf: 'center', marginLeft: 10, borderTopRightRadius: 15, borderBottomLeftRadius: 15, width: '30%', height: 60
  },
  gameTypeSelectionButtonText: {
    fontFamily: 'Copperplate', textAlign: 'center', fontSize: 24, color: 'white', paddingRight: 10, paddingLeft: 10, paddingBottom: 1.5, paddingTop: 1.5
  }
});
