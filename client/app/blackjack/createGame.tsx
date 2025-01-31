import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native"
import { useState, useRef, memo } from "react";
import { router } from "expo-router";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import socket from '@/models/Socket'
import Icon from 'react-native-vector-icons/Ionicons'
import Background from "@/models/Background";

export default memo (function createGame() {
    
    let [activeButton, setActiveButton] = useState(0);
    let [roomSizeMissing, setRoomSizeMissing] = useState(false);
    let [svScrollable, setSVScrollable] = useState(true);
    let [minBet, setMinBet] = useState(0);
    let [minBetMissing, setMinBetMissing] = useState(false);
    let [bbMinRangeInput, setBBMinRangeInput] = useState(10);
    let [bbMaxRangeInput, setBBMaxRangeInput] = useState(40);
    let [chipUnits, setChipUnits] = useState(2);
    let [insurance, setInsurance] = useState(0);
    let [soft17, setSoft17] = useState(0);

    let minBetInputHolder;

    const scrollRef = useRef<ScrollView>(null);
    const anteRef = useRef<TextInput>(null);

    function setRS(input: any) {
        setActiveButton(input);
    }

    function relativeChipUnits() {
        if (minBet != 0) {
            let minBetStr = minBet.toString();
            if (minBetStr.includes('.')) {
                setChipUnits(.01);
            } else {
                setChipUnits(1);
            }
        }
    }

    function setMinBetFunc(input: any){
        setMinBet(input);
    }

    function setBBRange(v1: any, v2: any){
        setBBMinRangeInput(v1);
        setBBMaxRangeInput(v2)
        setSVScrollable(false)
    }

    function setInsuranceFunc(input: any){
        setInsurance(input);
    }

    function setSoft17Func(input: any){
        setSoft17(input);
    }

    function createGame() {
        socket.emit('event1', {roomSize: activeButton, ante: minBet, gameStyle: 'none', maxBuyIn: bbMaxRangeInput, minBuyIn: bbMinRangeInput, gameType: 'BlackJack', straddle: false})
    }

    socket.on('event2CG', (gameInfo: any) => {
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
                seatsActive: gameInfo.seatsActive,
                straddle: gameInfo.straddle
            }
        });
    });

    socket.on('event2FailedCG', (missingInfo: any) => {
        if (missingInfo.includes(1)) {
            setRoomSizeMissing(true);
        } 
        if (missingInfo.includes(2)) {
            setMinBetMissing(true);
        }

        scrollRef.current?.scrollTo({y: 0})

        setTimeout(() => {
            setRoomSizeMissing(false);
            setMinBetMissing(false);
        }, 3500);
    })

    return (
        <TouchableWithoutFeedback style={{backgroundColor: '#2E3238', position: 'absolute'}} onPress={() => Keyboard.dismiss()}>
            
            <View style={styles.container}>

                <Background opacityChange={false} />

                <View style={{display: 'flex', flex: 1, justifyContent: 'center', flexDirection: 'row', marginTop: '20%', alignSelf: 'center'}}>
                    <TouchableOpacity style={{marginRight: '3%', marginLeft: '-10%'}} 
                        onPress={() => router.push({
                            pathname: '/'
                        })}
                    >
                        <Icon name="return-up-back-sharp" size={35} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.createGamePageTitle}>Game Settings</Text>
                </View>

                <TouchableOpacity style={{alignContent: 'center', alignSelf: 'center', borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, borderColor: 'lavender', backgroundColor: 'lavender', position: 'absolute', top: '83.5%', width: '45%'}}
                    onPress={() => createGame()}
                >
                    <Text style={{fontFamily: 'Copperplate', fontSize: 20, paddingTop: 7, paddingBottom: 7, color: 'black', textAlign: 'center', paddingLeft: 15, paddingRight: 15}}>Create Game</Text>
                </TouchableOpacity>

                <ScrollView style={{alignSelf: 'center', width: '90%', height: '65%', borderWidth: 3, borderRadius: 5, borderColor: 'white', position: 'absolute', top: '14%', backgroundColor: '#2E3238'}}  contentContainerStyle={{justifyContent: 'center', alignItems: 'center', padding: 10}} scrollsToTop={false} showsVerticalScrollIndicator={false} scrollEnabled={svScrollable} ref={scrollRef}>
                    
                    <View style={{width: '100%', height: '100%'}} onStartShouldSetResponder={() => true}>

                        <View style={{width: '100%', marginBottom: 20, borderBottomWidth: 4, borderColor: 'white', borderRadius: 5, justifyContent: 'center'}}>
                            <Text style={{textAlign: 'center', marginBottom: 20, marginTop: 20, fontFamily: 'Copperplate', color: 'white', fontSize: 20}}>Game type: Black Jack</Text>
                        </View>

                        <Text style={{fontSize: 28, alignSelf: 'center', marginBottom: 15, fontFamily: 'Copperplate', color: roomSizeMissing ? '#E64F51' : 'white'}}>Table Size</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 7}}>
                
                            <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 2 ? 'lightcoral' : 'transparent', borderTopRightRadius: 15, borderBottomLeftRadius: 15, marginRight: 5, borderColor: activeButton === 2 ? 'lightcoral' : 'white'}} 
                                onPress={() => setRS(2)}
                            >
                                <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28, color: 'white'}}>2</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 3 ? 'lightcoral' : 'transparent', borderTopRightRadius: 15, borderBottomLeftRadius: 15, marginRight: 5, borderColor: activeButton === 3 ? 'lightcoral' : 'white'}}
                                onPress={() => setRS(3)}
                            >
                                <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28, color: 'white'}}>3</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 4 ? 'lightcoral' : 'transparent', borderTopRightRadius: 15, borderBottomLeftRadius: 15, marginRight: 5, borderColor: activeButton === 4 ? 'lightcoral' : 'white'}}
                                onPress={() => setRS(4)}
                            >
                                <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28, color: 'white'}}>4</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 5 ? 'lightcoral' : 'transparent', borderTopRightRadius: 15, borderBottomLeftRadius: 15, marginRight: 5, borderColor: activeButton === 5 ? 'lightcoral' : 'white'}}
                                onPress={() => setRS(5)}
                            >
                                <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28, color: 'white'}}>5</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: '6%'}}>
                            <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 6 ? 'lightcoral' : 'transparent', borderTopRightRadius: 15, borderBottomLeftRadius: 15, marginRight: 5, borderColor: activeButton === 6 ? 'lightcoral' : 'white'}}
                                onPress={() => setRS(6)}
                            >
                                <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28, color: 'white'}}>6</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 7 ? 'lightcoral' : 'transparent', borderTopRightRadius: 15, borderBottomLeftRadius: 15, marginRight: 5, borderColor: activeButton === 7 ? 'lightcoral' : 'white'}}
                                onPress={() => setRS(7)}
                            >
                                <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28, color: 'white'}}>7</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 8 ? 'lightcoral' : 'transparent', borderTopRightRadius: 15, borderBottomLeftRadius: 15, marginRight: 5, borderColor: activeButton === 8 ? 'lightcoral' : 'white'}}
                                onPress={() => setRS(8)}
                            >
                                <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28, color: 'white'}}>8</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 9 ? 'lightcoral' : 'transparent', borderTopRightRadius: 15, borderBottomLeftRadius: 15, marginRight: 5, borderColor: activeButton === 9 ? 'lightcoral' : 'white'}}
                                onPress={() => setRS(9)}
                            >
                                <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28, color: 'white'}}>9</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{alignContent: 'center', marginTop: '9%',borderRadius: 5, width: '100%',  borderTopWidth: 4, borderColor: 'white' }}>
                            <Text style={{fontSize: 30, marginBottom: 15, alignSelf: 'center', fontFamily: 'Copperplate', marginTop: 15, color: minBetMissing ? '#E64F51' : 'white'}}>Min Bet</Text>
                            <View style={{width: 100, alignSelf: 'center', marginBottom: 10}}>
                                <TextInput 
                                    value={minBetInputHolder}
                                    onChangeText={(minBet) => setMinBetFunc(Number(minBet))}
                                    onEndEditing={() => relativeChipUnits()}
                                    style={{backgroundColor: 'transparent', borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, borderTopRightRadius: 15, borderBottomLeftRadius: 15, borderColor: 'white', textAlign: 'center', height: 35, color: 'white', fontFamily: 'Copperplate', fontSize: 20}}
                                    keyboardType='numeric'
                                    placeholder="min bet"
                                    ref={anteRef}
                                />
                            </View>

                        </View>

                        <View style={{alignContent: 'center', alignItems: 'center', marginTop: '9%', borderRadius: 5, width: '100%',  borderTopWidth: 4, borderColor: 'white' }}>
                            <Text style={{fontSize: 28, marginBottom: 20, alignSelf: 'center', fontFamily: 'Copperplate', marginTop: 15, color: 'white'}}>Chip Units</Text>
                            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                                <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, borderColor: chipUnits === 1 ? 'lightcoral' : 'white', marginBottom: 10, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: chipUnits === 1 ? 'lightcoral' : 'transparent', width: 60, height: 40, alignItems: 'center', justifyContent: 'center', marginRight: 15}}
                                    onPress={() => setChipUnits(1)}
                                >
                                    <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20, color: 'white'}}>1</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, borderColor: chipUnits === .01 ? 'lightcoral' : 'white', borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: chipUnits === .01 ? 'lightcoral' : 'transparent', width:60, height: 40, alignItems: 'center', justifyContent: 'center'}}
                                    onPress={() => setChipUnits(.01)}
                                >
                                    <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20, color: 'white'}}>.01</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                        <View style={{alignContent: 'center', alignItems: 'center', marginTop: '9%', borderRadius: 5, width: '100%', borderTopWidth: 4, borderColor: 'white' }}>
                            <Text style={{fontSize: 28, marginBottom: 7, alignSelf: 'center', fontFamily: 'Copperplate', marginTop: 15, color: 'white'}}>Buy In Range</Text>
                            <Text style={{fontSize: 16, marginBottom: 10, alignSelf: 'center', fontFamily: 'Copperplate', color: 'white'}}>{bbMinRangeInput} MB - {bbMaxRangeInput} MB ({bbMinRangeInput * minBet} - {bbMaxRangeInput * minBet})</Text>
                            <MultiSlider 
                                values={[bbMinRangeInput, bbMaxRangeInput]}
                                enabledOne={true}
                                enabledTwo={true}
                                step={10}
                                min={10}
                                max={100}
                                sliderLength={250}
                                selectedStyle={{borderWidth: 2, borderColor: 'lightcoral'}}
                                unselectedStyle={{borderColor: 'lavender', borderWidth: 1}}
                                markerStyle={{backgroundColor: 'lavender'}}
                                onValuesChange={(nArr) =>  setBBRange(nArr[0], nArr[1])}
                                onValuesChangeFinish={() => setSVScrollable(true)}
                                snapped={true}
                                allowOverlap={false}
                                minMarkerOverlapDistance={0}
                            />
                        </View>

                        <View style={{alignContent: 'center', alignItems: 'center', marginTop: '9%', borderRadius: 5, width: '100%',  borderTopWidth: 4, borderColor: 'white' }}>
                            <Text style={{fontSize: 28, marginBottom: 20, alignSelf: 'center', fontFamily: 'Copperplate', marginTop: 15, color: 'white'}}>Insurance</Text>
                            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                                <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, borderColor: insurance === 1 ? 'lightcoral' : 'white', marginBottom: 10, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: insurance === 1 ? 'lightcoral' : 'transparent', width: 60, height: 40, alignItems: 'center', justifyContent: 'center', marginRight: 15}}
                                    onPress={() => setInsuranceFunc(1)}
                                >
                                    <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20, color: 'white'}}>On</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, borderColor: insurance === 2 ? 'lightcoral' : 'white', borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: insurance === 2 ? 'lightcoral' : 'transparent', width:60, height: 40, alignItems: 'center', justifyContent: 'center'}}
                                    onPress={() => setInsuranceFunc(2)}
                                >
                                    <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20, color: 'white'}}>Off</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                        <View style={{alignContent: 'center', alignItems: 'center', marginTop: '9%', borderRadius: 5, width: '100%',  borderTopWidth: 4, borderColor: 'white', marginBottom: '10%' }}>
                            <Text style={{fontSize: 28, marginBottom: 20, alignSelf: 'center', fontFamily: 'Copperplate', marginTop: 15, color: 'white'}}>Hit on soft 17</Text>
                            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                                <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, borderColor: soft17 === 1 ? 'lightcoral' : 'white', marginBottom: 10, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: soft17 === 1 ? 'lightcoral' : 'transparent', width: 60, height: 40, alignItems: 'center', justifyContent: 'center', marginRight: 15}}
                                    onPress={() => setSoft17Func(1)}
                                >
                                    <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20, color: 'white'}}>On</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, borderColor: soft17 === 2 ? 'lightcoral' : 'white', borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: soft17 === 2 ? 'lightcoral' : 'transparent', width:60, height: 40, alignItems: 'center', justifyContent: 'center'}}
                                    onPress={() => setSoft17Func(2)}
                                >
                                    <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20, color: 'white'}}>Off</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                    </View>

                </ScrollView>

            </View>
        </TouchableWithoutFeedback>
    )
});

const styles = StyleSheet.create({
    container: {
      position: 'absolute', width: '100%', height: '120%', top: '0%', left: '0%', backgroundColor: '#2E3238'
    },
    createGamePageTitle: {
      fontSize: 32, textAlign: 'center', fontFamily: 'Copperplate', color: 'white', fontWeight: 'bold'
    },
    backBttn: {
        position: 'absolute', left: '5%', top: '8%'
    }
});