import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTasks } from '../../../hooks/useTasks';

export default function EditTaskScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { getTaskById, editTask } = useTasks();

    // Estado para o formulário
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        const task = getTaskById(id);

        // Se encontramos a tarefa, atualizamos o formulário
        if (task) {
            setTitle(task.title);
            setNotes(task.notes);
        }
    }, [id, getTaskById]);

    const handleSave = () => {
        const changes = {
            title,
            notes,
        };

        editTask(id, changes);
        router.back();
    };

    return (
        <View>
            <TextInput value={title} onChangeText={setTitle} placeholder="Título" />
            <TextInput value={notes} onChangeText={setNotes} placeholder="Notas" />
            <Button title="Salvar" onPress={handleSave} />
        </View>
    );
}