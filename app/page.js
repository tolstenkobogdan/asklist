import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <p className="eyebrow">For students who don't want to interrupt the lecture</p>
          <h1>
            Got a question in class?
            <br />
            <span className="accent">Save it now. Ask it later.</span>
          </h1>
          <p className="lead">
            AskList is a private notebook for lecture questions. Jot it down in seconds, tag the
            course, and tick it off once it's answered — in office hours, by email, or after class.
          </p>
          <Link href="/signup" className="btn btn-primary btn-lg">
            Sign up — it's free
          </Link>
          <p className="muted small">
            Already have an account? <Link href="/login">Log in</Link>
          </p>
        </div>
      </section>

      <section className="container steps" aria-labelledby="how">
        <h2 id="how">How it works</h2>
        <ol className="step-list">
          <li className="card step">
            <span className="step-num" aria-hidden="true">1</span>
            <h3>Type the question</h3>
            <p>One line is enough. No need to fill anything else.</p>
          </li>
          <li className="card step">
            <span className="step-num" aria-hidden="true">2</span>
            <h3>Add the course (optional)</h3>
            <p>"Microeconomics", "Stats 101" — so you know where to ask.</p>
          </li>
          <li className="card step">
            <span className="step-num" aria-hidden="true">3</span>
            <h3>Mark it answered</h3>
            <p>See at a glance what's still open before the next class.</p>
          </li>
        </ol>
        <p className="privacy-note">🔒 Your questions are private — only you can see them.</p>
      </section>
    </>
  );
}
