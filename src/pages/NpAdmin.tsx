import { SAMPLE_APPLICATIONS, SAMPLE_COMPLAINTS } from '../data/operations'
import { PageTitle } from '../ui/PageTitle'
import { useDocumentTitle } from '../useDocumentTitle'

const CHECK_LABELS = { identity: 'Identity', experience: 'Experience', space: 'Care space', references: 'References' } as const
const CHECK_KEYS = Object.keys(CHECK_LABELS) as (keyof typeof CHECK_LABELS)[]

const heading = 'mb-4 font-slab text-title font-medium text-ink'
const th = 'border-b border-ink px-4 py-3 text-left font-sans text-label font-semibold tracking-label text-accent-ink uppercase whitespace-nowrap'
const td = 'border-b border-field-border/40 px-4 py-3 align-top text-body-dense text-ink'
const chip = 'inline-block border border-ink px-2 py-0.5 text-caption font-semibold text-ink'

/**
 * Admin review (/internal/admin): a dense hairline table with square status labels and the internal-area notice.
 * Same data and "can approve" rule as the original page. No decoration.
 */
export function NpAdmin() {
  useDocumentTitle('Admin review (internal)')
  return (
    <section className="mx-auto w-full max-w-360 px-(--inset) pt-16 pb-(--section) md:pt-24">
      <p className="mb-8 inline-block border border-ink bg-panel px-4 py-3 text-body-dense text-ink">
        Internal work area. In a real service this page needs a staff sign-in and is never linked publicly.
      </p>
      <PageTitle eyebrow="Internal" title="Admin review">
        Caregiver applications and support cases. Fictional sample data.
      </PageTitle>

      <h2 className={`${heading} mt-16`}>Caregiver applications</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[48rem] border-collapse">
          <thead>
            <tr>
              <th className={th}>Applicant</th>
              <th className={th}>Area</th>
              <th className={th}>Submitted</th>
              {CHECK_KEYS.map((k) => (
                <th key={k} className={th}>{CHECK_LABELS[k]}</th>
              ))}
              <th className={th}>Ready?</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_APPLICATIONS.map((a) => {
              const ready = CHECK_KEYS.every((k) => a.checks[k])
              return (
                <tr key={a.id}>
                  <td className={td}>{a.name}</td>
                  <td className={td}>{a.area}</td>
                  <td className={td}>{a.submitted}</td>
                  {CHECK_KEYS.map((k) => (
                    <td key={k} className={td}>
                      <span className={a.checks[k] ? `${chip} bg-ink text-paper` : chip}>{a.checks[k] ? 'Checked' : 'Not checked'}</span>
                    </td>
                  ))}
                  <td className={td}>
                    <span className={ready ? `${chip} bg-accent` : chip}>{ready ? 'Can approve' : 'Incomplete'}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-caption text-muted">A check is marked “Checked” only after it has actually been performed.</p>

      <h2 className={`${heading} mt-16`}>Support cases</h2>
      <ul className="max-w-3xl border-t border-field-border/40">
        {SAMPLE_COMPLAINTS.map((c) => (
          <li key={c.id} className="border-b border-field-border/40 py-4 text-body-dense text-copy">
            <strong className="font-semibold text-ink">{c.status}</strong> · {c.age}
            <br />
            {c.summary}
          </li>
        ))}
      </ul>
    </section>
  )
}
