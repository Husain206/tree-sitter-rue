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
  "struct"
  "import"
] @keyword

; Variables
(var_def name: (pattern) @variable)
(identifier) @variable

; Strings
(string) @string
(string_esc) @constant.character.escape


; Function definitions
(fn_def name: (identifier) @function)

; struct definitions
(struct_def name: (identifier) @type)


; Parameters
(parameter (identifier) @variable.parameter)

; members
(members (identifier) @variable.member)

; Fields
(field_expression field: (identifier) @property)


; Function calls
(call_expression
  function: (expression (atom (identifier) @function.call)))

; struct literal
(struct_literal
  type: (identifier) @type)

; Builtin type
((identifier) @type.builtin
  (#eq? @type.builtin "set"))

; Numbers
(number) @constant.numeric

; Punctuation
[ "{" "}" "(" ")" "[" "]" ] @punctuation.bracket
[ "," ";" ] @punctuation.delimiter

