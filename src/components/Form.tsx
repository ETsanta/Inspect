import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
  GestureResponderEvent
} from 'react-native';

// ================ 类型定义 ================
export type PDAInputRef = {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  validate: () => boolean;
  getValue: () => string;
  setValue: (value: string) => void;
};

export type PDAInputProps = {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  errorMessage?: string;
  showClearButton?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  clearButtonStyle?: StyleProp<ViewStyle>;
  clearIcon?: React.ReactNode;
  onFocus?: () => void;
  onBlur?: () => void;
  onPress?: (event: GestureResponderEvent) => void;
} & Omit<TextInputProps, 'value' | 'onChangeText' | 'style'>;

// ================ 组件实现 ================
const PDAInput = forwardRef<PDAInputRef, PDAInputProps>((props, ref) => {
  const {
    value: propValue = '',
    onChangeText,
    placeholder = "点击输入",
    label,
    required = false,
    errorMessage = "此项为必填项",
    showClearButton = true,
    containerStyle,
    inputContainerStyle,
    labelStyle,
    valueStyle,
    placeholderStyle,
    errorStyle,
    clearButtonStyle,
    clearIcon,
    onFocus,
    onBlur,
    onPress,
    ...textInputProps
  } = props;
  
  const [internalValue, setInternalValue] = useState(propValue);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hiddenInputRef = useRef<TextInput>(null);
  
  // 同步外部值变化
  useEffect(() => {
    setInternalValue(propValue);
  }, [propValue]);
  
  // 处理输入变化
  const handleInputChange = (text: string) => {
    setInternalValue(text);
    onChangeText?.(text);
    
    // 实时校验（如果已触发过错误）
    if (error && text.trim()) {
      setError(null);
    }
  };
  
  // 处理聚焦
  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };
  
  // 处理失焦
  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
    
    // 失焦时校验
    if (required && !internalValue.trim()) {
      setError(errorMessage);
    }
  };
  
  // 处理容器点击
  const handleContainerPress = (event: GestureResponderEvent) => {
    hiddenInputRef.current?.focus();
    onPress?.(event);
  };
  
  // 清除内容
  const handleClear = () => {
    setInternalValue('');
    onChangeText?.('');
    setError(null);
    hiddenInputRef.current?.focus();
  };
  
  // 校验输入
  const validate = (): boolean => {
    if (required && !internalValue.trim()) {
      setError(errorMessage);
      return false;
    }
    setError(null);
    return true;
  };
  
  // 暴露方法给 ref
  useImperativeHandle(ref, () => ({
    focus: () => {
      hiddenInputRef.current?.focus();
    },
    blur: () => {
      hiddenInputRef.current?.blur();
    },
    clear: () => {
      handleClear();
    },
    validate,
    getValue: () => internalValue,
    setValue: (value: string) => {
      setInternalValue(value);
      onChangeText?.(value);
    }
  }));

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={styles.requiredMark}> *</Text>}
        </Text>
      )}
      
      <TouchableOpacity
        onPress={handleContainerPress}
        activeOpacity={0.8}
        style={[
          styles.inputContainer,
          inputContainerStyle,
          isFocused && styles.focusedContainer,
          !!error && styles.errorContainer
        ]}
      >
        {internalValue ? (
          <Text style={[styles.valueText, valueStyle]}>{internalValue}</Text>
        ) : (
          <Text style={[styles.placeholderText, placeholderStyle]}>{placeholder}</Text>
        )}
        
        {showClearButton && !!internalValue && (
          <TouchableOpacity 
            onPress={handleClear}
            style={[styles.clearButton, clearButtonStyle]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {clearIcon || <Text style={styles.clearIcon}>×</Text>}
          </TouchableOpacity>
        )}
        
        {/* 隐藏的实际输入框 */}
        <TextInput
          ref={hiddenInputRef}
          value={internalValue}
          onChangeText={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          showSoftInputOnFocus={false}
          caretHidden={true}
          style={styles.hiddenInput}
          {...textInputProps}
        />
      </TouchableOpacity>
      
      {!!error && (
        <Text style={[styles.errorText, errorStyle]}>{error}</Text>
      )}
    </View>
  );
});

// ================ 默认样式 ================
const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  requiredMark: {
    color: 'red',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    backgroundColor: '#f9f9f9',
    minHeight: 50,
  },
  focusedContainer: {
    borderColor: '#3498db',
    backgroundColor: '#e3f2fd',
    borderWidth: 2,
  },
  errorContainer: {
    borderColor: '#e74c3c',
  },
  valueText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    flex: 1,
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
  clearIcon: {
    fontSize: 20,
    color: '#999',
    fontWeight: 'bold',
  },
  hiddenInput: {
    position: 'absolute',
    width: 0,
    height: 0,
    opacity: 0,
  },
  errorText: {
    marginTop: 4,
    fontSize: 14,
    color: '#e74c3c',
  },
});

export default PDAInput;