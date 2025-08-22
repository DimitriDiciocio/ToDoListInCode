import {View, Text, FlatList, Alert} from "react-native";
import TaskItem from "../components/TaskItem";
import {useTasks} from "../hooks/useTasks";
import EmptyState from "../components/EmptyState";
import TaskForm from "../components/TaskForm";
import FilterBar from "../components/FilterBar";
import SearchBar from "../components/SearchBar";
import { useRouter } from 'expo-router';
import {useState} from "react";
import ModalConfirm from "../components/ModalConfirm";
import {deleteTask} from "../storage/tasks";

export default function HomeScreen() {
    const {
        tasks,
        loading,
        addTask,
        toggleTask,
        removeTask,
        filter,
        setFilter,
        query,
        setQuery,
        filteredTasks
    } = useTasks();
    const [taskToDelete, setTaskToDelete] = useState(null);
    const createdCount = tasks.length;
    const completedCount = tasks.filter(task => task.done).length;
    const pendingCount = createdCount - completedCount;
    const router = useRouter();

    const taskCounts = {
        created: createdCount,
        completed: completedCount,
        pending: pendingCount,
    };

    return (
        <View>
            <TaskForm onAddTask={addTask} />
            <FilterBar activeFilter={filter}
                       onFilterChange={setFilter}
                       counts={taskCounts}
            />
            <SearchBar searchQuery={query} onSearch={setQuery} />
            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<EmptyState />}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        onToggleStatus={() => toggleTask(item.id)}
                        onDelete={() => setTaskToDelete(item)}
                        onEdit={() => router.push(`/task/${item.id}/edit`)}
                    />
                )}
            />
            <ModalConfirm visible={taskToDelete != null} task={taskToDelete} onConfirm={() => {
                    removeTask(taskToDelete.id)
                    setTaskToDelete(null)
                }} onCancel={() => {setTaskToDelete(null);}} />
        </View>
    );
}