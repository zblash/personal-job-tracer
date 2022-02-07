export const ArrayUtils = (function () {
  function stringSort(nameA, nameB) {
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  }

  function stringNum(numA, numB) {
    return numA - numB;
  }

  function sortAsc(arr, field) {
    const sortableArr = [...arr];

    sortableArr.sort((a, b) => {
      if (typeof field === 'string') {
        return stringSort(a[field], b[field]);
      }
      if (typeof field === 'number') {
        return stringNum(a[field], b[field]);
      }

      return 0;
    });

    return sortableArr;
  }

  function sortDesc(arr, field) {
    return [...sortAsc(arr, field)].reverse();
  }

  function filterByField(arr, field, keyword) {
    return [...arr].filter(arrField => arrField[field].includes(keyword));
  }

  function findByField(arr, field, keyword) {
    return [...arr].filter(arrField => arrField[field] === keyword);
  }

  return { sortAsc, sortDesc, filterByField, findByField };
})();
