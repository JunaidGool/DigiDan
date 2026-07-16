import type { MDXComponents } from "mdx/types";

/**
 * Styling for MDX field notes (app/notes/<slug>/page.mdx). The `wrapper` gives
 * every note the same centred article column; the element map applies the
 * DigiDan prose styling without a global stylesheet.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => (
      <main
        id="main"
        className="mx-auto w-full max-w-[46rem] px-6 pb-16 pt-12 md:px-10 md:pt-16"
      >
        {children}
      </main>
    ),
    h2: (props) => <h2 className="mt-14 text-2xl md:text-3xl" {...props} />,
    h3: (props) => <h3 className="mt-9 text-xl" {...props} />,
    p: (props) => (
      <p className="mt-5 text-lg leading-[1.7] text-ink/85" {...props} />
    ),
    ul: (props) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-lg text-ink/85" {...props} />
    ),
    ol: (props) => (
      <ol
        className="mt-5 list-decimal space-y-2 pl-6 text-lg text-ink/85"
        {...props}
      />
    ),
    li: (props) => <li className="pl-1 leading-[1.6]" {...props} />,
    strong: (props) => <strong className="font-medium text-ink" {...props} />,
    a: (props) => (
      <a
        className="text-teal-900 underline underline-offset-2 hover:text-teal-500"
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className="mt-8 rounded-tile border-l-4 border-amber-400 bg-amber-100 p-5 text-amber-900 [&>p]:mt-0 [&>p]:text-amber-900"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="rounded bg-paper-warm px-1.5 py-0.5 font-mono text-[0.88em] text-ink"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="mt-6 overflow-x-auto rounded-tile border border-line bg-paper-warm p-4 font-mono text-sm"
        {...props}
      />
    ),
    hr: () => <hr className="mt-12 border-line" />,
    ...components,
  };
}
