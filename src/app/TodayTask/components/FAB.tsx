import * as React from 'react';
import { StyleSheet, Alert, View, SafeAreaView } from 'react-native';
import { FAB, Portal, PaperProvider } from 'react-native-paper';
import BarcodeScanner from "../../../components/Analyst"

const MyComponent = ({scanResult}) => {
    const [state, setState] = React.useState({ open: false });
    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;
    const [isScanning, setIsScanning] = React.useState(false);
    const handleScanResult = (result: any) => {
        setIsScanning(false);
        scanResult(result)
    };
    const onClose = () => {
        setIsScanning(false);
    };
    return (
        (!isScanning && <FAB.Group
            style={styles.fabStyle}
            open={open}
            visible
            icon={open ? 'unfold-less-horizontal' : 'unfold-more-horizontal'}
            actions={[
                {
                    icon: 'qrcode-scan',
                    label: '扫码',
                    onPress: () => {
                        setIsScanning(true);
                    },
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
        />) ||
        (<BarcodeScanner getScanResult={handleScanResult} isScanning={isScanning} onClose={onClose} />)
    );
};
const styles = StyleSheet.create({
    fabStyle: {
        position: 'absolute',
        zIndex: 1
    },
});
export default MyComponent;