const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async() => {
    try {
        const contacts = await fs.readFile(contactsPath);
        const contactsParsed = JSON.parse(contacts);
        return contactsParsed;
    } catch (error) {
        console.log(error.message);
    }
}

const getContactById = async(contactId) => {
    try {
        const allContacts = await listContacts();
        const findedContact = allContacts.find(({ id }) => id === String(contactId));
        
        if (!findedContact) return null;
        
        return findedContact;
    } catch (error) {
        console.log(error.message);
    }
  }

const addContact = async(name, email, phone) => {
    const newContact = {
        id: uuid.v4(),
        name, 
        email,
        phone,
    };

    try {
        const allContacts = await listContacts();
        allContacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(allContacts));

        return newContact;
    } catch (error) {
        console.log(error.message);
    }
}

const removeContact = async(contactId) => {
    try {
        const allContacts = await listContacts();
        const index = allContacts.findIndex(({ id }) => id === String(contactId));

        if (index === -1) {
           console.log(`Contacts with index ${index} was not found`);
           return;
        }

        const deleteContact = allContacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(allContacts));
        return deleteContact;
    } catch (error) {
        console.log(error.message);
    }
  }

  module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
  }
