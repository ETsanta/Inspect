import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from 'react-native';

interface RadioButtonProps {
    options: { label: string; value: string }[];
    defaultValue?: string;
    onChange?: (value: string) => void;
    containerStyle?: ViewStyle;
    buttonStyle?: ViewStyle;
    selectedColor?: string;
    textStyle?: TextStyle;
}

const RadioGroup: React.FC<RadioButtonProps> = ({
    options,
    defaultValue,
    onChange,
    containerStyle,
    selectedColor = '#2196F3',
    textStyle,
}) => {
    const [selectedValue, setSelectedValue] = useState<string>(
        defaultValue || options[0]?.value
    );
    useEffect(() => {
        if (defaultValue) {
            setSelectedValue(defaultValue);
        }
    }, [defaultValue]);

    const handlePress = (value: string) => {
        setSelectedValue(value);
        onChange?.(value);
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {options.map((option) => (
                <TouchableOpacity
                    key={option.value}
                    onPress={() => handlePress(option.value)}
                    style={[
                        styles.button,
                        {
                            backgroundColor:
                                selectedValue === option.value ? selectedColor : '#FFF',
                            borderColor: selectedColor,
                        },
                    ]}
                    activeOpacity={0.7}>
                    <Text
                        style={[
                            styles.text,
                            textStyle,
                            {
                                color: selectedValue === option.value ? '#FFF' : selectedColor,
                            },
                        ]}>
                        {option.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    button: {
        height: 40,
        minWidth: 80,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
    },
});

export default RadioGroup;