import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native"
import socket from '@/models/Socket'
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import GameViewModel from '@/models/blackjack/GameViewModel'
import PlayerViewModel from '@/models/blackjack/PlayerViewModel'
import positionsFunction from "@/models/PlayerPositionModel";
import PlayerPotPosition from '@/models/blackjack/PlayerPotPosition'
import Player from '@/models/blackjack/PlayerModel';
import ChipIncrements from '@/models/poker/ChipIncrements'

export default function gameRoom () {

  const local = useLocalSearchParams();
  
  const [gameObj, setGameObj] = useState({
    gameCode: local.gameCode,
    roomSize: Number(local.roomSize),
    playerDisplayNames: [],
    playerDisplayChips: [],
    totalPlayers: Number(local.totalPlayers),
    totalBuyIns: [local.totalBuyIns],
    gameStyle: local.gameStyle,
    host: local.host,
    gameStarted: local.gameStarted,
    ante: Number(local.ante),
    seatsActive: local.seatsActive,
    straddle: local.straddle
  })

  let [player, setPlayer] = useState(new Player(null, null, 0, 0, gameObj.gameCode, socket));
  let [playerView, setPlayerView] = useState(0);
  let playerPositions = positionsFunction(Number(gameObj.roomSize)); 
  let [gameStarted, setGameStarted] = useState(false);
  let [loaded, setLoaded] = useState(false);
  
  let playerPotPosition = new PlayerPotPosition(Number(gameObj.roomSize));
  playerPotPosition.setPosition();
    
  let chips = new ChipIncrements(Number(local.ante), 0, 0, 0);
  chips.initChips();

  socket.on('event6', (gameInfo: any) => {
    let holderObj = {
      gameCode: gameInfo.gameCode,
      roomSize: gameInfo.roomSize,
      playerDisplayNames: gameInfo.playerDisplayNames,
      playerDisplayChips: gameInfo.playerDisplayChips,
      totalPlayers: gameInfo.totalPlayers,
      totalBuyIns: gameInfo.totalBuyIns,
      host: gameInfo.host,
      gameStyle: gameInfo.gameStyle,
      gameStarted: gameInfo.gameStarted,
      ante: gameInfo.ante,
      seatsActive: gameInfo.seatsActive,
      straddle: gameInfo.straddle
    }

    setGameObj(holderObj);
  });
  
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()} style={{backgroundColor: '#2E3238'}}
    >
      <View style={[styles.container]} >
        <GameViewModel gameObj={gameObj} setGameObj={setGameObj} playerView={playerView} setPlayerView={setPlayerView} playerPositions={playerPositions} player={player} gameStarted={gameStarted} setGameStarted={setGameStarted} loaded={loaded} setLoaded={setLoaded} playerPotPotsitions={playerPotPosition} />
        <PlayerViewModel gameObj={gameObj} playerView={playerView} setPlayerView={setPlayerView} player={player} gameStarted={gameStarted} loaded={loaded} chips={chips} />
      </View>
    </TouchableWithoutFeedback>
  );
};
  
  const styles = StyleSheet.create({
      container: {
        position: 'absolute', width: '100%', height: '100%', top: '0%', left: '0%', backgroundColor: '#2E3238'
      },
      loadingContainer: {
        position: 'absolute', width: '100%', height: '120%', top: '0%', left: '0%', backgroundColor: '#2E3238'
      },
      gamePageTitle: {
        fontSize: 35, fontWeight: "bold", textAlign: 'center', marginTop: '20%'
      }
  });