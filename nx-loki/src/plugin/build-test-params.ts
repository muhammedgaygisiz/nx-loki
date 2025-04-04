import { LokiPluginOptions } from "./loki-plugin-options";

export const buildTestParams = (options: LokiPluginOptions) => ` \\
  --diffingEngine looks-same \\
  --chrome-tolerance ${options.chromeTolerance || 0} \\
  --chrome-retries ${options.chromeRetries || 0}
`;
