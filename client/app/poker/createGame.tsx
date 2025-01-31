import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native"
import { useState, useRef, memo } from "react";
import { router } from "expo-router";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import socket from '@/models/Socket'
import Icon from 'react-native-vector-icons/Ionicons'
import Background from "@/models/Background";

export default memo (function createGame () {

    let [activeButton, setActiveButton] = useState(0);
    let [chipUnits, setChipUnits] = useState(2);
    let [progressiveBlinds, setProgressiveBlinds] = useState(false)
    let [gameStyle, setGameStyle] = useState('Cash')
    let [ante, setAnte] = useState<any>(0);
    let [svScrollable, setSVScrollable] = useState(true);
    let [bbMinRangeInput, setBBMinRangeInput] = useState(10);
    let [bbMaxRangeInput, setBBMaxRangeInput] = useState(40);
    let [roomSizeMissing, setRoomSizeMissing] = useState(false);
    let [anteMissing, setAnteMissing] = useState(false);
    let [straddle, setStraddle] = useState(false);

    let anteInputHolder;

    const anteRef = useRef<TextInput>(null);
    const scrollRef = useRef<ScrollView>(null);

    function setRs(input: any) {
        setActiveButton(input);
    }

    function relativeChipUnits(){
        if (ante != 0) {
            let anteStr = ante.toString();
            if (anteStr.includes('.')) {
                setChipUnitsFunc(.01);
            } else {
                setChipUnitsFunc(1);
            }
        }
    }   

    function setBBRange(v1: any, v2: any){
        setBBMinRangeInput(v1);
        setBBMaxRangeInput(v2)
        setSVScrollable(false)
    }

    function setAnteFunc(input: any){
        setAnte(input);
    }

    function setGameStyleInput(v: any){
        if (v === 'Tournament') {
            setProgressiveBlindInput(true);
        } 
        setGameStyle(v)
    }

    function setProgressiveBlindInput(v: any){
        setProgressiveBlinds(v);
    }

    function setChipUnitsFunc(v: any){
        setChipUnits(v);
    }

    function setStraddlingFunc(v: any){
        if (v) {
            if (activeButton != 2) {
                setStraddle(v)
            } else {
                setStraddle(false);
            }
        } else {
            setStraddle(v);
        }
    }

    function createGame () {
        socket.emit('event1', {roomSize: activeButton, ante: ante, gameStyle: gameStyle, maxBuyIn: Number(bbMaxRangeInput) * ante, minBuyIn: Number(bbMinRangeInput) * ante, gameType: 'Poker', straddle: straddle})
    } 

    socket.on('event2CG', (gameInfo: any) => {
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
                ante: gameInfo.ante,
                seatsActive: gameInfo.seatsActive,
                straddle: gameInfo.straddle
            }
        });
    })

    socket.on('event2FailedCG', (info1: any) => {
        if (info1.includes(1)) {
            setRoomSizeMissing(true);
        }
        if (info1.includes(2)) {
            setAnteMissing(true);
        }

        scrollRef.current?.scrollTo({y: 0})

        setTimeout(() => {
            setRoomSizeMissing(false);
            setAnteMissing(false);
        }, 3500);
    })

    return (
        <TouchableWithoutFeedback style={{backgroundColor: '#2E3238', position: 'absolute'}} onPress={() => Keyboard.dismiss()}>

            <View style={styles.container} >

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

                <ScrollView style={{alignSelf: 'center', width: '90%', height: '65%', borderWidth: 3, borderRadius: 5, borderColor: 'white', position: 'absolute', top: '14%', backgroundColor: '#2E3238', zIndex: 10}}  contentContainerStyle={{justifyContent: 'center', alignItems: 'center', padding: 10}} scrollsToTop={false} showsVerticalScrollIndicator={false} scrollEnabled={svScrollable}  ref={scrollRef} > 
                    
                    <View style={{width: '100%', height: '100%'}} onStartShouldSetResponder={() => true}>

                        <View style={{width: '100%', marginBottom: 20, borderBottomWidth: 4, borderColor: 'white', borderRadius: 5, justifyContent: 'center'}}>
                            <Text style={{textAlign: 'center', marginBottom: 20, marginTop: 20, fontFamily: 'Copperplate', color: 'white', fontSize: 20}}>Game type: Poker</Text>
                        </View>

                        <Text style={{fontSize: 28, alignSelf: 'center', marginBottom: 15, fontFamily: 'Copperplate', color: roomSizeMissing ? '#E64F51' : 'white'}}>Table Size</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 7}}>
                
                            <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 2 ? 'lightcoral' : 'transparent', borderTopRightRadius: 15, borderBottomLeftRadius: 15, marginRight: 5, borderColor: activeButton === 2 ? 'lightcoral' : 'white'}} 
                                onPress={() => setRs(2)}
                            >
                                <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28, color: 'white'}}>2</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 3 ? 'lightcoral' : 'transparent', borderTopRightRadius: 15, borderBottomLeftRadius: 15, marginRight: 5, borderColor: activeButton === 3 ? 'lightcoral' : 'white'}}
                                onPress={() => setRs(3)}
                            >
                                <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28, color: 'white'}}>3</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 4 ? 'lightcoral' : 'transparent', borderTopRightRadius: 15, borderBottomLeftRadius: 15, marginRight: 5, borderColor: activeButton === 4 ? 'lightcoral' : 'white'}}
                                onPress={() => setRs(4)}
                            >
                                <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28, color: 'white'}}>4</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 5 ? 'lightcoral' : 'transparent', borderTopRightRadius: 15, borderBottomLeftRadius: 15, marginRight: 5, borderColor: activeButton === 5 ? 'lightcoral' : 'white'}}
                                onPress={() => setRs(5)}
                            >
                                <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28, color: 'white'}}>5</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: '6%'}}>
                            <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 6 ? 'lightcoral' : 'transparent', borderTopRightRadius: 15, borderBottomLeftRadius: 15, marginRight: 5, borderColor: activeButton === 6 ? 'lightcoral' : 'white'}}
                                onPress={() => setRs(6)}
                            >
                                <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28, color: 'white'}}>6</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 7 ? 'lightcoral' : 'transparent', borderTopRightRadius: 15, borderBottomLeftRadius: 15, marginRight: 5, borderColor: activeButton === 7 ? 'lightcoral' : 'white'}}
                                onPress={() => setRs(7)}
                            >
                                <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28, color: 'white'}}>7</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 8 ? 'lightcoral' : 'transparent', borderTopRightRadius: 15, borderBottomLeftRadius: 15, marginRight: 5, borderColor: activeButton === 8 ? 'lightcoral' : 'white'}}
                                onPress={() => setRs(8)}
                            >
                                <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28, color: 'white'}}>8</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 9 ? 'lightcoral' : 'transparent', borderTopRightRadius: 15, borderBottomLeftRadius: 15, marginRight: 5, borderColor: activeButton === 9 ? 'lightcoral' : 'white'}}
                                onPress={() => setRs(9)}
                            >
                                <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28, color: 'white'}}>9</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{alignContent: 'center', marginTop: '9%',borderRadius: 5, width: '100%',  borderTopWidth: 4, borderColor: 'white' }}>
                            <Text style={{fontSize: 30, marginBottom: 15, alignSelf: 'center', fontFamily: 'Copperplate', marginTop: 15, color: anteMissing ? '#E64F51' : 'white'}}>Ante</Text>
                            <View style={{width: 100, alignSelf: 'center', marginBottom: 10}}>
                                <TextInput 
                                    value={anteInputHolder}
                                    onChangeText={(anteInput) => setAnteFunc(Number(anteInput))}
                                    onEndEditing={() => relativeChipUnits()}
                                    style={{backgroundColor: 'transparent', borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, borderTopRightRadius: 15, borderBottomLeftRadius: 15, borderColor: 'white', textAlign: 'center', height: 35, color: 'white', fontFamily: 'Copperplate', fontSize: 20}}
                                    keyboardType='numeric'
                                    placeholder="ante"
                                    ref={anteRef}
                                    placeholderTextColor={'#96A190'}
                                />
                            </View>
                        </View>

                        <View style={{alignContent: 'center', alignItems: 'center', marginTop: '9%', borderRadius: 5, width: '100%',  borderTopWidth: 4, borderColor: 'white' }}>
                            <Text style={{fontSize: 28, marginBottom: 10, alignSelf: 'center', fontFamily: 'Copperplate', marginTop: 15, color: 'white'}}>Chip Units</Text>
                            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                                <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, borderColor: chipUnits === 1 ? 'lightcoral' : 'white', marginBottom: 10, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: chipUnits === 1 ? 'lightcoral' : 'transparent', width: 60, height: 40, alignItems: 'center', justifyContent: 'center', marginRight: 15}}
                                    onPress={() => setChipUnitsFunc(1)}
                                >
                                    <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20, color: 'white'}}>1</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, borderColor: chipUnits === .01 ? 'lightcoral' : 'white', borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: chipUnits === .01 ? 'lightcoral' : 'transparent', width:60, height: 40, alignItems: 'center', justifyContent: 'center'}}
                                    onPress={() => setChipUnitsFunc(.01)}
                                >
                                    <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20, color: 'white'}}>.01</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                        <View style={{alignContent: 'center', alignItems: 'center', marginTop: '9%', borderRadius: 5, width: '100%', borderTopWidth: 4, borderColor: 'white' }}>
                            <Text style={{fontSize: 28, marginBottom: 7, alignSelf: 'center', fontFamily: 'Copperplate', marginTop: 15, color: 'white'}}>Buy In Range</Text>
                            <Text style={{fontSize: 16, marginBottom: 10, alignSelf: 'center', fontFamily: 'Copperplate', color: 'white'}}>{bbMinRangeInput} BB - {bbMaxRangeInput} BB ({bbMinRangeInput * ante} - {bbMaxRangeInput * ante})</Text>
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

                        <View style={{alignContent: 'center', marginTop: '9%', borderTopWidth: 4, borderRadius: 5, width: '100%', borderColor: 'white'}}>
                            <Text style={{fontSize: 28, alignSelf: 'center', marginBottom: 15, fontFamily: 'Copperplate', marginTop: 25, color: 'white'}}>Game Style</Text>
                            <View style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'center'}}>
                                <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, borderColor: gameStyle === 'Cash' ? 'lightcoral' : 'white', marginBottom: 15, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: gameStyle === 'Cash' ? 'lightcoral' : 'transparent', width:120, height: 40, marginRight: 15}}
                                    onPress={() => setGameStyleInput('Cash')}
                                >
                                    <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20, lineHeight: 32, color: 'white'}}>Cash</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, borderColor: gameStyle === 'Tournament' ? 'lightcoral' : 'white', borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: gameStyle === 'Tournament' ? 'lightcoral' : 'transparent', width:135, height: 40, marginBottom: 15}}
                                    onPress={() => setGameStyleInput('Tournament')}
                                >
                                    <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20, lineHeight: 32, color: 'white'}}>Tournament</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{alignContent: 'center', marginTop: '9%', borderRadius: 5, width: '100%', marginBottom: '2%', borderTopWidth: 4, borderColor: 'white'}}>
                            <Text style={{fontSize: 26, marginBottom: 30, alignSelf: 'center', fontFamily: 'Copperplate', marginTop: 25, textAlign: 'center', color: 'white'}}>Progressive Blinds</Text>
                            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                                <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, marginBottom: 20, borderTopRightRadius: 15, borderBottomLeftRadius: 15, borderColor: progressiveBlinds === true ? 'lightcoral' : 'white', backgroundColor: progressiveBlinds === true ? 'lightcoral' : 'transparent', width:75, height: 40, alignItems: 'center', justifyContent: 'center', marginRight: 15}}
                                    onPress={() => setProgressiveBlindInput(true)}
                                >
                                    <Text style={{fontFamily: 'Copperplate', fontSize: 20, color: 'white'}}>Yes</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, borderTopRightRadius: 15, borderBottomLeftRadius: 15, borderColor: progressiveBlinds === false ? 'lightcoral' : 'white', backgroundColor: progressiveBlinds === false ? 'lightcoral' : 'transparent', width:75, height: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 20}}
                                    onPress={() => setProgressiveBlindInput(false)}
                                >
                                    <Text style={{fontFamily: 'Copperplate', fontSize: 20, color: 'white'}}>No</Text>    
                                </TouchableOpacity>

                            </View>

                        </View>

                        <View style={{alignContent: 'center', marginTop: '9%', borderTopWidth: 4, borderRadius: 5, width: '100%', borderColor: 'white', marginBottom: '4%'}}>
                            <Text style={{fontSize: 28, alignSelf: 'center', marginBottom: 15, fontFamily: 'Copperplate', marginTop: 25, color: 'white'}}>Straddling</Text>
                            <View style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, marginBottom: 20, borderTopRightRadius: 15, borderBottomLeftRadius: 15, borderColor: straddle === true ? 'lightcoral' : 'white', backgroundColor: straddle === true ? 'lightcoral' : 'transparent', width:75, height: 40, alignItems: 'center', justifyContent: 'center', marginRight: 15}}
                                    onPress={() => setStraddlingFunc(true)}
                                >
                                    <Text style={{fontFamily: 'Copperplate', fontSize: 20, color: 'white'}}>Yes</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, borderTopRightRadius: 15, borderBottomLeftRadius: 15, borderColor: straddle === false ? 'lightcoral' : 'white', backgroundColor: straddle === false ? 'lightcoral' : 'transparent', width:75, height: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 20}}
                                    onPress={() => setStraddlingFunc(false)}
                                >
                                    <Text style={{fontFamily: 'Copperplate', fontSize: 20, color: 'white'}}>No</Text>    
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </View>

        </TouchableWithoutFeedback>
    )
})

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