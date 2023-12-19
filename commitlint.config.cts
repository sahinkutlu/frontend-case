import { LintOptions, QualifiedRules, UserConfig } from "@commitlint/types";

declare module "@commitlint/types" {
  interface Commit {
    ticket: string | null;
  }
}

const types = [
  "build",
  "chore",
  "ci",
  "docs",
  "feat",
  "fix",
  "perf",
  "refactor",
  "revert",
  "style",
  "test",
];

const parserPreset: LintOptions = {
  parserOpts: {
    // https://regex101.com/r/7znOoR/1
    headerPattern: /^(?:\[([A-z]*-\d+)]\s)?(\w*)(?:\((.*)\))?!?:\s(.*)$/,
    headerCorrespondence: ["ticket", "type", "scope", "subject"],
  },
};

const rules: QualifiedRules = {
  // 'type-empty': [2, 'never'],
  // 'type-case': [2, 'always', 'lower-case'],
  // 'subject-empty': [2, 'never'],
  // 'body-empty': [2, 'always'],
  // 'footer-empty': [2, 'always'],
  // 'references-empty': [2, 'never'],

  "subject-full-stop": [2, "always", "."],
  "scope-case": [2, "always", "lower-case"],
  "type-enum": [2, "always", types],
  "body-max-line-length": [2, "always", 250],
  "header-max-length": [2, "always", 150],
};

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  helpUrl:
    "https://github.com/SalahAdDin/react-ts-vite-template#commit-convention",
  parserPreset,
  rules,
};

export default Configuration;
