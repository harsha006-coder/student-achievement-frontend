const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 4000;

// PostgreSQL connection (Railway provides DATABASE_URL automatically)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

// Initialize tables
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'student',
      "userClass" TEXT,
      department TEXT
    );

    CREATE TABLE IF NOT EXISTS achievements (
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
      "studentName" TEXT,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT NOT NULL DEFAULT 'General',
      date TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Pending',
      "userClass" TEXT
    );
  `);
  console.log("Database initialized");
}

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle all preflight requests
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Smart Achieve API is running" });
});

// ─── Router (mounted at both /api and / for URL flexibility) ─────────────────

const router = express.Router();

// Auth
router.post("/auth/register", async (req, res) => {
  const { name, email, password, role, userClass, department } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
  if (existing.rows.length > 0) {
    return res.status(409).json({ error: "Email already registered" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users (name, email, password, role, "userClass", department)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, role, "userClass", department`,
    [name, email, hashed, role || "student", userClass || null, department || null]
  );

  return res.status(201).json(result.rows[0]);
});

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Missing credentials" });
  }

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (result.rows.length === 0) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const user = result.rows[0];
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const { password: _pw, ...safeUser } = user;
  return res.json(safeUser);
});

// Achievements
router.get("/achievements/all", async (req, res) => {
  const result = await pool.query("SELECT * FROM achievements ORDER BY id DESC");
  res.json(result.rows);
});

router.get("/achievements/student/:userId", async (req, res) => {
  const result = await pool.query(
    `SELECT * FROM achievements WHERE "userId" = $1 ORDER BY id DESC`,
    [req.params.userId]
  );
  res.json(result.rows);
});

router.get("/achievements/teacher/:class", async (req, res) => {
  const result = await pool.query(
    `SELECT * FROM achievements WHERE "userClass" = $1 ORDER BY id DESC`,
    [req.params.class]
  );
  res.json(result.rows);
});

router.post("/achievements/add/:userId", async (req, res) => {
  const { userId } = req.params;
  const { title, description, category, date, studentName } = req.body;

  if (!title || !date) {
    return res.status(400).json({ error: "title and date are required" });
  }

  const userResult = await pool.query(`SELECT name, "userClass" FROM users WHERE id = $1`, [userId]);
  const user = userResult.rows[0];

  const result = await pool.query(
    `INSERT INTO achievements ("userId", "studentName", title, description, category, date, status, "userClass")
     VALUES ($1, $2, $3, $4, $5, $6, 'Pending', $7) RETURNING *`,
    [
      userId,
      studentName || (user ? user.name : "Unknown"),
      title,
      description || null,
      category || "General",
      date,
      user ? user.userClass : null,
    ]
  );

  return res.status(201).json(result.rows[0]);
});

// Update status — multiple route patterns for frontend compatibility
const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: "status is required" });

  const result = await pool.query(
    "UPDATE achievements SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );
  if (result.rows.length === 0) return res.status(404).json({ error: "Achievement not found" });
  res.json(result.rows[0]);
};

router.patch("/achievements/:id/status", updateStatus);
router.put("/achievements/:id/status", updateStatus);
router.put("/achievements/update-status/:id", updateStatus);
router.patch("/achievements/:id", updateStatus);
router.put("/achievements/:id", updateStatus);

// Delete achievement
const deleteAchievement = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM achievements WHERE id = $1 RETURNING id", [id]);
  if (result.rows.length === 0) return res.status(404).json({ error: "Achievement not found" });
  res.json({ success: true });
};

router.delete("/achievements/:id", deleteAchievement);
router.delete("/achievements/delete/:id", deleteAchievement);
router.delete("/achievements/remove/:id", deleteAchievement);

// Mount at both /api (frontend default) and / (if VITE_API_URL has no /api suffix)
app.use("/api", router);
app.use("/", router);

// Start server after DB is ready
initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Smart Achieve API running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
