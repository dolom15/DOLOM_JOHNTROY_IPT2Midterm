import { useEffect, useState } from 'react';

import MemberForm from '../components/MemberForm';

import MemberTable from '../components/MemberTable';

export default function Members() {

  const [members, setMembers] =
    useState([]);

  const [selectedMember, setSelectedMember] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  async function loadMembers() {

    setLoading(true);

    try {

      const response = await fetch(
        'http://localhost:5000/api/members'
      );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          'Could not load members.'
        );

      }

      setMembers(data);

      setError('');

    } catch (err) {

      setError(
        'Cannot connect to the backend. ' +
        'Make sure the server is running on port 5000.'
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadMembers();

  }, []);

  async function deleteMember(id) {

    if (
      !window.confirm(
        'Delete this member?'
      )
    ) {
      return;
    }

    try {

      const response = await fetch(

        `http://localhost:5000/api/members/${id}`,

        {
          method: 'DELETE'
        }

      );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          'Delete failed.'
        );

      }

      if (
        selectedMember?.id === id
      ) {

        setSelectedMember(null);

      }

      loadMembers();

    } catch (err) {

      setError(err.message);

    }

  }

  return (

    <section>

      <div className="page-heading">

        <div>

          <p className="eyebrow">
            MEMBERS
          </p>

          <h1>
            Student Club Members
          </h1>

          <p>
            Add new members or update
            existing membership records.
          </p>

        </div>

      </div>

      {error && (

        <div className="alert">
          {error}
        </div>

      )}

      {loading ? (

        <p>
          Loading members...
        </p>

      ) : (

        <>

          <MemberForm

            selectedMember={selectedMember}

            onSaved={() => {

              setSelectedMember(null);

              loadMembers();

            }}

            onCancel={() =>
              setSelectedMember(null)
            }

          />

          <MemberTable

            members={members}

            onEdit={setSelectedMember}

            onDelete={deleteMember}

          />

        </>

      )}

    </section>

  );
}