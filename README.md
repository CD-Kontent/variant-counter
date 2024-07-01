# Language Variant Counter
v1.0

## Description

This tool will count the total number of Language Variants in a specific Environment of a Kontent.ai project.
This is a more accurate reflection of how much "stuff" exists in an environment than number of Content Items, as each Content Item can represent multiple Language Variants.

This count relies on information from Kontent.ai's Preview Delivery API. The Preview Delivery API is used to ensure the most accurate count - "standard" Delivery API only counts variants in the Published state.

Note that the tool will make API calls in this process, which will count against your usage.

### Limitations

- Scans only one environment at a time. For complete count of Variants in a project, scan each environment individually, and store the results of each scan.
- Works with Preview Delivery REST API only.
- As such, requires Preview API Key to be supplied in order to function.
- There is no validation on the input fields. Environment IDs and API Keys are complex strings, and I don't have access to the algorithms governing them; and language codenames can be configured by users, making them unpredictable.
- Results do not persist between operations - beginning a new scan will remove the results of any previous scans.

### Features

- Download scan results as a CSV file.
- The results table is sortable by the value of any column (e.g., results can be sorted by which Content Item contains the URL, the response status of the URL, etc.).

### Issues

Please report any issues through GitHub.

## Usage

Deploy your own instance of the tool.
If you have a Netlify account linked to your GitHub account, this can be done with one click - thanks Netlify!
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/CD-Kontent/variant-counter)
Otherwise, this will need to be done manually.

Once deployed, simply provide an Environment ID, and matching Preview API Key, and run the tool. Once the count is completed, a new button will appear to allow for downloading the results as a CSV file.

### API Errors

If the Kontent.ai API returns an error; a message will be displayed including the response code, and a short message describing the likely issue or solution.
These are based on [the Delivery API Reference materials.](https://kontent.ai/learn/reference/openapi/delivery-api/#tag/Errors)

## Tech Stack

- This tool was built for use with [Kontent.ai](https://kontent.ai/) projects.
- HTML
- JavaScript
- [Bulma](https://bulma.io/)
- [Tabulator](https://tabulator.info/)