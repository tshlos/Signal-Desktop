// Copyright 2019-2020 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import UpdatedDelta from 'quill-delta';

declare module 'react-quill' {
  // `react-quill` uses a different but compatible version of Delta
  // tell it to use the type definition from the `quill-delta` library
  type DeltaStatic = UpdatedDelta;
}

declare module 'quill' {
  // this type is fixed in @types/quill, but our version of react-quill cannot
  // use the version of quill that has this fix in its typings
  // doing this manually allows us to use the correct type
  // https://github.com/DefinitelyTyped/DefinitelyTyped/commit/6090a81c7dbd02b6b917f903a28c6c010b8432ea#diff-bff5e435d15f8f99f733c837e76945bced86bb85e93a75467015cc9b33b48212
  interface UpdatedKey {
    key: string | number;
    shiftKey?: boolean;
  }

  export type UpdatedTextChangeHandler = (
    delta: UpdatedDelta,
    oldContents: UpdatedDelta,
    source: Sources
  ) => void;

  interface LeafBlot {
    text?: string;
    value(): any;
  }

  interface Quill {
    updateContents(delta: UpdatedDelta, source?: Sources): UpdatedDelta;
    getContents(index?: number, length?: number): UpdatedDelta;
    getLeaf(index: number): [LeafBlot, number];
    // in-code reference missing in @types
    scrollingContainer: HTMLElement;

    on(
      eventName: 'text-change',
      handler: UpdatedTextChangeHandler
    ): EventEmitter;
  }

  interface KeyboardStatic {
    addBinding(
      key: UpdatedKey,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: (range: RangeStatic, context: any) => void
    ): void;
    // in-code reference missing in @types
    bindings: Record<string | number, Array<unknown>>;
  }
}
