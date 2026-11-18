import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h2: (props) => <h2 className="mt-12 mb-4 text-2xl font-bold text-ink sm:text-3xl" {...props} />,
  h3: (props) => <h3 className="mt-8 mb-3 text-xl font-semibold text-ink" {...props} />,
  p: (props) => <p className="my-4 leading-relaxed text-muted" {...props} />,
  ul: (props) => <ul className="my-4 list-disc space-y-2 pl-5 text-muted marker:text-wood-400" {...props} />,
  ol: (props) => <ol className="my-4 list-decimal space-y-2 pl-5 text-muted" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  a: (props) => <a className="link-underline font-medium text-blue-600" {...props} />,
  blockquote: (props) => (
    <blockquote className="my-6 border-l-2 border-wood-400 pl-5 text-lg text-ink italic" {...props} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
