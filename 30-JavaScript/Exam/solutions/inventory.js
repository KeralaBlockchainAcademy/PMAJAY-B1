const inventory = new Map();

// Function to add an item
function addItem(id, name, category, quantity) {
    if (inventory.has(id)) {
        console.log(`Error: Item with ID ${id} already exists.`);
    } else {
        inventory.set(id, { name, category, quantity });
        console.log(`Item with ID ${id} added.`);
    }
}

// Function to remove an item
function removeItem(id) {
    if (inventory.has(id)) {
        inventory.delete(id);
        console.log(`Item with ID ${id} removed.`);
    } else {
        console.log(`Error: Item with ID ${id} not found.`);
    }
}

// Function to search for items
function searchItems(searchTerm) {
    const results = [];
    for (const [id, item] of inventory) {
        if (id.includes(searchTerm) || item.name.includes(searchTerm) || item.category.includes(searchTerm)) {
            results.push({ id, ...item });
        }
    }
    if (results.length > 0) {
        console.log('Search Results:', results);
    } else {
        console.log('No matching items found.');
    }
}

// Function to update an item
function updateItem(id, newName, newCategory, newQuantity) {
    if (inventory.has(id)) {
        const item = inventory.get(id);
        item.name = newName || item.name;
        item.category = newCategory || item.category;
        item.quantity = newQuantity !== undefined ? newQuantity : item.quantity;
        inventory.set(id, item);
        console.log(`Item with ID ${id} updated.`);
    } else {
        console.log(`Error: Item with ID ${id} not found.`);
    }
}

// Function to print a summary report of all items
function printSummary() {
    if (inventory.size > 0) {
        console.log('Inventory Summary:');
        for (const [id, item] of inventory) {
            console.log(`ID: ${id}, Name: ${item.name}, Category: ${item.category}, Quantity: ${item.quantity}`);
        }
    } else {
        console.log('Inventory is empty.');
    }
}

// Step 2: Test the application
// Adding items
addItem('1', 'Laptop', 'Electronics', 10);
addItem('2', 'Chair', 'Furniture', 5);
addItem('3', 'Notebook', 'Stationery', 100);

// Removing an item
removeItem('2');

// Searching for items
searchItems('Laptop'); // by name
searchItems('Stationery'); // by category
searchItems('1'); // by ID

// Updating an item
updateItem('1', 'Gaming Laptop', 'Electronics', 8);

// Printing the summary report
printSummary();