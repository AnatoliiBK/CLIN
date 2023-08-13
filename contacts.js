// // contacts.js
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function read () {
  const data = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(data);
}

async function write (data) {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}
// TODO: задокументувати кожну функцію
async function listContacts() {
  // ...твій код. Повертає масив контактів.
  const data = await read();
  return data;
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const data = await read();
  return data.find(contact => contact.id === contactId);
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const data = await read();
  const index = data.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }
  // const withoutContact = [...data.slice(0, index), ...data.slice(index + 1)];
  // await write(withoutContact);
  // return data[index];
  const [result] = data.splice(index, 1);
  await write(data);
  return result;  
}


async function addContact(contact) {
  // ...твій код. Повертає об'єкт доданого контакту.
  const data = await read();
  const newContact = {...contact, id: crypto.randomUUID()};
  data.push(newContact);
  await write(data);
  return newContact; 
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
// async function addContact(name, email, phone) {
//   // ...твій код. Повертає об'єкт доданого контакту.
//   const data = await read();
//   const newContact = {
//     id: crypto.randomUUID(),
//     name,
//     email,
//     phone
//   };
//   data.push(newContact);
//   await write(data);
//   return newContact; 
// }