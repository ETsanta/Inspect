import { View } from 'react-native';
import { Picker, DatePicker } from 'react-native-wheel-pick';

// use Picker
export default function CustomScrollPicker() {

    return (
        <View>
            <Picker
                style={{ backgroundColor: 'white', width: 300, height: 215 }}
                selectedValue='item4'
                pickerData={['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7']}
                onValueChange={(value: any) => { console.log(value) }}
            />
            <DatePicker
                style={{ backgroundColor: 'white', width: 370, height: 240 }}
                onDateChange={(date: any) => { console.log(date) }}
            />
        </View>
    );
}