/**
 * List of Chromium Command Line Switches (chromeFlags)
 *
 * https://peter.sh/experiments/chromium-command-line-switches/#
 */
export interface LokiPluginOptions {
  chromeTolerance?: number;
  chromeRetries?: number;
  reactUri?: string;
  diffingEngine?: string;
  chromeDockerImage?: string;
  chromeFlags?: string[];
  chromeLoadTimeout?: number;
  chromeSelector?: string;
  chromeEnableAnimations?: boolean;
  chromeDebug?: boolean;
  configurationFilter?: string;
  storiesFilter?: string;
  requireReference?: boolean;
  requireReferenceError?: string;
  verboseRenderer?: boolean;
  verbose?: boolean;
  diffingEngineOptions?: {
    transparency?: number;
    highlightColor?: string;
  };
}
