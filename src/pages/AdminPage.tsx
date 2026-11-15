import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { SAMPLE_APPLICATIONS, SAMPLE_COMPLAINTS } from '../data/operations'

const CHECK_LABELS = { identity: 'Identity', experience: 'Experience', space: 'Care space', references: 'References' } as const
const CHECK_KEYS = Object.keys(CHECK_LABELS) as (keyof typeof CHECK_LABELS)[]

export function AdminPage() {
  return (
    <section className="section page-top">
      <Container>
        <p className="badge badge--warn">Internal work area. In a real service this page needs a staff sign-in and is never linked publicly.</p>
        <SectionHeading level={1} title="Admin review" description="Caregiver applications and support cases. Fictional sample data." />

        <h2>Caregiver applications</h2>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Applicant</th><th>Area</th><th>Submitted</th>
                {CHECK_KEYS.map((k) => <th key={k}>{CHECK_LABELS[k]}</th>)}
                <th>Ready?</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_APPLICATIONS.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td><td>{a.area}</td><td>{a.submitted}</td>
                  {CHECK_KEYS.map((k) => <td key={k}>{a.checks[k] ? 'Checked' : 'Not checked'}</td>)}
                  <td>{CHECK_KEYS.every((k) => a.checks[k]) ? 'Can approve' : 'Incomplete'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="form__note">A check is marked “Checked” only after it has actually been performed.</p>

        <h2>Support cases</h2>
        <ul className="updates">
          {SAMPLE_COMPLAINTS.map((c) => <li key={c.id}><strong>{c.status}</strong> · {c.age}<br />{c.summary}</li>)}
        </ul>
      </Container>
    </section>
  )
}
