import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

// O 'label' é o texto, o 'value' é o filtro do hook, e o 'countKey' é a chave para o objeto de contagem
const FILTERS = [
    { label: 'Criadas', value: 'all', countKey: 'created' },
    { label: 'Pendentes', value: 'pending', countKey: 'pending' },
    { label: 'Concluídas', value: 'completed', countKey: 'completed' },
];

export default function FilterBar({ activeFilter, onFilterChange, counts }) {
    return (
        <View style={styles.container}>
            {FILTERS.map((filter) => (
                <Pressable
                    key={filter.value}
                    onPress={() => onFilterChange(filter.value)}
                    style={styles.button}
                >
                    <Text
                        style={[
                            styles.label,
                            activeFilter === filter.value && styles.activeLabel,
                        ]}
                    >
                        {filter.label}
                    </Text>
                    <View style={styles.countBubble}>
                        <Text style={styles.countText}>
                            {counts[filter.countKey] ?? 0}
                        </Text>
                    </View>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#888',
    },
    activeLabel: {
        color: '#8A2BE2', // Roxo
    },
    countBubble: {
        marginLeft: 8,
        backgroundColor: '#eee',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    countText: {
        color: '#333',
        fontWeight: 'bold',
    },
});