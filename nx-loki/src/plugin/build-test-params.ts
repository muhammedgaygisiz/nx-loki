import { LokiPluginOptions } from "./loki-plugin-options";
import { buildReactUriParser } from "./build-react-uri-param";

export const buildTestParams = (
  options: LokiPluginOptions,
  buildStorybookOutput: string
) => ` \\
  ${buildReactUriParser(buildStorybookOutput)} \\
  --diffingEngine ${options.diffingEngine || "looks-same"} \\
  --chrome-tolerance ${options.chromeTolerance || 0} \\
  --chrome-retries ${options.chromeRetries || 0} \\
  ${
    options.chromeDockerImage
      ? `--chromeDockerImage ${options.chromeDockerImage}`
      : ""
  } \\
  ${
    options.chromeFlags ? `--chromeFlags ${options.chromeFlags.join(" ")}` : ""
  } \\
  ${
    options.chromeLoadTimeout
      ? `--chromeLoadTimeout ${options.chromeLoadTimeout}`
      : ""
  } \\
  ${
    options.chromeSelector ? `--chromeSelector ${options.chromeSelector}` : ""
  } \\
  ${options.chromeEnableAnimations ? `--chromeEnableAnimations` : ""} \\
  ${options.chromeDebug ? `--chromeDebug` : ""} \\
  ${
    options.configurationFilter
      ? `--configurationFilter ${options.configurationFilter}`
      : ""
  } \\
  ${options.storiesFilter ? `--storiesFilter ${options.storiesFilter}` : ""} \\
  ${options.requireReference ? `--requireReference` : ""} \\
  ${
    options.requireReferenceError
      ? `--requireReferenceError ${options.requireReferenceError}`
      : ""
  } \\
  ${options.verboseRenderer ? `--verboseRenderer` : ""} \\
  ${options.verbose ? `--verbose` : ""} \\
  ${
    options.diffingEngineOptions?.transparency
      ? `--diffingEngineOptions.transparency ${options.diffingEngineOptions.transparency}`
      : ""
  } \\
  ${
    options.diffingEngineOptions?.highlightColor
      ? `--diffingEngineOptions.highlightColor ${options.diffingEngineOptions.highlightColor}`
      : ""
  }
`;
