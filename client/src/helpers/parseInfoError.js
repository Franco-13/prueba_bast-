export function parseErrorInfoCreateAnimal(message) {
  const indexFind = message.indexOf("{");

  const lengthMessage = message.length;

  const messageSlice = message.slice(indexFind + 1, lengthMessage - 1);

  const messageSplit = messageSlice.trim().split(": ");

  const objectMessage = {
    [messageSplit[0]]: messageSplit[1].replaceAll('"', ""),
  };

  return objectMessage;
}
