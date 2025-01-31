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

export function toggleAddOnWindow (setAddOnWindowFunc, addOnWindow, triggerMenuAnimationFunc, readyResponse, setReadyResponseFunc, setResponseTextFunc, keyboard, moveMenuFunc, addOnRef)  {
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

export function toggleRoomSizeChangeWindow (player, gameObj, setChangeRsFunc, changeRs, triggerMenuAnimationFunc, changeRsOptions, setChangeRsOptionsFunc, moveMenu) {
    // if (player.turn == gameObj.host) {
    //     setChangeRsFunc(!changeRs);
    //     triggerMenuAnimationFunc();

    //     if (changeRsOptions != 0) {
    //         setChangeRsOptionsFunc(0);
    //     };

    //     moveMenu();
    // };

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

export function playerChoosingBlinds (setToggleBBFunc, toggleBBSelect, setInitSelectBorderFunc, initSelectBorder) {
    setToggleBBFunc(!toggleBBSelect);
    setInitSelectBorderFunc(!initSelectBorder);
};

export function initGame (player, gameObj, setGameNotFull) {

    let holder = gameObj.playerDisplayNames;

    holder = holder.filter(el => {
        el != '' && (el != null || undefined)
    })

    console.log(holder);

    player.socket.emit('event7', 0, 0, 'blackjack');
};

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
        seatsActive: gModel.seatsActive
    };
    setGameObjFunc(holderObj);

};

export function handleAdditionalStartInfo (rS, pDisplayPots, setPDisplayPots) {
    console.log(rS);
    let index = 0;

    while (index < rS - 1) {

        if (index === 2) {
            pDisplayPots[index] = 2;
        } else {
            pDisplayPots[index] = 4
        }

        // pDisplayPots[index] = 0;
        
        index++;
    }

    console.log(pDisplayPots);

    setPDisplayPots(pDisplayPots);


};

export function splitPotArr (info1) {

    if (typeof info1 === 'object') {
        let str = '';

        for (let i = 0; i < info1.length; i++) {
           str += info1[i] + "\n"; 
        }

        return str;
    } else {
        return info1;
    }

};

export function toggleBorderSelection (roundTransition, winnerChosen, index, winnerChosenStr, setWinnersChosenStr, setLastChosen, pots, setSplitPot, setInitBorderSelect, pPotsWonStr, setPPotsWonStr, pPotsAmount, setPPotsAmount) {

    if (roundTransition && !winnerChosen) {
        let str = winnerChosenStr;
        let str2 = pPotsWonStr;
        let str3 = pPotsAmount;
        let result = '';
        let result2 = '';
        let result3 = '';

        console.log(pots);

        if (str.includes(index.toString())) {
            result = str.replace(index.toString(), '');
            let char = str2.charAt(index)
        } else {
            result = str += index.toString();

            let playerPot = pots[index - 2];

            if (playerPot.length != undefined) {
                setSplitPot(true);
                setInitBorderSelect(false);
            }

        }

        setLastChosen(index);
        setWinnersChosenStr(result);    
    };

};

export function submitWinner (player, winnerChosenStr, potsArr, gameSize, pPotsWonStr, pPotsAmountStr) {
    let finalArrPlayers = [];
    let finalArrPot = [];
    let potsArrHolder = potsArr;
    let words = pPotsWonStr.split(' ');
    let words2 = pPotsAmountStr.split(' ');

    words.filter((el) => {
        el != ""
    })

    for (let i = 1; i < gameSize; i++) {

        if (winnerChosenStr.includes((i + 1).toString())) {

            let indexHolder = i + 1;
            let lengthHolder = i - 1;
            let totalHolder = 0;

            console.log('words: ');
            console.log(words);
            console.log('words2: ');
            console.log(words2);

            for (let j = 0; j < words.length; j++) {

                if (words[j] != undefined) {
                    if (words[j].includes('p' + indexHolder + ':')) {
                        console.log('confirmed');
                        // let wordIndexHolder = words[j].indexOf(':');
                        // let wordHolder1 = words[j].charAt(wordIndexHolder - 1);

                        // let testWordIndexHolder = words2[j].indexOf(':'); 
                        // let testWordHolder = words2[j].charAt(testWordIndexHolder - 1);

                        // if (potsArrHolder[lengthHolder] != undefined) {
                        //     totalHolder += Number(potsArrHolder[lengthHolder][0]) * Number(testWordHolder);
                            // potsArrHolder[lengthHolder] = totalHolder;
                        // }

                        let wordIndexHolder = words2[j].indexOf(':');
                        let wordHolder1 = words2[j].charAt(wordIndexHolder - 1);

                        if (potsArrHolder[lengthHolder] != undefined) {
                            totalHolder += Number(potsArrHolder[lengthHolder][0]) * Number(wordHolder1);
                            potsArrHolder[lengthHolder] = totalHolder;
                        }
                    }
                }
            }

            finalArrPlayers.push(i + 1);
            finalArrPot.push(potsArrHolder[i - 1]);

        }
    }

    console.log('finalArrPlayers: ');
    console.log(finalArrPlayers);
    console.log('finalArrPot: ');
    console.log(finalArrPot);

    player.socket.emit('inGameEvent6_BJ', finalArrPlayers, finalArrPot);
};

export function roundIsOverHost (setInitBorderSelect, setRoundTransition, setInitRoundOver, logArg)  {
    setInitBorderSelect(true);
    setRoundTransition(true);
    setInitRoundOver(false);
    console.log(logArg);
};

export function checkPlayerIsWinner (index, selectedWinners) {
    if (selectedWinners.includes(index)) {
        return true;
    } else {
        return false;
    }
}

export function initRoundOver (setRoundOverFunc, logArg) {
    setRoundOverFunc(true);
    console.log(logArg);
}

export function initNextRound (player) {
    player.socket.emit('inGameEvent7_BJ');
}

export function returnSplitLength (lastSelectedWinner, playerDisplayPots, roundTransition) {

    if (roundTransition && lastSelectedWinner != undefined) {

        let result = '';

        let holder = playerDisplayPots[lastSelectedWinner - 2];

        if (holder != undefined) {
            if (holder.length != undefined) {
                result = holder.length;
            } else {
                result = '1';
            }
        }

        return result;
    }
}

export function splitPotConfirmationButtons (func, value, type, setInitSelectBorder) {
    func(value);

    if (type === 1) {
        setInitSelectBorder(true);
    }

}

export function handleTotalPotsWonConfirmation (lastSelected, totalPotsWonInput, totalPotsRef, pPotsWon, setPPotsWon, setInitTotalPotsWon, setPlayerSplit, setInitBorderSelect, selectedWinners, setSelectedWinners, halfWinners, setHalfWinners, totalPotsIn, potsAmountStr, setPotsAmountStr) {
    let str = pPotsWon;
    let str2 = potsAmountStr;
    // let str2 = halfWinners;

    // if (Number(totalPotsWonInput) / Number(totalPotsIn) == 0.5) {
    //     str2 += lastSelected;
    //     setHalfWinners(str2);

    //     // console.log(str2);

    // } else {
    //     str += 'p' + lastSelected + ':' + ' ';
    //     str3 += totalPotsWonInput + ':' + ' ';
    //     setPPotsWon(str);
    //     setPotsAmountStr(str3);

    //     // console.log(str2);
    //     // console.log(str3);
    // }

    str += 'p' + lastSelected + ':' + ' ';
    str2 += totalPotsWonInput + ':' + ' ';
    setPPotsWon(str);
    setPotsAmountStr(str2);

    if (totalPotsRef.current) {
        totalPotsRef.current?.clear();
    }

    setPlayerSplit(false);
    setInitBorderSelect(true);
    setInitTotalPotsWon(false);

}

export function togglePlayerSelectsPosition (player, positionSelected, setAnyWindowOpen) {

    setAnyWindowOpen(true);

    player.socket.emit('playerDisplayEvent1', positionSelected)

}

export function playerClosesInGameDisplays (player, currentSelection, setPlayerDisplay) {
    setPlayerDisplay(false);

    player.socket.emit('playerDisplayEvent2', currentSelection);
}

export function checkForSeatActive (position, seatsActive) {

    let str1 = seatsActive;

    if (str1.includes(position.toString())) {
        return true;
    } else {
        return false;
    }

}

export function setSeatsActiveStr (seatsActiveStrSent, seatsActive, setSeatsActiveStr) {
    let str = seatsActive;

    str += seatsActiveStrSent;
    
    setSeatsActiveStr(seatsActiveStrSent);
}

export function setPlayerCurrentSelectorFunc (lastSelection, setPlayerCurrentSelector) {
    setPlayerCurrentSelector(lastSelection);
}

export function resetPlayerCurrentSelectorFunc (setPlayerCurrentSelector) {
    setPlayerCurrentSelector(0);
}

export function playerSubmitsInGameDisplays (player, pDisplayName, pDisplayChips, positionSelected) {
    player.socket.emit('event4', pDisplayName, pDisplayChips, positionSelected);

}   