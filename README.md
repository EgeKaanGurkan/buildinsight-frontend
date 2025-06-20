# Analytics Frontend

This is a Next.js 15 analytics frontend application built with React 19, TypeScript, Tailwind CSS, and shadcn/ui components.

## npmrc Configuration

This project supports multiple npm registry configurations for different environments:

### Files
- `.npmrc` - Active configuration (used by npm)
- `.npmrc.local` - Local development configuration (public npm registry)
- `.npmrc.example` - Template showing both configurations
- `scripts/npmrc-switch.sh` - Script to switch between configurations

### Usage

#### Switch to Local Development
```bash
npm run npmrc:local
```
This switches to use the public npm registry for local development.

#### Switch to CodeArtifact (for Amplify deployments)
```bash
npm run npmrc:codeartifact
```
This switches to use AWS CodeArtifact for deployments.

#### Check Current Configuration
```bash
npm run npmrc:status
```
This shows the current `.npmrc` configuration.

#### Restore Previous Configuration
```bash
npm run npmrc:restore
```
This restores the previous `.npmrc` configuration from backup.

### Manual Usage
You can also use the shell script directly:
```bash
./scripts/npmrc-switch.sh local      # Switch to local
./scripts/npmrc-switch.sh codeartifact # Switch to CodeArtifact
./scripts/npmrc-switch.sh status     # Show current config
./scripts/npmrc-switch.sh restore    # Restore previous config
```

### Environment Variables for CodeArtifact
When using CodeArtifact, ensure these environment variables are set:
- `CODEARTIFACT_DOMAIN`
- `AWS_ACCOUNT_ID`
- `AWS_REGION`
- `CODEARTIFACT_REPO`
- `CODEARTIFACT_AUTH_TOKEN`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
