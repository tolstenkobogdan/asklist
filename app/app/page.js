'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState('');
  const [course, setCourse] = useState('');
  const [filter, setFilter] = useState('open');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadQuestions();
  }, []);

  async function loadQuestions() {
    // RLS on the table means this only ever returns the logged-in user's rows.
    const { data, error: loadError } = await getSupabase()
      .from('questions')
      .select('id, question, course, answered, created_at')
      .order('created_at', { ascending: false });
    if (loadError) setError(loadError.message);
    else setQuestions(data);
    setLoading(false);
  }

  async function handleSave(e) {
    e.preventDefault();
    const text = question.trim();
    if (!text) {
      setError('Type your question first.');
      return;
    }
    setError('');
    setSaving(true);
    const { data, error: saveError } = await getSupabase()
      .from('questions')
      .insert({ question: text, course: course.trim() || null })
      .select('id, question, course, answered, created_at')
      .single();
    setSaving(false);
    if (saveError) {
      setError(saveError.message);
      return;
    }
    setQuestions((prev) => [data, ...prev]);
    setQuestion('');
    setFilter((f) => (f === 'answered' ? 'open' : f));
  }

  async function toggleAnswered(item) {
    const answered = !item.answered;
    setQuestions((prev) => prev.map((q) => (q.id === item.id ? { ...q, answered } : q)));
    const { error: updateError } = await getSupabase()
      .from('questions')
      .update({ answered })
      .eq('id', item.id);
    if (updateError) {
      setError(updateError.message);
      setQuestions((prev) => prev.map((q) => (q.id === item.id ? { ...q, answered: !answered } : q)));
    }
  }

  async function handleDelete(item) {
    if (!window.confirm('Delete this question?')) return;
    const { error: deleteError } = await getSupabase().from('questions').delete().eq('id', item.id);
    if (deleteError) setError(deleteError.message);
    else setQuestions((prev) => prev.filter((q) => q.id !== item.id));
  }

  const openCount = questions.filter((q) => !q.answered).length;
  const answeredCount = questions.length - openCount;
  const visible = questions.filter((q) =>
    filter === 'all' ? true : filter === 'open' ? !q.answered : q.answered
  );

  return (
    <div className="container app-wrap">
      <h1>My questions</h1>

      <form onSubmit={handleSave} className="card form add-form">
        <label htmlFor="core-input">Your question</label>
        <textarea
          id="core-input"
          data-testid="core-input"
          rows={3}
          maxLength={1000}
          placeholder="e.g. Why does the demand curve slope down for Giffen goods?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSave(e);
          }}
        />

        <label htmlFor="course">
          Course <span className="muted">(optional)</span>
        </label>
        <input
          id="course"
          type="text"
          maxLength={100}
          placeholder="e.g. Microeconomics"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          list="course-options"
        />
        <datalist id="course-options">
          {[...new Set(questions.map((q) => q.course).filter(Boolean))].map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>

        {error && (
          <p className="alert alert-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="btn btn-primary btn-block" data-testid="core-submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save question'}
        </button>
      </form>

      <div className="tabs" role="group" aria-label="Filter questions">
        {[
          ['open', `To ask (${openCount})`],
          ['answered', `Answered (${answeredCount})`],
          ['all', `All (${questions.length})`],
        ].map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`tab ${filter === key ? 'tab-active' : ''}`}
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="muted">Loading…</p>
      ) : visible.length === 0 ? (
        <p className="empty muted">
          {questions.length === 0
            ? 'No questions yet. Next time something confuses you in class, write it here.'
            : filter === 'open'
              ? 'Nothing left to ask. 🎉'
              : 'Nothing here yet.'}
        </p>
      ) : (
        <ul className="q-list">
          {visible.map((item) => (
            <li key={item.id} className={`card q-item ${item.answered ? 'is-answered' : ''}`} data-testid="core-item">
              <label className="q-check">
                <input
                  type="checkbox"
                  checked={item.answered}
                  onChange={() => toggleAnswered(item)}
                  aria-label={item.answered ? 'Mark as not answered' : 'Mark as answered'}
                />
              </label>
              <div className="q-body">
                <p className="q-text">{item.question}</p>
                <p className="q-meta">
                  {item.course && <span className="chip">{item.course}</span>}
                  <span>{new Date(item.created_at).toLocaleDateString()}</span>
                  {item.answered && <span className="answered-tag">Answered</span>}
                </p>
              </div>
              <button
                type="button"
                className="btn btn-icon"
                onClick={() => handleDelete(item)}
                aria-label={`Delete question: ${item.question}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
