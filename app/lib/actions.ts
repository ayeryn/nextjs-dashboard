"use server";

/**
 * Asynchronously creates an invoice using the provided form data.
 *
 * @param {FormData} formData - The form data containing invoice details.
 * @returns {Promise<void>} A promise that resolves when the invoice is created.
 */
export async function createInvoice(formData: FormData) {
  const rawFormData = {
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  };

  // console.log(rawFormData);
}
