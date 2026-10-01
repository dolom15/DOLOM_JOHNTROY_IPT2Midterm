import { useEffect, useState } from 'react';

const emptyForm = {
  name: '',
  serial_number: '',
  year_level: '',
  position: '',
  date_join: ''
};

export default function MemberForm({
  selectedMember,
  onSaved,
  onCancel
}) {

  const [form, setForm] = useState(emptyForm);

  const [message, setMessage] = useState('');

  const [error, setError] = useState('');

  useEffect(() => {

    setForm(
      selectedMember || emptyForm
    );

    setMessage('');
    setError('');

  }, [selectedMember]);

  function handleChange(event) {

    setForm({
      ...form,
      [event.target.name]:
        event.target.value
    });

  }

  async function handleSubmit(event) {

    event.preventDefault();

    setMessage('');
    setError('');

    try {

      const url = selectedMember

        ? `http://localhost:5000/api/members/${selectedMember.id}`

        : 'http://localhost:5000/api/members';

      const method = selectedMember
        ? 'PUT'
        : 'POST';

      const response = await fetch(url, {

        method,

        headers: {
          'Content-Type':
            'application/json'
        },

        body: JSON.stringify(form)

      });

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          'Request failed.'
        );

      }

      setMessage(

        selectedMember
          ? 'Member updated successfully.'
          : 'Member added successfully.'

      );

      setForm(emptyForm);

      onSaved();

    } catch (err) {

      setError(err.message);

    }

  }

  return (

    <form
      className="card form"
      onSubmit={handleSubmit}
    >

      <h2>

        {selectedMember
          ? 'Update Member'
          : 'Add Member'}

      </h2>

      <label>

        Name

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full name"
          required
        />

      </label>

      <label>

        Serial Number

        <input
          name="serial_number"
          value={form.serial_number}
          onChange={handleChange}
          placeholder="SCM-001"
          required
        />

      </label>

      <label>

        Year Level

        <select
          name="year_level"
          value={form.year_level}
          onChange={handleChange}
          required
        >

          <option value="">
            Select year level
          </option>

          <option>
            1st Year
          </option>

          <option>
            2nd Year
          </option>

          <option>
            3rd Year
          </option>

          <option>
            4th Year
          </option>

        </select>

      </label>

      <label>

        Position

        <input
          name="position"
          value={form.position}
          onChange={handleChange}
          placeholder="President"
          required
        />

      </label>

      <label>

        Date Joined

        <input
          type="date"
          name="date_join"
          value={form.date_join}
          onChange={handleChange}
          required
        />

      </label>

      <div className="form-actions">

        <button type="submit">

          {selectedMember
            ? 'Update Member'
            : 'Add Member'}

        </button>

        {selectedMember && (

          <button
            type="button"
            className="secondary"
            onClick={onCancel}
          >
            Cancel
          </button>

        )}

      </div>

      {message && (
        <p className="success">
          {message}
        </p>
      )}

      {error && (
        <p className="error">
          {error}
        </p>
      )}

    </form>

  );
}