import { CancellationToken } from './CancellationToken';
import { NormalizedMessage } from './NormalizedMessage';
export interface IncrementalCheckerInterface {
    nextIteration(): void;
    getDiagnostics(cancellationToken: CancellationToken): Promise<NormalizedMessage[]>;
    hasLinter(): boolean;
    getLints(cancellationToken: CancellationToken): NormalizedMessage[];
}
