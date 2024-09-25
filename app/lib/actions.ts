"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(), // change from string to number
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

/**
 * Asynchronously creates an invoice using the provided form data.
 *
 * @param {FormData} formData - The form data containing invoice details.
 * @returns {Promise<void>} A promise that resolves when the invoice is created.
 */
export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  } catch (error) {
    return { message: "Database error: Failed to create invoice." };
  }

  // Purge cache because invoices table is updated
  revalidatePath("dashboard/invoices");
  // Redirect to invoices page
  redirect("/dashboard/invoices");
}

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
  } catch (error) {
    return { message: "Database error: Failed to update invoice." };
  }

  // Purge cache because invoices table is updated
  revalidatePath("dashboard/invoices");
  // Redirect to invoices page
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  // TEST: throw new Error("Failed to Delete Invoice");
  try {
    await sql`
    DELETE FROM invoices
    WHERE id = ${id};
  `;
  } catch (error) {
    return { message: "Database error: Failed to delete invoice." };
  }

  // Purge cache because invoices table is updated
  revalidatePath("dashboard/invoices");
}
