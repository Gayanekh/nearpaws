/**
 * Phase 1 placeholder for the redesign home page: a few approved building blocks (type, buttons, reveal, photo)
 * so the foundation can be checked on its own. Replaced section by section from Phase 2.
 */
export function NpFoundation() {
  return (
    <section className="np-section">
      <div className="np-wrap">
        <p className="np-eyebrow np-rv">Redesign foundation</p>
        <h2 className="np-rv" style={{ fontSize: 'var(--fs-lg)', lineHeight: 1.05, maxWidth: '14ch' }}>
          Care that fits your pet, not the other way round.
        </h2>
        <p className="np-lead np-rv" style={{ maxWidth: '30rem', marginTop: '1.5rem' }}>
          This page holds the tokens, fonts, shell and motion of the approved preview. The sections arrive one at a time.
        </p>
        <p className="np-rv" style={{ marginTop: '2.5rem' }}>
          <a className="np-btn" href="#caregivers">See a sample profile</a>
        </p>
      </div>
    </section>
  )
}
