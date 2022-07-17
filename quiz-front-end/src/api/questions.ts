import { BASE_API, fetchJson, QUESTION_PATH } from "./config";

export const fetchQuestions = async () => {
  const data = await fetchJson(`${BASE_API}${QUESTION_PATH}`);
  return data;
};
