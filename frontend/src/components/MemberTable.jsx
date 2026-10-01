export default function MemberTable({
  members,
  onEdit,
  onDelete
}) {

  return (

    <div className="card table-card">

      <div className="table-header">

        <h2>
          Club Members
        </h2>

        <span>
          {members.length} member
          {members.length === 1 ? '' : 's'}
        </span>

      </div>

      {members.length === 0 ? (

        <p className="empty">
          No members yet.
          Add the first club member.
        </p>

      ) : (

        <div className="table-wrap">

          <table>

            <thead>

              <tr>

                <th>Name</th>

                <th>Serial Number</th>

                <th>Year Level</th>

                <th>Position</th>

                <th>Date Joined</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {members.map((member) => (

                <tr key={member.id}>

                  <td>
                    {member.name}
                  </td>

                  <td>
                    {member.serial_number}
                  </td>

                  <td>
                    {member.year_level}
                  </td>

                  <td>
                    {member.position}
                  </td>

                  <td>
                    {member.date_join}
                  </td>

                  <td className="actions">

                    <button
                      onClick={() =>
                        onEdit(member)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="danger"
                      onClick={() =>
                        onDelete(member.id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );
}