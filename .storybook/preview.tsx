import type { Preview } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { DemoProvider } from '../src/demo/DemoProvider'
import '../src/styles/tailwind.css'
import '../src/styles/np.css'
import '../src/styles/motion.css'

/**
 * Every story renders inside what the app gives its components: the .np scope (fonts, base styles), a router (links) and the
 * demo state (components that read the signed-in person or the caregivers). Accessibility checks (axe) run on every story;
 * a violation fails the story in the test runner and shows in the "Accessibility" panel.
 */
const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <DemoProvider>
          <div className="np bg-paper p-8 text-ink">
            <Story />
          </div>
        </DemoProvider>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: { disable: true },
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
}

export default preview
