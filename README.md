# 📝 React ToDo App with Node.js + MongoDB  
![todo-app](https://github.com/user-attachments/assets/3f2311e3-29d6-4845-9c7d-535680b0ecf5)

A full-stack ToDo List application built with **React** for the frontend, **Node.js + Express** for the backend, and **MongoDB** for data storage.  

## ⚙️ How to Run the Full Project  
### 🛠 Backend Setup  
1. Open terminal and go to backend folder:  
```bash
cd backend
```
2. Install backend dependencies:  
```bash
npm install
```
3. Create a `.env` file in the `backend/` folder with:  
```
PORT=5000  
MONGODB_URI=mongodb://127.0.0.1:27017/todoapp
```
4. Start MongoDB on your system. If installed locally, just run:  
```bash
mongod
```
5. Start the backend server:  
If `nodemon` is installed globally:  
```bash
npm run dev
```  
If not:  
```bash
npx nodemon index.js
```  
Backend will run at: `http://localhost:5000`  
### 💻 Frontend Setup  
1. Open another terminal and go to frontend folder:  
```bash
cd frontend
```
2. Install frontend dependencies:  
```bash
npm install
```
3. Start the React app:  
```bash
npm start
```
Frontend will run at: `http://localhost:3000`  
## 🔗 Frontend–Backend Connection  
Your React frontend should make API requests to:  
```
http://localhost:5000/api/tasks
```  
Use `fetch` or `axios` to GET, POST, PUT, DELETE tasks.  
 
## 🧰 Tech Stack  
- **Frontend**: React, CSS, React Icons  
- **Backend**: Node.js, Express, Mongoose, dotenv  
- **Database**: MongoDB  
- **Dev Tools**: nodemon  
## 🛡️ License  
MIT License  
## 🙋‍♂️ Author  
**Aniket Sawant**  
📧 aniket121199@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/aniketsawant99/)
