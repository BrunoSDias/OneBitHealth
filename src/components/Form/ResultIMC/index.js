import React from 'react';
import { View, Text, Share, TouchableOpacity } from 'react-native';
import styles from './style';

const ResultIMC = (props) => {

  const onShare = async () => {
    const result = await Share.share({
      message: `Meu imc hoje é: ${props.resultImc}`,
    })
  }

  return (
    <View style={styles.contextImc}>
      <View style={styles.boxShareButton}>
        { props.resultImc !== null && 
          <TouchableOpacity
            style={styles.shared}
            onPress={onShare}
          >
            <Text style={styles.sharedText}>Compartilhar</Text>
          </TouchableOpacity>
        }
      </View>
      <Text style={styles.information}>{props.messageResultImc}</Text>
      <Text style={styles.numberImc}>{props.resultImc}</Text>
    </View>
  );
}

export default ResultIMC;