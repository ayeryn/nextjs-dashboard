# Notes

## Project

### Create New Project

```bash
$ npx create-next-app@latest [options] <project-folder-path>
$
```

## pnpm [1]

pnpm (performant Node package manager) is a modern package manager for JavaScript that offers significant advantages over traditional tools like npm and Yarn. Here are the key features and benefits of using pnpm:

### Key Features of pnpm

1. **Speed and Efficiency**: pnpm is designed to be faster, often up to three times quicker than npm. This speed is achieved through its unique approach to package installation, which allows processes to run concurrently rather than sequentially. This means that pnpm can install dependencies independently, reducing overall installation time[2][3].

2. **Disk Space Optimization**: Unlike npm, which duplicates package files across projects, pnpm uses a content-addressable filesystem to store all files in a central location. It creates symlinks to these files in each project, which drastically reduces disk space usage[4][5]. This method means that if multiple projects use the same package (like lodash), pnpm only stores one copy of that package, saving significant space.

3. **Workspaces Support**: pnpm supports workspaces, allowing developers to manage multiple packages within a single repository efficiently. This feature is particularly useful for monorepos, as it ensures consistency across interdependent projects by installing dependencies for all workspaces from a single package.json file[2][3].

4. **Pruning Unused Packages**: pnpm includes commands like `pnpm store prune`, which help manage the cache by removing unreferenced packages that are no longer needed. This keeps the storage clean and efficient over time[3].

5. **Compatibility and Conversion**: While pnpm does not support npm's lock files directly due to its flat tree structure, it provides a command to convert npm and Yarn lock files into a pnpm-compatible format, easing migration for users switching from other package managers[2].

### Downsides of pnpm

While pnpm has many advantages, it does have some limitations:

- **Lock File Compatibility**: pnpm does not natively support npm's lock files, which can complicate transitions from npm to pnpm for existing projects[2].
- **Bundled Dependencies**: pnpm cannot publish packages with `bundledDependencies`, which is generally not recommended even in npm. Developers are encouraged to use a package bundler instead[2].

Overall, pnpm is a compelling choice for developers looking for a fast, efficient, and space-saving package management solution, especially for large projects and monorepos. Its innovative approach to dependency management positions it as a strong alternative to npm and Yarn.

[1]: https://pnpm.io
[2]: https://dev.to/sergioholgado/pnmp-package-manager-what-is-it-and-why-you-should-be-using-it-a-comprehensive-guide-4c66
[3]: https://dev.to/stackblitz/what-is-pnpm-and-is-it-really-so-fast-and-space-efficient-29la
[4]: https://www.reddit.com/r/node/comments/144xqd8/is_pnpm_really_leaves_up_to_its_hype_are_yarn_npm/
[5]: https://github.com/pnpm/pnpm/actions/runs/8654953339/job/23733102312
[6]: https://github.com/pnpm
[7]: https://x.com/pnpmjs

### Commands

- `pnpm i`: Install the project's packages

## CSS Styling

### Tailwind CSS

Tailwind is a CSS framework that speeds up the development process by allowing you to quickly write utility classes directly in your TSX markup.

In Tailwind, you style elements by adding class names. For instance, ading the class `"text-blue-150"` will turn the `<h1` text blue.

```html
<h1 className="text-blue-150">I'm blue!</h1>
```

Although the CSS styles are shared globally, **each class is singularly applied to each element**. This means if you add or delete an element, you dont't have to worry about amintaining searate styesheets, style collisions, or the size your CSS bundle frowing as your application scales.

### CSS Modules

CSS Modules allow you tos cope CSS to a component by automatically creating unique class names, so you don't have to worry about style collisions as well.

- TODO: add code example to demonstrate how binding works.

### `clsx` (Conditional Styling)

There may be cases where you may need to conditionally style an element based on state or some other condition.

`clsx` is a library that lets you toggle class names easiy. ([Documentation](https://github.com/lukeed/clsx)).
Basic usage:

- Suppose that you want to create an `InvoiceStatus` component which accepts `status`. the status can be `'pending'` or `'paid'`.
- If it's `'paid'`, you want the color to be green. If it's `'pending'`, you want the color to be gray.

#### Code Snippet

```js
import clsx from 'clsx';

export default function InvoiceStatus({status}: {status: string}){
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm",
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        }
      )}>
      {status}
      </span>
  );
}
```

This code defines a React functional component in TypeScript called `InvoiceStatus`. Here's a breakdown of the definition:

1. **`export default`**: This allows the `InvoiceStatus` component to be the default export of the file, meaning it can be imported in other files without using curly braces. Example: `import InvoiceStatus from './path-to-file';`.

2. **`function InvoiceStatus({status}: {status: string})`**:
   - This declares a function named `InvoiceStatus` which is a functional component.
   - The component receives an argument in the form of a destructured object `{status}`. This is shorthand for `props.status`, meaning the function expects a `status` prop.
   - The second part, `: {status: string}`, is TypeScript's type annotation. It specifies that the `status` prop must be a string.
3. **Dynamic Classes with clsx**:
   (1) Static Classes:

   - `'inline-flex items-center rounded-full px-2 py-1 text-sm'`: These are base classes that will always be applied to the `<span>`.
   - They ensure that the element is styled with flexbox, rounded borders, padding, and small text.

   (2) Conditional Classes:

   - `'bg-gray-100 text-gray-500': status === 'pending'`:
     - If status is 'pending', the background will be gray (`bg-gray-100`) and the text color will be gray (`text-gray-500`).
   - `'bg-green-500 text-white': status === 'paid'`:
     - If status is 'paid', the background will be green (`bg-green-500`), and the text will be white (`text-white`).

In summary, this code sets up a basic functional component that accepts a `status` prop of type `string`.


## Fonts and Images
**Why Optimize Fonts?**
- Fonts play a significant role in the design of a website, but using custom fonts in your prohect can affect **performance** if the font files need to be fetched and loaded.
- `next/fonts` module for automatically optimizing fonts in the application.
  - It downloads fint files at build tiume and hosts them with your other static assets
  - This means when a user visits your application, there are no additional nextwork requests for fonts which would impact performance.

  