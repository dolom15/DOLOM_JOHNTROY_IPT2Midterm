import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

const app = express();
const PORT = 5000;

const db = new Database('members.db');

app.use(cors());
app.use(express.json());

db.exec(`
  CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    serial_number TEXT NOT NULL UNIQUE,
    year_level TEXT NOT NULL,
    position TEXT NOT NULL,
    date_join TEXT NOT NULL
  )
`);

app.get('/', (req, res) => {
  res.json({
    message: 'Student Club Membership API is running!'
  });
});

app.get('/api/members', (req, res) => {
  try {
    const members = db
      .prepare('SELECT * FROM members ORDER BY id DESC')
      .all();

    res.json(members);
  } catch (error) {
    res.status(500).json({
      message: 'Error getting members',
      error: error.message
    });
  }
});

app.post('/api/members', (req, res) => {
  const {
    name,
    serial_number,
    year_level,
    position,
    date_join
  } = req.body;

  if (!name || !serial_number || !year_level || !position || !date_join) {
    return res.status(400).json({
      message: 'All member fields are required.'
    });
  }

  try {
    const result = db.prepare(`
      INSERT INTO members
      (name, serial_number, year_level, position, date_join)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      name.trim(),
      serial_number.trim(),
      year_level.trim(),
      position.trim(),
      date_join
    );

    const member = db
      .prepare('SELECT * FROM members WHERE id = ?')
      .get(result.lastInsertRowid);

    res.status(201).json(member);

  } catch (error) {

    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({
        message: 'Serial number already exists.'
      });
    }

    res.status(500).json({
      message: 'Error creating member',
      error: error.message
    });
  }
});

app.put('/api/members/:id', (req, res) => {
  const { id } = req.params;

  const {
    name,
    serial_number,
    year_level,
    position,
    date_join
  } = req.body;

  if (!name || !serial_number || !year_level || !position || !date_join) {
    return res.status(400).json({
      message: 'All member fields are required.'
    });
  }

  try {

    const result = db.prepare(`
      UPDATE members
      SET
        name = ?,
        serial_number = ?,
        year_level = ?,
        position = ?,
        date_join = ?
      WHERE id = ?
    `).run(
      name.trim(),
      serial_number.trim(),
      year_level.trim(),
      position.trim(),
      date_join,
      id
    );

    if (result.changes === 0) {
      return res.status(404).json({
        message: 'Member not found.'
      });
    }

    const member = db
      .prepare('SELECT * FROM members WHERE id = ?')
      .get(id);

    res.json(member);

  } catch (error) {

    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({
        message: 'Serial number already exists.'
      });
    }

    res.status(500).json({
      message: 'Error updating member',
      error: error.message
    });
  }
});

app.delete('/api/members/:id', (req, res) => {
  try {

    const result = db
      .prepare('DELETE FROM members WHERE id = ?')
      .run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({
        message: 'Member not found.'
      });
    }

    res.json({
      message: 'Member deleted successfully.'
    });

  } catch (error) {

    res.status(500).json({
      message: 'Error deleting member',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `Backend running on http://localhost:${PORT}`
  );
});