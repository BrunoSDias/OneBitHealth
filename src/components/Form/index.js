import React, { useState } from 'react';
import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
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

  const imcCalculator = () => {
    return setImc((weight/(height * height)).toFixed(2))
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
    <View style={styles.formContext}>
      <View style={styles.form}>
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
        
        <TouchableOpacity
          style={styles.buttonCalculator}
          onPress={() => {
            validationImc()
          }}
        >
          <Text style={styles.textButtonCalculator}>Calcular</Text>
        </TouchableOpacity>
        <ResultIMC messageResultImc={messageImc} resultImc={imc}/>
      </View>
    </View>
  );
}

export default Form;