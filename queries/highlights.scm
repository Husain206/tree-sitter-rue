; Comments
(comment) @comment

; Keywords
[
  "fn"
  "return"
  "set"
  "for"
  "if"
  "else"
  "print"
  "break"
  "continue"
  "extern"
] @keyword

; ; Variables
(var_def name: (pattern) @variable)
(identifier) @variable


; Function definitions
(fn_def name: (identifier) @function)

; Parameters
(parameter (identifier) @variable.parameter)

; Function calls
(call_expression
  function: (expression (atom (identifier) @function.call)))

; Builtin type
((identifier) @type.builtin
  (#eq? @type.builtin "set"))

; Numbers
(number) @constant.numeric

; Strings
(string) @string
(string_esc) @constant.character.escape

; Punctuation
[ "{" "}" "(" ")" "[" "]" ] @punctuation.bracket
[ "," ";" ] @punctuation.delimiter

; Fields
(field_expression field: (identifier) @property)
