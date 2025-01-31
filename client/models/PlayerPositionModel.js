const positionsFunction = (rS) => {
    let inGamePlayerPositions = [];


    if (rS === 2) {
        let p1 = {
            pTop: '90%',
            pLeft: '36.5%'
        }
        let p2 = {
            pTop: '20%',
            pLeft: '36.5%'
        }


        inGamePlayerPositions.push(p1, p2)
    } else if (rS === 3) {
        let p1 = {
            pTop: '90%',
            pLeft: '36.5%'
        }
        let p2 = {
            pTop: '35%',
            pLeft: '9%'
        }
        let p3 = {
            pTop: '35%',
            pLeft: '64%'
        }


        inGamePlayerPositions.push(p1, p2, p3)
    } else if (rS === 4) {
        let p1 = {
            pTop: '90%',
            pLeft: '36.5%'
        }
        let p2 = {
            pTop: '55%',
            pLeft: '5%'
        }
        let p3 = {
            pTop: '20%',
            pLeft: '36.5%'
        }
        let p4 = {
            pTop: '55%',
            pLeft: '68%'
        }


        inGamePlayerPositions.push(p1, p2, p3, p4)
    } else if (rS === 5) {


        let p1 = {
            pTop: '90%',
            pLeft: '36.5%'
        }


        let p2 = {
            pTop: '75%',
            pLeft: '5%'
        }


        let p3 = {
            pTop: '35%',
            pLeft: '13%'
        }


        let p4 = {
            pTop: '35%',
            pLeft: '60%'
        }


        let p5 = {
            pTop: '75%',
            pLeft: '64%'
        }




        inGamePlayerPositions.push(p1, p2, p3, p4, p5)
    } else if (rS === 6) {


        let p1 = {
            pTop: '90%',
            pLeft: '36.5%'
        }


        let p2 = {
            pTop: '75%',
            pLeft: '5%'
        }


        let p3 = {
            pTop: '35%',
            pLeft: '13%'
        }


        let p4 = {
            pTop: '20%',
            pLeft: '36.5%'
        }


        let p5 = {
            pTop: '35%',
            pLeft: '60%'
        }


        let p6 = {
            pTop: '75%',
            pLeft: '64%'
        }


        inGamePlayerPositions.push(p1, p2, p3, p4, p5, p6)
    } else if (rS === 7) {


        let p1 = {
            pTop: '90%',
            pLeft: '36.5%'
        }


        let p2 = {
            pTop: '75%',
            pLeft: '4%'
        }


        let p3 = {
            pTop: '55%',
            pLeft: '10%'
        }


        let p4 = {
            pTop: '35%',
            pLeft: '16%'
        }


        let p5 = {
            pTop: '35%',
            pLeft: '58%'
        }


        let p6 = {
            pTop: '55%',
            pLeft: '64%'
        }


        let p7 = {
            pTop: '75%',
            pLeft: '70%'
        }


        inGamePlayerPositions.push(p1, p2, p3, p4, p5, p6, p7)
    } else if (rS === 8) {
       
        let p1 = {
            pTop: '90%',
            pLeft: '36.5%'
        }


        let p2 = {
            pTop: '75%',
            pLeft: '7%'
        }


        let p3 = {
            pTop: '55%',
            pLeft: '9%'
        }


        let p4 = {
            pTop: '35%',
            pLeft: '11%'
        }


        let p5 = {
            pTop: '20%',
            pLeft: '36.5%'        
        }


        let p6 = {
            pTop: '35%',
            pLeft: '62%'
        }


        let p7 = {
            pTop: '55%',
            pLeft: '64%'
        }


        let p8 = {
            pTop: '75%',
            pLeft: '66%'
        }


        inGamePlayerPositions.push(p1, p2, p3, p4, p5, p6, p7, p8)


    } else if (rS === 9) {
       
        let p1 = {
            pTop: '90%',
            pLeft: '36.5%'
        }


        let p2 = {
            pTop: '75%',
            pLeft: '7%'
        }


        let p3 = {
            pTop: '55%',
            pLeft: '9%'
        }


        let p4 = {
            pTop: '35%',
            pLeft: '11%'
        }


        let p5 = {
            pTop: '20%',
            pLeft: '17%'
        }


        let p6 = {
            pTop: '20%',
            pLeft: '56%'
        }


        let p7 = {
            pTop: '35%',
            pLeft: '62%'
        }


        let p8 = {
            pTop: '55%',
            pLeft: '64%'
        }


        let p9 = {
            pTop: '75%',
            pLeft: '66%'
        }


        inGamePlayerPositions.push(p1, p2, p3, p4, p5, p6, p7, p8, p9)


    }


    return inGamePlayerPositions;
}


export default positionsFunction
