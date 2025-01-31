class BlindIndicatorPositionModel {

    rS;
    bigBlind;
    top;
    left;
    topNumber; 
    leftNumber;

    constructor(rS) {
        this.rS = rS;
    }

    roomSizeChange(arg1) {
        this.rS = arg1;
    }

    setBigBlind(arg1) {
        this.bigBlind = arg1;
    }

    setPosition(bigBlind, topFunc, leftFunc) {
        if (this.rS == 2) {
            if (bigBlind == 1) {
                this.top = '88%';
                this.left = '35.25%'
            } else if (bigBlind == 2) {
                this.top = '18%';
                this.left = '35.25%';
            } 
        } else if (this.rS == 3) {
            if (bigBlind == 1) {
                this.top = '88%';
                this.left = '35.25%'
            } else if (bigBlind == 2) {
                this.top = '33%';
                this.left = '7.75%';
            } else if (bigBlind == 3) {
                this.top = '33%';
                this.left = '62.75%';
            } 
        } else if (this.rS == 4) {
            if (bigBlind == 1) {
                this.top = '88%';
                this.left = '35.25%'
            } else if (bigBlind == 2) {
                this.top = '53%';
                this.left = '3.75%';
            } else if (bigBlind == 3) {
                this.top = '18%';
                this.left = '35.25%';
            } else if (bigBlind == 4) {
                this.top = '53%';
                this.left = '66.75%';
            }
        } else if (this.rS == 5) {
            if (bigBlind == 1) {
                this.top = '88%';
                this.left = '35.25%'
            } else if (bigBlind == 2) {
                this.top = '73%';
                this.left = '3.75%';
            } else if (bigBlind == 3) {
                this.top = '33%';
                this.left = '11.75%';
            } else if (bigBlind == 4) {
                this.top = '33%';
                this.left = '58.75%';
            } else if (bigBlind == 5) {
                this.top = '75%';
                this.left = '62.75%';
            }
        }  else if (this.rS == 6) {
            if (bigBlind == 1) {
                this.top = '88%';
                this.left = '35.25%'
            } else if (bigBlind == 2) {
                this.top = '73%';
                this.left = '3.75%';
            } else if (bigBlind == 3) {
                this.top = '33%';
                this.left = '11.75%';
            } else if (bigBlind == 4) {
                this.top = '18%';
                this.left = '35.25%';
            } else if (bigBlind == 5) {
                this.top = '33%';
                this.left = '58.75%';
            } else if (bigBlind == 6) {
                this.top = '73%';
                this.left = '62.75%';
            }
        } else if (this.rS == 7) {
            if (bigBlind == 1) {
                this.top = '88%';
                this.left = '35.25%'
            } else if (bigBlind == 2) {
                this.top = '73%';
                this.left = '2.75%';
            } else if (bigBlind == 3) {
                this.top = '53%';
                this.left = '8.75%';
            } else if (bigBlind == 4) {
                this.top = '33%';
                this.left = '9.75%';
            } else if (bigBlind == 5) {
                this.top = '33%';
                this.left = '56.75%';
            } else if (bigBlind == 6) {
                this.top = '53%';
                this.left = '62.75%';
            } else if (bigBlind == 7) {
                this.top = '73%';
                this.left = '68.75%';
            }
        } else if (this.rS == 8) {
            if (bigBlind == 1) {
                this.top = '88%';
                this.left = '35.25%'
            } else if (bigBlind == 2) {
                this.top = '73%';
                this.left = '5.75%';
            } else if (bigBlind == 3) {
                this.top = '53%';
                this.left = '7.75%';
            } else if (bigBlind == 4) {
                this.top = '33%';
                this.left = '9.75%';
            } else if (bigBlind == 5) {
                this.top = '18%';
                this.left = '35.25%';
            } else if (bigBlind == 6) {
                this.top = '33%';
                this.left = '60.75%';
            } else if (bigBlind == 7) {
                this.top = '53%';
                this.left = '62.75%';
            } else if (bigBlind == 8) {
                this.top = '73%';
                this.left = '64.75%';
            }
        } else if (this.rS == 9) {
            if (bigBlind == 1) {
                this.top = '88%';
                this.left = '35.25%'
            } else if (bigBlind == 2) {
                this.top = '73%';
                this.left = '5.75%';
            } else if (bigBlind == 3) {
                this.top = '53%';
                this.left = '7.75%';
            } else if (bigBlind == 4) {
                this.top = '33%';
                this.left = '9.75%';
            } else if (bigBlind == 5) {
                this.top = '18%';
                this.left = '15.75%';
            } else if (bigBlind == 6) {
                this.top = '18%';
                this.left = '54.75%';
            } else if (bigBlind == 7) {
                this.top = '33%';
                this.left = '60.75%';
            } else if (bigBlind == 8) {
                this.top = '53%';
                this.left = '62.75%';
            } else if (bigBlind == 9) {
                this.top = '73%';
                this.left = '64.75%';
            }
        }
        topFunc(this.top);
        leftFunc(this.left);
    }
}

export default BlindIndicatorPositionModel