import randomWords from "random-words";
import { Page, Result } from "./interfaces";

import api from "../service/api"

export function generateRandomPage(nResults: number): Page<Result> {
  const results: Result[] = [];
  for (let i = 0; i < nResults; i++) {
    results.push({
      title: randomWords({ min: 3, max:7, join: " " }),
      abs: randomWords({ min: 30, max: 50, join: " " }),
      highlight_abs: randomWords({ min: 30, max: 50, join: " " }),
      keywords: randomWords({ min: 3, max: 4, join: " " }).split(" ").map((word) => ({
        text: word,
        dbpedia_resource: `http://dbpedia.org/resource/${word}`,
      })),
      url: `Url ${i}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  return { data: results, total: 30, hasNext: true, took: 0 };
}

// export async function getImoveisByFilterWithPage(
//   filterValues: any,
//   page: number
// ): Promise<Page<Result>> {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(generateRandomPage(10)), 1000);
//   });
// }


export async function searchWithPage(
  query: string,
  page: number,
  filterValues?: any,
): Promise<Page<Result>> {

  const {data: pageData} = await api.get<Page<Result>>(`/search?query=${query}&page=${page}&limit=10`);
  console.log(pageData);
  
  return {"data": pageData.data, "total": pageData.total, hasNext: true, took: pageData.took};
}


export async function countAllDocs(): Promise<number> {
  const {data} = await api.get<number>(`/docs`);
  return data;
}