import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, SafeAreaView, TextInput, Keyboard, Image, KeyboardAvoidingView, Platform } from 'react-native';
import GameModel from '@/models/blackjack/GameModel';
import * as gvmMethods from '@/models/blackjack/GameViewModelMethods'
import style from '@/assets/styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import LoadingScreen from '../LoadingScreen';
import Background from '../Background';

interface GameViewProps {
    gameObj: any
    setGameObj: any
    loaded: any
    setLoaded: any
    player: any
    playerView: any
    setPlayerView: any
    playerPositions: any
    gameStarted: any
    setGameStarted: any
    playerPotPotsitions: any
};

const GameView: React.FC<GameViewProps> = ({gameObj, setGameObj, loaded, setLoaded, player, playerView, setPlayerView, playerPositions, gameStarted, setGameStarted, playerPotPotsitions}) => {
    let playerDisplays = [];
    let buyInsArr = [];
    let totalBuyIns = [];
    let playerPots = [];
    let [displayPlayerPots, setDisplayPlayerPots] = useState(['']);
    let [displayPots, setDisplayPots] = useState(false);

    let [roundTransition, setRoundTransition] = useState(false);
    let [winnerChosen, setWinnerChosen] = useState(false);
    let [initSelectBorder, setInitSelectBorder] = useState(true);
    // let [selectedWinners, setSelectedWinner] = useState([0]);
    // let [testWinners, setTestWinners] = useState('');
    let [winnersStr, setWinnersStr] = useState('');
    let [halfPotWinners, setHalfPotWinners] = useState('');
    let [roundReadyToEnd, setRoundReadyToEnd] = useState(false);
    let [lastSelectedWinner, setLastSelectedWinner] = useState(0);
    let [playerSplit, setPlayerSplit] = useState(false);
    let [initRoundOver, setInitRoundOver] = useState(false);
    let [initTotalPotsWon, setInitTotalPotsWon] = useState(false);
    let [pTotalPotsWon, setPTotalPotsWon] = useState('');
    let [pTotalPotsAmount, setPTotalPotsAmount] = useState('');
    // let [seatsActive, setSeatsActive] = useState('');
    let [initPlayerDisplays, setInitPlayerDisplays] = useState(false);
    let [currentPositionSelection, setCurrentPositionSelection] = useState(0);
    let [seatsActiveWarning, setSeatsActiveWarning] = useState(false);
    let [playerPositionSelected, setPlayerPositionSelected] = useState(false);
    let [anyWindowOpen, setAnyWindowOpen] = useState(false);

    let gModel = new GameModel(gameObj.roomSize, 0, 0, [], gameObj.ante, setRoundReadyToEnd, setRoundTransition);

    let [gameTurn, setGameTurn] = useState();
    let [inGameMenuActive, setInGameMenuActive] = useState(false);
    let [menuButton, setMenuButton] = useState(true);
    let [initAddOnWindow, setInitAddOnWindow] = useState(false);
    let [readyResponse, setReadyResponse] = useState(false);
    let [responseText, setResponseText] = useState('')
    let [changeRS, setChangeRS] = useState(false);
    let [changeRSOptions, setChangeRSOptions] = useState(0);
    let [initLeaveGame, setInitLeaveGame] = useState(false);
    let [windowOpen, setWindowOpen] = useState(false);
    let [gameInfoDisplay, setGameInfoDisplay] = useState(false);
    let [gameNotFull, setGameNotFull] = useState(false);
    
    const leftValue = useState(new Animated.Value(0))[0];

    let addOnAmount = '';
    let addOnHolder;
    const addOnRef = useRef<TextInput>(null);

    let totalPotsWonAmount = '';
    let totalPotsHolder;
    const totalPotsRef = useRef<TextInput>(null);

    let displayNameHolder;
    let enteredDisplayName = '';
    const displayNameRef = useRef<TextInput>(null);

    let buyInHolder;
    let enteredDisplayBuyIn = '';
    const buyInRef = useRef<TextInput>(null);

    function moveMenu () {
        if (!inGameMenuActive) {
            Animated.timing(leftValue, {
                toValue: 310,
                duration: 400,
                useNativeDriver: false
            }).start()

        } else {
            Animated.timing(leftValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start()
        }
    };

    function triggerGameMenuAnimation () {
        if (!inGameMenuActive) {
            setInGameMenuActive(true);
        } else {
            setTimeout(() => {
                setInGameMenuActive(false);
            }, 350)
        }
    };

    function switchView () {
        setPlayerView(1)
    }

    useEffect(() => {
        player.socket.once('event8', (holder: any, game: any) => {
            // setSelectedWinner([]);
            gModel.setInfoGameStart(game.ante);
            gModel.initRound(setGameTurn, game);
            setGameStarted(true);
            setDisplayPots(true);
            player.setInGameInfo(gModel);
            gvmMethods.handleGameObjChange(game, setGameObj);
            gModel.handleTotalyBuyIns(game);
            gvmMethods.handleAdditionalStartInfo(game.roomSize, displayPlayerPots, setDisplayPlayerPots);
        });

        player.socket.on('sendingInGameEvent1', (lastTurn: any, game: any) => {
            gModel.handleCheck(lastTurn, setGameTurn);
            player.setInGameInfo(gModel);
            gvmMethods.handleGameObjChange(game, setGameObj);
        });

        player.socket.on('sendingInGameEvent2', (amount: any, amount2: any, totalChips: any, turn: any, game: any, straddle: any) => {
            player.displayBet();
            gModel.handleBets(turn, amount, setGameTurn, displayPlayerPots, setDisplayPlayerPots);
            player.setInGameInfo(gModel);
            gvmMethods.handleGameObjChange(game, setGameObj);
        })

        player.socket.on('sendingInGameEvent4', (lastTurn: any, game: any) => {
            gModel.handleFold(lastTurn);
            player.setInGameInfo(gModel);
            gvmMethods.handleGameObjChange(game, setGameObj);
        })

        player.socket.on('sendingInGameEvent5', (game: any, lastTurn: any) => {
            gvmMethods.handleGameObjChange(game, setGameObj);
            gModel.handlePlayerLeaving(lastTurn, setGameTurn);
        })

        player.socket.on('sendingInGameMenuEvent1', (game: any, amount: any, pAddOnTurn: any) => {
            gModel.handleAddOn(setResponseText, setReadyResponse, game, pAddOnTurn);
            gvmMethods.handleGameObjChange(game, setGameObj);
        })

        player.socket.on('sendingInGameMenuEvent2', (game: any) => {
            gModel.handleGameSizeChange(game.roomSize);
            gvmMethods.handleGameObjChange(game, setGameObj);
            playerPotPotsitions.gameSizeChanged(Number(game.roomSize));
            playerPotPotsitions.setPosition();
        })

        player.socket.on('sendingBackInGameEvent6_BJ', (game: any) => {
            setInitSelectBorder(false);
            setWinnerChosen(true);
            setDisplayPots(false);
            gvmMethods.handleGameObjChange(game, setGameObj);
        })

        player.socket.on('sendingBackInGameEvent7_BJ', (game: any) => {
            gModel.initNextRound(setGameTurn, setDisplayPots, setRoundTransition, setWinnerChosen, setWinnersStr);
            player.setInGameInfo(gModel);
            gvmMethods.handleGameObjChange(game, setGameObj);
        });

        player.socket.on('sendingBackInGameEvent8_BJ', (game: any, pTurn: any, actionAmount: any) => {
            player.displayLastAction();
            gModel.handleSplit(pTurn, actionAmount, setGameTurn, displayPlayerPots, setDisplayPlayerPots);
            player.setInGameInfo(gModel);
            gvmMethods.handleGameObjChange(game, setGameObj);
        })

        player.socket.on('sendingBackPlayerDisplayEvent1_Side', (lastSelection: any) => {
            gvmMethods.setPlayerCurrentSelectorFunc(lastSelection, setCurrentPositionSelection);
            setInitPlayerDisplays(true);
        })

        player.socket.on('sendingBackPlayerDisplayEvent1', (lastSelection: any, game: any) => {
            gvmMethods.handleGameObjChange(game, setGameObj);
        });

        player.socket.on('sendingBackPlayerDisplayEvent2_Side', () => {
            gvmMethods.resetPlayerCurrentSelectorFunc(setCurrentPositionSelection);
        })

        player.socket.on('sendingBackPlayerDisplayEvent2', (seatsActiveStr: any, lastSelection: any, game: any) => {
            gvmMethods.handleGameObjChange(game);
        });

        player.socket.on('sendingBackPlayerDisplayEvent1_SideError', () => {
            gvmMethods.resetPlayerCurrentSelectorFunc(setCurrentPositionSelection);
            setSeatsActiveWarning(true);

            setTimeout(() => {
                setSeatsActiveWarning(false);
            }, 2500)
        })

        player.socket.on('event6', (game: any) => {
            gvmMethods.handleGameObjChange(game, setGameObj);
        })

        player.socket.on('event6_Individual', (pTurn: any) => {
            player.setInfoOnPlayerDisplaySubmit(pTurn, setPlayerPositionSelected)
            setInitPlayerDisplays(false);
        })
    }, [])

    const pokerTable = (
        <Image 
            source={require('@/assets/images/final_poker_table.png')}
            style={[{opacity: !loaded ? 0 : initRoundOver && anyWindowOpen ? .4 : 1}, style.pokerTableImage]}
            alt='img'
            onLoadEnd={() => 
            setTimeout(() => {
                setLoaded(true)
            }, 2000)}
        />
    )
    
    const playerViewBttn = (
        <TouchableOpacity onPress={() => switchView()} style={[style.playerViewBttn, {display: gameStarted && !windowOpen && player.socket.id != gameObj.host ? 'flex' : 'none', opacity: !initRoundOver ? 1 : .4}]}>
            <Text style={style.playerViewBttnText}>Player View</Text>
        </TouchableOpacity>
    )

    const inGameMenuButton = (
        <TouchableOpacity style={{position: 'absolute', top: '10%', left: '10%', height: 30, width: 30, backgroundColor: 'lavender', borderRadius: 5, flex: 1, justifyContent: 'center', display: playerView === 0 && menuButton ? 'flex' : 'none'}}
            onPress={() => gvmMethods.toggleInGameMenu(setMenuButton, menuButton, triggerGameMenuAnimation, moveMenu, windowOpen, setWindowOpen)}
        >
            <Icon3 name='menu' color={'black'} size={25} style={{alignSelf: 'center'}}></Icon3>
        </TouchableOpacity>
    )

    const inGameMenu = (
        <Animated.View style={[{marginLeft: leftValue, display: inGameMenuActive === true ? 'flex' : 'none'}, style.inGameMenuView]} >
        
            <TouchableOpacity style={style.closeMenuButton}
                onPress={() => gvmMethods.toggleInGameMenu(setMenuButton, menuButton, triggerGameMenuAnimation, moveMenu, windowOpen, setWindowOpen)}
            >
                <Text style={style.closeMenuButtonText}>{'<'}</Text>
            </TouchableOpacity>

            <View style={style.menuGameCodeContainer}>
                <Text style={style.menuGameCodeTextPt1}><Text style={style.menuGameCodeTextPt2}>Game Code: </Text>{gameObj.gameCode}</Text>
            </View>

            <TouchableOpacity style={style.gameInfoButton}
                onPress={() => gvmMethods.toggleGameInfoWindow(triggerGameMenuAnimation, setGameInfoDisplay, gameInfoDisplay, moveMenu)}
            >
                <Text style={style.inGameMenuButtonText}>Game Info</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[style.addOnButton, {opacity: player.socket.id == gameObj.host ? .4 : 1}]} disabled={player.socket.id == gameObj.host}
                onPress={() => gvmMethods.toggleAddOnWindow(setInitAddOnWindow, initAddOnWindow, triggerGameMenuAnimation, readyResponse, setReadyResponse, setResponseText, Keyboard, moveMenu, addOnRef)}
            >
                <Text style={style.inGameMenuButtonText}>Add-On</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[{opacity: player.socket.id == gameObj.host ? 1 : .5}, style.changeRoomSizeButton]} disabled={player.socket.id != gameObj.host}
                onPress={() => gvmMethods.toggleRoomSizeChangeWindow(player, gameObj, setChangeRS, changeRS, triggerGameMenuAnimation, changeRSOptions, setChangeRSOptions, moveMenu)}
            >
                <Text style={style.inGameMenuButtonText}>Change Game Size</Text>
            </TouchableOpacity>

            <Image 
                source={require('@/assets/images/new_logo.png')}
                style={{width: 120, height: 120, alignSelf: 'center', position: 'absolute', top: '75%'}}
            />

            <TouchableOpacity style={style.leaveGameButton}
                onPress={() => gvmMethods.toggleLeaveGame(setInitLeaveGame, initLeaveGame, triggerGameMenuAnimation, moveMenu)}
            >
                <Text style={style.inGameLeaveButtonText}>Leave Game</Text>
            </TouchableOpacity>
        </Animated.View>
    )

    const addOnWindow = (
        <View style={[{display: initAddOnWindow === true ? 'flex' : 'none'}, style.addOnWindow]}
        >
            <TouchableOpacity style={style.closeMenuWindowButton}
                onPress={() => gvmMethods.toggleAddOnWindow(setInitAddOnWindow, initAddOnWindow, triggerGameMenuAnimation, readyResponse, setReadyResponse, setResponseText, Keyboard, moveMenu, addOnRef)}
            >
                <Text style={style.closeMenuWindowButtonText}>X</Text>
            </TouchableOpacity>

            <View style={[{display: (!gameStarted) || (gameStarted && roundTransition && winnerChosen) ? 'flex' : 'none'}, style.addOnWindowMainView1]}>
                <View style={{display: readyResponse === false ? 'flex' : 'none'}}>
                    <View style={style.addOnWindowView1}>
                        <Text style={style.addOnWindowText1}>Enter Add-On</Text>
                    </View>
                    
                    <View style={style.addOnWindowView2}>
                        <TextInput 
                            value={addOnHolder}
                            onChangeText={(v) => addOnAmount = v}
                            onEndEditing={() => Keyboard.dismiss()}
                            keyboardType='numeric'
                            style={style.addOnInput}
                            placeholder='enter here'
                            ref={addOnRef}
                            placeholderTextColor={'#96A190'}
                        />
                    </View>
                    
                    <TouchableOpacity style={style.submitAddOnButton}
                        onPress={() => player.addsOn(Number(addOnAmount), Keyboard)}
                    >
                        <Text style={style.submitAddOnButtonText}>Submit</Text>
                    </TouchableOpacity>

                </View>

                <View style={[{display: readyResponse === true ? 'flex' : 'none'}, style.addOnWindowView3]}>
                    <View style={style.addOnWindowView4}>
                        <Text style={style.addOnWindowResponseText}>{responseText}</Text>
                    </View>
                </View>
            </View>

            <View style={[{display: gameStarted && !roundTransition && !winnerChosen || roundTransition && !winnerChosen ? 'flex' : 'none'}, style.addOnWindowView5]}>
                <View style={style.addOnWindowView6}>
                    <Text style={style.addOnWindowRestrictionText}>Please Wait Until The Current Round Is Over To Add-On.</Text>
                </View>
            </View>
        </View>
    )

    const changeGameSizeWindow = (
        <View style={[{display: changeRS === true ? 'flex' : 'none'}, style.changeGsView]}>
            <TouchableOpacity style={style.closeMenuWindowButton}
                onPress={() => gvmMethods.toggleRoomSizeChangeWindow(player, gameObj, setChangeRS, changeRS, triggerGameMenuAnimation, changeRSOptions, setChangeRSOptions, moveMenu)}
            >
                <Text style={style.closeMenuWindowButtonText}>X</Text>
            </TouchableOpacity>

            <View style={{display: !gameStarted || gameStarted && roundTransition && winnerChosen ? 'flex' : 'none'}}>
                <View style={style.changeGsOptionView}>
                    <TouchableOpacity style={[{ backgroundColor: changeRSOptions === 2 ? 'lightcoral' : 'transparent', borderColor: changeRSOptions === 2 ? 'lightcoral' : 'white'}, style.gSOptionButton]} 
                        onPress={() => setChangeRSOptions(2)}
                    >
                        <Text style={style.gSOptionButtonText}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{backgroundColor: changeRSOptions === 3 ? 'lightcoral' : 'transparent', borderColor: changeRSOptions === 3 ? 'lightcoral' : 'white'}, style.gSOptionButton]} 
                        onPress={() => setChangeRSOptions(3)}
                    >
                        <Text style={style.gSOptionButtonText}>3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{backgroundColor: changeRSOptions === 4 ? 'lightcoral' : 'transparent', borderColor: changeRSOptions === 4 ? 'lightcoral' : 'white'}, style.gSOptionButton]} 
                        onPress={() => setChangeRSOptions(4)}
                    >
                        <Text style={style.gSOptionButtonText}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{backgroundColor: changeRSOptions === 5 ? 'lightcoral' : 'transparent', borderColor: changeRSOptions === 5 ? 'lightcoral' : 'white'}, style.gSOptionButton]} 
                        onPress={() => setChangeRSOptions(5)}
                    >
                        <Text style={style.gSOptionButtonText}>5</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.changeGsOptionView}>
                <TouchableOpacity style={[{ backgroundColor: changeRSOptions === 6 ? 'lightcoral' : 'transparent', borderColor: changeRSOptions === 6 ? 'lightcoral' : 'white'}, style.gSOptionButton]} 
                        onPress={() => setChangeRSOptions(6)}
                    >
                        <Text style={style.gSOptionButtonText}>6</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{backgroundColor: changeRSOptions === 7 ? 'lightcoral' : 'transparent', borderColor: changeRSOptions === 7 ? 'lightcoral' : 'white'}, style.gSOptionButton]} 
                        onPress={() => setChangeRSOptions(7)}
                    >
                        <Text style={style.gSOptionButtonText}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{backgroundColor: changeRSOptions === 8 ? 'lightcoral' : 'transparent', borderColor: changeRSOptions === 8 ? 'lightcoral' : 'white'}, style.gSOptionButton]} 
                        onPress={() => setChangeRSOptions(8)}
                    >
                        <Text style={style.gSOptionButtonText}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{backgroundColor: changeRSOptions === 9 ? 'lightcoral' : 'transparent', borderColor: changeRSOptions === 9 ? 'lightcoral' : 'white'}, style.gSOptionButton]} 
                        onPress={() => setChangeRSOptions(9)}
                    >
                        <Text style={style.gSOptionButtonText}>9</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={style.submitGsChangeButton}
                    onPress={() => gvmMethods.roomSizeChangeSubmitted(player, changeRSOptions, setChangeRS, setMenuButton, setWindowOpen)} 
                >
                    <Text style={style.submitGsChangeButtonText}>Submit</Text>
                </TouchableOpacity>


            </View>

            <View style={{display: gameStarted && roundTransition && !winnerChosen || !roundTransition && gameStarted ? 'flex' : 'none'}}>
                <View style={style.changeGsRestrictionView}>
                    <Text style={style.changeGsRestrictionText}>Please Wait Until The Current Round Is Over To Change The Game Size.</Text>
                </View>
            </View>
        </View>
    )

    const leaveGameConfirmation = (
        <View style={[{display: initLeaveGame === true ? 'flex' : 'none'}, style.leaveGameView]}>
            <Text style={style.leaveGameViewHeaderText}>Are You Sure You Want To Leave The Game?</Text>
            <TouchableOpacity style={style.leaveGameConfirmButton}
                // onPress={() => gvmMethods.playerLeavesGame(player, router)}
            >
                <Text style={style.leaveGameConfirmButtonText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.leaveGameDeclineButton}
                onPress={() => gvmMethods.toggleLeaveGame(setInitLeaveGame, initLeaveGame, triggerGameMenuAnimation, moveMenu)}
            >
                <Text style={style.leaveGameDeclineButtonText}>No</Text>
            </TouchableOpacity>
        </View>
    )

    const roundOverConfirmation = (
        <View style={[style.roundOverConfirmationContainer, {display: initRoundOver ? 'flex' : 'none'}]}>
            <Text style={style.roundOverConfirmationHeader}>Is The Current Round Over?</Text>
            <TouchableOpacity style={style.confirmRoundOverButton}
                onPress={() => gvmMethods.roundIsOverHost(setInitSelectBorder, setRoundTransition, setInitRoundOver, displayPlayerPots)}
            >
                <Text style={style.confirmRoundOverButtonText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.declineGameOverButton}
                onPress={() => setInitRoundOver(false)}
            >
                <Text style={style.declineGameOverButtonText}>No</Text>
            </TouchableOpacity>
        </View>
    )

    for (let i = 0; i < gameObj.roomSize; i++) {
        if (gameObj.playerDisplayNames[i]) {
            if (i === 0) {
                playerDisplays[0] = (
                    <Animated.View key={i + 1} style={[{top: playerPositions[i].pTop, left: playerPositions[i].pLeft, borderColor: gameTurn === i + 1 ? 'lightcoral' : 'black', justifyContent: 'center', opacity: !initRoundOver ? 1 : .4}, style.playerBorders]}>
                        <TouchableOpacity 
                        >
                            <Text style={style.playerBorderDisplayName} numberOfLines={1}>{gameObj.playerDisplayNames[i]}</Text>
                            <Text style={{color: 'lightcoral', fontFamily: 'Copperplate', fontSize: 14, textAlign: 'center', marginTop: 2}}>DEALER</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )
            } else {
                playerDisplays.push(
                    <Animated.View key={i + 1} style={[{top: playerPositions[i].pTop, left: playerPositions[i].pLeft, borderColor: gameTurn === i + 1 && !roundTransition ? 'lightcoral' : roundTransition && winnersStr.includes((i + 1).toString()) && !halfPotWinners.includes((i + 1).toString()) && !winnerChosen ? 'blue' : roundTransition && winnersStr.includes((i + 1).toString()) && halfPotWinners.includes((i + 1).toString()) && !winnerChosen ? 'yellow' : 'black', opacity: !initRoundOver ? 1 : .4}, style.playerBorders]}>
                        <TouchableOpacity 
                            onPress={() => gvmMethods.toggleBorderSelection(roundTransition, winnerChosen, i + 1, winnersStr, setWinnersStr, setLastSelectedWinner, displayPlayerPots, setPlayerSplit, setInitSelectBorder, pTotalPotsWon, setPTotalPotsWon, pTotalPotsAmount, setPTotalPotsAmount)}
                        >
                            <Text style={style.playerBorderDisplayName} numberOfLines={1}>{gameObj.playerDisplayNames[i]}</Text>
                            <Text style={style.playerBorderDisplayChips}>{gameObj.playerDisplayChips[i]}</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )

                playerPots.push(
                    <View key={i + 1} style={{position: 'absolute', height: 50, width: 50, top: playerPotPotsitions.playerPotsPositions[i].pTop, left: playerPotPotsitions.playerPotsPositions[i].pLeft, display: gameStarted && displayPots ? 'flex' : 'none', borderWidth: 0, borderColor: 'black', borderRadius: 5, justifyContent: 'center', flex: 1, opacity: !initRoundOver ? 1 : .4}}>
                        <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 16, color: 'white', flexWrap: 'wrap'}}>{gvmMethods.splitPotArr(displayPlayerPots[i - 1])}</Text>
                    </View>
                )
            }

            buyInsArr.push(
                <Text key={i} style={style.buyInsText}>{gameObj.playerDisplayNames[i]}: {gameObj.playerDisplayChips[i]}</Text>
            );

            totalBuyIns.push(
                <Text key={i} style={style.totalBuyInsText}>{gameObj.playerDisplayNames[i]}: {gameObj.totalBuyIns[i]}</Text>
            )

        } else {
            if (i === 0) {
                playerDisplays[0] = (
                    <TouchableOpacity key={i + 1} style={[{top: playerPositions[i].pTop, left: playerPositions[i].pLeft, borderColor: gameTurn === i + 1 && !roundTransition ? 'lightcoral' : roundTransition && winnersStr.includes((i + 1).toString()) && !halfPotWinners.includes((i + 1).toString()) && !winnerChosen ? 'blue' : roundTransition && winnersStr.includes((i + 1).toString()) && halfPotWinners.includes((i + 1).toString()) && !winnerChosen ? 'yellow' : 'black', opacity: !initRoundOver ? 1 : .4}, style.playerBorders]} disabled={playerPositionSelected || player.socket.id != gameObj.host || initPlayerDisplays}
                        onPress={() => gvmMethods.togglePlayerSelectsPosition(player, i + 1, setAnyWindowOpen)}
    
                    >
                        <Text style={style.playerBorderDisplayName}></Text>
                        <Text style={{color: 'lightcoral', fontFamily: 'Copperplate', fontSize: 16, textAlign: 'center'}}>DEALER</Text>
                    </TouchableOpacity>
                )
            } else {
                playerDisplays.push(
                    <TouchableOpacity key={i + 1} style={[{top: playerPositions[i].pTop, left: playerPositions[i].pLeft, borderColor: gameTurn === i + 1 && !roundTransition ? 'lightcoral' : roundTransition && winnersStr.includes((i + 1).toString()) && !halfPotWinners.includes((i + 1).toString()) && !winnerChosen ? 'blue' : roundTransition && winnersStr.includes((i + 1).toString()) && halfPotWinners.includes((i + 1).toString()) && !winnerChosen ? 'yellow' : 'black', opacity: !initRoundOver ? 1 : .4}, style.playerBorders]} disabled={playerPositionSelected || initPlayerDisplays}
                        onPress={() => gvmMethods.togglePlayerSelectsPosition(player, i + 1, setAnyWindowOpen)}
    
                    >
                        <Text style={style.playerBorderDisplayName}></Text>
                        <Text style={style.playerBorderDisplayChips}></Text>
                    </TouchableOpacity>
                ) 

                playerPots.push(
                    <View key={i + 1} style={{position: 'absolute', height: 50, width: 50, top: playerPotPotsitions.playerPotsPositions[i].pTop, left: playerPotPotsitions.playerPotsPositions[i].pLeft, display: gameStarted && displayPots ? 'flex' : 'none', borderWidth: 0, borderColor: 'black', borderRadius: 5, justifyContent: 'center', flex: 1, opacity: !initRoundOver ? 1 : .4}}>
                        <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 16, color: 'white', flexWrap: 'wrap'}}>{gvmMethods.splitPotArr(displayPlayerPots[i - 1])}</Text>
                    </View>
                )
            } 

            // if (i > 0) {
            //     playerPots.push(
            //         <View key={i + 1} style={{position: 'absolute', height: 50, width: 50, top: playerPotPotsitions.playerPotsPositions[i].pTop, left: playerPotPotsitions.playerPotsPositions[i].pLeft, display: gameStarted && displayPots ? 'flex' : 'none', borderWidth: 0, borderColor: 'black', borderRadius: 5, justifyContent: 'center', flex: 1, opacity: !initRoundOver ? 1 : .4}}>
            //             <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 16, color: 'white', flexWrap: 'wrap'}}>{gvmMethods.splitPotArr(displayPlayerPots[i - 1])}</Text>
            //         </View>
            //     )
            // }
        }
    }

    const startButton = (
        <TouchableOpacity style={[{display: !gameStarted && player.socket.id == gameObj.host ? 'flex' : 'none'}, style.startButton]}
            onPress={() => gvmMethods.initGame(player, gameObj, setGameNotFull)}
        >
            <Text style={style.startButtonText}>Start</Text>
        </TouchableOpacity>
    )

    const chooseWinnerBttn = (
        <TouchableOpacity style={[{display: initSelectBorder && roundReadyToEnd && gameStarted && player.socket.id == gameObj.host ? 'flex' : 'none'}, style.startButton]}
            // onPress={() => gvmMethods.initGame(player)}
        >
            <Text style={style.startButtonText}>Round Over</Text>
        </TouchableOpacity>
    )
   
    const gameInfoWindow = (
        <View style={[{display: gameInfoDisplay === true ? 'flex' : 'none'}, style.gameInfoWindow]}>
            <TouchableOpacity style={style.closeMenuWindowButton}
                onPress={() => gvmMethods.toggleGameInfoWindow(triggerGameMenuAnimation, setGameInfoDisplay, gameInfoDisplay, moveMenu)}
            >
                <Text style={style.closeMenuWindowButtonText}>X</Text>
            </TouchableOpacity>

            <View style={style.gameInfoWindowInnerView1}>
                <Text style={style.gameInfoWindowText1}>Buy-Ins: </Text>
                <View style={style.gameInfoWindowInnerView2}>
                    {totalBuyIns}
                </View> 
            </View>
        </View>
    )

    const submitWinnerButton = (
        <TouchableOpacity style={style.submitWinnerButton}
            onPress={() => gvmMethods.submitWinner(player, winnersStr, displayPlayerPots, gameObj.roomSize, pTotalPotsWon, pTotalPotsAmount)}
        >
            <Text style={style.submitWinnerButtonText}>Submit</Text>
        </TouchableOpacity>
    )

    const winnerSelectionWindow = (
        <View style={[{display: gameStarted && roundTransition === true && winnerChosen === false && player.socket.id == gameObj.host ? 'flex' : 'none'}, style.winnerSelectionView]}>
            <Text style={style.winnerSelectionText1}>Select The Winners</Text>
            <Text style={style.winnerSelectionText3}>(Tap On The Borders)</Text>
            {submitWinnerButton}
        </View>
    );

    const roundOverButton = (
        <TouchableOpacity style={{borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', width: '35%', position: 'absolute', top: '70%', alignSelf: 'center', borderColor: 'lavender', display: gameStarted && !roundTransition && !initRoundOver && player.socket.id == gameObj.host ? 'flex' : 'none'}}
            onPress={() => gvmMethods.initRoundOver(setInitRoundOver, displayPlayerPots)}
        >
            <Text style={{paddingRight: 5, paddingLeft: 5, paddingTop: 2.5, paddingBottom: 2.5, textAlign: 'center', fontFamily: 'Copperplate', fontSize: 18, color: 'black'}}>Round Over</Text>
        </TouchableOpacity>
    )

    const splitPotConfirmation = (
        <View style={{width: '60%', height: '40%', alignSelf: 'center', position: 'absolute', borderWidth: 1, borderRadius: 5, backgroundColor: '#2E3238', flex: 1, top: '10%', borderColor: 'white', zIndex: 10, display: playerSplit && !initTotalPotsWon && player.socket.id == gameObj.host ? 'flex' : 'none'}}>
            <Text style={{fontFamily: 'Copperplate', fontSize: 22, textAlign: 'center', color: 'white', marginTop: 50, marginBottom: 30, paddingRight: 10, paddingLeft: 10}}>Did this player win all their pots? {lastSelectedWinner}</Text>
            <TouchableOpacity style={{borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', borderColor: 'lavender', alignSelf: 'center', width: '30%', marginBottom: '8%'}}
                onPress={() => gvmMethods.splitPotConfirmationButtons(setPlayerSplit, false, 1, setInitSelectBorder)}
            >
                <Text style={{textAlign: 'center', marginRight: 5, marginLeft: 5, fontSize: 16, fontFamily: 'Copperplate', lineHeight: 30}}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', borderColor: 'lavender', alignSelf: 'center', width: '30%'}}
                onPress={() => gvmMethods.splitPotConfirmationButtons(setInitTotalPotsWon, true, 2)}
            >
                <Text style={{textAlign: 'center', marginRight: 5, marginLeft: 5, fontSize: 15, fontFamily: 'Copperplate', lineHeight: 30}}>No</Text>
            </TouchableOpacity>
        </View>
    )

    const totalPotsWon = (
        <View style={{width: '60%', height: '40%', alignSelf: 'center', position: 'absolute', borderWidth: 1, borderRadius: 5, backgroundColor: '#2E3238', flex: 1, top: '10%', borderColor: 'white', zIndex: 10, display: initTotalPotsWon && player.socket.id == gameObj.host ? 'flex' : 'none'}}>
            <Text style={{fontFamily: 'Copperplate', fontSize: 22, textAlign: 'center', color: 'white', marginTop: 50, marginBottom: 30, paddingRight: 10, paddingLeft: 10}}>How Many Pots Did This Player Win?</Text>
            
            <View style={{height: '10%', marginBottom: '20%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <TextInput 
                    value={totalPotsHolder}
                    onChangeText={(v) => totalPotsWonAmount = v}
                    onEndEditing={() => Keyboard.dismiss()}
                    keyboardType='numeric'
                    style={{width: '20%', height: '100%', alignSelf: 'center', borderColor: 'white', borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, marginRight: '2.5%', textAlign: 'center', fontSize: 16, color: 'white'}}
                    ref={totalPotsRef}
                />

                <Text style={{color: 'white', marginLeft: '2.5%', fontFamily: 'Copperplate', fontSize: 24, display: lastSelectedWinner != 0 && lastSelectedWinner != undefined ? 'flex' : 'none'}}>/ {gvmMethods.returnSplitLength(lastSelectedWinner, displayPlayerPots, roundTransition)}</Text>
            </View>

            <TouchableOpacity style={{borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', borderColor: 'lavender', alignSelf: 'center', width: '40%'}}
                onPress={() => gvmMethods.handleTotalPotsWonConfirmation(lastSelectedWinner, totalPotsWonAmount, totalPotsRef, pTotalPotsWon, setPTotalPotsWon, setInitTotalPotsWon, setPlayerSplit, setInitSelectBorder, winnersStr, setWinnersStr, halfPotWinners, setHalfPotWinners, gvmMethods.returnSplitLength(lastSelectedWinner, displayPlayerPots, roundTransition), pTotalPotsAmount, setPTotalPotsAmount)}
            >
                <Text style={{textAlign: 'center', marginRight: 5, marginLeft: 5, fontSize: 15, fontFamily: 'Copperplate', lineHeight: 30}}>Confirm</Text>
            </TouchableOpacity>
        </View>
    )

    const nextRoundButton = (
        <TouchableOpacity style={[{display: roundTransition && winnerChosen && player.socket.id == gameObj.host ? 'flex' : 'none'}, style.nextRoundButton]}
            onPress={() => gvmMethods.initNextRound(player)}
        >
            <Text style={style.nextRoundButtonText}>Start Next Round</Text>
        </TouchableOpacity>
    )

    const playerInGameDisplays = (
        <KeyboardAvoidingView
            style={{position: 'absolute', height: '100%', width: '100%', top: '0%', left: '0%'}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={[{display: initPlayerDisplays ? 'flex' : 'none'}, style.pIGDOuterContainer]}>
                <TouchableOpacity style={style.closePIGDButton}
                    onPress={() => gvmMethods.playerClosesInGameDisplays(player, currentPositionSelection, setInitPlayerDisplays)}
                >
                    <Text style={style.closeMenuButtonText}>{'x'}</Text>
                </TouchableOpacity>

                <View style={style.pIGDInputContainer1}>
                    <Text style={style.pIGDHeader1}>Display Name</Text>
                    <View style={style.pIGDIconContainer1}>
                        <Icon2 name='user' color={'white'} size={25} />
                    </View>
                    <TextInput 
                        value={displayNameHolder}
                        onChangeText={(v) => enteredDisplayName = v}
                        style={style.pIGDInput1}
                        placeholder='enter here'
                        ref={displayNameRef}
                        placeholderTextColor={'#96A190'}
                    />
                </View>
                <View style={style.pIGDInputContainer2}>
                        <Text style={style.pIGDHeader2}>Buy-In</Text>
                        <View style={style.pIGDIconContainer2}>
                            <Icon name='poker-chip' color={'white'} size={25} />
                        </View>
                        <View style={style.pIGDBuyInRangeContainer}>
                            <Text style={style.pIGDBuyInRangeText}>*Buy In Range: </Text>
                        </View>

                        { currentPositionSelection === 1 ? (
                            <View style={{flex: 1}}>
                                <View style={style.pIDGDealerInputContainer}>
                                    <Text style={style.pIDGDealerInputContainerText}>Dealer</Text>
                                </View>
                            </View>
                        ) : (
                            <View style={{flex: 1}}>
                                <TextInput 
                                    value={buyInHolder}
                                    onChangeText={(v) => enteredDisplayBuyIn = v}
                                    style={style.pIGDInput2}
                                    placeholder='enter here'
                                    keyboardType='numeric'
                                    ref={buyInRef}
                                    placeholderTextColor={'#96A190'}
                                />
                            </View>
                        )}
                    </View>
                
                    <TouchableOpacity style={style.pIGDConfirmButton}
                        onPress={() => gvmMethods.playerSubmitsInGameDisplays(player, enteredDisplayName, enteredDisplayBuyIn, currentPositionSelection)}
                    >
                        <Text style={style.pIGDConfirmButtonText}>Confirm</Text>
                    </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )

    const seatActiveWarning = (
        <View style={{width: '60%', height: '20%', alignSelf: 'center', position: 'absolute', borderWidth: 1, borderRadius: 5, backgroundColor: '#2E3238', flex: 1, top: '10%', borderColor: 'white', zIndex: 10, display: seatsActiveWarning ? 'flex' : 'none', justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 18, color: 'white', paddingRight: 20, paddingLeft: 20}}>Please select a different position</Text>
        </View>
    )

    const gameNotFullWarning = (
        <View style={{width: '80%', height: '20%', alignSelf: 'center', position: 'absolute', top: '20%', display: gameNotFull ? 'flex' : 'none'}}>   
            <Text style={{fontFamily: 'Copperplate', color: 'white', fontSize: 16, textAlign: 'center'}}>Game is not full. Please wait for other players to join or change the game size.</Text>
        </View>
    )
    
    return (
        <SafeAreaView style={[style.safeAreaViewContainer, {zIndex: playerView === 0 ? 10 : -10}]}>
            <Animated.View style={[style.testContainer1, {zIndex: playerView === 0 ? 10 : -10, left: 0}]}>
                <LoadingScreen loaded={loaded} />
                <Background opacityChange={false} />
                {pokerTable}
                {playerViewBttn}
                {inGameMenuButton}
                {inGameMenu}
                {gameInfoWindow}
                {addOnWindow}
                {changeGameSizeWindow}
                {leaveGameConfirmation}
                {playerDisplays}
                {startButton}
                {playerPots}
                {chooseWinnerBttn}
                {winnerSelectionWindow}
                {roundOverButton}
                {splitPotConfirmation}
                {roundOverConfirmation}
                {nextRoundButton}
                {totalPotsWon}
                {playerInGameDisplays}
                {seatActiveWarning}
                {gameNotFullWarning}
            </Animated.View>
        </SafeAreaView>
    )
}

export default GameView;