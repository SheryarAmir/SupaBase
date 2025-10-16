import { supabase } from "@/constant/supabase-client";
import { Todo, TodoCreateInput, TodoData } from "@/types/todos";

export const fetchTodos = async (): Promise<Todo[]> => {
  const { data, error } = await supabase.from("todos").select("*");
  if (error) throw error;
  return data || [];
};

export const addTodo = async (newTodo: TodoCreateInput) => {
  const { data, error } = await supabase
    .from("todos")
    .insert([newTodo])
    .select();

  if (error) throw error;
  return data;
};

export const deleteTodo = async (id: string) => {
  const { data, error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

export const updateTodo = async (id: string, updates: Partial<TodoData>) => {
  const { data, error } = await supabase
    .from("todos")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};
