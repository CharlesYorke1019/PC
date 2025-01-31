import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native"
import socket from '@/models/Socket'
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import GameViewModel from '@/models/poker/GameViewModel'
import PlayerViewModel from '@/models/poker/PlayerViewModel'
import positionsFunction from "@/models/PlayerPositionModel";
import BlindIndicatorPositionsModel from '@/models/poker/BlindIndicatorPositionsModel'
import Player from '@/models/poker/PlayerModel';

export default function gameRoom () {

  const local = useLocalSearchParams();

  const [gameObj, setGameObj] = useState({
    gameCode: local.gameCode,
    roomSize: Number(local.roomSize),
    playerDisplayNames: [local.playerDisplayNames],
    playerDisplayChips: [local.playerDisplayChips],
    totalPlayers: Number(local.totalPlayers),
    totalBuyIns: [local.totalBuyIns],
    gameStyle: local.gameStyle,
    host: local.host,
    gameStarted: local.lGameStarted,
    ante: Number(local.ante),
    seatsActive: local.seatsActive,
    maxBuyIn: Number(local.maxBuyIn),
    minBuyIn: Number(local.minBuyIn),
    straddle: local.straddle
  })

  let [player, setPlayer] = useState(new Player(null, null, 0, 0, false, gameObj.gameCode, socket));
  let [playerView, setPlayerView] = useState(0);
  let playerPositions = positionsFunction(Number(gameObj.roomSize));
  let [gameStarted, setGameStarted] = useState(false);
  let [loaded, setLoaded] = useState(false);

  let blindPositions = new BlindIndicatorPositionsModel(gameObj.roomSize);
  
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
      maxBuyIn: gameInfo.maxBuyIn,
      minBuyIn: gameInfo.minBuyIn,
      straddle: gameInfo.straddle
    }

    setGameObj(holderObj);
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()} style={{backgroundColor: '#2E3238'}}
    >
      <View style={[styles.container]} >
        <GameViewModel gameObj={gameObj} setGameObj={setGameObj} playerView={playerView} setPlayerView={setPlayerView} playerPositions={playerPositions} player={player} gameStarted={gameStarted} setGameStarted={setGameStarted} loaded={loaded} setLoaded={setLoaded} blindPositions={blindPositions} />
        <PlayerViewModel gameObj={gameObj} playerView={playerView} setPlayerView={setPlayerView} player={player} gameStarted={gameStarted} loaded={loaded} />
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