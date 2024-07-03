import { Model, createServer } from "miragejs"
import { json } from "react-router-dom";

export default function mockApi() {
    createServer({
        models: {
            todo: Model
        },
        seeds(server) {
            server.create('todo', { id: 1, text: "Learn React", color: "black", isChecked: true });
            server.create('todo', { id: 2, text: "Learn Redux", color: "blue", isChecked: false });
            server.create('todo', { id: 3, text: "Build Something Cool", color: "red", isChecked: false })
        },
        routes() {
            this.get("/todos", (schema) => {
                return schema.todos.all()
            },
                { timing: 4000 }
            )

            this.post('/todos', (schema, request) => {
                let newTodo = JSON.parse(request.requestBody);
                return schema.todos.create(newTodo);
            })
        },
    })
}