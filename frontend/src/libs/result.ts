import randomWords from "random-words";
import { Page, Result } from "./interfaces";

export function generateRandomPage(nResults: number): Page<Result> {
  const results: Result[] = [];
  for (let i = 0; i < nResults; i++) {
    results.push({
      title: randomWords({ exactly: 3, join: " " }),
      content: randomWords({ exactly: 30, join: " " }),
      url: `Url ${i}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  return { data: results, total: 30, hasNext: true };
}

export async function getImoveisByFilterWithPage(
  filterValues: any,
  page: number
): Promise<Page<Result>> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(generateRandomPage(10)), 1000);
  });
}
