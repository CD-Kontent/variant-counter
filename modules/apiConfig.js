function getParams() {
  const envID = document.getElementById("envID").value;
  const previewKey = document.getElementById("key").value;
  return [envID, previewKey];
}

function setURL(envID) {
  return `https://preview-deliver.kontent.ai/${envID}`;
}

async function callAPI(query, previewKey) {
  try {
    const res = await fetch(query, {
      method: "GET",
      headers: { Authorization: `Bearer ${previewKey}` },
    });
    // Since many errors will still count as a "success" for fetch(), they must be
    // handled here - they won't trigger the catch() block
    if (!res.ok) {
      throw new Error(
        `API request failed: ${res.status} ${apiError(res.status)}`
      );
    }
    return res.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

function apiError(responseCode) {
  switch (responseCode) {
    case 401:
      return "Authentication Error - missing or invalid API key.";
    case 403:
      return "Authorisation Error - provided API key has insufficient permissions";
    case 404:
      return "Resource not found - please check supplied Environment ID is accurate";
    case 429:
      return "API Rate Limit exceeded - please try again in a few seconds";
    case 500:
      return "API returned unexpected error, please try again in a few seconds. ";
    default:
      return `Unexpected error.`;
  }
}

export { getParams, setURL, callAPI };
