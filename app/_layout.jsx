import { Stack } from 'expo-router';

export default function AppLayout() {
    return (
        <Stack
            screenOptions={{
                animation: 'fade',
            }}
        >
            <Stack.Screen
                name="index" // O nome do arquivo da nossa HomeScreen
                options={{ title: 'Minhas Taref' }}
            />
            <Stack.Screen
                name="task/[id]/edit" // O nome da nossa tela de edição
                options={{ title: 'Editar Tarefa' }}
            />
        </Stack>
    );
}