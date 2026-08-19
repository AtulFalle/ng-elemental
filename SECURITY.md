# Security Policy

## Supported versions

Security fixes are provided for the latest published version of `@ng-elemental/cli`.

| Version | Supported |
| --- | --- |
| Latest on npm | Yes |
| Older releases | No |

## Reporting a vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, email the maintainers or open a [private security advisory](https://github.com/AtulFalle/ng-elemental/security/advisories/new) on GitHub.

Include:

- A description of the issue and potential impact
- Steps to reproduce
- Affected versions
- Any suggested fix, if available

You should receive a response within a reasonable timeframe. We will work with you to understand and address the issue before any public disclosure.

## Scope

This policy covers:

- `@ng-elemental/cli` and its bundled component registry
- `@ng-elemental/mcp` and the deployed Vercel MCP server
- The NgElemental GitHub repository and GitHub Actions workflows

**Out of scope:**
- Component source copied into your application — once copied, that code is yours and becomes part of your codebase. Review and harden it as you would any first-party code.
- Third-party dependencies of NgElemental packages (report those to the upstream project).

## What to include in a report

- A description of the vulnerability and its potential impact
- Affected package(s) and version(s)
- Steps to reproduce or a proof-of-concept
- Any suggested fix or mitigation, if available

## Disclosure policy

Please do not publicly disclose the vulnerability in a GitHub issue, discussion, social media post, or any other public channel before the maintainers have had a reasonable opportunity to address it. We will coordinate a disclosure timeline with you after the fix is ready.
