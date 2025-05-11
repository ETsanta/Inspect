import { View } from 'react-native';
import { Picker, DatePicker } from 'react-native-wheel-pick';
import { Avatar, Button, Card, Text } from 'react-native-paper';

// use Picker
export default function CustomScrollPicker() {

    const LeftContent = (props:any) => <Avatar.Icon {...props} icon="folder" />
    return (
        <View>
            <Card>
                <Card.Content>
                    <Text variant="titleLarge">帮助</Text>
                    <Text variant="bodyMedium">如遇到问题请保持冷静，联系管理员</Text>
                    <Text variant="bodyMedium">13640282804</Text>
                </Card.Content>
                <Card.Cover source={require('../../asset/img/help.jpg')} />
            </Card>
        </View>
    );
}