
["fn", "return", "set", "brint", "inbut", "for", "if", "ala", "else", "continue", "break"] @keyword

; Types
(type) @type
(identifier) @type.builtin (#match? @type.builtin "^(int|string|bool|set)$")

; Literals
(number) @number
(string) @string
(string_esc) @constant.character.escape

; Functions
(fn_def name: (identifier) @function)
(call_expression function: (identifier) @function.call)

; Variables
(parameter name: (identifier) @variable.parameter)
(var_def name: (identifier) @variable)
(identifier) @variable
