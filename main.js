import { getParams, setURL, callAPI } from "./modules/apiConfig.js";
import {
  displayNotification,
  clearNotification,
  toggleProgress,
} from "./modules/helpers.js";
import { table } from "./modules/resultsTable.js";

const submit = document.getElementById("submit");
submit.addEventListener("click", (event) => {
  countVariants();
});

async function listLanguages(baseURL, previewKey) {
  try {
    const result = [];
    let isNextPage = true;

    while (isNextPage) {
      let query = `${baseURL}/languages`;
      let response = await callAPI(query, previewKey);
      for (const lang of response.languages) {
        result.push(lang.system.codename);
      }
      if (response.pagination.next_page == "") {
        isNextPage = false;
      } else {
        query = response.pagination.next_page;
      }
    }
    return result.flat(Infinity);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function countVariantsInLanguages(baseURL, previewKey, envLanguages) {
  let total = 0;
  try {
    const result = [];
    for (const language of envLanguages) {
      const response = await callAPI(
        `${baseURL}/items?language=${language}&system.language=${language}&depth=0&limit=1&includeTotalCount=true`,
        previewKey
      );
      const totalCount = response.pagination.total_count;
      table.addData({ language: language, count: totalCount });
      total += totalCount;
    }
    table.addData({ language: "ALL LANGUAGES", count: total });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function countVariants() {
  clearNotification();
  table.clearData();
  download.style.display = "none";

  try {
    toggleProgress("on");

    const [envID, previewKey] = getParams();
    if (!envID || !previewKey) {
      throw new Error("Please supply both Environment ID and Preview Key.");
    }
    const baseURL = setURL(envID);

    // What if multiple calls needed?
    const envLanguages = await listLanguages(`${baseURL}`, previewKey);
     const variantCounts = await countVariantsInLanguages(
      baseURL,
      previewKey,
      envLanguages
    );
    download.style.display = "inline";
  } catch (error) {
    displayNotification(`${error.message}`, "is-danger");
    console.error(error);
  } finally {
    toggleProgress("off");
  }
}
