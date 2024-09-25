import { fetchCustomers } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/create-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Invoice",
};

// fetches customers and passes it to the <Form> component.
export default async function CreateInvoice() {
  const customers = await fetchCustomers();
  return (
    <main>
      <h1>Create Invoice</h1>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Create Invoice",
            href: "/dashboard/invoices/create",
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
