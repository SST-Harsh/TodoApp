import Hero from "../Components/Hero";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { motion, AnimatePresence } from "framer-motion";
import Galaxy from "../Components/Galaxy";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TodoPage() {
    const [taskInput, setTaskInput] = useState("");

    const [editingIndex, setEditingIndex] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dueDate, setDueDate] = useState(null);

    // Load tasks from localStorage on component mount
    function LoadTask() {
        const savedTasks = localStorage.getItem('taskList');
        if (savedTasks) {
            try {
                const parsedTasks = JSON.parse(savedTasks);
                return parsedTasks.map(task => ({
                    ...task,
                    dueDate: task.dueDate ? new Date(task.dueDate) : null
                }));
            } catch (err) {
                console.error("Failed to parse tasks from localStorage", err);
            }
        }
        return [];
    }

  
    const [taskList, setTaskList] = useState(LoadTask);


    // Save tasks to localStorage whenever taskList changes
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(taskList));
    }, [taskList]);

    const handleAddTask = () => {
        if (taskInput.trim() === "") {
            toast.error('Please enter a task!', {
                position: "top-right",
                autoClose: 3000,
                theme: "light",
                transition: Bounce
            });
            return;
        }

        if (editingIndex !== null) {
            const updatedTasks = taskList.map((task, i) =>
                i === editingIndex ? {
                    ...task,
                    text: taskInput,
                    dueDate: dueDate
                } : task
            );
            setTaskList(updatedTasks);
            setEditingIndex(null);
            toast.success('Task updated successfully!');
        } else {
            const newTask = {
                text: taskInput,
                completed: false,
                id: Date.now(),
                createdAt: new Date().toISOString(),
                dueDate: dueDate
            };
            setTaskList([...taskList, newTask]);
            toast.success('Task added successfully!');
        }

        setTaskInput("");
        setDueDate(null);
        setShowDatePicker(false);
    };

    const handleRemoveTask = (index) => {
        const updatedTasks = taskList.filter((_, i) => i !== index);
        setTaskList(updatedTasks);

        if (editingIndex === index) {
            setEditingIndex(null);
            setTaskInput("");
            setDueDate(null);
        }
        toast.info('Task removed!');
    };

    const handleToggleComplete = (index) => {
        const updatedTasks = taskList.map((task, i) =>
            i === index ? {
                ...task,
                completed: !task.completed,
                completedAt: !task.completed ? new Date().toISOString() : null
            } : task
        );
        setTaskList(updatedTasks);

        const action = updatedTasks[index].completed ? 'completed' : 'marked incomplete';
        toast.success(`Task ${action}!`);
    };

    const handleEditTask = (index) => {
        const taskToEdit = taskList[index];
        setEditingIndex(index);
        setTaskInput(taskToEdit.text);
        setDueDate(taskToEdit.dueDate);
    };

    const handleDateChange = (date) => {
        setDueDate(date);
        setShowDatePicker(false);
    };

    // Animation variants
    const taskVariants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            x: -100,
            transition: { duration: 0.2, ease: "easeIn" }
        },
        hover: { scale: 1.02 },
        tap: { scale: 0.98 }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    // Calculate remaining tasks
    const remainingTasks = taskList.filter(task => !task.completed).length;

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 to-indigo-950 overflow-hidden">
            {/* Galaxy Background */}
            <div className="fixed inset-0 z-0">
                {/* <Galaxy
                    mouseRepulsion={true}
                    mouseInteraction={true}
                    density={1.5}
                    glowIntensity={0.5}
                    saturation={0.8}
                    hueShift={240}
                /> */}
            </div>

            {/* Content Container */}
            <div className="relative z-10 min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
                <Hero />
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    toastStyle={{
                        backgroundColor: '#1F2937',
                        color: '#F3F4F6'
                    }}
                />

                {/* Input Section */}
                <motion.div
                    className="w-full max-w-2xl bg-gray-800/70 backdrop-blur-md p-6 rounded-xl shadow-lg mb-8 border border-indigo-900/50"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 100
                    }}
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <motion.input
                                type="text"
                                placeholder={editingIndex !== null ? "Edit your task" : "Add your task"}
                                value={taskInput}
                                onChange={(e) => setTaskInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                                className="w-full pl-4 pr-12 py-3 rounded-lg bg-gray-700/80 text-white border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                whileFocus={{
                                    scale: 1.01,
                                    boxShadow: "0 0 0 2px rgba(124, 58, 237, 0.5)"
                                }}
                            />

                            {/* Calendar Icon */}
                            <div className="absolute right-3 top-3 text-gray-400 hover:text-purple-400 transition-colors">
                                <FontAwesomeIcon
                                    icon={faCalendarDays}
                                    className="text-xl cursor-pointer"
                                    onClick={() => setShowDatePicker(!showDatePicker)}
                                />
                            </div>

                            {/* Date Picker with fixed z-index */}
                            {showDatePicker && (
                                <div className="absolute right-0 mt-2 z-[1000]">
                                    <DatePicker
                                        selected={dueDate}
                                        onChange={handleDateChange}
                                        minDate={new Date()}
                                        inline
                                        calendarClassName="bg-gray-800 text-white p-2 rounded-lg border border-indigo-700 shadow-xl"
                                        dayClassName={(date) =>
                                            date < new Date() ? 'text-gray-500' : 'text-white'
                                        }
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <motion.button
                                onClick={handleAddTask}
                                className={`px-6 py-3 rounded-lg font-medium ${editingIndex !== null ?
                                        'bg-green-600 hover:bg-green-700' :
                                        'bg-indigo-600 hover:bg-indigo-700'
                                    } transition-colors flex items-center gap-2`}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                {editingIndex !== null ? (
                                    <>
                                        <FontAwesomeIcon icon={faCheck} />
                                        Update
                                    </>
                                ) : (
                                    "Add Task"
                                )}
                            </motion.button>

                            {editingIndex !== null && (
                                <motion.button
                                    onClick={() => {
                                        setEditingIndex(null);
                                        setTaskInput("");
                                        setDueDate(null);
                                        toast.info('Edit cancelled');
                                    }}
                                    className="px-4 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Cancel
                                </motion.button>
                            )}
                        </div>
                    </div>

                    {/* Show selected due date */}
                    {dueDate && (
                        <div className="mt-2 text-sm text-purple-300">
                            Due date: {dueDate.toLocaleDateString()}
                        </div>
                    )}
                </motion.div>

                {/* Tasks List - Only shown when there are tasks */}
                {taskList.length > 0 ? (
                    <motion.div
                        className="w-full max-w-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-indigo-900/50"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <div className="flex justify-between items-center p-4 bg-gray-700/50 text-white border-b border-indigo-900/50">
                                <h2 className="text-xl font-semibold">
                                    Task List
                                </h2>
                                <span className="text-sm bg-indigo-700/50 px-3 py-1 rounded-full">
                                    {remainingTasks} {remainingTasks === 1 ? "task" : "tasks"} remaining
                                </span>
                            </div>

                            <AnimatePresence>
                                <div className="divide-y divide-indigo-900/50">
                                    {taskList.map((task, index) => (
                                        <motion.div
                                            key={task.id}
                                            variants={taskVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            whileHover="hover"
                                            whileTap="tap"
                                            className={`p-4 ${task.completed ?
                                                    'bg-gray-700/30' :
                                                    'bg-gray-800/30 hover:bg-gray-700/40'
                                                } transition-colors`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                                    <motion.input
                                                        type="checkbox"
                                                        checked={task.completed}
                                                        onChange={() => handleToggleComplete(index)}
                                                        className="w-5 h-5 cursor-pointer accent-indigo-500 flex-shrink-0"
                                                        whileTap={{ scale: 0.9 }}
                                                    />

                                                    <div className="flex-1 min-w-0">
                                                        <span className={`block truncate ${task.completed ?
                                                                'line-through text-gray-400' :
                                                                'text-white'
                                                            }`}>
                                                            {task.text}
                                                        </span>

                                                        {task.dueDate && (
                                                            <span className={`text-xs mt-1 block ${new Date(task.dueDate) < new Date() && !task.completed ?
                                                                    'text-red-400' : 'text-purple-300'
                                                                }`}>
                                                                Due: {task.dueDate.toLocaleDateString()}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex gap-2 ml-2">
                                                    <motion.button
                                                        onClick={() => handleEditTask(index)}
                                                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors text-white whitespace-nowrap flex items-center gap-1"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                                    </motion.button>

                                                    <motion.button
                                                        onClick={() => handleRemoveTask(index)}
                                                        className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm   text-white transition-colors whitespace-nowrap flex items-center gap-1"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />Remove
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                ) : (
                    // Empty state message
                    <motion.div
                        className="text-center py-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >    
                            <h3 className="text-xl text-white mb-2">No tasks yet</h3>
                          
                      
                    </motion.div>
                )}
            </div>
        </div>
    );
}