const getURL = (tableName) =>
  `https://api.github.com/repos/graphql-compose/graphql-compose-examples/contents/examples/northwind/data/csv/${tableName}.csv`;

/**
 * Custom function for parsing the CSVs obtained from the APIs.
 * @param {string} data
 * @param {string|RegExp} rowDelimiter
 * @param {string|RegExp} entryDelimiter
 */
export const parseCsvToJson = (
  data,
  rowDelimiter = "\n",
  entryDelimiter = ","
) => {
  const lines = data.split(rowDelimiter).filter((e) => e !== "");
  const headers = lines[0].split(entryDelimiter);
  const rows = [];
  lines.slice(1).forEach((eachLine) => {
    const entries = eachLine.split(entryDelimiter);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = index < entries.length ? entries[index] : null;
    });
    rows.push(row);
  });
  return rows;
};

export const fetchData = async (tableName) => {
  const localStorageData = localStorage.getItem("sql-executor-data-csv");
  const storedObect = JSON.parse(localStorageData);

  if (storedObect === null || storedObect[tableName] === undefined) {
    return fetch(getURL(tableName))
      .then(async (res) => {
        if (res.ok) {
          return await res.json();
        } else {
          throw new Error(await res.text());
        }
      })
      .then((data) => {
        const incodedData = data.content.replace("\n", "");
        const parsedData = parseCsvToJson(atob(incodedData));
        const localdata = localStorage.getItem("sql-executor-data-csv");
        const object = JSON.parse(localdata);
        if (object !== null) {
          object[tableName] = parsedData;
          localStorage.setItem("sql-executor-data-csv", JSON.stringify(object));
        } else {
          const newObject = {};
          newObject[tableName] = parsedData;
          localStorage.setItem(
            "sql-executor-data-csv",
            JSON.stringify(newObject)
          );
        }
        return parsedData;
      });
  } else {
    return storedObect[tableName];
  }
};
