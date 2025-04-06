export const buildReactUriParser = (buildStorybookOutput: string): string => {
  return `--reactUri file:${buildStorybookOutput}`;
};
