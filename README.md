# 📝 React + Supabase To-Do List App

A professional, modern **To-Do List** web app built with **React** and **Tailwind CSS**, powered by **Supabase** for authentication and data storage.

This app allows users to **create, edit, delete, and track** tasks — with user-specific data stored securely in Supabase.

---

## 🚀 Features

* ✅ User Authentication (Supabase Auth)
* 🧾 Add, Edit, and Delete Tasks
* 🕒 Task Completion Tracking
* 🗂️ Task Categorization and Filtering (optional)
* 🌙 Clean and Responsive UI (Tailwind CSS)
* ☁️ Real-time sync using Supabase

---

## 🧱 Tech Stack

| Technology   | Purpose                               |
| ------------ | ------------------------------------- |
| React.js     | Frontend Framework                    |
| Tailwind CSS | Styling                               |
| Supabase     | Backend, Database, and Authentication |
| Vite         | Development Bundler                   |

---

## 📁 Directory Structure

```
my-todo-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── modules/
│   │   └── tasks/
│   │       ├── AddTaskForm.jsx
│   │       ├── TaskItem.jsx
│   │       ├── TaskList.jsx
│   │       └── taskService.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   └── Login.jsx
│   ├── utils/
│   │   └── supabaseClient.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
└── vite.config.js
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/my-todo-app.git
cd my-todo-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

> ⚠️ **Never commit your anon key** to GitHub directly.
> Always use `.env` and add it to your `.gitignore`.

### 4. Initialize Supabase

1. Go to [Supabase Dashboard](https://supabase.com/).
2. Create a new project.
3. Open **Table Editor → New Table**:

   * Table name: `tasks`
   * Columns:

     | Name        | Type      | Default              |
     | ----------- | --------- | -------------------- |
     | id          | uuid      | `uuid_generate_v4()` |
     | user_id     | uuid      | —                    |
     | title       | text      | —                    |
     | description | text      | —                    |
     | completed   | boolean   | false                |
     | created_at  | timestamp | `now()`              |
4. Enable **Row Level Security (RLS)**.

---

## 🧩 Row Level Security (RLS) Policies

### 🧪 Option 1: Development Policy (Open Access)

> Use this for local testing before auth setup.

```sql
CREATE POLICY "Allow all inserts for testing"
ON public.tasks
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow all select for testing"
ON public.tasks
FOR SELECT
USING (true);
```

---

### 🔐 Option 2: Secure Policy (After Auth Integration)

> Use this when Supabase Auth is implemented.

```sql
DROP POLICY IF EXISTS "Allow all inserts for testing" ON public.tasks;
DROP POLICY IF EXISTS "Allow all select for testing" ON public.tasks;

CREATE POLICY "Users can insert their own tasks"
ON public.tasks
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own tasks"
ON public.tasks
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks"
ON public.tasks
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks"
ON public.tasks
FOR DELETE
USING (auth.uid() = user_id);
```

---

## 🧠 Common Issues & Fixes

| Error                                        | Cause                             | Fix                                                             |
| -------------------------------------------- | --------------------------------- | --------------------------------------------------------------- |
| `new row violates row-level security policy` | RLS blocking inserts              | Add the right policy (see above)                                |
| `Multiple GoTrueClient instances`            | Multiple Supabase clients created | Ensure you only initialize Supabase once in `supabaseClient.js` |
| `403 (Forbidden)`                            | No matching RLS policy            | Ensure user_id matches `auth.uid()`                             |
| `404 Could not find table`                   | Table not created or wrong name   | Check Supabase Table Editor                                     |

---

## 🧩 Example Supabase Client

**File:** `src/utils/supabaseClient.js`

```js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## 🧮 Scripts

| Command           | Action                         |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start local development server |
| `npm run build`   | Build production files         |
| `npm run preview` | Preview production build       |

---

## 🌐 Deployment

Deploy your app easily on [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com/):

1. Push your code to GitHub.
2. Import the repo into Vercel/Netlify.
3. Add your `.env` variables in the dashboard.
4. Deploy 🚀

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo, make your changes, and submit a pull request.

---

## 📜 License

This project is open source under the **MIT License**.

---

## 🧑‍💻 Author

**Joshua Okoth**
Frontend Developer | ICT Club Head | Tech Enthusiast
[GitHub](https://github.com/Josh254-prog)
