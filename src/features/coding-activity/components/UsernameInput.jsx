// ============================================================
// components/UsernameInput.jsx
// Inline username input that triggers a data fetch.
// Shows a read-only chip when a username is saved.
// All styles from CodingActivity.css via .ca-username-* classes.
// ============================================================

import React, { useState } from 'react'

/**
 * @param {string}   platform   — 'GitHub' | 'LeetCode'
 * @param {string}   username   — currently saved username
 * @param {Function} onSubmit   — called with new username string
 * @param {boolean}  loading    — shows spinner while fetching
 * @param {string}   [error]    — error message to show inline
 * @param {boolean}  usingMock  — shows "mock data" badge
 */
export default function UsernameInput({
  platform,
  username,
  onSubmit,
  loading,
  error,
  usingMock,
}) {
  const [editing, setEditing] = useState(!username)
  const [draft, setDraft]     = useState(username || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!draft.trim()) return
    onSubmit(draft.trim())
    setEditing(false)
  }

  const handleClear = () => {
    setDraft('')
    onSubmit('')
    setEditing(true)
  }

  if (editing) {
    return (
      <div className="ca-username">
        <form className="ca-username__form" onSubmit={handleSubmit}>
          <div className="ca-username__field">
            <span className="ca-username__at">@</span>
            <input
              type="text"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              placeholder={`${platform} username`}
              autoFocus
              className="ca-username__input"
            />
          </div>
          <button
            type="submit"
            disabled={!draft.trim() || loading}
            className="ca-username__btn"
          >
            {loading ? 'Loading…' : 'Load'}
          </button>
        </form>

        {error && !loading && (
          <p className="ca-username__error">⚠ {error} — showing mock data</p>
        )}
      </div>
    )
  }

  // Read-only display mode
  return (
    <div className="ca-username">
      <div className="ca-username__display">
        <span className="ca-username__chip">
          {/* Spinner while loading */}
          {loading && <span className="ca-username__spinner" aria-hidden />}
          @{username}
        </span>

        {/* Mock data badge — amber, only when not loading */}
        {usingMock && !loading && (
          <span className="ca-username__mock">mock data</span>
        )}

        <button
          className="ca-username__action"
          onClick={() => { setEditing(true); setDraft(username) }}
        >
          change
        </button>
        <button
          className="ca-username__action ca-username__action--danger"
          onClick={handleClear}
        >
          clear
        </button>
      </div>

      {error && !loading && (
        <p className="ca-username__error">⚠ {error} — showing mock data</p>
      )}
    </div>
  )
}