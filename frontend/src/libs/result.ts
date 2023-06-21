import randomWords from "random-words";
import { FilterFields, Page, Result } from "./interfaces";

import api from "../service/api";

export function generateRandomPage(nResults: number): Page<Result> {
  const results: Result[] = [];
  for (let i = 0; i < nResults; i++) {
    results.push({
      title: randomWords({ min: 3, max: 7, join: " " }),
      abs: randomWords({ min: 30, max: 50, join: " " }),
      highlight_abs: randomWords({ min: 30, max: 50, join: " " }),
      keywords: randomWords({ min: 3, max: 4, join: " " })
        .split(" ")
        .map((word) => ({
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
  filterValues?: FilterFields
): Promise<Page<Result>> {
  const { data: pageData } = await api.get<Page<Result>>(
    `/search?query=${query}&page=${page}&limit=10`
  );
  console.log(pageData);
  return {
    data: pageData.data,
    total: pageData.total,
    hasNext: true,
    took: pageData.took,
  };
}

export async function searchOnSearchOnMath(
  query: string,
  page: number,
  filterValues?: any
): Promise<Page<Result>> {
  try {
    const { data: pageData } = await api.get<{
      totalResults: number;
      searchTime: number;
      result: {
        abst: string;
        title: string;
        url: string;
        blur: boolean;
      }[];
    }>(
      `https://www.searchonmath.com/webservice?query=Einstein%27s%20formula%2C%20%5C%28E%3Dmc%5E2%5C%29%2C%20revolutionized%20physics.&page=1`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    console.log(pageData);
    return {
      data: pageData.result
        .filter((resultSoM) => !resultSoM.blur)
        .map((result) => ({
          title: result.title,
          abs: result.abst,
          highlight_abs: result.abst,
          keywords: [],
          url: result.url,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })),
      total: pageData.totalResults,
      hasNext: true,
      took: pageData.searchTime,
    };
  } catch (e) {
    console.log(e);
    // return {
    //   data: [],
    //   total: 0,
    //   hasNext: true,
    //   took: 0,
    // };
    return new Promise((resolve) => {
      setTimeout(() => resolve(generateRandomPage(10)), 1000);
    });
  }
}

export async function countAllDocs(): Promise<number> {
  const { data } = await api.get<number>(`/docs`);
  return data;
}
