const express = require("express");

const app = express();
const PORT = 3000;
app.use(express.json());
let users = [];

// Route
app.get("/users", (req, res) => {
    res.json(users);
});

app.post("/users", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Name and email required" });
    }

    const exists = users.find(u => u.email === email);
    if (exists) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = {
        id: Date.now(),
        name,
        email
    };

    users.push(newUser);

    res.status(201).json({
        message: "User added",
        user: newUser
    });
});

app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(index, 1);

    res.json({ message: "User deleted" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});