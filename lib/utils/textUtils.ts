import nlp from 'compromise';
export const extractCategoryKeywords = (title) => {
    // Define a list of common prepositions and determiners
    const stopWords = [
        "for", "with", "all", "of", "to", "the", "a", "an", "in", "on", "at", "by", "from", "about", "as",
        "into", "through", "over", "after", "between", "out", "against", "during", "without", "before",
        "under", "around", "among"
    ];

    // Split the title into words and filter out stop words
    const filteredTitle = title
        .split(/\s+/) // Split by whitespace
        .filter(word => !stopWords.includes(word.toLowerCase())) // Remove prepositions and determiners
        .join(" "); // Reconstruct the filtered title

    // Process the filtered title using compromise
    const doc = nlp(filteredTitle);

    // Extract nouns, adjectives, and regex-matched patterns
    const nouns = doc.nouns().out("array");
    const adjectives = doc.adjectives().out("array");
    const regexMatches = filteredTitle.match(/\b\d+oz\b|\(([^)]+)\)|\b\w+\b/g) || [];

    // Combine all extracted keywords
    const combinedKeywords = [...new Set([...nouns, ...adjectives, ...regexMatches])];

    // Filter out special characters, short words, and irrelevant packaging terms
    return combinedKeywords
        .map(word => word.trim()) // Remove extra whitespace
        .filter(
            word =>
                word.length > 2 && // Exclude short words
                /^[a-zA-Z0-9]+$/.test(word) && // Exclude words with special characters
                !/^\d+|oz|pack|x\d+$/i.test(word) // Exclude packaging terms like "3oz", "2 Pack", "x2"
        )
        .join(" ")
};
