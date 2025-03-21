import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const App = () => {
    const sheetRef = React.useRef(null);

    return (
        <>
            <TouchableOpacity onPress={() => sheetRef.current?.expand()}>
                <Text>打开</Text>
            </TouchableOpacity>
            <BottomSheet ref={sheetRef}>
                <Text style={styles.container}>内容</Text>
            </BottomSheet>

        </>
    );
};

export default App;