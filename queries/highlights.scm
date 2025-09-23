; Keywords
[
  "fn"
  "return"
  "let"
  "var"
  "set"
  "for"
  "if"
  "else"
  "break"
  "continue"
] @keyword

; Built-in types
(identifier) @type.builtin
  (#match? @type.builtin "^(int|string|bool|set)$")

; Numbers
(number) @number

; Strings
(string) @string
(string_item) @constant.character
(string_esc) @constant.character.escape

; Function definitions and calls
(fn_def name: (identifier) @function)
(call_expression function: (identifier) @function.call)

; Parameters
(parameter name: (identifier) @variable.parameter)

; Variables
(var_def name: (pattern) @variable)
(identifier) @variable

; Fields
(field_expression field: (identifier) @property)
