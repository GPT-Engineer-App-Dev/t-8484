import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster, toast } from "sonner";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);

  const addTask = () => {
    if (newTask.trim() === "") {
      toast.error("Task title cannot be empty");
      return;
    }
    setTasks([...tasks, { id: Date.now(), title: newTask }]);
    setNewTask("");
    toast.success("Task added successfully");
  };

  const updateTask = (id, title) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, title } : task)));
    setEditTask(null);
    toast.success("Task updated successfully");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.success("Task deleted successfully");
  };

  return (
    <TooltipProvider>
      <Toaster />
      <div className="container mx-auto p-4">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">All Tasks</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Task</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
              </DialogHeader>
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Task title"
                className="mb-4"
              />
              <Button onClick={addTask}>Add Task</Button>
            </DialogContent>
          </Dialog>
        </header>
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardHeader>
                <CardTitle>{task.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" onClick={() => setEditTask(task)}>Edit</Button>
                <Button variant="destructive" onClick={() => deleteTask(task.id)}>Delete</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {editTask && (
          <Dialog open={editTask !== null} onOpenChange={() => setEditTask(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
              </DialogHeader>
              <Input
                value={editTask.title}
                onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                placeholder="Task title"
                className="mb-4"
              />
              <Button onClick={() => updateTask(editTask.id, editTask.title)}>Update Task</Button>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </TooltipProvider>
  );
};

export default Index;