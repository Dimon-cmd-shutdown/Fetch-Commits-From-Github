const dateParseFunc = (dateToParse) => {
    const dateArr = dateToParse.split('T')
    const date = dateArr[0] + ', ' + dateArr[1].split('.')[0]
    return date
}
module.exports = dateParseFunc