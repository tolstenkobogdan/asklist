import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <h1>
            Too shy to interrupt the lecture?
            <br />
            <span className="accent">
              Save your question. <span className="nowrap">Ask it later.</span>
            </span>
          </h1>
          <p className="lead">
            AskList is a private question list for university students. Write it down in class in
            five seconds, then ask it after class or in office hours and tick it off.
          </p>
          <Link href="/signup" className="btn btn-primary btn-lg">
            Sign up free
          </Link>
          <p className="muted small">
            Already have an account? <Link href="/login">Log in</Link>
          </p>

          <figure className="preview card" aria-label="Example of an AskList question list">
            <p className="preview-label">My questions</p>
            <ul className="preview-list">
              <li>
                <span className="preview-box" aria-hidden="true" />
                <span className="preview-text">Why does the demand curve slope down?</span>
                <span className="chip">Microeconomics</span>
              </li>
              <li>
                <span className="preview-box" aria-hidden="true" />
                <span className="preview-text">Is chapter 4 in the midterm?</span>
                <span className="chip">Statistics</span>
              </li>
              <li className="preview-done">
                <span className="preview-box preview-box-done" aria-hidden="true">✓</span>
                <span className="preview-text">What's the difference between a p-value and alpha?</span>
                <span className="answered-tag">Answered</span>
              </li>
            </ul>
          </figure>
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
