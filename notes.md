# Notes

- [Notes](#notes)
  - [Project](#project)
    - [Create New Project](#create-new-project)
    - [Project Structure](#project-structure)
  - [pnpm 1](#pnpm-1)
    - [Key Features of pnpm](#key-features-of-pnpm)
    - [Downsides of pnpm](#downsides-of-pnpm)
    - [Commands](#commands)
  - [CSS Styling](#css-styling)
    - [Tailwind CSS](#tailwind-css)
    - [CSS Modules](#css-modules)
    - [`clsx` (Conditional Styling)](#clsx-conditional-styling)
      - [Code Snippet](#code-snippet)
  - [Fonts](#fonts)
    - [Why optimize fonts?](#why-optimize-fonts)
    - [`next/fonts`](#nextfonts)
    - [Primary Font](#primary-font)
  - [Images](#images)
    - [Why optimizes images?](#why-optimizes-images)
    - [The `<Image>` component](#the-image-component)
  - [Layout and Pages](#layout-and-pages)
    - [Nested Routing](#nested-routing)
    - [`page.tsx`](#pagetsx)
    - [`layout.tsx`](#layouttsx)
      - [`RootLayout`](#rootlayout)
  - [Database Setup](#database-setup)
    - [Seed the database](#seed-the-database)
  - [Fetching Data](#fetching-data)
    - [API Layer](#api-layer)
    - [Database Queries](#database-queries)
    - [Server Components](#server-components)
    - [SQL](#sql)
    - [Request Waterfalls](#request-waterfalls)
    - [Parallel Data Fetching](#parallel-data-fetching)
  - [Rendering](#rendering)
    - [Static Rendering](#static-rendering)
    - [Dynamic Rendering](#dynamic-rendering)
  - [Streaming](#streaming)
    - [`loading.tsx`](#loadingtsx)
    - [Route Groups](#route-groups)
      - [Convention](#convention)
    - [Grouping Components](#grouping-components)
    - [Where to place Suspense boundaries](#where-to-place-suspense-boundaries)
    - [Partial Prerendering (PPR)](#partial-prerendering-ppr)
  - [Search](#search)
    - [URL Search Params](#url-search-params)
      - [Benefits](#benefits)
      - [Client Hooks](#client-hooks)
      - [Implementation Steps](#implementation-steps)
      - [When to use the `useSearchParams()` hook vs. the `searchParams` prop?](#when-to-use-the-usesearchparams-hook-vs-the-searchparams-prop)
      - [Actions](#actions)
    - [Debouncing](#debouncing)
      - [How it works](#how-it-works)

## Project

### Create New Project

```bash
$ npx create-next-app@latest [options] <project-folder-path>
$
```

### Project Structure

```bash
.(PROJECT)
├── app
│   ├── lib
│   ├── ui
├── public
├── next.config.mjs
└── ...
```

- `/app`: contains all the routes, components, and logic for your application.
- `/app/lib`: contains functions used in your application, such as reusable utility functions and data fetching function.
- `/app/ui`: contains all the UI components for your application, such as cards, tables, and forms.
- `/public`: contains all the static assets for the application, such as images
- **Config files**: such as `next.config.mjs`. Most are created by `create-next-app` and don't need to be modified.

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

`clsx` is a library that lets you toggle class names easily. ([Documentation](https://github.com/lukeed/clsx)).
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

## Fonts

### Why optimize fonts?

Fonts play a significant role in the design of a website, but using custom fonts in your project can affect **performance** if the font files need to be fetched and loaded.

### `next/fonts`

`next/fonts` is a module for automatically optimizing fonts in the application.

- It downloads font files at build time and hosts them with your other static assets
- This means when a user visits your application, there are no additional network requests for fonts which would impact performance.

### Primary Font

This is the font being used throughout the application and applied to the **`<body>`** tag.

```js
import { inter } from '@/app/ui/fonts'

return ({
  <html>
    <body className={inter.className}>{children}</body>
  </html>
})
```

## Images

### Why optimizes images?

Next.js can serve **static assets**, like images, under the top-level `/public` folder. Files inside `/public` can be referenced in your application.

Image optimization is a large topic in web dev that could be considered a specialization in itself.

### The `<Image>` component

The `<Image>` component is an extension of the HTML `<img>` tag, and comes with automatics image optimization, such as:

- Preventing layout shift automatically when images are loading.
- Resizing images to avoid shipping large images to devices with a smaller viewport.
- Lazy loading images by default (images load as they enter the viewport).
- Serving images in modern formats, like [WebP](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#webp) and [AVIF](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#avif_image), when the browser supports it.

## Layout and Pages

### Nested Routing

- **Folders** are used to create nested routes.
- Each folder represents a **route segment** that maps to a **URL segment**

### `page.tsx`

`page.tsx` is a special file that exports a React component, and it's required for the route to be accessible.

It will be automatically nested in a `<Layout />` as `{children}`

### `layout.tsx`

One benefit is that on navigation, only the page components update while the layout won't re-render. This is called [partial rendering](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#4-partial-rendering).

```js
// app/dashboard/layout.tsx

// Import SideNav component
import SideNav from "@/app/ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        // SideNav won't re-render when route changes because it's in a layout.
        <SideNav />
      </div>
      // children is a prop. It can either be a page or another layout
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
```

#### `RootLayout`

**`app/layout.tsx`**

- This is a root layout and is **required**.
- Any UI added to the root layout will be shared across all pages in your application.
- You can use it to modify your `<html>` and `<body>` tags, and add metadata.
- Since the layout above is unique to the `dashboard` pages, no additional changes are needed for the root layout.

## Database Setup

1. Create database (Postgres, MongoDB, etc.)
2. Grab information like database URL and login credentials from database
3. Provide info from above to `.env.local`

### Seed the database

**Seeding** is populating the database with an initial set of data.

- It's useful when you want to have some data to work with as you build your application.

Create a server-side endpoint that you can access in the browser to start populating the database. (`app/seed/route.ts`)

## Fetching Data

### API Layer

APIS are an intermediary layer between your application code and database. There are a few cases where you might use an API:

- If you're using 3rd party services that provide an API.
- If you're fetching data from the client, you want to have an API layer that runs on the server to avoid exposing your database secrets to the client.

### Database Queries

When you're creating a full-stack application. you;ll also need to write logic to interact with your database. For relational databases like Postgres, you can do this with SQL or with an [ORM](https://vercel.com/docs/storage/vercel-postgres/using-an-orm).

There are a few cases where you have to write database queries:

- When creating your API endpoints, you need to write logic to interact with your database.
- If you are using React Server Components (fetching data on the server), you can skip the API layer, and query your database directly without risking exposing your database secrets to the client.

### Server Components

By default, Next.js apps use **React Server Components**. Fetching data with Server Components is a relatively new approach and there are a few benefits of using them:

- Server Components support promises, providing a simpler solution for asynchronous tasks like data fetching. You can use `async/await syntax `without reaching out for `useEffect`, `useState` or data fetching libraries.
- Server Components execute on the server, so you can keep expensive data fetches and logic on the server and only send the result to the client.
- As mentioned before, since Server Components execute on the server, you can query the database directly without an additional API layer.

`page.tsx` uses a component and passes params into component

1. component renders styles
2. `/app/lib/data.ts` contains database functions that get data from database

### SQL

- SQL is the industry standard for querying relational databases (e.g. ORMs generate SQL under the hood).
- Having a basic understanding of SQL can help you understand the fundamentals of relational databases, allowing you to apply your knowledge to other tools.
- SQL is versatile, allowing you to fetch and manipulate specific data.
- The Vercel Postgres SDK provides protection against SQL injections.

### Request Waterfalls

A waterfall refers to a sequence of network requests that depend on the completion of previous requests.
In the case of data fetching, each request can only begin once the previous request has returned data. For example, we need to wait for the following fetching functions to execute in order.

```js
import { fetchCardData, fetchLatestInvoices, fetchRevenue } from "../lib/data";

const revenue = await fetchRevenue();
const latestInvoices = await fetchLatestInvoices();
const {
  totalPaidInvoices,
  totalPendingInvoices,
  numberOfInvoices,
  numberOfCustomers,
} = await fetchCardData();
```

### Parallel Data Fetching

A common way to avoid waterfalls is to initiate all data requests at the same time - in parallel.

In JavaScript, you can use the `Promise.all()` or `Promise.allSettled()` functions to initiate all promises at the same time. For example, in `data.ts`, we're using `Promise.all()` in the `fetchCardData()` function:

```js
const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

const data = await Promise.all([
  invoiceCountPromise,
  customerCountPromise,
  invoiceStatusPromise,
]);
```

By using this pattern, you can:

- Start executing all data fetches at the same time, which can lead to performance gains.
- Use a native JavaScript pattern that can be applied to any library or framework

**What if one data request is lower than all the others?**

## Rendering

### Static Rendering

Data fetching and rendering happens on the server at build time (when you deploy) or when [revalidating data](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data).

Whenever a user visits the application, the cached result is served.
**Benefits**:

- **Faster Websites** - prerendered content can be cached and globally distributed. This ensures that users around the world can access your website's content more quickly and reliably.
- **Reduced Server Load** - Because the content is cached, your server does not have to dynamically generate content for each user request.
- **SEO** - prerendered content is easier for search engine crawlers to index, as the content is already available when the page loads. This can lead to improved search engine rankings.

Static rendering is useful for UI with **no data** or **data that is shared across users**, such as a static blog post or a product page. It might not be a good fit for a dashboard that has personalized data which is regularly updated.

### Dynamic Rendering

With dynamic rendering, content is rendered on the server for each user at request time (when the user visits the page).
**Benefits**:

- **Real-Time Data** - Dynamic rendering allows your application to display real-time or frequently updated data. This is ideal for applications where data changes often.
- **User-Specific Content** - It's easier to serve personalized content, such as dashboards or user profiles, and update the data based on user interaction.
- **Request Time Information** - Dynamic rendering allows you to access information that can only be known at request time, such as cookies or the URL search parameters.

With dynamic rendering, **your app is only as fast as your slowest data fetch**.

## Streaming

Streaming is a data transfer technique that allows you to break down a route into smaller "chunks" and progressively stream them from the server to the client as they become ready.

By streaming, you can prevent slow data requests from blocking your whole page. This allows the user to see and interact with parts of the page without waiting for all the data to load before any UI can be shown to the user.

Streaming works well with React's component model, as each component can be considered a _chunk_.

There are two ways you implement streaming in Next.js:

1. At the page level, with the `loading.tsx` file.
2. For specific components, with `<Suspense>`.

### `loading.tsx`

loading.tsx is a special Next.js file built on top of `Suspense`, it allows you to create fallback UI to show as a replacement while page content loads.

```js
// loading.tsx
export default function Loading() {
  return <div>Loading...</div>;
}
```

- Since `<SideNav>` is static, it's shown immediately. The user can interact with <SideNav> while the dynamic content is loading.
- The user doesn't have to wait for the page to finish loading before navigating away (this is called interruptable navigation).

### [Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)

In the `app` directory, nested folders are normally mapped to URL paths. However, you can mark a folder as a Route Group to prevent the folder from being included in the route's URL path.

This allows you to organize your route segments and project files into logical groups without affecting the URL path structure.

Route groups are useful for:

- Organizing routes into groups e.g. by site section, intent, or team.
- Enabling nested layouts in the same route segment level:
  - Creating multiple nested layouts in the same segment, including multiple root layouts
  - Adding a layout to a subset of routes in a common segment

#### Convention

A route group can be created by wrapping a folder's name in parenthesis: `(folderName)`

```bash
├── app
│   ├── dashboard
│   │   ├── (overview)
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── customers
│   │   │   └── page.tsx
│   │   ├── invoices
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── layout.tsx
└── ...
```

Since URL is not affected, `/dashboard/(overview)/page.tsx` becomes `/dashboard`.

### Grouping Components

You can use this pattern when you want multiple components to load in at the same time.

```js
export default async function CardWrapper() {
  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices,
    numberOfCustomers,
  } = await fetchCardData();
  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}
```

### Where to place Suspense boundaries

1. How you want the user to experience the page as it streams
2. What content you want to prioritize
3. If the components rely on data fetching

In the example of the dashboard page:

- You could stream the **whole page** like we did with `loading.tsx`... but that may lead to a longer loading time if one of the components has a slow data fetch.
- You could stream **every component** individually... but that may lead to UI popping into the screen as it becomes ready.
- You could also create a staggered effect by streaming **page sections**. But you'll need to create wrapper components.

Where you place your suspense boundaries will vary depending on your application. In general, it's good practice to **move your data fetches down to the components that need it, and then wrap those components in Suspense**. But there is nothing wrong with streaming the sections or the whole page if that's what your application needs.

### Partial Prerendering (PPR)

_\*Experimental feature in 14_

In Next.js, if you call a [dynamic function](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-functions) in a route (like querying your database), the _entire_ route becomes dynamic.

However, most routes are not fully static or dynamic.

## Search

[Next.js tutorial](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination)

The search function will span the client and server. When a user searches for an invoice on the client, the URL params will be updated, data will be fetched on the server, and the table will re-render on the server with the new data.

### URL Search Params

- `URLSearchParams` ([Doc](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams))
- `URLSearchParams` objects are **iterable**, so they can directly be used in a `for...of` structure to iterate over key/value pairs in the same order as they appear in the query string, for example the following two lines are equivalent:

  ```js
  for (const [key, value] of mySearchParams) {
  }

  for (const [key, value] of mySearchParams.entries()) {
  }
  ```

#### Benefits

- **Bookmarkable and Shareable URLs**: Since the search parameters are in the URL, users can bookmark the current state of the application, including their search queries and filters, for future reference or sharing.
- **Server-Side Rendering and Initial Load**: URL parameters can be directly consumed on the server to render the initial state, making it easier to handle server rendering.
- **Analytics and Tracking**: Having search queries and filters directly in the URL makes it easier to track user behavior without requiring additional client-side logic.

#### Client Hooks

- **`useSearchParam`**: allows you to access the parameters of the current URL.
  - For example, the search params for this URL `dashboard/invoices?page=1&query=pending` would look like this :`{page: '1', query: 'pending'}.`
- **`usePathname`**: lets you read the current URL's pathname.
  - For example, for the route `/dashboard/invoices`, `usePathname` would return `/dashboard/invoices`.
- **`useRouter`**: enables navigation between routes within client components programmatically. There are [multiple methods](https://nextjs.org/docs/app/api-reference/functions/use-router#userouter).
  - `replace()`
    - similar to `push()`, but instead of adding a new entry in the browser's history (which happens with `push()`), it replaces the current entry. This means:
      - The new URL replaces the current URL without adding a new history entry.
      - If the user clicks the back button, they won’t go back to the old URL (because it was "replaced").

#### Implementation Steps

1. Capture the user's input

   - use a function like `handleSearch` or `handleSubmit` to pass information from client to server. For example,

   ```js
   function handleSearch(term: string) {
     // searches the database
   }

   <input
     className="peer block w-full  border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
     placeholder={placeholder}
     // every time the input changes, handleSearch is triggered
     onChange={(e) => {
       handleSearch(e.target.value);
     }}
   />;
   ```

2. Update the URL with the search params

- Instead of creating a complex string literal, you can use it to get the params string like `?page=1&query=a`.

```js
import { useSearchParams } from "next/navigation";

const searchParams = useSearchParams();
function handleSearch(term: string) {
  const params = new URLSearchParams(searchParams);

  if (term) {
    // If search is active, assign term to "query"
    params.set("query", term);
  } else {
    // If term is empty, remove the "query" param
    params.delete("query");
  }
}
```

3. Keep the URL in sync with the input field
   ```js
   <input
     ...
     defaultValue={searchParams.get("query")?.toString()}
   />
   ```
4. Update the table to reflect the search query

**Summary**:

1. If you search for a term,
2. you'll update the URL, which will send a new request to the server
3. data will be fetched on the server

#### When to use the `useSearchParams()` hook vs. the `searchParams` prop?

Whether you use one or the other depends on whether you're working on the client or the server.

- `<Search>` is a Client Component, so you used the `useSearchParams()` hook to access the params from the client.

- `<Table>` is a Server Component that **fetches its own data**, so you can pass the `searchParams` prop from the page to the component.

As a general rule,

- To read the params from the **client**, use the `useSearchParams()` hook as this avoids having to go back to the server.

#### Actions

1. User puts text into the search bar
2. the search bar is of `<input>` and has an event listener `onChange`
   ```js
   <input
     className="..."
     placeholder={placeholder}
     onChange={(e) => {
       handleSearch(e.target.value);
     }}
   />
   ```
3. `e.target.value`, aka the search text is passed onto function `handleSearch(term: string)` as param `term`.

4. `handleSearch()` determines how to set the query in the URL

   1. search parameters are updated in real-time when search term changes on the front end

   ```js
   export default function Search({ placeholder }: { placeholder: string }) {
     const searchParams = useSearchParams();
     const pathname = usePathname();
     const { replace } = useRouter();

     function handleSearch(term: string) {
       // Construct utility to interact with searchParams
       const params = new URLSearchParams(searchParams);

       // Set params
       if (term) {
         params.set("query", term);
       } else {
         params.delete("query");
       }

       // Update URL with search params
       replace(`${pathname}?${params.toString()}`);
     }

     return <>...</>;
   }
   ```

5. The page receives the `searchParams` prop and passes `query` and `page` to `<Table>` component

   ```js
   // invoices/page.tsx

   export default async function Page({
     searchParams,
   }: {
     searchParams?: {
       query?: string,
       page?: string,
     },
   }) {
     const query = searchParams?.query || "";
     const currentPage = Number(searchParams?.page) || 1;

     return (
       <Suspense key={query + currentPage} fallback={<InvoiceSkeleton />}>
         <Table query={query} currentPage={currentPage} />
       </Suspense>
     );
   }
   ```

6. `<Table>` calls a server function `fetchFilteredInvoices()`.

   ```js
   // components/ui/invoices/table.tsx

   const invoices = await fetchFilteredInvoices(query, currentPage);
   ```

### Debouncing

**Debouncing** is a programming practice that limits the rate at which a function can fire. In our case, you only want to query the database when the user has stopped typing.

- `use-debounce` [library](https://www.npmjs.com/package/use-debounce)

#### How it works

1. **Trigger Event**: When an event that should be debounced (like a keystroke in the search box) occurs, a timer starts.
2. **Wait**: If a new event occurs before the timer expires, the timer is reset.
3. **Execution**: If the time reaches the end of its countdown, the debounced function is executed.
