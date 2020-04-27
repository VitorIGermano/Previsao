import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Keyboard, FlatList } from 'react-native';
import PrevisaoItem from './Components/PrevisaoItem';

export default function App() {

  const endPoint = "https://api.openweathermap.org/data/2.5/forecast?lang=pt&units=metric&q=";
  const apiKey = '8165bc3cee10345a2e916d67534f27f4';

  const [cidade, setCidade] = useState('');
  const [previsoes, setPrevisoes] = useState([]);

  const capturarCidade = (cidade) => {
    setCidade(cidade);
  }

  const obtemPrevisoes = () => {
    setPrevisoes([]);

  const target = endPoint + cidade + "&appid=" + apiKey;
    fetch(target)
    .then((dados) => dados.json())
    .then((dados) => {
      setPrevisoes(dados["list"])
      Keyboard.dismiss()
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.entrada}>
      <TextInput
      style={styles.nomeCidade}
      placeholder="Digite o nome de uma cidade"
      value={cidade}
      onChangeText={capturarCidade}
      />
      <Button title="Ok" onPress={obtemPrevisoes}/>
      </View>
      <FlatList
        data={previsoes}
        renderItem={
        previsao => (
        <PrevisaoItem previsao={previsao} />
        )
        }
      />
    </View>
    );
    
}

const styles = StyleSheet.create({
  container: {
  padding: 40,
  flexDirection: 'column',
  flex: 1,
  backgroundColor: '#fff'
  },
  nomeCidade: {
  padding: 10,
  borderBottomColor: '#BB96F3',
  borderBottomWidth: 2,
  textAlign: 'left',
  flexGrow: 0.9
  },
  entrada: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 8
  }
  });
