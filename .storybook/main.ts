import type { StorybookConfig } from '@storybook/react-vite'

/**
 * Storybook for the NearPaws UI pieces (src/ui). It reuses vite.config.ts, so Tailwind and the design tokens work exactly as in
 * the app. public/ is served so the sample photographs and the self-hosted fonts load.
 */
const config: StorybookConfig = {
  stories: [{ directory: '../src', files: '**/*.stories.tsx' }],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  staticDirs: ['../public'],
  core: { disableTelemetry: true },
}

export default config
