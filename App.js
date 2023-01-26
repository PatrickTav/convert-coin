/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard
} from 'react-native';

import PickerCoin from './src/components/PickerCoin';

import api from './src/service/api';

export default function App() {
  const [coin, setCoin] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [valueInput, setValueInput] = React.useState(0);
  const [selectCoin, setSelectCoin] = React.useState(null);

  const [convertedCoin, setConvertedCoin] = React.useState(0)
  const [valueCoin, setValueCoin] = React.useState(null)

  React.useEffect(() => {
    async function loadCoin() {
      const response = await api.get('all');
      const coins = [];
      Object.keys(response.data).map(key => {
        coins.push({
          key: key,
          label: key,
          value: key,
        });
      });

      setCoin(coins);
      setIsLoading(false);
      
    }
    loadCoin();
  }, []);

  async function handleConvertCoin() {
    const res = await api.get(`all/${selectCoin}-BRL`);
    console.log(res.data[selectCoin].ask);

    const thisValueCoin = res.data[selectCoin].ask;
    const result = thisValueCoin * parseFloat(valueInput);

    setConvertedCoin(`R$ ${result.toFixed(2)}`);
    setValueCoin(selectCoin);
    Keyboard.dismiss();
  }


  if (isLoading) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ActivityIndicator color="#FFF" size={45} />
      </View>
    );
  }
  return (
    <View style={styles.containerMain}>
      <View style={styles.areaCoins}>
        <Text style={styles.selectCoin}>Selecione uma moeda</Text>
        <PickerCoin
          coins={coin}
          onChange={value => setSelectCoin(value)}
          selectCoin={selectCoin}
        />
      </View>

      <View style={styles.areaValue}>
        <Text style={styles.selectCoin}>
          Digite um valor para converter para R$
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="EX: 200"
          keyboardType="numeric"
          onChangeText={setValueInput}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleConvertCoin}>
        <Text style={styles.textButton}>Converter</Text>
      </TouchableOpacity>

      {convertedCoin !== 0  && (
      <View style={styles.resultArea}>
          <Text style={styles.convertCoin}>{valueInput} { selectCoin}</Text>
        <Text style={[styles.convertCoin, {fontSize: 20}]}>convertido</Text>
          <Text style={styles.convertCoin}>{ convertedCoin}</Text>
      </View>
      ) }
    </View>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    paddingTop: 40,
  },
  selectCoin: {
    // color: '#FFF',
    fontSize: 20,
  },
  areaCoins: {
    width: '90%',
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
  },
  areaValue: {
    width: '90%',
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textInput: {
    color: '#000',
    fontSize: 20,
  },
  button: {
    marginTop: 5,
    width: '90%',
    backgroundColor: '#7300FF',
    borderBottomEndRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    borderTopEndRadius: 5,
    padding: 10,
  },
  textButton: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  resultArea: {
    width: '90%',
    backgroundColor: '#F4f4f4',
    marginTop: 20,
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    borderTopEndRadius: 5,
  },
  convertCoin: {
    color: '#000',
    fontSize: 30,
  },
});
