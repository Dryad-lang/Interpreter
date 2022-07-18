"""
Tokenize each line of the program.
use regex to match the tokens.

Note: The actual regex is not tested probable can not be accurate.

char = 'a' 
rule = single character between single quotes
regex = /'(.*?)'/g # length == 1 if lengh > 1, it will match only the first character
type = DATA_TYPE_CHAR

string = "this is a string"
rule = characters between quotes
regex = "((?:\\.|[^"\\])*)"
type = DATA_TYPE_STRING

number = "12345"
rule = numbers
regex = \d+((.|,)\d+)?
type = DATA_TYPE_INT


mathPlus = "1+2"
rule = match the plus operator 
regex = \+
type = MATHEMATIC_OPERATOR_PLUS

mathMinus = "1-2"
rule = match the minus operator
regex = \-
type = MATHEMATIC_OPERATOR_MINUS

mathMultiply = "1*2"
rule = match the multiply operator
regex = \*
type = MATHEMATIC_OPERATOR_MULTIPLY

mathDivide = "1/2"
rule = match the divide operator
regex = \/
type = MATHEMATIC_OPERATOR_DIVIDE

mathModulo = "1%2"
rule = match the modulo operator
regex = \%
type = MATHEMATIC_OPERATOR_MODULO

mathPower = "1^2"
rule = match the power operator
regex = \^
type = MATHEMATIC_OPERATOR_POWER

mathExponent = "1**2"
rule = match the exponent operator
regex = \*\*
type = MATHEMATIC_OPERATOR_EXPONENT

mathFactorial = "1!"
rule = match the factorial operator
regex = \!
type = MATHEMATIC_OPERATOR_FACTORIAL


identifier = int indentifier || function indentifier 
rule = get characters that not start with a number or special character
can only be a-zA-Z and _
regex = [a-zA-Z_][a-zA-Z0-9_]*
type = IDENTIFIER

hashComment = "# this is a comment"
rule = comment starting with # get the rest of the line
type = COMMENT

slashComment = "// this is a comment"
rule = comment starting with // get the rest of the line
regex = (r'//.*')
type = COMMENT

multiLineComment = "/* this is a comment */"
rule = comment starting with /* and ending with */ get lines between the comment opening and closing
regex = (r'\/\*(.|\n)*?\*\/')
type = COMMENT

"""