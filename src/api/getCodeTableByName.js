import secureAPICodeTable from "./secureAPI/secureAPICodeTable";

export default async function getCodeTableByName(tableEndpoint) {
  if (!tableEndpoint) return [];

  return await secureAPICodeTable(tableEndpoint);
}
