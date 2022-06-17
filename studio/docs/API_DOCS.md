# API Docs

This document describes how to enable API Docs page and some other usage details.

## Enable API Docs page

Make sure `SUPABASE_REST_URL` is updated in `.env` file:
```
  SUPABASE_REST_URL=${API URL}/rest/v1/
```
You can get `API URL` during the Studio installment, [see more here](../README.md#developer-quickstart)

## Usage Details

API Docs page shows docs **only** for the tables that are in the `public` schema.

### TODO:

Need to show docs for the all (or pre-selected) tables on whatever schema they are.

Seems like the list of the tables is generated on the backend side and the `public` schema filter is hardcoded there. The request goes to `${API URL}/rest/v1/`, which is probably serviced by the `supabase_rest_studio` docker image.

Probably there is no way to fix it on the frontend side. Need to investigate.
