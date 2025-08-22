import AsyncStorage from '@react-native-async-storage/async-storage';
import {generateUniqueId} from '../utils/id';

const STORAGE_KEY = "@todo/tasks";

//Crud Tasks

//Criando a tarefa
export function createTask(title, notes = "") {
    const now = Date.now();
    return {
        id: generateUniqueId(),
        title,
        notes,
        done: false,
        createdAt: now,
        updatedAt: now,
    };
}

//Salvando a tarefa
export async function saveTasks(tasks) {
    try {
        const payload = { items: tasks, version: 1 }
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
        console.error("Erro ao salvar tasks:", e)
    }
}

//Carregando a tarefa
export async function loadTasks() {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) {
            const parsed = JSON.parse(data);
            return parsed.items || [];
        }
        return [];
    } catch (e) {
        console.error("Erro ao carregar tasks:", e);
        return [];
    }
}

//Deletando a tarefa
export async function deleteTask(taskId) {
    try {
        const tasks = await loadTasks();
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        await saveTasks(updatedTasks);
        return updatedTasks;
    }
    catch (e) {
        console.error("Erro ao deletar task:", e);
        return [];
    }
}

//Editando a tarefa
export async function updateTask(taskId, task) {
    try {
        const tasks = await loadTasks();
        const updatedTasks = tasks.map(task =>
            task.id === taskId
                ? { ...task, ...changes, updatedAt: Date.now() } // merge das mudanças
                : task
        );
        await saveTasks(updatedTasks);
        return updatedTasks;
    }
    catch (e) {
        console.error("Erro ao editar task:", e);
        return [];
    }
}