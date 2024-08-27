export interface Task {
    Id: string;
    title: string;
    description?: string;
    status: string;
    createdAt: string;
}

export interface WebSocketMessage {
    type: 'ADD' | 'UPDATE' | 'DELETE';
    task: Task;
  }