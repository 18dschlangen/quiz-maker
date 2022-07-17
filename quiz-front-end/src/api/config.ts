export const BASE_API = "http://localhost:4000/api";
export const QUESTION_PATH = "/questions";

export const fetchJson = async (
  url: string,
  type?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
) => {
  try {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: type ?? "GET",
    });
    return response.json();
  } catch (e: any) {
    console.error("Error: " + e.message);
  }
};
