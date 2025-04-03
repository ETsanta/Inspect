import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Portal, PaperProvider } from 'react-native-paper';

const MyComponent = () => {
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    return (
        <FAB.Group
            style={styles.fabStyle}
            open={open}
            visible
            icon={open ? 'calendar-today' : 'plus'}
            actions={[
                {
                    icon: 'qrcode-scan',
                    label: '扫码',
                    onPress: () => console.log('Pressed star'),
                },
                {
                    icon: 'email',
                    label: '信息',
                    onPress: () => console.log('Pressed email'),
                },
                {
                    icon: 'bell',
                    label: '提示',
                    onPress: () => console.log('Pressed notifications'),
                },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
                if (open) {
                    // do something if the speed dial is open
                }
            }}
        />
    );
};
const styles = StyleSheet.create({
    fabStyle: {
        bottom: 16,
        right: 16,
        position: 'absolute',
        zIndex:999
    },
});
export default MyComponent;