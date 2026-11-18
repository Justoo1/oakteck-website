export type ContactField = "name" | "company" | "contact" | "service" | "message" | "preferred";

/** What POST /api/contact returns, and what the contact form renders. */
export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  values?: Record<string, string>;
};
