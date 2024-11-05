import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Title = ({ text }) => {  
    return (
        <Text style={styles.text}>
          {text}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 40,
        color: 'rgb(16, 137, 211)',
    }
});

export default Title;

