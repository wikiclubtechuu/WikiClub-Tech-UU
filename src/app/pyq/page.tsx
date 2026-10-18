import { redirect } from "next/navigation";

// Help Desk lives at /help-desk. The navbar and footer link here (/pyq).
export default function PyqPage() {
  redirect("/help-desk");
}
