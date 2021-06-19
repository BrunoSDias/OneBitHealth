import React, { useState } from 'react';
import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration, 
  Keyboard, 
  Pressable,
  FlatList,
} from 'react-native';
import styles from './style';
import ResultIMC from './ResultIMC';

const Form = () => {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageImc, setMessageImc] = useState("Preencha o peso e a altura");
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular IMC");
  const [errorMessage, setErrorMessage] = useState(null)
  const [imcList, setImcList] = useState([])

  const imcCalculator = () => {
    const heightFormat = height.replace(",", ".")
    const totalImc = (weight/(heightFormat * heightFormat)).toFixed(2);
    setImcList(il => [...il, {id: new Date().getTime(), imc: totalImc }]);
    setImc(totalImc);
  }

  const verificationImc = () => {
    if (imc == null) {
      setErrorMessage("campo obrigatório")
      Vibration.vibrate();
    }
  }

  const validationImc = () => {
      if(weight !== null && height !== null) {
      imcCalculator()
      setHeight(null)
      setWeight(null)
      setErrorMessage(null)
      setMessageImc(`Seu imc é igual: `)
      setTextButton(`Calcular IMC Novamente`)
      return
    }
    verificationImc()
    setImc(null)
    setTextButton(`Calcular IMC`)
    setMessageImc(`Preencha o peso e a altura`)
  }

  return(
    <View 
      onPress={Keyboard.dismiss} 
      style={styles.formContext}
    >
      {imc === null && (
        <Pressable style={styles.form}>
        <Text style={styles.formLabel}>Altura</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TextInput
          onChangeText={setHeight}
          value={height}
          placeholder="Ex. 1.75"
          keyboardType="numeric"
          style={styles.input}
        />

        <Text style={styles.formLabel}>Peso</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TextInput
          onChangeText={setWeight}
          value={weight}
          placeholder="Ex. 75.365"
          keyboardType="numeric"
          style={styles.input}
        />
      </Pressable>
      )}
      {imc && <ResultIMC messageResultImc={messageImc} resultImc={imc}/>}
      <TouchableOpacity
        style={styles.buttonCalculator}
        onPress={() => {
          validationImc()
        }}
      >
        <Text style={styles.textButtonCalculator}>{textButton}</Text>
      </TouchableOpacity>
      <FlatList
      showsVerticalScrollIndicator={false}
        style={styles.listImcs}
        data={imcList.reverse()}
        renderItem={({item}) => {
          return(
            <Text style={styles.resultImcItem}>
              <Text style={styles.textResultItemList}>Resultado IMC = </Text>
              {item.imc}
            </Text>
          )
        }}
        keyExtractor={(item) => {
          item.id
        }}
      />
    </View>
  );
}

export default Form;