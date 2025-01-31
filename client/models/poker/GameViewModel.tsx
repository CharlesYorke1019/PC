import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, SafeAreaView, TextInput, Keyboard, Image, Platform, KeyboardAvoidingView, Dimensions } from 'react-native';
import GameModel from '@/models/poker/GameModel';
import { router } from 'expo-router';
import * as gvmMethods from '@/models/poker/GameViewModelMethods'
import style from '@/assets/styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import LoadingScreen from '../LoadingScreen';
import Background from '../Background';

interface GameViewProps {
    gameObj: any;
    setGameObj: any;
    playerView: number;
    setPlayerView: any;
    playerPositions: any;
    player: any;
    gameStarted: any;
    setGameStarted: any;
    loaded: any;
    setLoaded: any;
    blindPositions: any;
}

const GameView: React.FC<GameViewProps> = ({ gameObj, setGameObj, playerView, setPlayerView, playerPositions, player, gameStarted, setGameStarted, loaded, setLoaded, blindPositions}) => {
    let playerDisplays = [];
    let buyInsArr = [];
    let totalBuyIns = [];
    let sidePotsArr = [];
    let sidePotsInfoArr = [];
    
    let [toggleBBSelect, setToggleBBSelect] = useState(false)
    let [activeBBSelect, setActiveBBSelect] = useState(0);
    let [winnerChosen, setWinnerChosen] = useState(false);
    let [selectedWinner, setSelectedWinner] = useState(0);
    let [activeRound, setActiveRound] = useState('');
    let [roundTransition, setRoundTransition] = useState(false);
    let [gameInfoDisplay, setGameInfoDisplay] = useState(false);
    let [initSelectBorder, setInitSelectBorder] = useState(false);
    let [initPlayerDisplays, setInitPlayerDisplays] = useState(false);
    let [currentPositionSelection, setCurrentPositionSelection] = useState(0);
    let [seatsActiveWarning, setSeatsActiveWarning] = useState(false);
    let [playerPositionSelected, setPlayerPositionSelected] = useState(false);
    let [anyWindowOpen, setAnyWindowOpen] = useState(false);

    let gModel = new GameModel(gameObj.roomSize, 0, 0, 0, 0, [], null, 0, 0, 0, [], setActiveRound, setRoundTransition, gameObj.playerDisplayNames, gameObj.playerDisplayChips, gameObj.gameStyle, setInitSelectBorder);

    let [gameTurn, setGameTurn] = useState();
    let [activePot, setActivePot] = useState(0);
    let [inGameMenuActive, setInGameMenuActive] = useState(false);
    let [menuButton, setMenuButton] = useState(true);
    let [initAddOnWindow, setInitAddOnWindow] = useState(false);
    let [readyResponse, setReadyResponse] = useState(false);
    let [responseText, setResponseText] = useState('')
    let [changeRS, setChangeRS] = useState(false);
    let [changeRSOptions, setChangeRSOptions] = useState(0);
    let [initLeaveGame, setInitLeaveGame] = useState(false);
    let [bbIndicatorTop, setBBIndicatorTop] = useState(null);
    let [bbIndicatorLeft, setBBIndicatorLeft] = useState(null);
    let [sidePotActive, setSidePotActive] = useState(false);
    let [totalSidePots, setTotalSidePots] = useState(0);
    let [sidePotWinnersChosen, setSidePotWinnersChosen] = useState(false);
    let [sidePotWinner, setSidePotWinner] = useState(0);
    let [sidePots, setSidePots] = useState([0]);
    let [currentSidePot, setCurrentSidePot] = useState(0);
    let [windowOpen, setWindowOpen] = useState(false);
    let [gameNotFull, setGameNotFull] = useState(false);
    let [menuAnimationActive, setMenuAnimationActive] = useState(false);
    let [pDisplayError, setPDisplayError] = useState(false);

    let addOnAmount = '';
    let addOnHolder;

    let top = 350;
    const leftValue = useState(new Animated.Value(0))[0];
    
    const addOnRef = useRef<TextInput>(null);

    let displayNameHolder;
    let enteredDisplayName = '';
    const displayNameRef = useRef<TextInput>(null);
    
    let buyInHolder;
    let enteredDisplayBuyIn = '';
    const buyInRef = useRef<TextInput>(null);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    function moveMenu () {

        let value = 0;

        if (windowWidth <= 375 && windowHeight <= 812) {
            value = 300;
        } else if (windowWidth <= 390 && windowHeight <= 844) {
            value = 310;
        }

        if (!inGameMenuActive) {
            Animated.timing(leftValue, {
                toValue: value,
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
            setMenuAnimationActive(true);
            setTimeout(() => {
                setInGameMenuActive(false);
                setMenuAnimationActive(false);
            }, 350)
        }
    };

    function switchView () {
        setPlayerView(1)
    }

    useEffect(() => {
        player.socket.once('event8', (bigBlind: any, game: any) => {    
            gModel.setInfoGameStart(bigBlind, game.ante);
            gModel.initRound(setGameTurn, setActivePot, setActiveRound, game);
            player.setInGameInfo(gModel);
            player.setStraddleAble(game.straddle);
            blindPositions.setPosition(bigBlind, setBBIndicatorTop, setBBIndicatorLeft);
            setGameStarted(true);
            setToggleBBSelect(false);
            gvmMethods.handleGameObjChange(game, setGameObj);
            gModel.handleTotalyBuyIns(game);
            

            // used to see winner choosing and round transition functionality without a full game
            // setRoundTransition(true);
            // setInitSelectBorder(true);

            // used to see sidepot functionality off the rip due to one device being used for testing a multiplayer game
            // setSidePotActive(true);
            // setSidePots([5, 10])
            
            player.socket.emit('event9');
        });

        player.socket.on('sendingInGameEvent1', (lastTurn: any, game: any) => {
            gModel.handleCheck(lastTurn, setGameTurn);
            player.setInGameInfo(gModel);
            gvmMethods.handleGameObjChange(game, setGameObj);
        });

        player.socket.on('sendingInGameEvent2', (amount: any, amount2: any, totalChips: any, lastTurn: any, game: any, straddle: any) => {
            player.displayBet();
            gModel.handleBet(amount, amount2, setActivePot, lastTurn, setGameTurn, game, setSidePotActive, setTotalSidePots, setSidePots, straddle);
            player.setInGameInfo(gModel);
            gvmMethods.handleGameObjChange(game, setGameObj);
        })

        player.socket.on('sendingInGameEvent3', (amount: any, amount2: any, totalChips: any, lastTurn: any, game: any) => {
            player.displayCall();
            gModel.handleCall(amount, amount2, setActivePot, lastTurn, setGameTurn, game, setSidePotActive, setTotalSidePots, setSidePots);
            player.setInGameInfo(gModel);
            gvmMethods.handleGameObjChange(game, setGameObj);
        })

        player.socket.on('sendingInGameEvent4', (lastTurn: any, game: any) => {
            gModel.handleFold(lastTurn, setGameTurn, setActivePot);
            player.setInGameInfo(gModel);
            gvmMethods.handleGameObjChange(game, setGameObj);
        });

        player.socket.on('sendingInGameEvent5', (game: any, pLeftTurn: any) => {
            gvmMethods.handleGameObjChange(game, setGameObj);
            gModel.handlePlayerLeaving(pLeftTurn, setGameTurn, setActivePot);
        });

        player.socket.on('sendingInGameEvent6', (winnerTurn: any, game: any) => {
            if (player.turn == winnerTurn) {
                player.winnerOfRound(game.playerDisplayChips[player.turn - 1]);
            };
            setSelectedWinner(0);
            gvmMethods.handleGameObjChange(game, setGameObj);
        });

        player.socket.on('sendingInGameEvent7', (game: any) => {
            gModel.initNextRound(setActiveBBSelect, setGameTurn, setActivePot, setActiveRound, game);
            player.newRoundInitiated();
            setRoundTransition(false);
            setWinnerChosen(false);
            setSidePotActive(false);
            setSidePots([]);
            setSidePotWinnersChosen(false);
            player.setInGameInfo(gModel);
            gvmMethods.handleGameObjChange(game, setGameObj);
            player.socket.emit('event13', gModel.bigBlind, gModel.smallBlind);
            blindPositions.setPosition(gModel.bigBlind, setBBIndicatorTop, setBBIndicatorLeft);
        });

        player.socket.on('sendingInGameEvent6Side', (sidePotWinnerTurn: any, game: any, potIndex: any) => {
            if (player.turn == sidePotWinnerTurn) {
                player.winnerOfRound(game.playerDisplayChips[player.turn - 1]);
            };

            setCurrentSidePot(potIndex + 1);

            if (potIndex + 1 === totalSidePots) {
                setSidePotActive(false);
                setSidePotWinnersChosen(true);
                setCurrentSidePot(0);
            }

            setSidePotWinner(0);
            gvmMethods.handleGameObjChange(game, setGameObj);
        });

        player.socket.on('sendingInGameMenuEvent1', (game: any, totalChips: any, pAddOnTurn: any) => {
            gModel.handleAddOn(setResponseText, setReadyResponse, game, pAddOnTurn);
            gvmMethods.handleGameObjChange(game, setGameObj);
        });

        player.socket.on('sendingInGameMenuEvent2', (game: any) => {
            gModel.handleGameSizeChange(game.roomSize);
            gvmMethods.handleGameObjChange(game, setGameObj);
            blindPositions.roomSizeChange(game.roomSize);
        });

        player.socket.on('event11', (pJoiningTurn: any) => {
            if (gameObj.host == player.turn) {
                player.socket.emit('event12', gModel, pJoiningTurn);
            }
        });

        player.socket.once('sendingBackEvent12', (gModelSent: any, game: any, pJoiningTurn: any) => {
            if (player.turn == pJoiningTurn) {
                let holder = JSON.stringify(gModelSent);
                let parseHolder = JSON.parse(holder);
                gModel.completeUpdate(parseHolder);
                setGameStarted(true);
                setRoundTransition(true);
                setWinnerChosen(true);
                blindPositions.setPosition(gModel.bigBlind, setBBIndicatorTop, setBBIndicatorLeft);
                player.setInGameInfo(gModel);
                gvmMethods.handleGameObjChange(game, setGameObj);
            } 
        });

        player.socket.on('sendingEvent13', (game: any) => {
            gvmMethods.handleGameObjChange(game, setGameObj);
            player.setChips(game);
        })

        player.socket.on('sendingBackPlayerDisplayEvent1_Side', (lastSelection: any) => {
            gvmMethods.setPlayerCurrentSelectorFunc(lastSelection, setCurrentPositionSelection, setInitPlayerDisplays);
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
            player.setInfoOnPlayerDisplaySubmit(pTurn, setPlayerPositionSelected);
            setPlayerPositionSelected(true);
            setInitPlayerDisplays(false);
        })

        player.socket.on('event6Fail', () => {
            setPDisplayError(true);

            setTimeout(() => {
                setPDisplayError(false);
            }, 2500);
        })

        setTimeout(() => {
            setLoaded(true)
        }, 2000)
    }, [])

    const pokerTable = (
        <Image 
            source={require('@/assets/images/final_poker_table.png')}
            style={[style.pokerTableImage]}
            alt='img'
            onLoadEnd={() => {
                setTimeout(() => {
                    setLoaded(true)
                }, 2000)
            }}
        />
    )

    const inGameMenu = (
        <Animated.View style={[{marginLeft: leftValue, display: inGameMenuActive === true ? 'flex' : 'none'}, style.inGameMenuView]} >
        
            <TouchableOpacity style={style.closeMenuButton} disabled={menuAnimationActive}
                onPress={() => gvmMethods.toggleInGameMenu(setMenuButton, menuButton, triggerGameMenuAnimation, moveMenu, windowOpen, setWindowOpen)}
            >
                <Icon2 name='long-arrow-left' size={40} style={{alignSelf: 'center'}}></Icon2>
            </TouchableOpacity>

            <View style={style.menuGameCodeContainer}>
                <Text style={style.menuGameCodeTextPt1}><Text style={style.menuGameCodeTextPt2}>Game Code: </Text>{gameObj.gameCode}</Text>
            </View>

            <TouchableOpacity style={style.gameInfoButton}
                onPress={() => gvmMethods.toggleGameInfoWindow(triggerGameMenuAnimation, setGameInfoDisplay, gameInfoDisplay, moveMenu)}
            >
                <Text style={style.inGameMenuButtonText}>Game Info</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[style.addOnButton, {opacity: gameObj.gameStyle === 'Tournament' ? 0.4 : !playerPositionSelected ? 0.4 : 1}]} disabled={gameObj.gameStyle === 'Tournament' || !playerPositionSelected}
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

    const inGameMenuButton = (
        <TouchableOpacity style={{position: 'absolute', top: '10%', left: '10%', height: 30, width: 30, backgroundColor: 'lavender', borderRadius: 5, flex: 1, justifyContent: 'center', display: playerView === 0 && menuButton ? 'flex' : 'none'}}
            onPress={() => gvmMethods.toggleInGameMenu(setMenuButton, menuButton, triggerGameMenuAnimation, moveMenu, windowOpen, setWindowOpen)}
        >
            <Icon3 name='menu' color={'black'} size={25} style={{alignSelf: 'center'}}></Icon3>
        </TouchableOpacity>
    )

    for (let i = 0; i < gameObj.roomSize; i++) {
        if (gameObj.playerDisplayNames[i]) {
            playerDisplays.push(
                <TouchableOpacity key={i + 1} style={[{top: playerPositions[i].pTop, left: playerPositions[i].pLeft, borderColor: (toggleBBSelect === true && activeBBSelect === i + 1 ) || (roundTransition === true && !winnerChosen && selectedWinner === i + 1 || sidePotWinner === i + 1) ? 'blue' : (gameTurn === i + 1 && !roundTransition) ? 'lightcoral' : 'black'}, style.playerBorders]}  disabled={!initSelectBorder}
                    onPress={() => gvmMethods.toggleBorderSelection(toggleBBSelect, setActiveBBSelect, roundTransition, winnerChosen, setSelectedWinner, i + 1, sidePotActive, setSidePotWinner)}
                >
                    <Text style={style.playerBorderDisplayName} numberOfLines={1}>{gameObj.playerDisplayNames[i]}</Text>
                    <Text style={style.playerBorderDisplayChips}>{gameObj.playerDisplayChips[i]}</Text>
                </TouchableOpacity>
            )

            buyInsArr.push(
                <Text key={i} style={style.buyInsText}>{gameObj.playerDisplayNames[i]}: {gameObj.playerDisplayChips[i]}</Text>
            );

            totalBuyIns.push(
                <Text key={i} style={style.totalBuyInsText}>{gameObj.playerDisplayNames[i]}: {gameObj.totalBuyIns[i]}</Text>
            )

        } else {
            playerDisplays.push(
                <TouchableOpacity key={i + 1} style={[{top: playerPositions[i].pTop, left: playerPositions[i].pLeft, borderColor: (toggleBBSelect === true && activeBBSelect === i + 1 ) || (roundTransition === true && !winnerChosen && selectedWinner === i + 1 || sidePotWinner === i + 1) ? 'blue' : (gameTurn === i + 1 && !roundTransition) ? 'lightcoral' : 'black'}, style.playerBorders]} disabled={!toggleBBSelect && playerPositionSelected || initPlayerDisplays}
                    onPress={() => gvmMethods.togglePlayerSelectsPosition(player, i + 1, setAnyWindowOpen)}
                >
                    <Text style={style.playerBorderDisplayName}></Text>
                    <Text style={style.playerBorderDisplayChips}></Text>
                </TouchableOpacity>
            )
        }
    }

    const gameInfo = (
        <View style={[{zIndex: gameStarted && !winnerChosen && !roundTransition ? 1 : -1001}, style.gameInfoView]}>
            <View style={{alignSelf: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                <Image 
                    source={require('@/assets/images/pot_chips_display.png')}
                    style={{width: 20, height: 20}}
                />
                <Text style={style.gameInfoPot}> {activePot}</Text>
            </View>
            <Text style={style.gameInfoRound}>{activeRound}</Text>
        </View>
    )

    const startButton = (
        <TouchableOpacity style={[{display: !toggleBBSelect && !gameStarted && player.socket.id == gameObj.host ? 'flex' : 'none'}, style.startButton]}
            onPress={() => gvmMethods.playerChoosingBlinds(setToggleBBSelect, toggleBBSelect, setInitSelectBorder, initSelectBorder, gameObj, setGameNotFull)}
        >
            <Text style={style.startButtonText}>Start</Text>
        </TouchableOpacity>
    )

    const bigBlindIndicator = (
        <Animated.View style={{width: '7%', height: '3.5%', backgroundColor: 'lightcoral', borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderWidth: 1, zIndex: -1, borderStyle: 'solid', borderColor: 'lightcoral', top: bbIndicatorTop != null ? bbIndicatorTop : '0%', left: bbIndicatorLeft != null ? bbIndicatorLeft : '0%', display: gameStarted && !roundTransition ? 'flex' : 'none'}}>
            <Text style={{fontFamily: 'Copperplate', fontSize: 14, textAlign: 'center', lineHeight: 14, color: 'white', letterSpacing: 0}}>BB</Text>
        </Animated.View>
    )

    const beginButton = (
        <TouchableOpacity style={style.beginButton}
            onPress={() => gvmMethods.initGame(player, activeBBSelect, setInitSelectBorder, gameObj.roomSize)} 
        >
            <Text style={style.beginButtonText}>Begin</Text>
        </TouchableOpacity>
    )
        
    const bigBlindSelectionWindow = (
        <View style={[{ display: toggleBBSelect === true ? 'flex' : 'none'}, style.blindSelectionView]}>
            <Text style={style.blindSelectionViewText1}>Choose The Big Blind</Text>
            <Text style={style.blindSelectionViewText2}>(Tap On The Borders)</Text>
            {beginButton}
        </View>
    )

    const playerViewBttn = (
        <TouchableOpacity onPress={() => switchView()} style={[style.playerViewBttn, {display: gameStarted && !roundTransition && !windowOpen ? 'flex' : 'none'}]}>
            <Text style={style.playerViewBttnText}>Player View</Text>
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

    const addOnWindow = (
        <KeyboardAvoidingView
            style={{position: 'absolute', height: '100%', width: '100%', top: '0%', left: '0%'}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
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
                    <Text style={style.addOnWindowRestrictionText}>Please Wait Until The Current Round Is Over To Add-On</Text>
                </View>
            </View>
        </View>
        </KeyboardAvoidingView>
    )

    const changeGameSizeWindow = (
        <View style={[{display: changeRS === true ? 'flex' : 'none'}, style.changeGsView]}>
            <TouchableOpacity style={style.closeMenuWindowButton}
                onPress={() => gvmMethods.toggleRoomSizeChangeWindow(player, gameObj, setChangeRS, changeRS, triggerGameMenuAnimation, changeRSOptions, setChangeRSOptions, moveMenu)}
            >
                <Text style={style.closeMenuWindowButtonText}>X</Text>
            </TouchableOpacity>

            <View style={{display: gameStarted && roundTransition || !gameStarted && !toggleBBSelect ? 'flex' : 'none'}}>
                <Text style={style.changeGsTextHeader}>Change Game Size</Text>

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

                <View style={style.changeGsOptionView2}>
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

            <View style={{display: gameStarted && !roundTransition || !gameStarted && toggleBBSelect ? 'flex' : 'none'}}>
                <View style={style.changeGsRestrictionView}>
                    <Text style={style.changeGsRestrictionText}>Please Wait Until The Current Round Is Over To Change The Game Size</Text>
                </View>
            </View>
        </View>
    )

    const leaveGameConfirmation = (
        <View style={[{display: initLeaveGame === true ? 'flex' : 'none'}, style.leaveGameView]}>
            <Text style={style.leaveGameViewHeaderText}>Are You Sure You Want To Leave The Game?</Text>
            <View style={style.leaveGameInnerView}>
                <TouchableOpacity style={style.leaveGameConfirmButton}
                    onPress={() => gvmMethods.playerLeavesGame(player, router)}
                >
                    <Text style={style.leaveGameConfirmButtonText}>Yes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.leaveGameDeclineButton}
                    onPress={() => gvmMethods.toggleLeaveGame(setInitLeaveGame, initLeaveGame, triggerGameMenuAnimation, moveMenu)}
                >
                    <Text style={style.leaveGameDeclineButtonText}>No</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    const submitWinnerButton = (
        <TouchableOpacity style={style.submitWinnerButton}
            onPress={() => gvmMethods.submitWinner(selectedWinner, player, activePot, setWinnerChosen, setInitSelectBorder)}
        >
            <Text style={style.submitWinnerButtonText}>Submit</Text>
        </TouchableOpacity>
    )

    const winnerSelectionWindow = (
        <View style={[{display: !sidePotActive && roundTransition === true && winnerChosen === false && player.socket.id == gameObj.host ? 'flex' : 'none'}, style.winnerSelectionView]}>
            <Text style={style.winnerSelectionText1}>Select The Winner</Text>
            <Text style={style.winnerSelectionText2}>Pot: {activePot}</Text>
            <Text style={style.winnerSelectionText3}>(Tap On The Borders)</Text>
            {submitWinnerButton}
        </View>
    )

    const nextRoundButton = (
        <TouchableOpacity style={[{display: roundTransition && winnerChosen && player.socket.id == gameObj.host ? 'flex' : 'none'}, style.nextRoundButton]}
            onPress={() => gvmMethods.initNewRound(player, activeBBSelect, gModel.holderGameArr)}
        >
            <Text style={style.nextRoundButtonText}>Start Next Round</Text>
        </TouchableOpacity>
    )

    for (let i = 0; i < totalSidePots; i++) {
        top += 20;
        sidePotsArr.push(
            <View key={i} style={[{display: sidePotActive && !sidePotWinnersChosen && roundTransition && !winnerChosen && player.socket.id == gameObj.host && currentSidePot == i ? 'flex' : 'none'}, style.winnerSelectionView]}>
                <Text style={style.winnerSelectionText1}>Select The Winner (Side Pot {i + 1})</Text>
                <Text style={style.winnerSelectionText2}>Pot: {sidePots[i]}</Text>
                <Text style={style.winnerSelectionText3}>(Tap On The Borders)</Text>
                <TouchableOpacity style={style.submitWinnerButton}
                    onPress={() => gvmMethods.submitSidePotWinner(i, sidePots, sidePotWinner, player)}
                >
                    <Text style={style.submitWinnerButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
        sidePotsInfoArr.push(
            <View key={i} style={[{display: gameStarted && sidePotActive && !winnerChosen && !roundTransition ? 'flex' : 'none', top: top}, style.gameInfoViewSidePot]}>
                <Text style={style.gameInfoPot}>Side Pot ({i + 1}): {sidePots[i]}</Text>
            </View>
        )
    }

    const gameNotFullWarning = (
        <View style={{alignSelf: 'center', position: 'absolute', borderWidth: 1, borderRadius: 5, backgroundColor: 'lavender', flex: 1, top: '50%', borderColor: 'white', zIndex: 10,  justifyContent: 'center', width: '60%', display: gameNotFull ? 'flex' : 'none'}}>
            <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 18, color: 'black', paddingRight: 30, paddingLeft: 30, paddingTop: 20, paddingBottom: 20}}>Game is not full. Please wait for other players to join.</Text>
        </View>
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
                        <Text style={style.pIGDBuyInRangeText}>*Buy In Range: {gameObj.minBuyIn} - {gameObj.maxBuyIn}</Text>
                    </View>
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

                <View style={{width: '90%', alignSelf: 'center', top: '67%', display: pDisplayError ? 'flex' : 'none'}}>
                    <Text style={{fontFamily: 'Copperplate', fontSize: 14, textAlign: 'center', paddingRight: 10, paddingLeft: 10, color: 'red'}}>*An error occured when submitting your player info. Please try again</Text>
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
        <View style={{width: '60%', alignSelf: 'center', position: 'absolute', borderWidth: 1, borderRadius: 5, backgroundColor: 'lavender', flex: 1, top: '52%', borderColor: 'white', zIndex: 10, justifyContent: 'center', display: seatsActiveWarning ? 'flex' : 'none'}}>
            <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 18, color: 'black', paddingRight: 30, paddingLeft: 30, paddingTop: 20, paddingBottom: 20}}>Please select a different position</Text>
        </View>
    )

    return (
        <SafeAreaView style={[style.safeAreaViewContainer, {zIndex: playerView === 0 ? 10 : -10}]}>
            <Animated.View style={[style.testContainer1, {zIndex: playerView === 0 ? 10 : -10, left: 0}]}>
                <LoadingScreen loaded={loaded} />
                <Background opacityChange={false} /> 
                {playerDisplays}
                {inGameMenu}
                {startButton}
                {bigBlindSelectionWindow}
                {gameInfo}
                {playerViewBttn}
                {gameInfoWindow}
                {addOnWindow}
                {changeGameSizeWindow}
                {leaveGameConfirmation}
                {winnerSelectionWindow}
                {nextRoundButton}
                {bigBlindIndicator}
                {sidePotsArr}
                {sidePotsInfoArr}
                {pokerTable}
                {gameNotFullWarning}
                {playerInGameDisplays}
                {seatActiveWarning}
                {inGameMenuButton}
            </Animated.View>
        </SafeAreaView>
    );
};


export default GameView;