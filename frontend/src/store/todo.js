import { create } from 'zustand'

export const useTodoStore = create((set)=>({
    todos: [],
    setTodos: ((todos)=>set({todos})),
    createTodo: async(newTodo)=>{
        if(!newTodo.text){
            return {success: false,message: 'Please fill in all fields'}
        }
        const res = await fetch("/api/todos",{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(newTodo)
        })
        const data = await res.json()
        set((state)=>({todos: [...state.todos,data.data]}))
        return {success: true, message: 'Todo Created'}
    },
    getAllTodos: async()=>{
        const res = await fetch("/api/todos")
        const data = await res.json()
        set({todos: data.data})
    },
    deleteTodo: async (tid) => {
            const res = await fetch(`/api/todos/${tid}`, { method: 'DELETE' });
    
            if (!res.ok) {
                return { success: false, message: `HTTP error! Status: ${res.status}` };
            }
    
            const data = await res.json();
    
            if (!data || typeof data !== "object") {
                return { success: false, message: "Invalid response from server" };
            }
    
            if (!data.success) {
                return { success: false, message: data.message || "Delete failed" };
            }
    
            set((state) => ({ todos: state.todos.filter((t) => t._id !== tid) }));
    
            return { success: true, message: "Todo deleted" };
        
    },    
    updateTodo : async(tid,updatedTodo)=>{
        const res = await fetch(`/api/todos/${tid}`,{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(updatedTodo)
        })
        const data = await res.json()
        if(!data.success) return {success: false,message: data.message || "Update Failed"}
        set((state)=>({
            todos: state.todos.map((t)=> t._id === tid ? data.data : t)
        }))
        const isToggleUpdate = Object.keys(updatedTodo).length === 1 && updatedTodo.hasOwnProperty("completed");
        return { 
            success: true, 
            message: isToggleUpdate 
                ? `Todo marked as ${updatedTodo.completed ? "completed" : "incomplete"}`
                : "Todo Updated" 
        };
    }
}))