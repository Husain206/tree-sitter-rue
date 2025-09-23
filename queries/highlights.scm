; Keywords
[
  "fn"
  "return"
  "set"
  "var"
  "set"
  "for"
  "if"
  "else"
  (break_statement)
  (continue_statement)
] @keyword

; Built-in types
(identifier) @type.builtin
  (#match? @type.builtin "^(int|string|bool|set)$")

; Comments
(comment) @comment

; Numbers
(number) @constant.numeric

; Strings
(string) @string
(string_esc) @constant.character.escape

; Function definitions and calls
(fn_def name: (identifier) @function)
(call_expression function: (expression (identifier) @function.call))

; Parameters
(parameter name: (identifier) @variable.parameter)

; Variables
(var_def name: (pattern) @variable)
(identifier) @variable

; Punctuation
[ "{" "}" "(" ")" "[" "]" ] @punctuation.bracket
[ "," ":" ";" ] @punctuation.delimiter

; Fields
(field_expression field: (identifier) @property)

; TODO: functions, operators
