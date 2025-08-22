import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, Alert, StyleSheet } from 'react-native';

export default function TaskForm({ onAddTask }) {
    const [title, setTitle] = useState('');

    const handlePress = () => {
        if (title.trim() === '') {
            Alert.alert("Erro", "O título é obrigatório!");
            return;
        }

        onAddTask(title);

        setTitle('');
    };

    return (
        <View >
            <TextInput

                placeholder="Adicione uma nova tarefa..."
                value={title}
                onChangeText={setTitle}
            />
            <Pressable onPress={handlePress}>
                <Text>+</Text>
            </Pressable>
        </View>
    );
}

