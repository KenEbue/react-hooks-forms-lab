import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSearch, setSelectedSearch] = useState("");
  const [shoppingItems, setShoppingItems] = useState(items);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSelectedSearch(event) {
    setSelectedSearch(event.target.value);
  }

  function handleItemFormSubmit(item) {
    const newItem = { ...item, id: uuid() };
    setShoppingItems([...shoppingItems, newItem]);
  }

  const itemsToDisplay = shoppingItems.filter((item) => {
    if (selectedCategory === "All" && selectedSearch === "") return true;
    else if (selectedCategory === "All") return item.name.includes(selectedSearch);
    else if (selectedSearch === "") return selectedCategory === item.category;
    return item.category === selectedCategory && item.name.includes(selectedSearch);
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={handleSelectedSearch} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
