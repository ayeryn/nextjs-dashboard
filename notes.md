# Notes

- [Notes](#notes)
  - [Client vs. Server](#client-vs-server)
  - [Project](#project)
    - [Create New Project](#create-new-project)
    - [Project Structure](#project-structure)
  - [pnpm](#pnpm)
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
  - [Mutating Data](#mutating-data)
    - [Server Actions](#server-actions)
    - [Using forms](#using-forms)
      - [Creating an invoice](#creating-an-invoice)
      - [Updating an invoice](#updating-an-invoice)
      - [Deleting an invoice](#deleting-an-invoice)
    - [Mutating Data Summary](#mutating-data-summary)
  - [Error Handling](#error-handling)
    - [`try/catch`](#trycatch)
    - [`error.tsx`](#errortsx)
    - [Handling `404` with `notFound` function](#handling-404-with-notfound-function)
  - [Accessibility](#accessibility)
  - [Form Validation](#form-validation)
    - [Client-Side](#client-side)
      - [`required` attribute (simplest)](#required-attribute-simplest)
    - [Server-Side](#server-side)
      - [`useActionState` hook on `<Form />`](#useactionstate-hook-on-form-)
      - [Use `zod` to validate before DB insertion](#use-zod-to-validate-before-db-insertion)
      - [Add Error Display](#add-error-display)
      - [Sidebar - ARIA :eyes:](#sidebar---aria-eyes)
      - [Form Validation Summary](#form-validation-summary)
  - [Authentication](#authentication)
    - [Authentication vs. Authorization](#authentication-vs-authorization)
  - [Auth.js](#authjs)
    - [NextAuthConfig](#nextauthconfig)
      - [`callbacks?`](#callbacks)
      - [`authorized` callback](#authorized-callback)
    - [Password Hashing](#password-hashing)
    - [Credentials provider](#credentials-provider)
    - [Steps](#steps)
  - [Metadata](#metadata)
    - [Common Types](#common-types)
    - [Adding Metadata](#adding-metadata)

## Client vs. Server

- We don't want to fetch from database from client components, because it will expose database secrets
- Pages are usually server components from which we can make database requests and pass stuff to client components

## [Project][1]

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

## [pnpm][2]

pnpm (performant Node package manager) is a modern package manager for JavaScript that offers significant advantages over traditional tools like npm and Yarn. Here are the key features and benefits of using pnpm:

## CSS Styling

### Tailwind CSS

Tailwind is a CSS framework that speeds up the development process by allowing you to quickly write utility classes directly in your TSX markup.

In Tailwind, you style elements by adding class names. For instance, adding the class `"text-blue-150"` will turn the `<h1` text blue.

```html
<h1 className="text-blue-150">I'm blue!</h1>
```

Although the CSS styles are shared globally, **each class is singularly applied to each element**. This means if you add or delete an element, you don't have to worry about maintaining separate stylesheets, style collisions, or the size of your CSS bundle growing as your application scales.

### CSS Modules

CSS Modules allow you tos cope CSS to a component by automatically creating unique class names, so you don't have to worry about style collisions as well.

- TODO: add code example to demonstrate how binding works.

### `clsx` (Conditional Styling)

There may be cases where you may need to conditionally style an element based on state or some other condition.

`clsx` is a library that lets you toggle class names easily. ([Documentation][3]).
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
- Serving images in modern formats, like [WebP][4] and [AVIF][5], when the browser supports it.

## Layout and Pages

### Nested Routing

- **Folders** are used to create nested routes.
- Each folder represents a **route segment** that maps to a **URL segment**

### `page.tsx`

`page.tsx` is a special file that exports a React component, and it's required for the route to be accessible.

It will be automatically nested in a `<Layout />` as `{children}`

### `layout.tsx`

One benefit is that on navigation, only the page components update while the layout won't re-render. This is called [partial rendering][6].

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

When you're creating a full-stack application. you;ll also need to write logic to interact with your database. For relational databases like Postgres, you can do this with SQL or with an [ORM][7].

There are a few cases where you have to write database queries:

- When creating your API endpoints, you need to write logic to interact with your database.
- If you are using React Server Components (fetching data on the server), you can skip the API layer, and query your database directly without risking exposing your database secrets to the client.

### Server Components

By default, Next.js apps use **React Server Components**. Fetching data with Server Components is a relatively new approach and there are a few benefits of using them:

- Server Components support promises, providing a simpler solution for asynchronous tasks like data fetching. You can use `async/await syntax`without reaching out for `useEffect`, `useState` or data fetching libraries.
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

Data fetching and rendering happens on the server at build time (when you deploy) or when [revalidating data][8].

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

- Since `<SideNav>` is static, it's shown immediately. The user can interact with `<SideNav>` while the dynamic content is loading.
- The user doesn't have to wait for the page to finish loading before navigating away (this is called interruptable navigation).

### [Route Groups][9]

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

In Next.js, if you call a [dynamic function][10] in a route (like querying your database), the _entire_ route becomes dynamic.

However, most routes are not fully static or dynamic.

## Search

[Next.js tutorial][11]

The search function will span the client and server. When a user searches for an invoice on the client, the URL params will be updated, data will be fetched on the server, and the table will re-render on the server with the new data.

### URL Search Params

- `URLSearchParams` ([Doc][12])
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
- **`useRouter`**: enables navigation between routes within client components programmatically. There are [multiple methods][13].
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

- `use-debounce` [library][14]

#### How it works

1. **Trigger Event**: When an event that should be debounced (like a keystroke in the search box) occurs, a timer starts.
2. **Wait**: If a new event occurs before the timer expires, the timer is reset.
3. **Execution**: If the time reaches the end of its countdown, the debounced function is executed.

## Mutating Data

### Server Actions

React Server Actions allow you to run asynchronous code directly on the server. They eliminate the need to create API endpoints to mutate your data. Instead, you write asynchronous functions that execute on the server and can be invoked from your Client or Server components.

### Using forms

In React, you can use the `action` attribute in the `<form>` element to invoke actions. The action will automatically receive the native `FormData` object, containing the captured data.

For example,

```js
// Server Component
export default function Page() {
  // Action
  async function create(formData: FormData) {
    "use server";

    // Logic to mutate data...
  }

  // Invoke the action using the "action" attribute
  return <form action={create}>...</form>;
}
```

**Progressive Enhancement**: forms work even if JS is disabled on the client.

#### Creating an invoice

1. Create a form to capture the user's input.
2. Create a Server Action and invoke it from the form - `/app/lib/actions.ts`
3. Inside your Server Action, extract the data from the `formData` object
   1. [Methods][15]
4. Validate and prepare the data to be inserted into your database.
   1. [Zod][16]: a Typescript-first validation library that can simplify type validation)
5. Insert the data and handle any errors.
   1. `revalidatePath` to clear the cache and trigger a new request to the server. [Doc][17]
6. Revalidate the cache and redirect the user back to invoices page.

#### Updating an invoice

1. Create a new dynamic route segment with the invoice `id`.
2. Read the invoice `id` from the page params.
3. Fetch the specific invoice from your database.
4. Pre-populate the form with the invoice data.
5. Update the invoice data in your database.

   1. Pass `id` to the server action: you **cannot** pass as an argument like this

      ```js
      // this is WRONG
      <form action={updateInvoice(id)}
      ```

   2. Instead, use JS `bind`. This will ensure that ny values passed to the Server Action are encoded.

      ```js
      const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
      return <form action={updateInvoiceWithId}></form>;
      ```

#### Deleting an invoice

1. Pass `id` to `deleteInvoice` server action
2. Create binding for `deleteInvoice` with `id`

### Mutating Data Summary

- Use Server Actions to mutate data
- `revalidatePath` to revalidate the cache
- `redirect` to redirect the user to a new page
- _further reading_: [link][18]

## Error Handling

### `try/catch`

```js
// try/catch block
try {
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
} catch (error) {
  return { message: "Database error: Failed to update invoice." };
}

revalidatePath("dashboard/invoices");
redirect("/dashboard/invoices");
```

`redirect` is outside

- It works by throwing an error, which would be caught by the `catch` block. Meaning an error reaches `redirect` as well.
- To avoid this, call `redirect` **after** `try/catch` so it's only reachable if `try` succeeds

### [`error.tsx`][19]

The file can be used to define a UI boundary for a route segment. It servers as a **catch-all** for unexpected errors and allows you to display a fallback UI to your users.

[Example page][20]

- `'use client'`: it needs to be a Client Component
- It accepts two props
  - `error`: this object is an instance of JS's native [`Error`][21] **object**.
  - `reset`: this is a **function** to reset the error boundary. When executed, the function will try to re-render the route segment.

### Handling `404` with `notFound` function

While `error.tsx` is useful for catching **all** errors, `notFound` can be used when you try to fetch a resource that doesn't exist.

`notFound` takes precedence over `error.tsx`.

[Example `not-found.tsx`][22]

## Accessibility

- [Tutorial][23]
- [`useActionState` hook][24]
- [`eslint-plugin-jsx-ally`][25]
  - Catches accessibility issues early
  - For example, it warns if you have images without `alt` text, use the `aria-\*` and `role` attributes incorrectly,

## Form Validation

### Client-Side

#### `required` attribute (simplest)

The simplest would be to rely on the form validation provided by the browser by adding the `required` attribute to the `<input>` and `<select>` elements in your forms.

This is generally okay because some ATs support browser validation.

```html
<input
  id="amount"
  name="amount"
  type="number"
  placeholder="Enter USD amount"
  className="..."
  required />
```

### Server-Side

By validating on the server, you can:

- Ensure your data is in the expected format _before_ sending it to your database.
- Reduce the risk of malicious users bypassing client-side validation.
- Have **one** source of truth for what is considered _valid_ data.

#### `useActionState` hook on `<Form />`

- Takes two arguments: `(action, initialState)`.
- Returns two values: `[state, formAction]`
  - the form state, and
  - a function to be called when the form is submitted

#### Use `zod` to validate before DB insertion

- `safeParse()`

  - Failed:

    ```json
    { success: false, error: [Getter] }
    ```

  - Success:

    ```json
    {
      "success": true,
      "data": {
        "customerId": "3958dc9e-712f-4377-85e9-fec4b6a6442a",
        "amount": 123.32,
        "status": "paid"
      }
    }
    ```

#### Add Error Display

```js
// ui/invoices/create-form.tsx

<div className="relative">
  <select
    id="customer"
    name="customerId"
    className="..."
    defaultValue=""
    aria-describedby="customer-error">  // indicates the container
  </select>
</div>

// Add error display
// div.id == select.aria-describedby
<div id="customer-error" aria-live="polite" aria-atomic="true">
  {state.errors?.customerId &&
    state.errors.customerId.map((error: string) => (
      <p className="mt-2 text-sm text-red-500" key={error}>
        {error}
      </p>
    ))}
</div>
```

- `aria-describedby= customer-error`: This establishes a relationship between the `select` element and the error message container. It indicates that the container with `id=customer-error` describes the `select` element

  - Screen readers will read this description when the user interacts with the `select` box to notify them of errors

- `id="customer-error"`: This `id` attribute uniquely identifies the HTML element that holds the error message for the `select` input.

- `aria-live="polite"`: The screen reader should politely notify the user when the error inside the `div` is updated.

  - When the content changes (e.g. when a user corrects an error), the screen reader will announce these changes, but only when the user is idle so as not to interrupt them.

- `aria-live`:

  1. **`polite`**: Updates to the element will be announced to the user, but only when they are not busy. This is the least intrusive option, allowing users to finish their current tasks without interruption.
  2. **`assertive`**: Updates will be announced immediately, interrupting the user if necessary. This is used for critical updates that the user needs to be aware of right away.
  3. **`off`**: Updates will not be announced at all. This is useful for content that does not require user attention.

- [`aria-atomic`][26]: indicates whether assistive technologies such as a screen reader will present all

  - `false` (default)

    present only the changed node or nodes.

  - `true`

    present the entire changed region as a whole, including the author-defined label if one exists.

#### Sidebar - ARIA :eyes:

- [Docs][27]
- Accessible Rich Internet Applications
- A set of [roles][28] and [attributes][29] that define ways to make web content and web applications (especially those developed with JavaScript) more accessible to people with disabilities.
- It supplements HTML so that interactions and widgets commonly used in applications can be passed to assistive technologies when there is not otherwise a mechanism. For example, ARIA enables accessible JavaScript widgets, form hints and error messages, live content updates, and more.

#### Form Validation Summary

To all server-side form validation:

1. Transform `<Form />` into a Client Component to use the `useActionState` hooks
   1. This hook takes `action` and `initialState` and returns `[state, formAction]`
2. Update form action: `<form action={formAction}>`, which calls the Server Action that validates the data and interact with the DB
3. Add validation in Server Actions before sending anything to DB (`/lib/actions.ts`)
4. Define the `State` type, in our case it was `{errors: {}, message: null}`.
   1. It will be referenced in the `<Form />`

## Authentication

### Authentication vs. Authorization

In Web Dev, authentication and authorization serve different roles:

- **Authentication** is about making sure the user is <ins>who they say they are</ins>. You're proving your identity with something you have like a username and password
- **Authorization** is the _next_ step. Once a user's identity is confirmed, authorization devices what parts of the application <ins>they are allowed to use</ins>.

## [Auth.js][30]

### [NextAuthConfig][31]

#### `callbacks?`

Callbacks are asynchronous functions you can use to <ins>control what happens when an auth-related action is performed</ins>. Callbacks allow you to implement **access controls** without a database or to integrate with external databases or APIs.

#### `authorized` callback

`authorized` callback is used to **verify if the request is authorized to access a page** via [Next.js Middleware][32]

| Parameter        | Type                | Description                             |
| ---------------- | ------------------- | --------------------------------------- |
| `params`         | `Object`            | -                                       |
| `params.auth`    | `null` \| `Session` | The authenticated user or token, if any |
| `params.request` | `NextRequest`       | The request to be authorized.           |

### Password Hashing

### [Credentials provider][33]

1. Write auth logic
   1. `auth.config.ts`
   2. `auth.ts`
2. Add Middleware - `middleware.ts`
3. Connect the auth logic with login form
   1. `login-form.tsx`

### Steps

1. Install to project
2. Adding the pages option
3. Protecting routes with Middleware
4. Add providers

## Metadata

Metadata plays a significant role in enhancing a webpage's SEO, making it more accessible and understandable for search engines and social media platforms.
Proper metadata helps search engines effectively index webpages, improving their ranking in search results. Additionally, metadata like Open Graph improves the appearance of shared links on social media, making the content more appealing and informative for users.

### Common Types

- title
- description
- keyword
- open graph
- favicon

### Adding Metadata

1. **Config-based**: Export a [static `metadata` object][34] or a dynamic [`generateMetadata` function][35] in a `layout.js` or `page.js` file.
2. **File-based**: specials files like:
   1. `favicon.ico`, `apple-icon.jpg`, and `icon.jpg`: Utilized for favicons and icons
   2. `opengraph-image.jpg` and `twitter-image.jpg`: Employed for social media images
   3. `robots.txt`: Provides instructions for search engine crawling
   4. `sitemap.xml`: Offers information about the website's structure

[1]: https://nextjs.org/learn/dashboard-app/
[2]: https://pnpm.io
[3]: https://github.com/lukeed/clsx
[4]: https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#webp
[5]: https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types#avif_image
[6]: https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#4-partial-rendering
[7]: https://vercel.com/docs/storage/vercel-postgres/using-an-orm
[8]: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data
[9]: https://nextjs.org/docs/app/building-your-application/routing/route-groups
[10]: https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-functions
[11]: https://nextjs.org/learn/dashboard-app/adding-search-and-pagination
[12]: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
[13]: https://nextjs.org/docs/app/api-reference/functions/use-router#userouter
[14]: https://www.npmjs.com/package/use-debounce
[15]: https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
[16]: https://zod.dev/
[17]: https://nextjs.org/docs/app/api-reference/functions/revalidatePath
[18]: https://nextjs.org/blog/security-nextjs-server-components-actions
[19]: https://nextjs.org/docs/app/api-reference/file-conventions/error
[20]: app/dashboard/invoices/error.tsx
[21]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

[22]: /app/dashboard/invoices/[id]/edit/not-found.tsx
[23]: https://nextjs.org/learn/dashboard-app/improving-accessibility
[24]: https://react.dev/reference/react/useActionState
[25]: https://www.npmjs.com/package/eslint-plugin-jsx-a11y
[26]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-atomic
[27]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA
[28]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles
[29]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes
[30]: https://authjs.dev/reference/nextjs
[31]: https://authjs.dev/reference/nextjs#nextauthconfig
[32]: https://nextjs.org/docs/app/building-your-application/routing/middleware
[33]: https://authjs.dev/getting-started/providers/credentials-tutorial
[34]: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-object
[35]: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
