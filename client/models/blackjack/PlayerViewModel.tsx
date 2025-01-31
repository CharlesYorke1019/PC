import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, LogBox, Image, Animated, SafeAreaView } from 'react-native';
import style from '@/assets/styles';
import ChipSet from '../ChipSet';
import PlayingCards from '../poker/PlayingCards';

interface PlayerViewProps {
    gameObj: any;
    playerView: number;
    setPlayerView: any;
    player: any;
    gameStarted: any;
    loaded: any;
    chips: any;
}

const PlayerView: React.FC<PlayerViewProps> = ({ gameObj, playerView, setPlayerView, player, gameStarted, loaded, chips}) => {

    LogBox.ignoreAllLogs();

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    let [playerChips, setPlayerChips] = useState(player.chips)
    let [playerBetAmount, setPlayerBetAmount] = useState(player.betAmount)
    let [displayCheckMessage, setDisplayCheckMessage] = useState(false);
    let [currentRound, setCurrentRound] = useState(0);
    let [displayCards, setDisplayCards] = useState(true);
    

    player.setPlayerViewInfo(setPlayerChips, setPlayerBetAmount, setCurrentRound);

    function switchView() {
        setPlayerView(0);
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#2E3238', position: 'absolute', width: '100%', height: '115%', top: '0%', left: '0%', zIndex: playerView === 1 ? 10 : -10}}>
            <Animated.View style={[style.testContainer1, {left: 0, zIndex: playerView === 1 ? 10 : -10}]}>

                <Image 
                    source={require('@/assets/images/new_pv_final.png')}
                    style={{width: windowWidth, height: windowHeight, zIndex: -10}}
                />

                <TouchableOpacity onPress={() => switchView()} style={style.gameViewBttn}>
                    <Text style={style.gameViewBttnText}>Game View</Text>
                </TouchableOpacity>

                <View style={style.playerChipsContainer}>
                    <Text style={style.playerChipsText}><Text style={{fontWeight: 600}}>Chips:</Text> {playerChips}</Text>
                </View>

                <View style={style.playerActionLowerContainer}>
                    <Text style={style.playerBetAmountText}><Text style={{fontWeight: 600}}>Bet Amount:</Text> {playerBetAmount}</Text>

                    <TouchableOpacity style={style.clearBetButton}
                        onPress={() => player.clearsBet()}
                    >
                        <Text style={style.clearBetButtonText}>Clear Bets</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.plusBettingButton}
                        onPress={() => player.plusBetSetting()}
                    >
                        <Text style={style.plusMinusBettingButtonText}>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.minusBettingButton}
                        onPress={() => player.minusBetSetting()}
                    >
                        <Text style={style.plusMinusBettingButtonText}>-</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={style.confirmActionButton}
                    onPress={() => player.confirmsAction()}
                >
                    <Text style={style.confirmActionButtonText}>Confirm</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{backgroundColor: 'lavender', position: 'absolute', top: '67.5%', borderRadius: 5, left: '11.5%'}}>
                    <Text style={{fontSize: 20, fontFamily: 'Copperplate', textAlign: 'center', paddingRight: 20, paddingLeft: 20, paddingBottom: 10, paddingTop: 10, fontWeight: 600}}>Cancel</Text>
                </TouchableOpacity>

                <PlayingCards display={displayCards} setDisplay={setDisplayCards} player={player} />
                <Image 
                    source={require('@/assets/images/playing_cards_outline.png')}
                    style={{width: 200, height: 200, position: 'absolute', left: '47.5%', top: '52.8%', zIndex: -2}}
                    alt='img'
                />

                <ChipSet player={player} value={0.5} leftValue={3.9} imgUrl={require('@/assets/images/gray_chip.png')} />
                <Image 
                    source={require('@/assets/images/gray_chip_stack.png')}
                    style={[{left: 8.5}, style.chipSetImg]}
                />

                <ChipSet player={player} value={1} leftValue={99.9} imgUrl={require('@/assets/images/green_chip.png')} />
                <Image 
                    source={require('@/assets/images/green_chip_stack.png')}
                    style={[{left: 104.5}, style.chipSetImg]}
                />

                <ChipSet player={player} value={5} leftValue={192.5} imgUrl={require('@/assets/images/blue_chip.png')} />
                <Image 
                    source={require('@/assets/images/blue_chip_stack.png')}
                    style={[{left: 197.1}, style.chipSetImg]}
                />

                <ChipSet player={player} value={10} leftValue={289.5} imgUrl={require('@/assets/images/red_chip.png')} />
                <Image 
                    source={require('@/assets/images/red_chip_stack.png')}
                    style={[{left: 294.1}, style.chipSetImg]}
                />
                

                <View style={style.chipDenominationsContainer}>
                    <Text style={[{marginLeft: '7.5%'}, style.chipDenominationsText]}>{chips.smallest}</Text>
                    <Text style={style.chipDenominationsText}>{chips.secondSmallest}</Text>
                    <Text style={style.chipDenominationsText}>{chips.secondLargest}</Text>
                    <Text style={style.chipDenominationsText}>{chips.largest}</Text>
                </View>

            </Animated.View>
        </SafeAreaView>
    );
};

export default PlayerView;