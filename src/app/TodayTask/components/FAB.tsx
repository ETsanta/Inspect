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
            icon={open ? 'unfold-less-horizontal' : 'unfold-more-horizontal'}
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
                }
            }}
        />
    );
};
const styles = StyleSheet.create({
    fabStyle: {
        position: 'absolute',
        zIndex: 1
    },
});
export default MyComponent;