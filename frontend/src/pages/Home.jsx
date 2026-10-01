import { Link } from 'react-router-dom';

export default function Home() {

  return (

    <section className="hero card">

      <p className="eyebrow">
        STUDENT CLUB MANAGEMENT
      </p>

      <h1>
        Student Club Membership
      </h1>

      <p>
        Manage club members in one simple
        application. Add, view, update,
        and delete membership records.
      </p>

      <Link
        className="button-link"
        to="/members"
      >
        Manage Members
      </Link>

    </section>

  );
}