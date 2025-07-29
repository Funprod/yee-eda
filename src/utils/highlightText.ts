export const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(
        regex,
        (match) => `<mark style="background-color: transparent; color: #2db100">${match}</mark>`,
    );
};
