function setDoubleRangeValue(from: HTMLInputElement, to: HTMLInputElement, query: string[]) {
  const [inputFrom, inputTo] = [from, to];

  inputFrom.value = `${ query[0] || inputFrom.value }`; 
  inputTo.value = `${ query[1] || inputTo.value }`;

  const event = new Event("change");
  inputFrom.dispatchEvent(event);
  inputTo.dispatchEvent(event);
}

function setInputTextValue(input: HTMLInputElement, query: string) {
  const search = input;
  search.value = `${ query || search.value }`; 

  const event = new Event("submit");
  search.dispatchEvent(event);
}

function loadDoubleRange(queryParams: URLSearchParams, idType: string, idFrom: string, idTo: string): string[] {
  const from = document.querySelector(idFrom);
  const to = document.querySelector(idTo);
  const id = queryParams.get(idType)?.split(',') || [];
  if (!(from instanceof HTMLInputElement) || !(to instanceof HTMLInputElement)) return [];

  setDoubleRangeValue(from, to, id);
  return id;
}

function loadInputText(queryParams: URLSearchParams, idType: string, idSearch: string): string {
  const search = document.querySelector(idSearch);
  const id = queryParams.get(idType) || '';
  if (!(search instanceof HTMLInputElement)) return '';

  setInputTextValue(search, id);
  return id;
}

function loadCheckbox(queryParams: URLSearchParams, id: string): string[] {
  const checkboxQueries = queryParams.get(id)?.split(',') || [];
  if (checkboxQueries[0] === '' || !checkboxQueries.length) return [];

  checkboxQueries.forEach((checkboxQuery) => {
    const checkbox = document.querySelector(`#${ checkboxQuery }`);
    if (checkbox instanceof HTMLInputElement) checkbox.checked = true;
  });

  return checkboxQueries;
}

export { loadInputText, loadCheckbox, loadDoubleRange };