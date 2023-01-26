/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function PickerCoin({coins, onChange, selectCoin}) {
  

  let arrayCoins = coins.map(coin => {
    return <Picker.Item key={coin.key} label={coin.key} value={coin.key} />;
  });


    return (
        <View style={styles.textPicker}>
        <Picker
            selectedValue={selectCoin}
            placeholder="Selecione uma moeda"
            onValueChange={itemValue => onChange(itemValue)}>
            {arrayCoins}
        </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  textPicker: {
    fontSize: 25,
  },
});
