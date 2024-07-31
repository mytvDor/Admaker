import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const emojis = [
  {title: 'happy'},
  {title: 'cool'},
  {title: 'lol'},
  {title: 'sad'},
  {title: 'cry'},
  {title: 'angry'},
  {title: 'confused'},
  {title: 'excited'},
  {title: 'kiss'},
  {title: 'devil'},
  {title: 'dead'},
  {title: 'wink'},
  {title: 'sick'},
  {title: 'frown'},
];

const Temp = () => {
  return (
    <SelectDropdown
      data={emojis}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem && selectedItem.title) || 'Select your mood'}
            </Text>
            <Text style={styles.dropdownButtonArrowStyle}>
              {isOpened ? '▲' : '▼'}
            </Text>
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={[
              styles.dropdownItemStyle,
              isSelected && {backgroundColor: '#D2D9DF'},
            ]}>
            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 18,
    color: '#151E26',
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
});

export default Temp;
