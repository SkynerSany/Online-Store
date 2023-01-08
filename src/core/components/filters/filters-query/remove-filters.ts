function removeDoubleRange(doubleRange: HTMLFormElement): void {
  const inputs = Array.from(doubleRange.elements) as HTMLInputElement[];
  inputs[0].value = inputs[2].min;
  inputs[1].value = inputs[2].max;

  const event = new Event("change");
  inputs[0].dispatchEvent(event);
  inputs[1].dispatchEvent(event);
}

function removeCheckbox(checkboxContainer: HTMLFormElement): void {
  const inputs = Array.from(checkboxContainer.elements) as HTMLInputElement[];
  inputs.map((checkbox) => {
    const newCheckbox = checkbox;
    newCheckbox.checked = false;
    return newCheckbox;
  });

  const event = new Event("change");
  inputs[0].dispatchEvent(event);
  inputs[1].dispatchEvent(event);
}

function removeInputText(formSearch: HTMLFormElement): void {
  const search = Array.from(formSearch.elements) as HTMLInputElement[];
  search[0].value = '';

  const event = new Event("submit");
  formSearch.dispatchEvent(event);
}

export { removeCheckbox, removeDoubleRange, removeInputText }