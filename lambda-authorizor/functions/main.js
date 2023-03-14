"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addTodo_1 = require("./addTodo");
const deleteTodo_1 = require("./deleteTodo");
const getTodos_1 = require("./getTodos");
const updateTodo_1 = require("./updateTodo");
const getTodoById_1 = require("./getTodoById");
exports.handler = async (event) => {
    console.log('event====>', event);
    switch (event.info.fieldName) {
        case "addTodo":
            return await addTodo_1.default(event.arguments.todo);
        case "getTodos":
            return await getTodos_1.default();
        case "getTodoById":
            return await getTodoById_1.default(event.arguments.todoId);
        case "deleteTodo":
            return await deleteTodo_1.default(event.arguments.todoId);
        case "updateTodo":
            return await updateTodo_1.default(event.arguments.todo);
        default:
            return null;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBZ0M7QUFDaEMsNkNBQXNDO0FBQ3RDLHlDQUFrQztBQUNsQyw2Q0FBc0M7QUFFdEMsK0NBQXdDO0FBWXhDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFFLEtBQW1CLEVBQUUsRUFBRTtJQUU1QyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBQyxLQUFLLENBQUMsQ0FBQTtJQUMvQixRQUFRLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1FBRTFCLEtBQUssU0FBUztZQUNWLE9BQU8sTUFBTSxpQkFBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsS0FBSyxVQUFVO1lBQ1gsT0FBTyxNQUFNLGtCQUFRLEVBQUUsQ0FBQztRQUM1QixLQUFLLGFBQWE7WUFDZCxPQUFPLE1BQU0scUJBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELEtBQUssWUFBWTtZQUNiLE9BQU8sTUFBTSxvQkFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsS0FBSyxZQUFZO1lBQ2IsT0FBTyxNQUFNLG9CQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRDtZQUNJLE9BQU8sSUFBSSxDQUFDO0tBQ25CO0FBQ0wsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFkZFRvZG8gZnJvbSAnLi9hZGRUb2RvJztcbmltcG9ydCBkZWxldGVUb2RvIGZyb20gJy4vZGVsZXRlVG9kbyc7XG5pbXBvcnQgZ2V0VG9kb3MgZnJvbSAnLi9nZXRUb2Rvcyc7XG5pbXBvcnQgdXBkYXRlVG9kbyBmcm9tICcuL3VwZGF0ZVRvZG8nO1xuaW1wb3J0IFRvZG8gZnJvbSAnLi9Ub2RvJztcbmltcG9ydCBnZXRUb2RvQnlJZCBmcm9tICcuL2dldFRvZG9CeUlkJztcblxudHlwZSBBcHBTeW5jRXZlbnQgPSB7XG4gICAgaW5mbzoge1xuICAgICAgICBmaWVsZE5hbWU6IHN0cmluZ1xuICAgIH0sXG4gICAgYXJndW1lbnRzOiB7XG4gICAgICAgIHRvZG9JZDogc3RyaW5nLFxuICAgICAgICB0b2RvOiBUb2RvXG4gICAgfVxufVxuXG5leHBvcnRzLmhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IEFwcFN5bmNFdmVudCkgPT4ge1xuXG4gICAgY29uc29sZS5sb2coJ2V2ZW50PT09PT4nLGV2ZW50KVxuICAgIHN3aXRjaCAoZXZlbnQuaW5mby5maWVsZE5hbWUpIHtcblxuICAgICAgICBjYXNlIFwiYWRkVG9kb1wiOlxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGFkZFRvZG8oZXZlbnQuYXJndW1lbnRzLnRvZG8pO1xuICAgICAgICBjYXNlIFwiZ2V0VG9kb3NcIjpcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBnZXRUb2RvcygpO1xuICAgICAgICBjYXNlIFwiZ2V0VG9kb0J5SWRcIjpcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBnZXRUb2RvQnlJZChldmVudC5hcmd1bWVudHMudG9kb0lkKTtcbiAgICAgICAgY2FzZSBcImRlbGV0ZVRvZG9cIjpcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBkZWxldGVUb2RvKGV2ZW50LmFyZ3VtZW50cy50b2RvSWQpO1xuICAgICAgICBjYXNlIFwidXBkYXRlVG9kb1wiOlxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHVwZGF0ZVRvZG8oZXZlbnQuYXJndW1lbnRzLnRvZG8pO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufSJdfQ==