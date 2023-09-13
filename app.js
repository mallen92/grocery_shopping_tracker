const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin, // Read from standard input (keyboard)
  output: process.stdout // Write to standard output (console)
});

let itemName = "";
let itemPrice = 0;
let itemQuantity = 0;
let boughtItem = false;

let groceryList = [
    {
        name: 'Lemonade',
        price: 2.00,
        quantity: 1,
        bought: false
    },
    {
        name: 'Chips',
        price: 3.00,
        quantity: 2,
        bought: false
    },
    {
        name: 'Notebook',
        price: 1.00,
        quantity: 3,
        bought: true
    }
];

function printList() {
    console.log();
    console.log("Here is your current grocery list:");
    console.log();

    groceryList.forEach(item => {
        console.log(`Item: ${item.name}`);
        console.log(`Price: $${item.price}`);
        console.log(`Quantity: ${item.quantity}`);
        console.log(`Bought?: ${item.bought}`);
        console.log();
    })
}

printList();

rl.question('What would you like to do?\nType 1 to add an item to the list\nType 2 to remove an item from the list\n', choice => {
    if (choice == 1) {
        rl.question('\nWhat is the item you would like to add? ', name => {
            itemName = name;

            rl.question('\nWhat is the price of the item? ', price => {
                itemPrice = price;

                rl.question('\nHow many of this item will you buy? ', quantity => {
                    itemQuantity = quantity;

                    rl.question('\nDid you purchase this item? ', itemPurchased => {
                        if(itemPurchased === "y") {boughtItem = true;}
                        else {boughtItem = false;}

                        rl.close();

                        const newItem = {
                            name: itemName,
                            price: itemPrice,
                            quantity: itemQuantity,
                            bought: boughtItem
                        }
                        groceryList.push(newItem);
                        printList();

                    });
                });
            });
        });
    }
    else if (choice == 2) {
        rl.question('Type the number of the item you would like to remove (1 for the first, 2 for the second, etc.).\n', itemToRemove => {
            groceryList.splice(itemToRemove-1, 1);
            printList();
            rl.close();
        })
    }
    else {
        console.log('You input an incorrect response.');
        rl.close();
    }
});