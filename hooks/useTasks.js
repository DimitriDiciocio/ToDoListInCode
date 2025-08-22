import { useState, useEffect, useMemo, useCallback } from 'react';
import * as TaskStorage from '../storage/tasks';

export function useTasks() {
    // Estado para armazenar todas as tarefas brutas, sem filtro
    const [tasks, setTasks] = useState([]);

    // Estado para o filtro atual ('all', 'pending', 'completed')
    const [filter, setFilter] = useState('all'); // [cite: 35]

    // Estado para o termo da busca
    const [query, setQuery] = useState(''); // [cite: 36]

    // Estado para controlar o carregamento inicial
    const [loading, setLoading] = useState(true);

    // Efeito para carregar as tarefas do AsyncStorage uma única vez
    useEffect(() => {
        async function loadData() {
            const loadedTasks = await TaskStorage.loadTasks(); //
            setTasks(loadedTasks);
            setLoading(false);
        }
        loadData();
    }, []);

    // Função para adicionar uma nova tarefa
    const addTask = useCallback(async (title, notes = "") => {
        const newTask = TaskStorage.createTask(title, notes);
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        await TaskStorage.saveTasks(updatedTasks); // [cite: 106]
    }, [tasks]);

    // Função para remover uma tarefa
    const removeTask = useCallback(async (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        await TaskStorage.saveTasks(updatedTasks); // [cite: 109]
    }, [tasks]);

    // Função para editar uma tarefa existente
    const editTask = useCallback(async (taskId, changes) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId
                ? { ...task, ...changes, updatedAt: Date.now() }
                : task
        );
        setTasks(updatedTasks);
        await TaskStorage.saveTasks(updatedTasks); // [cite: 107]
    }, [tasks]);

    // Função para alternar o status 'done' de uma tarefa
    const toggleTask = useCallback(async (taskId) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId
                ? { ...task, done: !task.done, updatedAt: Date.now() }
                : task
        );
        setTasks(updatedTasks);
        await TaskStorage.saveTasks(updatedTasks); // [cite: 108]
    }, [tasks]);

    // Lógica de filtragem e busca com useMemo para otimização [cite: 41, 135]
    const filteredTasks = useMemo(() => {
        let items = [...tasks];

        // 1. Aplicar filtro de status
        if (filter === 'pending') {
            items = items.filter(task => !task.done);
        } else if (filter === 'completed') {
            items = items.filter(task => task.done);
        }

        // 2. Aplicar busca por título
        if (query.trim()) {
            items = items.filter(task =>
                task.title.toLowerCase().includes(query.toLowerCase())
            );
        }

        // Retorna a lista processada
        return items;
    }, [tasks, filter, query]); // Recalcula apenas quando uma dessas dependências mudar

    const getTaskById = useCallback((id) => {
        return tasks.find(task => task.id === id);
    }, [tasks]);

    // O hook expõe o estado e as funções para os componentes
    return {
        tasks,
        filteredTasks,
        loading,
        filter,
        query,
        addTask,
        removeTask,
        editTask,
        toggleTask,
        setFilter,
        setQuery,
        getTaskById,
    };
}