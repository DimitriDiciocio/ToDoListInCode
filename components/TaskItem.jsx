import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

// Ícones simples para deletar e para o checkbox
const DeleteIcon = () => <Text style={styles.deleteText}>❌</Text>;
const Checkbox = ({ checked }) => (
    <View style={[styles.checkboxBase, checked && styles.checkboxChecked]}>
        {checked && <Text>✔️</Text>}
    </View>
);

export default function TaskItem({ task, onToggleStatus, onDelete, onEdit }) {
    return (
        // O item inteiro é clicável para edição
        <Pressable onPress={onEdit} style={styles.container}>
            {/* Agrupa o checkbox e o título */}
            <View style={styles.taskInfo}>
                {/* O checkbox é clicável para marcar/desmarcar */}
                <Pressable onPress={onToggleStatus} hitSlop={10}>
                    <Checkbox checked={task.done} />
                </Pressable>
                <Text style={[styles.title, task.done && styles.titleDone]}>
                    {task.title}
                </Text>
            </View>

            {/* O botão de deletar */}
            <Pressable onPress={onDelete} hitSlop={10}>
                <DeleteIcon />
            </Pressable>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    taskInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, // Garante que o texto possa quebrar a linha se for longo
    },
    title: {
        fontSize: 16,
        marginLeft: 12,
        color: '#333',
    },
    titleDone: {
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
    deleteText: {
        fontSize: 16,
    },
    checkboxBase: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'coral',
        backgroundColor: 'transparent',
    },
    checkboxChecked: {
        backgroundColor: 'coral',
    },
});