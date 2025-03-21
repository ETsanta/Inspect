import React, { useState, useRef } from 'react';
import { View, Button, Image, Text } from 'react-native';
import Pictrue from '../../components/Pictrue';
import Drawer from "../../components/Drawer"

const Check = () => {

    return(
        <View>
            <Pictrue></Pictrue>
            <Drawer></Drawer>
        </View>
    )
}

export default Check;