import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
    pokerTableView: {
        borderWidth: 0, borderRadius: 70, borderColor: 'black', width: 175, height: '80%', alignSelf: 'center', position: 'absolute', top: '-18.5%', zIndex: -1000, shadowColor: 'black', transform: [{perspective: 600}, {rotateX: '45deg'}]
    },
    pokerTableImage: {
        width: '100%', height: '80%', borderRadius: 64, zIndex: -1000, position: 'absolute', top: '17.5%'
    },
    inGameMenuButton: {
        position: 'absolute', left: '0%', top: '14%', height: '7%', alignItems: 'center', justifyContent: 'center', width: '10%', borderWidth: 1, borderRadius: 5, backgroundColor: 'lavender', zIndex: 1
    },
    inGameMenuButtonText: {
        fontFamily: 'Copperplate', fontSize: 32
    },
    inGameMenuView: {
        borderWidth: 3, borderRadius: 5, borderColor: 'lavender', backgroundColor: '#2E3238', width: '60%', height: '80%', left: '-80%', top: '10%', position: 'absolute', zIndex: 1000
    },
    closeMenuButton: {
        borderBottomWidth: 1, borderRadius: 3, backgroundColor: 'lavender', position: 'absolute', top:-2, left: 0, width: '100%'
    },
    closeMenuButtonText: {
        fontFamily: 'Copperplate', fontSize: 32, textAlign: 'center', lineHeight: 40
    },
    menuGameCodeContainer: {
        position: 'absolute', top: '10%', width: '100%'
    },
    menuGameCodeTextPt1: {
        color: 'white', fontSize: 20, textAlign: 'center', fontFamily: 'Courier New', fontWeight: 500, letterSpacing: 1
    },
    menuGameCodeTextPt2: {
        fontFamily: 'Copperplate', fontWeight: 'bold', letterSpacing: 0, fontSize: 18
    },
    inGameMenuButtonText: {
        textAlign: 'center', fontSize: 16, marginRight: 10, marginLeft: 10, fontFamily: 'Copperplate', color: 'white'
    },
    inGameLeaveButtonText: {
        textAlign: 'center', fontSize: 16, marginRight: 10, marginLeft: 10, fontFamily: 'Copperplate', color: 'white', lineHeight: 25

    },
    // borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', position: 'absolute', top: '30%', alignSelf: 'center', borderColor: 'lavender'
    gameInfoButton: {
        borderTopWidth: 1, borderBottomWidth: 1, borderRightWidth: 0, borderLeftWidth: 0, backgroundColor: 'transparent', position: 'absolute', top: '20%', alignSelf: 'center', borderColor: 'lavender', paddingTop: 5, paddingBottom: 5, width: '93%'
    },
    // borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', position: 'absolute', top: '45%', alignSelf: 'center', borderColor: 'lavender'
    addOnButton: {
        borderTopWidth: 1, borderBottomWidth: 1, borderRightWidth: 0, borderLeftWidth: 0, backgroundColor: 'transparent', position: 'absolute', top: '28%', alignSelf: 'center', borderColor: 'lavender', paddingTop: 5, paddingBottom: 5, width: '93%'
    },  
    // borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', position: 'absolute', top: '60%', alignSelf: 'center',  borderColor: 'lavender'
    changeRoomSizeButton: {
        borderTopWidth: 1, borderBottomWidth: 1, borderRightWidth: 0, borderLeftWidth: 0, backgroundColor: 'transparent', position: 'absolute', top: '36%', alignSelf: 'center',  borderColor: 'lavender', paddingTop: 5, paddingBottom: 5, width: '93%'
    },
    // borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', alignSelf: 'center', position: 'absolute', top: '90%', borderColor: 'lavender'
    leaveGameButton: {
        borderTopWidth: 1, borderBottomWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, backgroundColor: 'transparent', alignSelf: 'center', position: 'absolute', top: '94%', borderColor: 'lavender',  paddingTop: 5, paddingBottom: 5, width: '93%'
    },
    playerBorders: {
        borderRadius: 5, backgroundColor: 'lavender', position: 'absolute', width: '27%', borderTopWidth: 3, borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, zIndex: 5
    },
    playerBorderDisplayName: {
        textAlign: 'center', fontFamily: 'Copperplate', fontSize: 16, zIndex: 15, overflow: 'hidden', fontWeight: 600
    },
    playerBorderDisplayChips: {
        textAlign: 'center', fontFamily: 'Copperplate', fontSize: 16
    },
    buyInsText: {
        textAlign: 'center', fontSize: 22, fontFamily: 'Copperplate'
    },
    totalBuyInsText: {
        textAlign: 'center', fontFamily: 'Copperplate', color: 'white', fontSize: 20, marginBottom: 5, alignSelf: 'center'
    },
    gameInfoView: {
        backgroundColor: 'transparent', width: '25%', alignSelf: 'center', position: 'absolute', top: '50%',
    },
    gameInfoPot: {
        textAlign: 'center', fontFamily: 'Copperplate', marginBottom: 0, color: 'white', marginTop: 2.5, marginBottom: 5
    },
    gameInfoRound: {
        textAlign: 'center', fontFamily: 'Copperplate', color: 'white', fontWeight: 600
    },
    startButton: {
        justifyContent: 'center', position: 'absolute', borderWidth: 0, borderTopRightRadius: 15, borderBottomLeftRadius: 15, borderColor: 'black', backgroundColor: 'lavender', top: '55%', alignSelf: 'center', zIndex: 5
    },
    startButtonText: {
        fontFamily: 'Copperplate', fontSize: 16, textAlign: 'center', paddingRight: 12, paddingLeft: 12, paddingTop: 7, paddingBottom: 7
    },
    beginButton: {
        borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', alignSelf: 'center', marginTop: '0%', borderColor: 'lavender'
    },
    beginButtonText: {
        fontFamily: 'Copperplate', textAlign: 'center', fontSize: 16, color: 'black', paddingLeft: 13, paddingRight: 13, paddingTop: 7, paddingBottom: 7
    },
    blindSelectionView: {
        borderWidth: 0, borderRadius: 5, backgroundColor: 'transparent', width: '100%', height: '30%', position: 'absolute',  top: '45%', left: '0%', borderColor: 'white', zIndex: 6
    },
    blindSelectionViewText1: {
        fontSize: 18, textAlign: 'center', marginTop: 15, marginBottom: 0, fontFamily: 'Copperplate', color: 'white'
    },
    blindSelectionViewText2: {
        fontSize: 14, textAlign: 'center', marginTop: 5, marginBottom: 30, fontFamily: 'Copperplate', color: 'white'
    },
    gameInfoWindow: {
        borderWidth: 1, borderRadius: 5, backgroundColor: '#2E3238', alignSelf: 'center', width: '80%', height: '40%', position: 'absolute', top: '30%', borderColor: 'white', borderTopRightRadius: 5, borderTopLeftRadius: 5, zIndex: 10
    },
    closeMenuWindowButton: {
        position: 'absolute', top: '0%', left: '0%', width: '100%', backgroundColor: 'lavender', height: '12.5%'
    },
    closeMenuWindowButtonText: {
        color: 'black', fontSize: 24, fontFamily: 'Copperplate', fontWeight: 'bold', textAlign: 'center', lineHeight: 45
    },
    gameInfoWindowInnerView1: {
        marginTop: 65
    },
    gameInfoWindowText1: {
        textAlign: 'center', fontSize: 29, fontFamily: 'Copperplate', color: 'white', fontWeight: 'bold', marginBottom: '5%'
    },
    gameInfoWindowInnerView2: {
        flexDirection: 'column', flexWrap: 'wrap', alignSelf: 'center'
    },
    addOnWindow: {
        width: '80%', height: 332, alignSelf: 'center', position: 'absolute', borderWidth: 1, borderRadius: 5, backgroundColor: '#2E3238', flex: 1, top: '30%', borderColor: 'white', zIndex: 10
    },
    addOnWindowMainView1: {
        alignItems: 'center', position: 'absolute', top: '20%', width: '100%'
    },
    addOnWindowView1: {
        marginBottom: '10%', alignItems: 'center', marginTop: '2%'  
    },
    addOnWindowView2: {
        width: '100%', alignSelf: 'center', marginBottom: '18%'
    },
    addOnWindowView3: {
        width: '80%'
    },
    addOnWindowView4: {
        width: '80%', alignSelf: 'center'
    },
    addOnWindowView5: {
        position: 'absolute', left: '10%', top: '40%', alignSelf: 'center'
    },
    addOnWindowView6: {
        width: '100%', alignSelf: 'center'
    },
    submitAddOnButton: {
        borderWidth: 2, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', alignSelf: 'center', borderColor: 'lavender'
    },
    submitAddOnButtonText: {
        fontFamily: 'Copperplate', fontSize: 16, paddingLeft: 13, paddingRight: 13, paddingTop: 7, paddingBottom: 7, fontWeight: 600
    },
    addOnWindowText1: {
        textAlign: 'center', fontSize: 24, fontFamily: 'Copperplate', color: 'white', marginTop: 30
    },
    addOnInput: {
        width: 150, textAlign: 'center', height: 40, backgroundColor: 'transparent', alignSelf: 'center', borderTopWidth: 2, borderBottomWidth: 2, borderLeftWidth: .5, borderRightWidth: .5, borderTopRightRadius: 15, borderBottomLeftRadius: 15, marginBottom: -5, borderColor: 'white', color: 'white', fontFamily: 'Copperplate', fontSize: 20
    },
    addOnWindowResponseText: {
        textAlign: 'center', fontSize: 16, fontFamily: 'Copperplate', color: 'white'
    },
    addOnWindowRestrictionText: {
        textAlign: 'center', fontSize: 16, fontFamily: 'Copperplate', color: 'white'    
    },
    changeGsView: {
        width: '80%', height: '40%', alignSelf: 'center', justifyContent: 'center', position: 'absolute', borderWidth: 1, borderRadius: 5, backgroundColor: '#2E3238', top: '30%', borderColor: 'lavender', zIndex: 10
    },
    changeGsTextHeader: {
        textAlign: 'center', fontSize: 24, fontFamily: 'Copperplate', color: 'white', marginBottom: 30, marginTop: 30
    },
    changeGsOptionView: {
        flexDirection: 'row', justifyContent: 'center', marginTop: 0, marginBottom: 15
    },
    changeGsOptionView2: {
        flexDirection: 'row', justifyContent: 'center', marginTop: -5, marginBottom: 15
    },
    gSOptionButton: {
        borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, width: '15%', alignSelf: 'center', borderTopRightRadius: 15, borderBottomLeftRadius: 15, marginRight: 5
    },
    gSOptionButtonText: {
        fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28, color: 'white'
    },
    submitGsChangeButton: {
        alignContent: 'center', alignSelf: 'center', borderWidth: 2, borderTopRightRadius: 15, borderBottomLeftRadius: 15, borderColor: 'lavender', backgroundColor: 'lavender', marginTop: 30
    },
    submitGsChangeButtonText: {
        fontFamily: 'Copperplate', textAlign: 'center', fontSize: 16, paddingRight: 13, paddingLeft: 13, paddingTop: 7, paddingBottom: 7, fontWeight: 600
    },
    changeGsRestrictionView: {
        width: '80%', alignSelf: 'center'
    },
    changeGsRestrictionText: {
        textAlign: 'center', fontFamily: 'Copperplate', fontSize: 16, color: 'white'
    },
    leaveGameView: {
        borderWidth: 1, borderRadius: 5, backgroundColor: '#2E3238', width: '80%', height: '40%', alignSelf: 'center', position: 'absolute', top: '25%', borderColor: 'lavender', zIndex: 10
    },
    leaveGameInnerView: {
        flexDirection: 'row', justifyContent: 'center', marginBottom: 20
    },
    leaveGameViewHeaderText: {
        textAlign: 'center', marginTop: 60, marginBottom: 50, fontSize: 24, fontFamily: 'Copperplate', color: 'white', paddingRight: 20, paddingLeft: 20
    },
    leaveGameConfirmButton: {
        borderWidth: 1.5, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', borderColor: 'black', alignSelf: 'center', marginBottom: '8%', width: '25%'
    },
    leaveGameConfirmButtonText: {
        textAlign: 'center', fontSize: 16, fontFamily: 'Copperplate', lineHeight: 30, fontWeight: 600, paddingRight: 13, paddingLeft: 13, paddingTop: 7, paddingBottom: 7
    },
    leaveGameDeclineButton: {
        borderWidth: 1.5, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', borderColor: 'black', alignSelf: 'center', width: '25%'
    },
    leaveGameDeclineButtonText: {
        textAlign: 'center', fontSize: 15, fontFamily: 'Copperplate', lineHeight: 30, paddingRight: 13, paddingLeft: 13, paddingTop: 7, paddingBottom: 7
    },
    loadingBarView: {
        position: 'absolute', top: '0%', left: '0%', width: '100%', height: '100%'
    },
    submitWinnerButton: {
        borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', alignSelf: 'center', marginTop: '0%', borderColor: 'lavender'
    },
    submitWinnerButtonText: {
        fontFamily: 'Copperplate', textAlign: 'center', fontSize: 16, color: 'black', paddingLeft: 13, paddingRight: 13, paddingTop: 7, paddingBottom: 7
    },
    winnerSelectionView: {
        borderWidth: 0, borderRadius: 5, backgroundColor: 'transparent', width: '100%', height: '30%', position: 'absolute',  top: '43%', left: '0%', borderColor: 'white', zIndex: 6
    },
    winnerSelectionText1: {
        fontSize: 18, textAlign: 'center', marginTop: 15, marginBottom: 0, fontFamily: 'Copperplate', color: 'white'
    },
    winnerSelectionText2: {
        fontSize: 16, textAlign: 'center', marginTop: 5, marginBottom: 0, fontFamily: 'Copperplate', color: 'white'
    },
    winnerSelectionText3: {
        fontSize: 14, textAlign: 'center', marginTop: 5, marginBottom: 30, fontFamily: 'Copperplate', color: 'white'
    },
    nextRoundButton: {
        borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', width: '35%', alignSelf: 'center', borderColor: 'lavender', position: 'absolute', top: '50%',
    },
    nextRoundButtonText: {
        fontFamily: 'Copperplate', textAlign: 'center', fontSize: 18, color: 'black'
    },
    safeAreaViewContainer: {
        flex: 1, backgroundColor: '#2E3238', position: 'absolute', width: '100%', height: '115%', top: '0%', left: '0%'
    },
    loadingText: {
        color: 'white', textAlign: 'center', position: 'absolute', top: '20%', left: '35%', fontSize: 24, fontFamily: 'Copperplate'
    },
    container: {
        position: 'absolute', width: '100%', height: '100%', top: '20%', left: '0%', backgroundColor: '#2E3238'
    },
    testContainer1: {
        position: 'absolute', width: '100%', height: '100%', top: '0%', left: '0%', backgroundColor: '#2E3238', flex: 1
    },
    testAnimatedContainer: {
        position: 'absolute', width: '100%', height: '100%', top: '20%', left: '80%', backgroundColor: '#2E3238'
    },
    gamePageTitle: {
      fontSize: 35, fontWeight: "bold", textAlign: 'center', marginTop: '20%'
    },
    playerViewBttn: {
        paddingTop: 2, paddingBottom: 2, position: 'absolute', top: '9.5%', alignSelf: 'center', borderWidth: 1, borderColor: 'white', borderStyle: 'solid', borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender'
    },
    playerViewBttnText: {
        fontSize: 18, textAlign: 'center', fontFamily: 'Copperplate', color: 'black', fontWeight: 600, paddingRight: 13, paddingLeft: 13, paddingTop: 4, paddingBottom: 4
    },
    gameInfoViewSidePot: {
        backgroundColor: 'transparent', width: '35%', alignSelf: 'center', position: 'absolute',
    },

    // player view

    gameViewBttn: {
        paddingTop: 2, paddingBottom: 2, position: 'absolute', top: '9.5%', alignSelf: 'center', borderWidth: 1, borderColor: 'lavender', borderStyle: 'solid', borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender'
    },
    gameViewBttnText: {
        fontSize: 18, textAlign: 'center', fontFamily: 'Copperplate', color: 'black', fontWeight: 600, paddingRight: 13, paddingLeft: 13, paddingTop: 4, paddingBottom: 4
    },
    playerChipsContainer: {
        borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', position: 'absolute', top: '18%', alignSelf: 'center', borderColor: 'lavender'
    },
    playerChipsText: {
        fontFamily: 'Copperplate', fontSize: 16, color: 'black', paddingRight: 10, paddingLeft: 10, paddingTop: 4, paddingBottom: 4
    },
    playerActionView: {
        borderWidth: 4, borderRadius: 5, width: '100%', height: '30%', backgroundColor: 'white', position: 'absolute', top: '25%', justifyContent: 'center'
    },
    playerActionViewImage: {
        width: '100%', height: '100%', borderRadius: 0, position: 'absolute'
    },
    playerBetAmountText: {
        fontSize: 19, textAlign: 'center', fontFamily: 'Copperplate', color: 'white', marginTop: 40
    },
    clearBetButton: {
        borderTopWidth: 0, borderBottomWidth: 4, borderLeftWidth: 4, borderRightWidth: 4, borderColor: '#C5C5E1', borderRadius: 5, backgroundColor: 'lavender', position: 'absolute', top: '64.5%', left: '12.5%'
    },
    clearBetButtonText: {
        textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20, color: 'black', fontWeight: 600, paddingRight: 10, paddingLeft: 10, paddingTop: 7, paddingBottom: 7
    },
    anteBetButton: {
        borderWidth: 1, borderBottomWidth: 0, borderRadius: 5, backgroundColor: 'lavender', width: '20%', position: 'absolute', top: '90%', alignSelf: 'center', left: '5%', borderColor: 'lavender'
    },
    anteBetButtonText: {
        textAlign: 'center', fontSize: 22, fontFamily: 'Copperplate', color: 'black'
    },
    halfPotBetButton: {
        borderWidth: 1, borderBottomWidth: 0, borderRadius: 5, backgroundColor: 'lavender', width: '25%', position: 'absolute', top: '90%', alignSelf: 'center', borderColor: 'lavender'
    },
    halfPotBetButtonText: {
        textAlign: 'center', fontSize: 22, fontFamily: 'Copperplate', color: 'black'
    },
    allInButton: {
        borderWidth: 1, borderBottomWidth: 0, borderRadius: 5, backgroundColor: 'lavender', width: '25%', position: 'absolute', top: '90%', alignSelf: 'center', left: '72%', borderColor: 'lavender'
    },
    allInButtonText: {
        textAlign: 'center', fontSize: 22, fontFamily: 'Copperplate', color: 'black'
    },
    betButton: {
        borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', position: 'absolute', top: '65%', left: '5%', width: '25%', height: '6%', justifyContent: 'center', borderColor: 'lavender'
    },
    actionButtonText: {
        fontFamily: 'Copperplate', fontSize: 24, textAlign: 'center', color: 'black'
    },
    callButton: {
        borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', position: 'absolute', top: '65%', width: '25%', height: '6%', justifyContent: 'center', alignSelf: 'center', borderColor: 'lavender'
    },
    finishedButton: {
        borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', position: 'absolute', top: '65%', width: '25%', height: '6%', justifyContent: 'center', alignSelf: 'center', borderColor: 'lavender'
    },
    foldButton: {
        borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', position: 'absolute', top: '65%', left: '70%', width: '25%', height: '6%', justifyContent: 'center', borderColor: 'lavender'
    },
    chipContainer: {
        borderWidth: 0, borderRadius: 5, backgroundColor: 'transparent', position: 'absolute', top: '80%', width: '100%', height: '10%', display: 'flex'
    },  
    chipContainerImage: {
        width: '100%', height: '100%', borderRadius: 0, position: 'absolute'
    },
    firstChipView: {
        borderRadius: 50, height: 75, width: 75, backgroundColor: 'black', position: 'absolute', top: '80%', left: 10, zIndex: -5
    },
    firstChipViewB: {
        borderRadius: 50, height: 75, width: 75, backgroundColor: 'black', position: 'absolute', top: '79.8%', left: 14, zIndex: -5
    },
    secondChipView: {
        borderRadius: 50, height: 75, width: 75, backgroundColor: 'black', position: 'absolute', top: '80%', left: 104.5, zIndex: -5
    },
    secondChipViewB: {
        borderRadius: 50, height: 75, width: 75, backgroundColor: 'black', position: 'absolute', top: '79.8%', left: 109.5, zIndex: -5
    },
    thirdChipView: {
        borderRadius: 50, height: 75, width: 75, backgroundColor: 'black', position: 'absolute', top: '80%', left: 196.5, zIndex: -5
    },

    thirdChipViewB: {
        borderRadius: 50, height: 75, width: 75, backgroundColor: 'black', position: 'absolute', top: '79.8%', left: 201.5, zIndex: -5
    },
    fourthChipView: {
        borderRadius: 50, height: 75, width: 75, backgroundColor: 'black', position: 'absolute', top: '80%', left: 294.5, zIndex: -5
    },
    fourthChipViewB: {
        borderRadius: 50, height: 75, width: 75, backgroundColor: 'black', position: 'absolute', top: '79.8%', left: 299.5, zIndex: -5
    },
    playerActionDisplays: {
        borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', position: 'absolute', width: '27%'
    },
    playerActionDisplaysText: {
        textAlign: 'center', fontFamily: 'Copperplate', fontSize: 16
    },

    playerActionContainer: {
        position: 'absolute', width: '98%', height: '25%', top: '0%', alignSelf: 'center', zIndex: -5, borderColor: '#412f2f', borderBottomWidth: 4, borderRadius: 10
    },

    playerActionLowerContainer: {
        position: 'absolute', width: '100%', height: '25%', alignSelf: 'center', top: '25%', borderTopWidth: 0, borderColor: '#2c2828', borderRadius: 10
    },

    plusBettingButton: {
        borderTopWidth: 0, borderBottomWidth: 4, borderLeftWidth: 4, borderRightWidth: 4, borderColor: '#C5C5E1', borderRadius: 5, backgroundColor: 'lavender', position: 'absolute', top: '45%', left: '52.5%', alignSelf: 'center', paddingRight: 22, paddingLeft: 22, paddingTop: 2, paddingBottom: 2
    },

    minusBettingButton: {
        borderTopWidth: 0, borderBottomWidth: 4, borderLeftWidth: 4, borderRightWidth: 4, borderColor: '#C5C5E1', borderRadius: 5, backgroundColor: 'lavender', position: 'absolute', top: '45%', left: '32.5%', alignSelf: 'center', paddingRight: 25.5, paddingLeft: 25.5, paddingTop: 2, paddingBottom: 2
    },

    plusMinusBettingButtonText: {
        textAlign: 'center', fontFamily: 'Copperplate', fontSize: 26, color: 'black', fontWeight: 600
    },

    confirmActionButton: {
        backgroundColor: 'lavender', position: 'absolute', top: '56%', borderRadius: 5, left: '14.5%', borderTopWidth: 0, borderBottomWidth: 4, borderLeftWidth: 4, borderRightWidth: 4, borderColor: '#C5C5E1'
    },

    confirmActionButtonText: {
        fontSize: 20, fontFamily: 'Copperplate', textAlign: 'center', paddingRight: 20, paddingLeft: 20, paddingBottom: 7, paddingTop: 7, fontWeight: 600
    },

    playingCardsOutlineImg: {
        width: 200, height: 200, position: 'absolute', left: '47.5%', top: '50.7%', zIndex: -2
    },

    chipSetImg: {
        width: 90, height: 90, position: 'absolute', top: '81%', zIndex: -1
    },

    straddleButton: {
        borderTopWidth: 0, borderBottomWidth: 4, borderLeftWidth: 4, borderRightWidth: 4, borderColor: '#C5C5E1', backgroundColor: 'lavender', position: 'absolute', top: '45.5%', justifyContent: 'center',  alignSelf: 'center', borderRadius: 5
    },

    straddleButtonText: {
        fontFamily: 'Copperplate', fontSize: 16, textAlign: 'center', color: 'black', paddingRight: 13, paddingLeft: 13, paddingBottom: 7, paddingTop: 7, fontWeight: 600
    },

    chipDenominationsContainer: {
        position: 'absolute', width: '100%', top: '91%', alignSelf: 'center', flexDirection: 'row'
    },

    chipDenominationsText: {
        color: 'white', fontFamily: 'Copperplate', marginRight: '22%'
    },

    // player view black jack

    playerActionViewBJ: {
        borderWidth: 4, borderRadius: 5, width: '100%', height: '30%', backgroundColor: 'white', position: 'absolute', top: '10%', justifyContent: 'center'
    },

    gameViewBttnBJ: {
        width: '32%', paddingTop: 2, paddingBottom: 2, position: 'absolute', top: '0%', alignSelf: 'center', borderWidth: 1, borderColor: 'lavender', borderStyle: 'solid', borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender'
    },

    betButtonBJ: {
        borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', position: 'absolute', top: '68%', left: '5%', width: '25%', height: '6%', justifyContent: 'center', borderColor: 'lavender'
    },

    foldButtonBJ: {
        borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', position: 'absolute', top: '68%', left: '70%', width: '25%', height: '6%', justifyContent: 'center', borderColor: 'lavender'
    },

    // game view model BLACKJACK //

    roundOverConfirmationContainer: {
        width: '60%', height: '30%', alignSelf: 'center', position: 'absolute', borderWidth: 1, borderRadius: 5, backgroundColor: 'lavender', flex: 1, top: '35%', borderColor: 'white', zIndex: 10
    },

    roundOverConfirmationHeader: {
        fontFamily: 'Copperplate', fontSize: 22, textAlign: 'center', color: 'black', marginTop: 50, marginBottom: 40, paddingRight: 10, paddingLeft: 10
    },

    confirmRoundOverButton: {
        borderWidth: 1.5, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', borderColor: 'black', alignSelf: 'center', width: '30%', marginBottom: '8%'
    },

    confirmRoundOverButtonText: {
        textAlign: 'center', marginRight: 5, marginLeft: 5, fontSize: 16, fontFamily: 'Copperplate', lineHeight: 30, fontWeight: 600
    },

    declineGameOverButton: {
        borderWidth: 1.5, borderTopRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'lavender', borderColor: 'black', alignSelf: 'center', width: '30%'
    },

    declineGameOverButtonText: {
        textAlign: 'center', marginRight: 5, marginLeft: 5, fontSize: 15, fontFamily: 'Copperplate', lineHeight: 30
    },

    // player in game displays window //

    pIGDOuterContainer: {
        width: '80%', height: 400, alignSelf: 'center', position: 'absolute', borderWidth: 1, borderRadius: 5, backgroundColor: '#2E3238', flex: 1, top: '30%', borderColor: 'white', zIndex: 10
    },

    closePIGDButton: {
        borderBottomWidth: 1, borderRadius: 3, backgroundColor: 'lavender', position: 'absolute', top:-2, left: 0, width: '100%'
    },

    pIGDInputContainer1: {
        width: '90%', position: 'absolute', top: '10%', justifyContent: 'center', backgroundColor: 'transparent', borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0, borderColor: 'white', left: '5%', borderRadius: 5
    },

    pIGDHeader1: {
        textAlign: 'center', fontSize: 30, marginBottom: 15, marginTop: 10, fontFamily: 'Copperplate', color: 'white'
    },

    pIGDIconContainer1: {
        position: 'absolute', top: '48%', left: '2%'
    },

    pIGDInput1: {
        width: 200, textAlign: 'center', fontSize: 20, fontFamily: 'Copperplate', height: 35, backgroundColor: 'transparent', alignSelf: 'center', borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, borderTopRightRadius: 15, borderBottomLeftRadius: 15, marginBottom: 40, borderColor: 'white', color: 'white'
    },

    pIGDInputContainer2: {
        width: '90%', position: 'absolute', top: '35%', justifyContent: 'center', backgroundColor: 'transparent', borderWidth: 0, borderColor: 'white', left: '5%', borderRadius: 5
    },

    pIGDHeader2: {
        textAlign: 'center', fontSize: 30, marginBottom: 25, marginTop: 10, fontFamily: 'Copperplate', color: 'white'
    },

    pIGDIconContainer2: {
        position: 'absolute', top: '59%', left: '.5%'
    },

    pIGDBuyInRangeContainer: {
        position: 'absolute', top: '35%', alignSelf: 'center'
    },

    pIGDBuyInRangeText: {
        fontFamily: 'Copperplate', color: 'white', textAlign: 'center', fontSize: 12
    },

    pIGDInput2: {
        width: 200, fontFamily: 'Copperplate', textAlign: 'center', fontSize: 18, height: 35, backgroundColor: 'transparent', alignSelf: 'center', borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, borderTopRightRadius: 15, borderBottomLeftRadius: 15, marginBottom: 20, borderColor: 'white', color: 'white'
    },

    pIGDConfirmButton: {
        alignContent: 'center', alignSelf: 'center', position: 'absolute', top: '80.5%', borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, borderColor: 'lavender', backgroundColor: 'lavender', paddingRight: 13, paddingLeft: 13, paddingBottom: 7, paddingTop: 7
    },

    pIGDConfirmButtonText: {
        fontFamily: 'Copperplate', fontSize: 16, marginRight: 5, marginLeft: 5, color: 'black', textAlign: 'center', paddingTop: 7, paddingBottom: 7, fontWeight: 600
    },

    pIDGDealerInputContainer: {
        width: 200,height: 35, backgroundColor: 'transparent', alignSelf: 'center', borderBottomWidth: 3, borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, borderTopRightRadius: 15, borderBottomLeftRadius: 15, marginBottom: 20, borderColor: 'white', justifyContent: 'center'
    },

    pIDGDealerInputContainerText: {
        fontFamily: 'Copperplate', fontSize: 18, textAlign: 'center'
    },




});

export default style;