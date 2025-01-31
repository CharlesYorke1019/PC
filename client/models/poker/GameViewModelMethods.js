export function handleGameObjChange (gModel, setGameObjFunc) {
    let holderObj = {
        gameCode: gModel.gameCode,
        roomSize: gModel.roomSize,
        playerDisplayNames: gModel.playerDisplayNames,
        playerDisplayChips: gModel.playerDisplayChips,
        totalPlayers: gModel.totalPlayers,
        totalBuyIns: gModel.totalBuyIns,
        host: gModel.host,
        gameStarted: gModel.gameStarted,
        ante: gModel.ante,
        seatsActive: gModel.seatsActive,
        maxBuyIn: gModel.maxBuyIn,
        minBuyIn: gModel.minBuyIn,
        straddle: gModel.straddle
    };
    setGameObjFunc(holderObj);
}

export function initGame(player, bigBlind, setInitBorderFunc, gameSize) {
    let smallBlind = 0;

    if (gameSize == 2) {
        if (bigBlind == 1) {
            smallBlind = 2;
        } else if (bigBlind == 2) {
            smallBlind = 1;
        }
    } else {
        if (bigBlind == 1) {
            smallBlind = gameSize;
        } else {
            smallBlind = bigBlind - 1;
        }
    }

    player.socket.emit('event7', bigBlind, smallBlind, 'Poker');
    setInitBorderFunc(false)
}

export function initNewRound (player, activeBB, gameObj) {
    player.socket.emit('inGameEvent7', activeBB, gameObj);
};

export function toggleInGameMenu (setMenuBttnFunc, menuBttn, triggerMenuAnimationFunc, moveMenuFunc, windowOpen, setWindowOpenFunc) {
    setMenuBttnFunc(!menuBttn);
    setWindowOpenFunc(!windowOpen);
    triggerMenuAnimationFunc();
    moveMenuFunc();
};

export function toggleGameInfoWindow (triggerMenuAnimationFunc, setGameInfoDisplayFunc, gameInfoDisplay, moveMenuFunc) {
    triggerMenuAnimationFunc();
    setGameInfoDisplayFunc(!gameInfoDisplay);
    moveMenuFunc();
};

export function toggleAddOnWindow (setAddOnWindowFunc, addOnWindow, triggerMenuAnimationFunc, readyResponse, setReadyResponseFunc, setResponseTextFunc, keyboard, moveMenuFunc, addOnRef) {
    setAddOnWindowFunc(!addOnWindow);
    triggerMenuAnimationFunc();

    if (readyResponse) {
        setReadyResponseFunc(false);
        setResponseTextFunc('');
    };

    keyboard.dismiss();

    if (addOnRef.current) {
        addOnRef.current?.clear()
    }

    moveMenuFunc();
};

export function toggleRoomSizeChangeWindow (player, gameObj, setChangeRsFunc, changeRs, triggerMenuAnimationFunc, changeRsOptions, setChangeRsOptionsFunc, moveMenu)  {
    setChangeRsFunc(!changeRs);
    triggerMenuAnimationFunc();

    if (changeRsOptions != 0) {
        setChangeRsOptionsFunc(0);
    };

    moveMenu();
};

export function roomSizeChangeSubmitted (player, changeRsOptions, setChangeRsFunc, setMenuBttnFunc, setWindowOpenFunc) {
    player.socket.emit('inGameMenuEvent2', changeRsOptions);
    setChangeRsFunc(false);
    setMenuBttnFunc(true);
    setWindowOpenFunc(false);
};

export function toggleLeaveGame (setInitLeaveGameFunc, initLeaveGame, triggerMenuAnimationFunc, moveMenuFunc) {
    setInitLeaveGameFunc(!initLeaveGame);
    triggerMenuAnimationFunc();
    moveMenuFunc();
};

export function playerChoosingBlinds (setToggleBBFunc, toggleBBSelect, setInitSelectBorderFunc, initSelectBorder, gameObj, setGameNotFullFunc)  {
    // if (gameObj.playerDisplayNames.length == gameObj.roomSize) {
    //     setToggleBBFunc(!toggleBBSelect);
    //     setInitSelectBorderFunc(!initSelectBorder);
    // } else {
    //     setGameNotFullFunc(true);
    //     setTimeout(() => {
    //         setGameNotFullFunc(false);
    //     }, 2500);
    // }
    setToggleBBFunc(!toggleBBSelect);
    setInitSelectBorderFunc(!initSelectBorder);
};

export function toggleBorderSelection (toggleBBSelect, setActiveBBSelect, roundTransition, winnerChosen, setSelectedWinnerChosen, index, sidePotActive, setSidePotWinnerFunc, gameStarted, player, positionSelected, setAnyWindowOpen) {
    if (toggleBBSelect) {
        setActiveBBSelect(index);
    } else if (roundTransition && !winnerChosen) {
        if (!sidePotActive) {
            setSelectedWinnerChosen(index);
        } else {
            setSidePotWinnerFunc(sidePotActive);
        }
    };
}

export function submitWinner (selectedWinner, player, activePot, setWinnerChosenFunc, setInitSelectBorderFunc)  {
    if (selectedWinner != 0 && selectedWinner != null) {
        player.socket.emit('inGameEvent6', selectedWinner, activePot);
        setWinnerChosenFunc(true);
        setInitSelectBorderFunc(false);
    };
};

export function submitSidePotWinner (index, sidePots, sidePotWinner, player) {
    let currentPot = sidePots[index];
    player.socket.emit('inGameEvent6Side', sidePotWinner, currentPot, index);
};

export function playerLeavesGame (player, router) {
    player.leaveGame();
    router.push({
        pathname: '/'
    });
};

export function initAntes (player, gameObj) {
    let smallBlind = 0;

    if (gameObj.gameSize == 2) {
        if (gameObj.bigBlind == 1) {
            smallBlind = 2;
        } else if (gameObj.bigBlind == 2) {
            smallBlind = 1;
        };
    } else {
        if (gameObj.bigBlind == 1) {
            smallBlind = gameObj.gameSize;
        } else {
            smallBlind = gameObj.bigBlind - 1;
        };
    };

    player.socket.emit('event13', bigBlind, smallBlind);
}

export function togglePlayerSelectsPosition (player, positionSelected, setAnyWindowOpen) {

    setAnyWindowOpen(true);

    player.socket.emit('playerDisplayEvent1', positionSelected);

}

export function setPlayerCurrentSelectorFunc (lastSelection, setCurrentPositionSelected, setInitPlayerDisplays) {

    setInitPlayerDisplays(true);

    setCurrentPositionSelected(lastSelection);

}

export function resetPlayerCurrentSelectorFunc (setCurrentPositionSelected) {

    setCurrentPositionSelected(0);

}

export function playerSubmitsInGameDisplays (player, pDisplayName, pDisplayChips, selectedPosition) {

    player.socket.emit('event4', pDisplayName, pDisplayChips, selectedPosition);

}

export function playerClosesInGameDisplays (player, currentSelection, setInitPlayerDisplays) {

    setInitPlayerDisplays(false);

    player.socket.emit('playerDisplayEvent2', currentSelection);

}