class PlayerPotPosition {

    rS;
    playerPotsPositions = [];

    constructor(rS) {
        this.rS = rS
    }

    gameSizeChanged(rS) {
        this.rS = rS;
    }

    setPosition() {

        if (this.rS === 2) {
            let p1 = {
                pTop: '77%',
                pLeft: '36.5%'
            }
            let p2 = {
                pTop: '7.5%',
                pLeft: '43.5%'
            }
    
            this.playerPotsPositions.push(p1, p2)
        } else if (this.rS === 3) {
            let p1 = {
                pTop: '77%',
                pLeft: '36.5%'
            }
            let p2 = {
                pTop: '19%',
                pLeft: '30%'
            }
            let p3 = {
                pTop: '19%',
                pLeft: '58%'
            }
    
            this.playerPotsPositions.push(p1, p2, p3)
        } else if (this.rS === 4) {
            let p1 = {
                pTop: '70%',
                pLeft: '36.5%'
            }
            let p2 = {
                pTop: '56%',
                pLeft: '32.25%'
            }
            let p3 = {
                pTop: '24.5%',
                pLeft: '43.5%'
            }
            let p4 = {
                pTop: '56%',
                pLeft: '55%'
            }
    
            this.playerPotsPositions.push(p1, p2, p3, p4)
        } else if (this.rS === 5) {
    
            let p1 = {
                pTop: '77%',
                pLeft: '36.5%'
            }
    
            let p2 = {
                pTop: '75%',
                pLeft: '32%'
            }
    
            let p3 = {
                pTop: '39%',
                pLeft: '29%'
            }
    
            let p4 = {
                pTop: '39%',
                pLeft: '58.5%'
            }
    
            let p5 = {
                pTop: '75%',
                pLeft: '51%'
            }
    
    
            this.playerPotsPositions.push(p1, p2, p3, p4, p5)
        } else if (this.rS === 6) {
    
            let p1 = {
                pTop: '77%',
                pLeft: '36.5%'
            }
    
            let p2 = {
                pTop: '75%',
                pLeft: '32%'
            }
    
            let p3 = {
                pTop: '39%',
                pLeft: '29%'
            }
    
            let p4 = {
                pTop: '24%',
                pLeft: '43.5%'
            }
    
            let p5 = {
                pTop: '39%',
                pLeft: '58.5%'
            }
    
            let p6 = {
                pTop: '75%',
                pLeft: '51%'
            }
    
            this.playerPotsPositions.push(p1, p2, p3, p4, p5, p6)
        } else if (this.rS === 7) {
    
            let p1 = {
                pTop: '77%',
                pLeft: '36.5%'
            }
    
            let p2 = {
                pTop: '75%',
                pLeft: '31%'
            }
    
            let p3 = {
                pTop: '58%',
                pLeft: '25%'
            }
    
            let p4 = {
                pTop: '38%',
                pLeft: '32%'
            }
    
            let p5 = {
                pTop: '38%',
                pLeft: '55%'
            }
    
            let p6 = {
                pTop: '58%',
                pLeft: '62%'
            }
    
            let p7 = {
                pTop: '75%',
                pLeft: '57%'
            }
    
            this.playerPotsPositions.push(p1, p2, p3, p4, p5, p6, p7)
        } else if (this.rS === 8) {
            
            let p1 = {
                pTop: '77%',
                pLeft: '36.5%'
            }
    
            let p2 = {
                pTop: '75%',
                pLeft: '33.5%'
            }
    
            let p3 = {
                pTop: '58%',
                pLeft: '24%'
            }
    
            let p4 = {
                pTop: '38%',
                pLeft: '27%'
            }
    
            let p5 = {
                pTop: '24%',
                pLeft: '43.5%'        
            }
    
            let p6 = {
                pTop: '38%',
                pLeft: '60%'
            }
    
            let p7 = {
                pTop: '58%',
                pLeft: '62%'
            }
    
            let p8 = {
                pTop: '75%',
                pLeft: '52%'
            }
    
            this.playerPotsPositions.push(p1, p2, p3, p4, p5, p6, p7, p8)
    
        } else if (this.rS === 9) {
            
            let p1 = {
                pTop: '77%',
                pLeft: '36.5%'
            }
    
            let p2 = {
                pTop: '75%',
                pLeft: '33.5%'
            }
    
            let p3 = {
                pTop: '58.5%',
                pLeft: '25%'
            }
    
            let p4 = {
                pTop: '38.5%',
                pLeft: '28%'
            }
    
            let p5 = {
                pTop: '24%',
                pLeft: '34%'
            }
    
            let p6 = {
                pTop: '24%',
                pLeft: '53%'
            }
    
            let p7 = {
                pTop: '38.5%',
                pLeft: '58.75%'
            }
    
            let p8 = {
                pTop: '58.5%',
                pLeft: '61%'
            }
    
            let p9 = {
                pTop: '75%',
                pLeft: '53%'
            }
    
            this.playerPotsPositions.push(p1, p2, p3, p4, p5, p6, p7, p8, p9)
    
        }

    }

}

export default PlayerPotPosition