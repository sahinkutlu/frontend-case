export const reorderCategories = (categories: string[], selectedCategories: string[]) => {
    const selected = categories.filter((category) => selectedCategories.includes(category));
    const unselected = categories.filter((category) => !selectedCategories.includes(category));
    return [...selected, ...unselected];
}

export const syncLocalStorage = (selectedCategories: string[]) => {
    localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
}