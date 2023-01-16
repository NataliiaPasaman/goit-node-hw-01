const contactsOperations = require('./db/contacts');

const { Command } = require("commander");
const program = new Command();

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
      case "list":
        const contacts = await contactsOperations.listContacts();
        console.log('List_contacts', contacts);
        break;
  
      case "get":
        const contactById = await contactsOperations.getContactById(id);
        console.log('contactById', contactById);
        break;
  
      case "add":
        const newContact = await contactsOperations.addContact(name, email, phone);
        console.log('newContact', newContact);
        break;
  
      case "remove":
        const deleteContact = await contactsOperations.removeContact(id);
        console.log('deleteContact', deleteContact);
        break;
  
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  }

  program
  .option("-a, --action <type>", "contact operation")
  .option("-i, --id <type>", "contact id")
  .option("-n, --name <type>", "contact name")
  .option("-e, --email <type>", "contact email")
  .option("-p, --phone <type>", "contact phone");

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);