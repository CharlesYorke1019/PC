import React from "react";
import { View, Dimensions } from "react-native";

interface BackgroundProps {
    opacityChange: any
}

const Background: React.FC<BackgroundProps> = ({ opacityChange }) => {
    
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;

    return (
        <View style={{height: height, width: width, zIndex: -1001, position: 'absolute', opacity: opacityChange ? 0.3 : 1}}>
            <View style={{position: 'absolute', width: 100, height: 1, top: '4%', left: '-5%', backgroundColor: '#4A4A4F', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 150, height: 1, top: '6%', left: '-6%', backgroundColor: '#6E6E73', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 200, height: 1, top: '8%', left: '-7%', backgroundColor: '#4A4A4F', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 250, height: 1, top: '10%', left: '-8%', backgroundColor: '#6E6E73', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 300, height: 1, top: '12%', left: '-9%', backgroundColor: '#4A4A4F', transform: [{rotateZ: '-40deg'}]}}>

            </View>            
            

            <View style={{position: 'absolute', width: 350, height: 1, top: '14%', left: '-10%', backgroundColor: '#6E6E73', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 400, height: 1, top: '16%', left: '-11%', backgroundColor: '#4A4A4F', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 450, height: 1, top: '18%', left: '-12%', backgroundColor: '#6E6E73', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 500, height: 1, top: '20%', left: '-14%', backgroundColor: '#4A4A4F', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 550, height: 1, top: '22%', left: '-16%', backgroundColor: '#6E6E73', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 600, height: 1, top: '24%', left: '-18%', backgroundColor: '#4A4A4F', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 650, height: 1, top: '26%', left: '-20%', backgroundColor: '#6E6E73', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 700, height: 1, top: '28%', left: '-22%', backgroundColor: '#4A4A4F', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 750, height: 1, top: '30%', left: '-24%', backgroundColor: '#6E6E73', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 800, height: 1, top: '32%', left: '-26%', backgroundColor: '#4A4A4F', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 850, height: 1, top: '34%', left: '-28%', backgroundColor: '#6E6E73', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 900, height: 1, top: '36%', left: '-30%', backgroundColor: '#4A4A4F', transform: [{rotateZ: '-40deg'}]}}>

            </View>
            
            <View style={{position: 'absolute', width: 950, height: 1, top: '38%', left: '-32%', backgroundColor: '#6E6E73', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 1000, height: 1, top: '40%', left: '-34%', backgroundColor: '#4A4A4F', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 1050, height: 1, top: '42%', left: '-36%', backgroundColor: '#6E6E73', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 1100, height: 1, top: '44%', left: '-38%', backgroundColor: '#4A4A4F', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 1150, height: 1, top: '46%', left: '-40%', backgroundColor: '#6E6E73', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 1200, height: 1, top: '48%', left: '-42%', backgroundColor: '#4A4A4F', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 1250, height: 1, top: '50%', left: '-44%', backgroundColor: '#6E6E73', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 1300, height: 1, top: '52%', left: '-46%', backgroundColor: '#4A4A4F', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 1350, height: 1, top: '54%', left: '-48%', backgroundColor: '#6E6E73', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 1400, height: 1, top: '56%', left: '-50%', backgroundColor: '#4A4A4F', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 500, height: 1, top: '85%', left: '0%', backgroundColor: '#6E6E73', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 450, height: 1, top: '92%', left: '0%', backgroundColor: '#4A4A4F', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 450, height: 1, top: '96%', left: '0%', backgroundColor: '#6E6E73', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 450, height: 1, top: '100%', left: '0%', backgroundColor: '#4A4A4F', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 450, height: 1, top: '104%', left: '0%', backgroundColor: '#6E6E73', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 450, height: 1, top: '108%', left: '0%', backgroundColor: '#4A4A4F', transform: [{rotateZ: '-40deg'}]}}>

            </View>

            <View style={{position: 'absolute', width: 450, height: 1, top: '112%', left: '0%', backgroundColor: '#6E6E73', transform: [{rotateZ: '-40deg'}]}}>

            </View>

        </View>
    )
}

export default Background