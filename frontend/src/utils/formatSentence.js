/**
 * Formats the course name passed through URL to be title case
 * @param {} str
 * @returns
 */
export default function format(str) {
    const smallWordsSet = new Set([
        'a',
        'an',
        'and',
        'as',
        'at',
        'but',
        'by',
        'for',
        'if',
        'in',
        'nor',
        'of',
        'on',
        'or',
        'so',
        'the',
        'to',
        'up',
        'yet',
    ]);

    const words = str.split(' ');

    let courseFormatted = '';
    let courseTitleFormatted = '';

    for (let i = 0; i < words.length; i += 1) {
        if (i === 0 || i === 1) {
            courseFormatted += `${words[i].toUpperCase()} `;
        } else {
            const word = words[i].toLowerCase();
            if (smallWordsSet.has(word) && i !== 2) {
                courseTitleFormatted += `${word.toLowerCase()} `;
            } else {
                courseTitleFormatted += `${
                    word.charAt(0).toUpperCase() + word.slice(1)
                } `;
            }
        }
    }
    return { courseFormatted, courseTitleFormatted };
}
