"use strict";

var lexeme_list = [
    // Keywords
    {name:"LX_IF", rx:'if(?![a-zA-Z0-9_])'},
    {name:"LX_ELSE", rx:'else(?![a-zA-Z0-9_])'},
    {name:"LX_WHILE", rx:'while(?![a-zA-Z0-9_])'},
    {name:"LX_DO", rx:'do(?![a-zA-Z0-9_])'},
    {name:"LX_FOR", rx:'for(?![a-zA-Z0-9_])'},
    {name:"LX_FUNC", rx:'function(?![a-zA-Z0-9_])'},
    {name:"LX_VAR", rx:'var(?![a-zA-Z0-9_])'},
    {name:"LX_RETURN", rx:'return(?![a-zA-Z0-9_])'},
    // Import
    {name:"LX_IMPORT", rx:'import(?![a-zA-Z0-9_])'},
    // Export
    {name:"LX_EXPORT", rx:'export(?![a-zA-Z0-9_])'},

    // Constants
    {name:"LX_ID", rx:'[a-zA-Z_][a-zA-Z0-9_]*'},
    {name:"LX_NUMBER", rx:'[0-9]+(\\.[0-9]*)?'},
    {name:"LX_STRING", rx:'"(\\\\"|[^"])*"|' + "'(\\\\'|[^'])*'"},

    // Punctuation
    {name:"LX_LPAREN", rx:'\\('},
    {name:"LX_RPAREN", rx:'\\)'},
    {name:"LX_LCURLY", rx:'\\{'},
    {name:"LX_RCURLY", rx:'\\}'},
    {name:"LX_LBRACKET", rx:'\\['},
    {name:"LX_RBRACKET", rx:'\\]'},
    {name:"LX_SEMICOLON", rx:';'},
    {name:"LX_COLON", rx:':'},
    {name:"LX_COMMA", rx:','},
    {name:"LX_DOT", rx:'\\.'},

    // Logical
    {name:"LX_LAND", rx:'&&'},
    {name:"LX_LOR", rx:'\\|\\|'},

    // Special assign
    {name:"LX_PLUSSET", rx:'\\+='},
    {name:"LX_MINUSSET", rx:'-='},
    {name:"LX_MULTSET", rx:'\\*='},
    {name:"LX_DIVSET", rx:'/='},
    {name:"LX_MODULOSET", rx:'%='},
    {name:"LX_ANDSET", rx:'&='},
    {name:"LX_ORSET", rx:'\\|='},
    {name:"LX_XORSET", rx:'\\^='},
    {name:"LX_LSHIFTSET", rx:'<<='},
    {name:"LX_RSHIFTSET", rx:'>>='},

    // Binary
    {name:"LX_AND", rx:'&'},
    {name:"LX_OR", rx:'\\|'},
    {name:"LX_XOR", rx:'\\^'},
    {name:"LX_NOT", rx:'~'},
    {name:"LX_LSHIFT", rx:'<<'},
    {name:"LX_RSHIFT", rx:'>>'},

    // Comparison
    {name:"LX_EQ", rx:'=='},
    {name:"LX_NEQ", rx:'!='},
    {name:"LX_LE", rx:'<='},
    {name:"LX_GE", rx:'>='},
    {name:"LX_LT", rx:'<'},
    {name:"LX_GT", rx:'>'},

    // Logical not
    {name:"LX_LNOT", rx:'!'},

    // Assignment
    {name:"LX_ASSIGN", rx:'='},

    // Operators
    {name:"LX_INC", rx:'\\+\\+'},
    {name:"LX_DEC", rx:'--'},
    {name:"LX_POW", rx:'\\*\\*'},
    {name:"LX_PLUS", rx:'\\+'},
    {name:"LX_MINUS", rx:'-'},
    {name:"LX_MULT", rx:'\\*'},
    {name:"LX_DIV", rx:'/'},
    {name:"LX_MODULO", rx:'%'}
];

function lexer(stream) {
    var lexemes = []; // {name, val, line} list of lexemes
    var line = 0; // Current line

    while (stream) { // While there is something to parse
        var match = null; // Matched lexeme
        if ((match = stream.match(/^[ \t\v\f]+/))) { /* Do nothing  */ }  // Skip whitespace
        else if ((match = stream.match(/^[\r\n]+/))) { // Newline
            lexemes.push({name:"LX_NEWLINE", line:line}); // Add newline lexeme
            line += match[0].length; // Increment line
        }
        for (var i = 0; !match && i < lexeme_list.length; i++) { // For each lexeme in the list (in order) until one matches or we run out
            if ((match = stream.match(RegExp("^(" + lexeme_list[i].rx + ")")))) // If the lexeme matches the stream (from the start)
            lexemes.push({name:lexeme_list[i].name, val:match[0], line:line}); // Add the lexeme to the list of lexemes 
        }
        if (match) // If we matched a lexeme (and didn't run out of lexemes)
            stream = stream.substring(match[0].length); // Remove the lexeme from the stream (so we don't match it again)
        else if ((match = stream.match(/^\S+/))) { // If we didn't match a lexeme, but there is something there (not whitespace)
            console.error("Unknown lexeme: " + match[0]); // Error out (unknown lexeme) 
            stream = stream.substring(match[0].length); // Remove the lexeme from the stream (so we don't match it again)
        } else // If we didn't match a lexeme and there is nothing there (end of stream)
            break;
    }
    return (lexemes);
}

module.exports = lexer;
