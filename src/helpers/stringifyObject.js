export default function stringifyObjects(item) {
    const currentObject = item
    const objectValues = Object.values(currentObject)

    objectValues.forEach((el) => {
      el.forEach((el2, idx) => {
        el[idx] = JSON.stringify(el2);
      })
    })
  }