const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function read () {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function write (data) {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

async function listContacts() {
 
  const data = await read();
  return data;
}

async function getContactById(contactId) {
  
  const data = await read();
  return data.find(contact => contact.id === contactId || null);
}

async function removeContact(contactId) {
 
  const data = await read();
  const index = data.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }
 
  const [result] = data.splice(index, 1);
  await write(data);
  return result;  
}


async function addContact(contact) {
  
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
