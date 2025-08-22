import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function SearchBar({ searchQuery, onSearch }) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Buscar por título..."
                // Exibe o valor atual da busca
                value={searchQuery}
                // Chama a função para atualizar a busca a cada letra digitada
                onChangeText={onSearch}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
});