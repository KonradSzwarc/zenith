/// <reference types="astro/client" />
/// <reference types="@total-typescript/ts-reset" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference -- doesn't work with `import` syntax.
/// <reference path="../.astro/env.d.ts" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference -- doesn't work with `import` syntax.
/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    globalContext: object;
  }
}
