"use server";
export async function loginActions(formData: FormData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const check_box = formData.get("check_box");
  const select_gender = formData.get("select_gender");

  const data = formData;
  const session = JSON.stringify({ username, email });
  const buffer = Buffer.from(session);
  const real = buffer.toString("utf-8");
}
