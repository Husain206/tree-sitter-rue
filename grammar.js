/**
 * @file Rue grammar for tree-sitter
 * @author Husein
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const PREC = {
  postfix: 9,
  prefix: 8,
  multiply: 7,
  add: 6,
  shift: 4,
  bitwise: 3,
  compare: 2,
  logical: 1,
  assign: 0,
};

module.exports = grammar({
  name: "rue",

  extras: ($) => [
    /\s/,
    $.comment,
  ],

  conflicts: ($) => [
    [$.array, $.array_pattern],
    [$.expression, $.pattern],
    [$.return_statement],
    [$._statement, $.call_expression],
    [$.expression, $.array_pattern],
  ],

  word: ($) => $.identifier,

  rules: {
    source_file: ($) => repeat($._definition),

    comment: ($) =>
      token(choice(seq("//", /.*/), seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"))),

    // ---- Definitions ----
    _definition: ($) => choice($.fn_def, $.var_def),

    fn_def: ($) => seq(
      "fn",
      field("name", $.identifier),
      field("parameters", $.parameter_list),
      optional(seq(":", field("return_type", $._type))),
      field("body", $.block),
    ),

    var_def: ($) => seq(
      choice("set", "var"),
      field("name", $.pattern),
      optional(seq(":", $._type)),
      optional(seq("=", $.expression)),
    ),

    // ---- Parameters ----
    parameter_list: ($) => seq(
      "(",
      optional(seq($.parameter, repeat(seq(",", $.parameter)))),
      ")"
    ),

    parameter: ($) => seq(
      field("name", $.identifier),
      ":",
      field("type", $._type)
    ),

    // ---- Types ----
    _type: ($) => choice(
      "set",
      "int",
      "string",
      "bool",
      $.identifier,
      $.array_type
    ),

    array_type: ($) => seq("[", "]", $._type),

    // ---- Statements ----
    _statement: ($) => choice(
      $.var_def,
      $.return_statement,
      $.if_statement,
      $.for_statement,
      $.break_statement,
      $.continue_statement,
      $.block,
      $._expression_statement,
      ";",
    ),

    _expression_statement: ($) => $.expression,

    return_statement: ($) => seq("return", optional($.expression)),

    if_statement: ($) => seq(
      "if", $.expression, $.block,
      optional(seq("else", $.block))
    ),

    for_statement: ($) => seq(
      "for", $.identifier, "in", $.expression, $.block
    ),

    break_statement: ($) => "break",
    continue_statement: ($) => "continue",

    block: ($) => seq("{", repeat($._statement), "}"),

    // ---- Expressions ----
    expression: ($) => choice(
      $.identifier,
      $.number,
      $.string,
      $.unary_expression,
      $.binary_expression,
      $.postfix_expression,
      $.array,
      $.call_expression,
      $.field_expression,
      $.parenthesized_expression
    ),

    parenthesized_expression: ($) => seq("(", $.expression, ")"),

    call_expression: ($) => prec(PREC.postfix + 1, seq(
      field("function", $.expression),
      field("arguments", $.argument_list)
    )),

    argument_list: ($) => seq(
      "(",
      optional(seq($.expression, repeat(seq(",", $.expression)))),
      ")"
    ),

    field_expression: ($) => seq($.expression, ".", $.identifier),

    unary_expression: ($) => prec(PREC.prefix, seq(
      choice("-", "+", "++", "--", "!"),
      $.expression
    )),

    binary_expression: ($) => {
    /** @type [number, "left"|"right", RuleOrLiteral[]][] */

      const table = [
        [PREC.multiply, "left", ["*", "/", "%"]],
        [PREC.add, "left", ["+", "-"]],
        [PREC.shift, "left", ["<<", ">>"]],
        [PREC.bitwise, "left", ["|", "^"]],
        [PREC.compare, "left", ["==", "!=", "<", "<=", ">", ">="]],
        [PREC.logical, "left", ["&&", "||"]],
        [PREC.assign, "right", [":="]],
      ];
      const entry = ([p, assoc, ops]) => prec[assoc](p, seq($.expression, choice(...ops), $.expression));
      return choice(...table.map(entry));
    },

    postfix_expression: ($) => prec(PREC.postfix, seq($.expression, choice("++", "--"))),

    array: ($) => seq(
      "[",
      optional(seq($.expression, repeat(seq(",", $.expression)))),
      "]"
    ),

    array_pattern: ($) => prec.right(1, seq(
      "[",
      optional(seq($.pattern, repeat(seq(",", $.pattern)))),
      "]"
    )),

    pattern: ($) => choice(
      $.identifier,
      $.array_pattern
    ),

    // ---- Lexical ----
    identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,
    number: ($) => /\d+/,
    string: ($) => seq('"', repeat($.string_item), '"'),
    string_item: ($) => choice($.string_esc, /[^"\n\\]+/),
    string_esc: (_) => /\\[ntr"\\]/,
  }
});
