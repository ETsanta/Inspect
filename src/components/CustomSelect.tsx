import React, { 
  forwardRef, 
  useState, 
  useImperativeHandle, 
  useRef, 
  useEffect,
  Ref
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  StyleSheet,
  Platform,
  LayoutChangeEvent,
  ViewStyle,
  TextStyle,
  ListRenderItem
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// 定义选项类型
export interface DropdownOption {
  label: string;
  value: string;
}

// 定义组件Props
export interface DropdownProps {
  options: DropdownOption[];
  placeholder?: string;
  required?: boolean;
  defaultValue?: DropdownOption | null;
  style?: ViewStyle;
  dropdownStyle?: ViewStyle;
  optionStyle?: ViewStyle;
  placeholderColor?: string;
  textColor?: string;
  errorColor?: string;
  iconColor?: string;
  searchable?: boolean;
  onSelect?: (item: DropdownOption | null) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  renderOption?: (item: DropdownOption, handleSelect: (item: DropdownOption) => void) => React.ReactNode;
  renderSelected?: (selectedOption: DropdownOption | null, handleClear: () => void) => React.ReactNode;
}

// 定义Ref暴露的方法
export interface DropdownRef {
  getValue: () => DropdownOption | null;
  reset: () => void;
  setValue: (value: string) => void;
  validate: () => boolean;
  setError: (message: string) => void;
}

const Dropdown = forwardRef<DropdownRef, DropdownProps>((props, ref) => {
  // 解构props并设置默认值
  const {
    options = [],
    placeholder = "请选择",
    required = false,
    defaultValue = null,
    style = {},
    dropdownStyle = {},
    optionStyle = {},
    placeholderColor = "#999",
    textColor = "#333",
    errorColor = "#ff5252",
    iconColor = "#666",
    searchable = false,
    onSelect = () => {},
    onBlur = () => {},
    onFocus = () => {},
    renderOption,
    renderSelected
  } = props;
  
  // 组件状态
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(defaultValue);
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  
  // 引用用于测量位置
  const containerRef = useRef<View>(null);
  
  // 暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    getValue: () => {
      return selectedOption;
    },
    reset: () => {
      setSelectedOption(null);
      setError('');
    },
    setValue: (value: string) => {
      const option = options.find(opt => opt.value === value);
      if (option) {
        setSelectedOption(option);
        setError('');
      }
    },
    validate: () => {
      if (required && !selectedOption) {
        setError('此项为必填项');
        return false;
      }
      setError('');
      return true;
    },
    setError: (message: string) => {
      setError(message);
    }
  }));
  
  // 过滤选项
  const filteredOptions = searchable && searchText 
    ? options.filter(opt => 
        opt.label.toLowerCase().includes(searchText.toLowerCase()))
    : options;
  
  // 处理选项选择
  const handleSelect = (option: DropdownOption) => {
    setSelectedOption(option);
    setIsVisible(false);
    setSearchText('');
    onSelect(option);
    if (error) setError('');
  };
  
  // 清除选择
  const handleClear = () => {
    setSelectedOption(null);
    setError('');
    onSelect(null);
  };
  
  // 计算下拉框位置
  const measurePosition = () => {
    if (containerRef.current) {
      containerRef.current.measureInWindow((x, y, width, height) => {
        setPosition({
          top: y + height + (Platform.OS === 'ios' ? 8 : 0),
          left: x,
          width
        });
      });
    }
  };
  
  // 显示下拉框
  const showDropdown = () => {
    measurePosition();
    setIsVisible(true);
    onFocus();
  };
  
  // 渲染默认选项
  const renderOptionItem: ListRenderItem<DropdownOption> = ({ item }) => {
    if (renderOption) {
      return renderOption(item, handleSelect);
    }
    
    return (
      <TouchableOpacity 
        style={[styles.option, optionStyle]}
        onPress={() => handleSelect(item)}
      >
        <Text style={[styles.optionText, { color: textColor }]}>{item.label}</Text>
        {selectedOption && selectedOption.value === item.value && (
          <Icon name="check" size={20} color="#4CAF50" />
        )}
      </TouchableOpacity>
    );
  };
  
  // 渲染选中项
  const renderSelectedItem = () => {
    if (renderSelected) {
      return renderSelected(selectedOption, handleClear);
    }
    
    return (
      <View style={styles.selectedContainer}>
        <Text 
          style={[
            styles.selectedText, 
            { color: selectedOption ? textColor : placeholderColor }
          ]}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        {selectedOption && (
          <TouchableOpacity onPress={handleClear} style={styles.clearIcon}>
            <Icon name="cancel" size={18} color={iconColor} />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity 
        ref={containerRef}
        style={[
          styles.inputContainer,
          error ? { borderColor: errorColor } : {},
          isVisible ? styles.focusedBorder : {}
        ]}
        onPress={showDropdown}
        activeOpacity={0.8}
      >
        {renderSelectedItem()}
        <Icon 
          name={isVisible ? "arrow-drop-up" : "arrow-drop-down"} 
          size={24} 
          color={iconColor} 
        />
      </TouchableOpacity>
      
      {error ? (
        <Text style={[styles.errorText, { color: errorColor }]}>{error}</Text>
      ) : null}
      
      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => {
            setIsVisible(false);
            setSearchText('');
            onBlur();
          }}
        >
          <View 
            style={[
              styles.dropdown, 
              dropdownStyle,
              { 
                top: position.top,
                left: position.left,
                width: position.width
              }
            ]}
          >
            {searchable && (
              <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                  style={[styles.searchInput, { color: textColor }]}
                  placeholder="搜索..."
                  placeholderTextColor={placeholderColor}
                  value={searchText}
                  onChangeText={setSearchText}
                  autoFocus
                />
                {searchText ? (
                  <TouchableOpacity 
                    style={styles.searchClear} 
                    onPress={() => setSearchText('')}
                  >
                    <Icon name="cancel" size={18} color="#999" />
                  </TouchableOpacity>
                ) : null}
              </View>
            )}
            
            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.value}
              renderItem={renderOptionItem}
              keyboardShouldPersistTaps="handled"
              style={styles.list}
            />
            
            {filteredOptions.length === 0 && (
              <View style={styles.noResults}>
                <Text style={[styles.noResultsText, { color: placeholderColor }]}>
                  无匹配结果
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
});

// 样式定义
const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    height: 48,
  },
  selectedContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedText: {
    fontSize: 16,
  },
  clearIcon: {
    marginRight: 8,
  },
  focusedBorder: {
    borderColor: '#4A90E2',
    borderWidth: 1.5,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
    maxHeight: 300,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  searchClear: {
    padding: 4,
  },
  list: {
    maxHeight: 250,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  optionText: {
    fontSize: 16,
  },
  noResults: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    fontSize: 14,
  },
});

export default Dropdown;