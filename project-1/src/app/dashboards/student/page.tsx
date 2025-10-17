"use client";

import { useTodos, useDeleteTodo, useUpdateTodo } from "@/hooks/usetodo.hook";
import { useState } from "react";
import Image from "next/image";

export default function TodoList() {
  const { data: todos, isLoading, error } = useTodos();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading todos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-xl">!</span>
            </div>
            <h3 className="text-red-800 font-semibold text-lg">Error</h3>
          </div>
          <p className="text-red-600">
            Something went wrong. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!todos || todos.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📝</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            No todos yet
          </h3>
          <p className="text-slate-500">
            Create your first todo to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Todo List</h1>
          <p className="text-slate-600">Manage your tasks efficiently</p>
        </div>

        <div className="grid gap-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-slate-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0 ring-4 ring-blue-50">
                      {todo.image_url ? (
                        <Image
                          src={todo.image_url}
                          alt={`${todo.title}'s profile`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">
                            {todo.title?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-slate-800 mb-1 truncate">
                        {todo.title}
                      </h3>
                      <p className="text-sm text-slate-500 mb-2 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 bg-slate-400 rounded-full"></span>
                        {todo.email}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {todo.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
