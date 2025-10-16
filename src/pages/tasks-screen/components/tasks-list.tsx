import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

type Task = {
  id: string;
  title: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
};

const tasks: Task[] = [
  {
    id: "task-1",
    title: "Follow up with Innovate Inc.",
    dueDate: "2025-10-20",
    priority: "high",
    status: "todo",
  },
  {
    id: "task-2",
    title: "Prepare proposal for Synergy Corp.",
    dueDate: "2025-10-22",
    priority: "medium",
    status: "in-progress",
  },
  {
    id: "task-3",
    title: "Schedule demo with Quantum Solutions",
    dueDate: "2025-10-25",
    priority: "low",
    status: "todo",
  },
  {
    id: "task-4",
    title: "Send invoice to Apex Industries",
    dueDate: "2025-10-18",
    priority: "high",
    status: "done",
  },
];

const priorityVariantMap: {
  [key: string]: "default" | "secondary" | "destructive";
} = {
  low: "secondary",
  medium: "default",
  high: "destructive",
};

export function TasksList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center">
              <Checkbox
                id={`task-${task.id}`}
                checked={task.status === "done"}
              />
              <div className="ml-4 flex-1">
                <label
                  htmlFor={`task-${task.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {task.title}
                </label>
                <p className="text-sm text-muted-foreground">
                  Due: {task.dueDate}
                </p>
              </div>
              <Badge
                variant={priorityVariantMap[task.priority]}
                className="capitalize"
              >
                {task.priority}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
