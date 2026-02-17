#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/error.js
var require_error = __commonJS({
  "../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/error.js"(exports2) {
    var CommanderError2 = class extends Error {
      /**
       * Constructs the CommanderError class
       * @param {number} exitCode suggested exit code which could be used with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       */
      constructor(exitCode, code, message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.code = code;
        this.exitCode = exitCode;
        this.nestedError = void 0;
      }
    };
    var InvalidArgumentError2 = class extends CommanderError2 {
      /**
       * Constructs the InvalidArgumentError class
       * @param {string} [message] explanation of why argument is invalid
       */
      constructor(message) {
        super(1, "commander.invalidArgument", message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
      }
    };
    exports2.CommanderError = CommanderError2;
    exports2.InvalidArgumentError = InvalidArgumentError2;
  }
});

// ../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/argument.js
var require_argument = __commonJS({
  "../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/argument.js"(exports2) {
    var { InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var Argument2 = class {
      /**
       * Initialize a new command argument with the given name and description.
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @param {string} name
       * @param {string} [description]
       */
      constructor(name, description) {
        this.description = description || "";
        this.variadic = false;
        this.parseArg = void 0;
        this.defaultValue = void 0;
        this.defaultValueDescription = void 0;
        this.argChoices = void 0;
        switch (name[0]) {
          case "<":
            this.required = true;
            this._name = name.slice(1, -1);
            break;
          case "[":
            this.required = false;
            this._name = name.slice(1, -1);
            break;
          default:
            this.required = true;
            this._name = name;
            break;
        }
        if (this._name.length > 3 && this._name.slice(-3) === "...") {
          this.variadic = true;
          this._name = this._name.slice(0, -3);
        }
      }
      /**
       * Return argument name.
       *
       * @return {string}
       */
      name() {
        return this._name;
      }
      /**
       * @package
       */
      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }
        return previous.concat(value);
      }
      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {*} value
       * @param {string} [description]
       * @return {Argument}
       */
      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      }
      /**
       * Set the custom handler for processing CLI command arguments into argument values.
       *
       * @param {Function} [fn]
       * @return {Argument}
       */
      argParser(fn) {
        this.parseArg = fn;
        return this;
      }
      /**
       * Only allow argument value to be one of choices.
       *
       * @param {string[]} values
       * @return {Argument}
       */
      choices(values) {
        this.argChoices = values.slice();
        this.parseArg = (arg, previous) => {
          if (!this.argChoices.includes(arg)) {
            throw new InvalidArgumentError2(
              `Allowed choices are ${this.argChoices.join(", ")}.`
            );
          }
          if (this.variadic) {
            return this._concatValue(arg, previous);
          }
          return arg;
        };
        return this;
      }
      /**
       * Make argument required.
       *
       * @returns {Argument}
       */
      argRequired() {
        this.required = true;
        return this;
      }
      /**
       * Make argument optional.
       *
       * @returns {Argument}
       */
      argOptional() {
        this.required = false;
        return this;
      }
    };
    function humanReadableArgName(arg) {
      const nameOutput = arg.name() + (arg.variadic === true ? "..." : "");
      return arg.required ? "<" + nameOutput + ">" : "[" + nameOutput + "]";
    }
    exports2.Argument = Argument2;
    exports2.humanReadableArgName = humanReadableArgName;
  }
});

// ../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/help.js
var require_help = __commonJS({
  "../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/help.js"(exports2) {
    var { humanReadableArgName } = require_argument();
    var Help2 = class {
      constructor() {
        this.helpWidth = void 0;
        this.sortSubcommands = false;
        this.sortOptions = false;
        this.showGlobalOptions = false;
      }
      /**
       * Get an array of the visible subcommands. Includes a placeholder for the implicit help command, if there is one.
       *
       * @param {Command} cmd
       * @returns {Command[]}
       */
      visibleCommands(cmd) {
        const visibleCommands = cmd.commands.filter((cmd2) => !cmd2._hidden);
        const helpCommand = cmd._getHelpCommand();
        if (helpCommand && !helpCommand._hidden) {
          visibleCommands.push(helpCommand);
        }
        if (this.sortSubcommands) {
          visibleCommands.sort((a, b) => {
            return a.name().localeCompare(b.name());
          });
        }
        return visibleCommands;
      }
      /**
       * Compare options for sort.
       *
       * @param {Option} a
       * @param {Option} b
       * @returns {number}
       */
      compareOptions(a, b) {
        const getSortKey = (option) => {
          return option.short ? option.short.replace(/^-/, "") : option.long.replace(/^--/, "");
        };
        return getSortKey(a).localeCompare(getSortKey(b));
      }
      /**
       * Get an array of the visible options. Includes a placeholder for the implicit help option, if there is one.
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */
      visibleOptions(cmd) {
        const visibleOptions = cmd.options.filter((option) => !option.hidden);
        const helpOption = cmd._getHelpOption();
        if (helpOption && !helpOption.hidden) {
          const removeShort = helpOption.short && cmd._findOption(helpOption.short);
          const removeLong = helpOption.long && cmd._findOption(helpOption.long);
          if (!removeShort && !removeLong) {
            visibleOptions.push(helpOption);
          } else if (helpOption.long && !removeLong) {
            visibleOptions.push(
              cmd.createOption(helpOption.long, helpOption.description)
            );
          } else if (helpOption.short && !removeShort) {
            visibleOptions.push(
              cmd.createOption(helpOption.short, helpOption.description)
            );
          }
        }
        if (this.sortOptions) {
          visibleOptions.sort(this.compareOptions);
        }
        return visibleOptions;
      }
      /**
       * Get an array of the visible global options. (Not including help.)
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */
      visibleGlobalOptions(cmd) {
        if (!this.showGlobalOptions) return [];
        const globalOptions = [];
        for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
          const visibleOptions = ancestorCmd.options.filter(
            (option) => !option.hidden
          );
          globalOptions.push(...visibleOptions);
        }
        if (this.sortOptions) {
          globalOptions.sort(this.compareOptions);
        }
        return globalOptions;
      }
      /**
       * Get an array of the arguments if any have a description.
       *
       * @param {Command} cmd
       * @returns {Argument[]}
       */
      visibleArguments(cmd) {
        if (cmd._argsDescription) {
          cmd.registeredArguments.forEach((argument) => {
            argument.description = argument.description || cmd._argsDescription[argument.name()] || "";
          });
        }
        if (cmd.registeredArguments.find((argument) => argument.description)) {
          return cmd.registeredArguments;
        }
        return [];
      }
      /**
       * Get the command term to show in the list of subcommands.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      subcommandTerm(cmd) {
        const args = cmd.registeredArguments.map((arg) => humanReadableArgName(arg)).join(" ");
        return cmd._name + (cmd._aliases[0] ? "|" + cmd._aliases[0] : "") + (cmd.options.length ? " [options]" : "") + // simplistic check for non-help option
        (args ? " " + args : "");
      }
      /**
       * Get the option term to show in the list of options.
       *
       * @param {Option} option
       * @returns {string}
       */
      optionTerm(option) {
        return option.flags;
      }
      /**
       * Get the argument term to show in the list of arguments.
       *
       * @param {Argument} argument
       * @returns {string}
       */
      argumentTerm(argument) {
        return argument.name();
      }
      /**
       * Get the longest command term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestSubcommandTermLength(cmd, helper) {
        return helper.visibleCommands(cmd).reduce((max, command) => {
          return Math.max(max, helper.subcommandTerm(command).length);
        }, 0);
      }
      /**
       * Get the longest option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestOptionTermLength(cmd, helper) {
        return helper.visibleOptions(cmd).reduce((max, option) => {
          return Math.max(max, helper.optionTerm(option).length);
        }, 0);
      }
      /**
       * Get the longest global option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestGlobalOptionTermLength(cmd, helper) {
        return helper.visibleGlobalOptions(cmd).reduce((max, option) => {
          return Math.max(max, helper.optionTerm(option).length);
        }, 0);
      }
      /**
       * Get the longest argument term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestArgumentTermLength(cmd, helper) {
        return helper.visibleArguments(cmd).reduce((max, argument) => {
          return Math.max(max, helper.argumentTerm(argument).length);
        }, 0);
      }
      /**
       * Get the command usage to be displayed at the top of the built-in help.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      commandUsage(cmd) {
        let cmdName = cmd._name;
        if (cmd._aliases[0]) {
          cmdName = cmdName + "|" + cmd._aliases[0];
        }
        let ancestorCmdNames = "";
        for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
          ancestorCmdNames = ancestorCmd.name() + " " + ancestorCmdNames;
        }
        return ancestorCmdNames + cmdName + " " + cmd.usage();
      }
      /**
       * Get the description for the command.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      commandDescription(cmd) {
        return cmd.description();
      }
      /**
       * Get the subcommand summary to show in the list of subcommands.
       * (Fallback to description for backwards compatibility.)
       *
       * @param {Command} cmd
       * @returns {string}
       */
      subcommandDescription(cmd) {
        return cmd.summary() || cmd.description();
      }
      /**
       * Get the option description to show in the list of options.
       *
       * @param {Option} option
       * @return {string}
       */
      optionDescription(option) {
        const extraInfo = [];
        if (option.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${option.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
          );
        }
        if (option.defaultValue !== void 0) {
          const showDefault = option.required || option.optional || option.isBoolean() && typeof option.defaultValue === "boolean";
          if (showDefault) {
            extraInfo.push(
              `default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`
            );
          }
        }
        if (option.presetArg !== void 0 && option.optional) {
          extraInfo.push(`preset: ${JSON.stringify(option.presetArg)}`);
        }
        if (option.envVar !== void 0) {
          extraInfo.push(`env: ${option.envVar}`);
        }
        if (extraInfo.length > 0) {
          return `${option.description} (${extraInfo.join(", ")})`;
        }
        return option.description;
      }
      /**
       * Get the argument description to show in the list of arguments.
       *
       * @param {Argument} argument
       * @return {string}
       */
      argumentDescription(argument) {
        const extraInfo = [];
        if (argument.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${argument.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
          );
        }
        if (argument.defaultValue !== void 0) {
          extraInfo.push(
            `default: ${argument.defaultValueDescription || JSON.stringify(argument.defaultValue)}`
          );
        }
        if (extraInfo.length > 0) {
          const extraDescripton = `(${extraInfo.join(", ")})`;
          if (argument.description) {
            return `${argument.description} ${extraDescripton}`;
          }
          return extraDescripton;
        }
        return argument.description;
      }
      /**
       * Generate the built-in help text.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {string}
       */
      formatHelp(cmd, helper) {
        const termWidth = helper.padWidth(cmd, helper);
        const helpWidth = helper.helpWidth || 80;
        const itemIndentWidth = 2;
        const itemSeparatorWidth = 2;
        function formatItem(term, description) {
          if (description) {
            const fullText = `${term.padEnd(termWidth + itemSeparatorWidth)}${description}`;
            return helper.wrap(
              fullText,
              helpWidth - itemIndentWidth,
              termWidth + itemSeparatorWidth
            );
          }
          return term;
        }
        function formatList(textArray) {
          return textArray.join("\n").replace(/^/gm, " ".repeat(itemIndentWidth));
        }
        let output = [`Usage: ${helper.commandUsage(cmd)}`, ""];
        const commandDescription = helper.commandDescription(cmd);
        if (commandDescription.length > 0) {
          output = output.concat([
            helper.wrap(commandDescription, helpWidth, 0),
            ""
          ]);
        }
        const argumentList = helper.visibleArguments(cmd).map((argument) => {
          return formatItem(
            helper.argumentTerm(argument),
            helper.argumentDescription(argument)
          );
        });
        if (argumentList.length > 0) {
          output = output.concat(["Arguments:", formatList(argumentList), ""]);
        }
        const optionList = helper.visibleOptions(cmd).map((option) => {
          return formatItem(
            helper.optionTerm(option),
            helper.optionDescription(option)
          );
        });
        if (optionList.length > 0) {
          output = output.concat(["Options:", formatList(optionList), ""]);
        }
        if (this.showGlobalOptions) {
          const globalOptionList = helper.visibleGlobalOptions(cmd).map((option) => {
            return formatItem(
              helper.optionTerm(option),
              helper.optionDescription(option)
            );
          });
          if (globalOptionList.length > 0) {
            output = output.concat([
              "Global Options:",
              formatList(globalOptionList),
              ""
            ]);
          }
        }
        const commandList = helper.visibleCommands(cmd).map((cmd2) => {
          return formatItem(
            helper.subcommandTerm(cmd2),
            helper.subcommandDescription(cmd2)
          );
        });
        if (commandList.length > 0) {
          output = output.concat(["Commands:", formatList(commandList), ""]);
        }
        return output.join("\n");
      }
      /**
       * Calculate the pad width from the maximum term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      padWidth(cmd, helper) {
        return Math.max(
          helper.longestOptionTermLength(cmd, helper),
          helper.longestGlobalOptionTermLength(cmd, helper),
          helper.longestSubcommandTermLength(cmd, helper),
          helper.longestArgumentTermLength(cmd, helper)
        );
      }
      /**
       * Wrap the given string to width characters per line, with lines after the first indented.
       * Do not wrap if insufficient room for wrapping (minColumnWidth), or string is manually formatted.
       *
       * @param {string} str
       * @param {number} width
       * @param {number} indent
       * @param {number} [minColumnWidth=40]
       * @return {string}
       *
       */
      wrap(str, width, indent, minColumnWidth = 40) {
        const indents = " \\f\\t\\v\xA0\u1680\u2000-\u200A\u202F\u205F\u3000\uFEFF";
        const manualIndent = new RegExp(`[\\n][${indents}]+`);
        if (str.match(manualIndent)) return str;
        const columnWidth = width - indent;
        if (columnWidth < minColumnWidth) return str;
        const leadingStr = str.slice(0, indent);
        const columnText = str.slice(indent).replace("\r\n", "\n");
        const indentString = " ".repeat(indent);
        const zeroWidthSpace = "\u200B";
        const breaks = `\\s${zeroWidthSpace}`;
        const regex = new RegExp(
          `
|.{1,${columnWidth - 1}}([${breaks}]|$)|[^${breaks}]+?([${breaks}]|$)`,
          "g"
        );
        const lines = columnText.match(regex) || [];
        return leadingStr + lines.map((line, i) => {
          if (line === "\n") return "";
          return (i > 0 ? indentString : "") + line.trimEnd();
        }).join("\n");
      }
    };
    exports2.Help = Help2;
  }
});

// ../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/option.js
var require_option = __commonJS({
  "../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/option.js"(exports2) {
    var { InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var Option2 = class {
      /**
       * Initialize a new `Option` with the given `flags` and `description`.
       *
       * @param {string} flags
       * @param {string} [description]
       */
      constructor(flags, description) {
        this.flags = flags;
        this.description = description || "";
        this.required = flags.includes("<");
        this.optional = flags.includes("[");
        this.variadic = /\w\.\.\.[>\]]$/.test(flags);
        this.mandatory = false;
        const optionFlags = splitOptionFlags(flags);
        this.short = optionFlags.shortFlag;
        this.long = optionFlags.longFlag;
        this.negate = false;
        if (this.long) {
          this.negate = this.long.startsWith("--no-");
        }
        this.defaultValue = void 0;
        this.defaultValueDescription = void 0;
        this.presetArg = void 0;
        this.envVar = void 0;
        this.parseArg = void 0;
        this.hidden = false;
        this.argChoices = void 0;
        this.conflictsWith = [];
        this.implied = void 0;
      }
      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {*} value
       * @param {string} [description]
       * @return {Option}
       */
      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      }
      /**
       * Preset to use when option used without option-argument, especially optional but also boolean and negated.
       * The custom processing (parseArg) is called.
       *
       * @example
       * new Option('--color').default('GREYSCALE').preset('RGB');
       * new Option('--donate [amount]').preset('20').argParser(parseFloat);
       *
       * @param {*} arg
       * @return {Option}
       */
      preset(arg) {
        this.presetArg = arg;
        return this;
      }
      /**
       * Add option name(s) that conflict with this option.
       * An error will be displayed if conflicting options are found during parsing.
       *
       * @example
       * new Option('--rgb').conflicts('cmyk');
       * new Option('--js').conflicts(['ts', 'jsx']);
       *
       * @param {(string | string[])} names
       * @return {Option}
       */
      conflicts(names) {
        this.conflictsWith = this.conflictsWith.concat(names);
        return this;
      }
      /**
       * Specify implied option values for when this option is set and the implied options are not.
       *
       * The custom processing (parseArg) is not called on the implied values.
       *
       * @example
       * program
       *   .addOption(new Option('--log', 'write logging information to file'))
       *   .addOption(new Option('--trace', 'log extra details').implies({ log: 'trace.txt' }));
       *
       * @param {object} impliedOptionValues
       * @return {Option}
       */
      implies(impliedOptionValues) {
        let newImplied = impliedOptionValues;
        if (typeof impliedOptionValues === "string") {
          newImplied = { [impliedOptionValues]: true };
        }
        this.implied = Object.assign(this.implied || {}, newImplied);
        return this;
      }
      /**
       * Set environment variable to check for option value.
       *
       * An environment variable is only used if when processed the current option value is
       * undefined, or the source of the current value is 'default' or 'config' or 'env'.
       *
       * @param {string} name
       * @return {Option}
       */
      env(name) {
        this.envVar = name;
        return this;
      }
      /**
       * Set the custom handler for processing CLI option arguments into option values.
       *
       * @param {Function} [fn]
       * @return {Option}
       */
      argParser(fn) {
        this.parseArg = fn;
        return this;
      }
      /**
       * Whether the option is mandatory and must have a value after parsing.
       *
       * @param {boolean} [mandatory=true]
       * @return {Option}
       */
      makeOptionMandatory(mandatory = true) {
        this.mandatory = !!mandatory;
        return this;
      }
      /**
       * Hide option in help.
       *
       * @param {boolean} [hide=true]
       * @return {Option}
       */
      hideHelp(hide = true) {
        this.hidden = !!hide;
        return this;
      }
      /**
       * @package
       */
      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }
        return previous.concat(value);
      }
      /**
       * Only allow option value to be one of choices.
       *
       * @param {string[]} values
       * @return {Option}
       */
      choices(values) {
        this.argChoices = values.slice();
        this.parseArg = (arg, previous) => {
          if (!this.argChoices.includes(arg)) {
            throw new InvalidArgumentError2(
              `Allowed choices are ${this.argChoices.join(", ")}.`
            );
          }
          if (this.variadic) {
            return this._concatValue(arg, previous);
          }
          return arg;
        };
        return this;
      }
      /**
       * Return option name.
       *
       * @return {string}
       */
      name() {
        if (this.long) {
          return this.long.replace(/^--/, "");
        }
        return this.short.replace(/^-/, "");
      }
      /**
       * Return option name, in a camelcase format that can be used
       * as a object attribute key.
       *
       * @return {string}
       */
      attributeName() {
        return camelcase(this.name().replace(/^no-/, ""));
      }
      /**
       * Check if `arg` matches the short or long flag.
       *
       * @param {string} arg
       * @return {boolean}
       * @package
       */
      is(arg) {
        return this.short === arg || this.long === arg;
      }
      /**
       * Return whether a boolean option.
       *
       * Options are one of boolean, negated, required argument, or optional argument.
       *
       * @return {boolean}
       * @package
       */
      isBoolean() {
        return !this.required && !this.optional && !this.negate;
      }
    };
    var DualOptions = class {
      /**
       * @param {Option[]} options
       */
      constructor(options) {
        this.positiveOptions = /* @__PURE__ */ new Map();
        this.negativeOptions = /* @__PURE__ */ new Map();
        this.dualOptions = /* @__PURE__ */ new Set();
        options.forEach((option) => {
          if (option.negate) {
            this.negativeOptions.set(option.attributeName(), option);
          } else {
            this.positiveOptions.set(option.attributeName(), option);
          }
        });
        this.negativeOptions.forEach((value, key) => {
          if (this.positiveOptions.has(key)) {
            this.dualOptions.add(key);
          }
        });
      }
      /**
       * Did the value come from the option, and not from possible matching dual option?
       *
       * @param {*} value
       * @param {Option} option
       * @returns {boolean}
       */
      valueFromOption(value, option) {
        const optionKey = option.attributeName();
        if (!this.dualOptions.has(optionKey)) return true;
        const preset = this.negativeOptions.get(optionKey).presetArg;
        const negativeValue = preset !== void 0 ? preset : false;
        return option.negate === (negativeValue === value);
      }
    };
    function camelcase(str) {
      return str.split("-").reduce((str2, word) => {
        return str2 + word[0].toUpperCase() + word.slice(1);
      });
    }
    function splitOptionFlags(flags) {
      let shortFlag;
      let longFlag;
      const flagParts = flags.split(/[ |,]+/);
      if (flagParts.length > 1 && !/^[[<]/.test(flagParts[1]))
        shortFlag = flagParts.shift();
      longFlag = flagParts.shift();
      if (!shortFlag && /^-[^-]$/.test(longFlag)) {
        shortFlag = longFlag;
        longFlag = void 0;
      }
      return { shortFlag, longFlag };
    }
    exports2.Option = Option2;
    exports2.DualOptions = DualOptions;
  }
});

// ../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/suggestSimilar.js
var require_suggestSimilar = __commonJS({
  "../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/suggestSimilar.js"(exports2) {
    var maxDistance = 3;
    function editDistance(a, b) {
      if (Math.abs(a.length - b.length) > maxDistance)
        return Math.max(a.length, b.length);
      const d = [];
      for (let i = 0; i <= a.length; i++) {
        d[i] = [i];
      }
      for (let j = 0; j <= b.length; j++) {
        d[0][j] = j;
      }
      for (let j = 1; j <= b.length; j++) {
        for (let i = 1; i <= a.length; i++) {
          let cost = 1;
          if (a[i - 1] === b[j - 1]) {
            cost = 0;
          } else {
            cost = 1;
          }
          d[i][j] = Math.min(
            d[i - 1][j] + 1,
            // deletion
            d[i][j - 1] + 1,
            // insertion
            d[i - 1][j - 1] + cost
            // substitution
          );
          if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
            d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
          }
        }
      }
      return d[a.length][b.length];
    }
    function suggestSimilar(word, candidates) {
      if (!candidates || candidates.length === 0) return "";
      candidates = Array.from(new Set(candidates));
      const searchingOptions = word.startsWith("--");
      if (searchingOptions) {
        word = word.slice(2);
        candidates = candidates.map((candidate) => candidate.slice(2));
      }
      let similar = [];
      let bestDistance = maxDistance;
      const minSimilarity = 0.4;
      candidates.forEach((candidate) => {
        if (candidate.length <= 1) return;
        const distance = editDistance(word, candidate);
        const length = Math.max(word.length, candidate.length);
        const similarity = (length - distance) / length;
        if (similarity > minSimilarity) {
          if (distance < bestDistance) {
            bestDistance = distance;
            similar = [candidate];
          } else if (distance === bestDistance) {
            similar.push(candidate);
          }
        }
      });
      similar.sort((a, b) => a.localeCompare(b));
      if (searchingOptions) {
        similar = similar.map((candidate) => `--${candidate}`);
      }
      if (similar.length > 1) {
        return `
(Did you mean one of ${similar.join(", ")}?)`;
      }
      if (similar.length === 1) {
        return `
(Did you mean ${similar[0]}?)`;
      }
      return "";
    }
    exports2.suggestSimilar = suggestSimilar;
  }
});

// ../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/command.js
var require_command = __commonJS({
  "../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/lib/command.js"(exports2) {
    var EventEmitter = require("node:events").EventEmitter;
    var childProcess = require("node:child_process");
    var path = require("node:path");
    var fs = require("node:fs");
    var process2 = require("node:process");
    var { Argument: Argument2, humanReadableArgName } = require_argument();
    var { CommanderError: CommanderError2 } = require_error();
    var { Help: Help2 } = require_help();
    var { Option: Option2, DualOptions } = require_option();
    var { suggestSimilar } = require_suggestSimilar();
    var Command2 = class _Command extends EventEmitter {
      /**
       * Initialize a new `Command`.
       *
       * @param {string} [name]
       */
      constructor(name) {
        super();
        this.commands = [];
        this.options = [];
        this.parent = null;
        this._allowUnknownOption = false;
        this._allowExcessArguments = true;
        this.registeredArguments = [];
        this._args = this.registeredArguments;
        this.args = [];
        this.rawArgs = [];
        this.processedArgs = [];
        this._scriptPath = null;
        this._name = name || "";
        this._optionValues = {};
        this._optionValueSources = {};
        this._storeOptionsAsProperties = false;
        this._actionHandler = null;
        this._executableHandler = false;
        this._executableFile = null;
        this._executableDir = null;
        this._defaultCommandName = null;
        this._exitCallback = null;
        this._aliases = [];
        this._combineFlagAndOptionalValue = true;
        this._description = "";
        this._summary = "";
        this._argsDescription = void 0;
        this._enablePositionalOptions = false;
        this._passThroughOptions = false;
        this._lifeCycleHooks = {};
        this._showHelpAfterError = false;
        this._showSuggestionAfterError = true;
        this._outputConfiguration = {
          writeOut: (str) => process2.stdout.write(str),
          writeErr: (str) => process2.stderr.write(str),
          getOutHelpWidth: () => process2.stdout.isTTY ? process2.stdout.columns : void 0,
          getErrHelpWidth: () => process2.stderr.isTTY ? process2.stderr.columns : void 0,
          outputError: (str, write) => write(str)
        };
        this._hidden = false;
        this._helpOption = void 0;
        this._addImplicitHelpCommand = void 0;
        this._helpCommand = void 0;
        this._helpConfiguration = {};
      }
      /**
       * Copy settings that are useful to have in common across root command and subcommands.
       *
       * (Used internally when adding a command using `.command()` so subcommands inherit parent settings.)
       *
       * @param {Command} sourceCommand
       * @return {Command} `this` command for chaining
       */
      copyInheritedSettings(sourceCommand) {
        this._outputConfiguration = sourceCommand._outputConfiguration;
        this._helpOption = sourceCommand._helpOption;
        this._helpCommand = sourceCommand._helpCommand;
        this._helpConfiguration = sourceCommand._helpConfiguration;
        this._exitCallback = sourceCommand._exitCallback;
        this._storeOptionsAsProperties = sourceCommand._storeOptionsAsProperties;
        this._combineFlagAndOptionalValue = sourceCommand._combineFlagAndOptionalValue;
        this._allowExcessArguments = sourceCommand._allowExcessArguments;
        this._enablePositionalOptions = sourceCommand._enablePositionalOptions;
        this._showHelpAfterError = sourceCommand._showHelpAfterError;
        this._showSuggestionAfterError = sourceCommand._showSuggestionAfterError;
        return this;
      }
      /**
       * @returns {Command[]}
       * @private
       */
      _getCommandAndAncestors() {
        const result = [];
        for (let command = this; command; command = command.parent) {
          result.push(command);
        }
        return result;
      }
      /**
       * Define a command.
       *
       * There are two styles of command: pay attention to where to put the description.
       *
       * @example
       * // Command implemented using action handler (description is supplied separately to `.command`)
       * program
       *   .command('clone <source> [destination]')
       *   .description('clone a repository into a newly created directory')
       *   .action((source, destination) => {
       *     console.log('clone command called');
       *   });
       *
       * // Command implemented using separate executable file (description is second parameter to `.command`)
       * program
       *   .command('start <service>', 'start named service')
       *   .command('stop [service]', 'stop named service, or all if no name supplied');
       *
       * @param {string} nameAndArgs - command name and arguments, args are `<required>` or `[optional]` and last may also be `variadic...`
       * @param {(object | string)} [actionOptsOrExecDesc] - configuration options (for action), or description (for executable)
       * @param {object} [execOpts] - configuration options (for executable)
       * @return {Command} returns new command for action handler, or `this` for executable command
       */
      command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
        let desc = actionOptsOrExecDesc;
        let opts = execOpts;
        if (typeof desc === "object" && desc !== null) {
          opts = desc;
          desc = null;
        }
        opts = opts || {};
        const [, name, args] = nameAndArgs.match(/([^ ]+) *(.*)/);
        const cmd = this.createCommand(name);
        if (desc) {
          cmd.description(desc);
          cmd._executableHandler = true;
        }
        if (opts.isDefault) this._defaultCommandName = cmd._name;
        cmd._hidden = !!(opts.noHelp || opts.hidden);
        cmd._executableFile = opts.executableFile || null;
        if (args) cmd.arguments(args);
        this._registerCommand(cmd);
        cmd.parent = this;
        cmd.copyInheritedSettings(this);
        if (desc) return this;
        return cmd;
      }
      /**
       * Factory routine to create a new unattached command.
       *
       * See .command() for creating an attached subcommand, which uses this routine to
       * create the command. You can override createCommand to customise subcommands.
       *
       * @param {string} [name]
       * @return {Command} new command
       */
      createCommand(name) {
        return new _Command(name);
      }
      /**
       * You can customise the help with a subclass of Help by overriding createHelp,
       * or by overriding Help properties using configureHelp().
       *
       * @return {Help}
       */
      createHelp() {
        return Object.assign(new Help2(), this.configureHelp());
      }
      /**
       * You can customise the help by overriding Help properties using configureHelp(),
       * or with a subclass of Help by overriding createHelp().
       *
       * @param {object} [configuration] - configuration options
       * @return {(Command | object)} `this` command for chaining, or stored configuration
       */
      configureHelp(configuration) {
        if (configuration === void 0) return this._helpConfiguration;
        this._helpConfiguration = configuration;
        return this;
      }
      /**
       * The default output goes to stdout and stderr. You can customise this for special
       * applications. You can also customise the display of errors by overriding outputError.
       *
       * The configuration properties are all functions:
       *
       *     // functions to change where being written, stdout and stderr
       *     writeOut(str)
       *     writeErr(str)
       *     // matching functions to specify width for wrapping help
       *     getOutHelpWidth()
       *     getErrHelpWidth()
       *     // functions based on what is being written out
       *     outputError(str, write) // used for displaying errors, and not used for displaying help
       *
       * @param {object} [configuration] - configuration options
       * @return {(Command | object)} `this` command for chaining, or stored configuration
       */
      configureOutput(configuration) {
        if (configuration === void 0) return this._outputConfiguration;
        Object.assign(this._outputConfiguration, configuration);
        return this;
      }
      /**
       * Display the help or a custom message after an error occurs.
       *
       * @param {(boolean|string)} [displayHelp]
       * @return {Command} `this` command for chaining
       */
      showHelpAfterError(displayHelp = true) {
        if (typeof displayHelp !== "string") displayHelp = !!displayHelp;
        this._showHelpAfterError = displayHelp;
        return this;
      }
      /**
       * Display suggestion of similar commands for unknown commands, or options for unknown options.
       *
       * @param {boolean} [displaySuggestion]
       * @return {Command} `this` command for chaining
       */
      showSuggestionAfterError(displaySuggestion = true) {
        this._showSuggestionAfterError = !!displaySuggestion;
        return this;
      }
      /**
       * Add a prepared subcommand.
       *
       * See .command() for creating an attached subcommand which inherits settings from its parent.
       *
       * @param {Command} cmd - new subcommand
       * @param {object} [opts] - configuration options
       * @return {Command} `this` command for chaining
       */
      addCommand(cmd, opts) {
        if (!cmd._name) {
          throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);
        }
        opts = opts || {};
        if (opts.isDefault) this._defaultCommandName = cmd._name;
        if (opts.noHelp || opts.hidden) cmd._hidden = true;
        this._registerCommand(cmd);
        cmd.parent = this;
        cmd._checkForBrokenPassThrough();
        return this;
      }
      /**
       * Factory routine to create a new unattached argument.
       *
       * See .argument() for creating an attached argument, which uses this routine to
       * create the argument. You can override createArgument to return a custom argument.
       *
       * @param {string} name
       * @param {string} [description]
       * @return {Argument} new argument
       */
      createArgument(name, description) {
        return new Argument2(name, description);
      }
      /**
       * Define argument syntax for command.
       *
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @example
       * program.argument('<input-file>');
       * program.argument('[output-file]');
       *
       * @param {string} name
       * @param {string} [description]
       * @param {(Function|*)} [fn] - custom argument processing function
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      argument(name, description, fn, defaultValue) {
        const argument = this.createArgument(name, description);
        if (typeof fn === "function") {
          argument.default(defaultValue).argParser(fn);
        } else {
          argument.default(fn);
        }
        this.addArgument(argument);
        return this;
      }
      /**
       * Define argument syntax for command, adding multiple at once (without descriptions).
       *
       * See also .argument().
       *
       * @example
       * program.arguments('<cmd> [env]');
       *
       * @param {string} names
       * @return {Command} `this` command for chaining
       */
      arguments(names) {
        names.trim().split(/ +/).forEach((detail) => {
          this.argument(detail);
        });
        return this;
      }
      /**
       * Define argument syntax for command, adding a prepared argument.
       *
       * @param {Argument} argument
       * @return {Command} `this` command for chaining
       */
      addArgument(argument) {
        const previousArgument = this.registeredArguments.slice(-1)[0];
        if (previousArgument && previousArgument.variadic) {
          throw new Error(
            `only the last argument can be variadic '${previousArgument.name()}'`
          );
        }
        if (argument.required && argument.defaultValue !== void 0 && argument.parseArg === void 0) {
          throw new Error(
            `a default value for a required argument is never used: '${argument.name()}'`
          );
        }
        this.registeredArguments.push(argument);
        return this;
      }
      /**
       * Customise or override default help command. By default a help command is automatically added if your command has subcommands.
       *
       * @example
       *    program.helpCommand('help [cmd]');
       *    program.helpCommand('help [cmd]', 'show help');
       *    program.helpCommand(false); // suppress default help command
       *    program.helpCommand(true); // add help command even if no subcommands
       *
       * @param {string|boolean} enableOrNameAndArgs - enable with custom name and/or arguments, or boolean to override whether added
       * @param {string} [description] - custom description
       * @return {Command} `this` command for chaining
       */
      helpCommand(enableOrNameAndArgs, description) {
        if (typeof enableOrNameAndArgs === "boolean") {
          this._addImplicitHelpCommand = enableOrNameAndArgs;
          return this;
        }
        enableOrNameAndArgs = enableOrNameAndArgs ?? "help [command]";
        const [, helpName, helpArgs] = enableOrNameAndArgs.match(/([^ ]+) *(.*)/);
        const helpDescription = description ?? "display help for command";
        const helpCommand = this.createCommand(helpName);
        helpCommand.helpOption(false);
        if (helpArgs) helpCommand.arguments(helpArgs);
        if (helpDescription) helpCommand.description(helpDescription);
        this._addImplicitHelpCommand = true;
        this._helpCommand = helpCommand;
        return this;
      }
      /**
       * Add prepared custom help command.
       *
       * @param {(Command|string|boolean)} helpCommand - custom help command, or deprecated enableOrNameAndArgs as for `.helpCommand()`
       * @param {string} [deprecatedDescription] - deprecated custom description used with custom name only
       * @return {Command} `this` command for chaining
       */
      addHelpCommand(helpCommand, deprecatedDescription) {
        if (typeof helpCommand !== "object") {
          this.helpCommand(helpCommand, deprecatedDescription);
          return this;
        }
        this._addImplicitHelpCommand = true;
        this._helpCommand = helpCommand;
        return this;
      }
      /**
       * Lazy create help command.
       *
       * @return {(Command|null)}
       * @package
       */
      _getHelpCommand() {
        const hasImplicitHelpCommand = this._addImplicitHelpCommand ?? (this.commands.length && !this._actionHandler && !this._findCommand("help"));
        if (hasImplicitHelpCommand) {
          if (this._helpCommand === void 0) {
            this.helpCommand(void 0, void 0);
          }
          return this._helpCommand;
        }
        return null;
      }
      /**
       * Add hook for life cycle event.
       *
       * @param {string} event
       * @param {Function} listener
       * @return {Command} `this` command for chaining
       */
      hook(event, listener) {
        const allowedValues = ["preSubcommand", "preAction", "postAction"];
        if (!allowedValues.includes(event)) {
          throw new Error(`Unexpected value for event passed to hook : '${event}'.
Expecting one of '${allowedValues.join("', '")}'`);
        }
        if (this._lifeCycleHooks[event]) {
          this._lifeCycleHooks[event].push(listener);
        } else {
          this._lifeCycleHooks[event] = [listener];
        }
        return this;
      }
      /**
       * Register callback to use as replacement for calling process.exit.
       *
       * @param {Function} [fn] optional callback which will be passed a CommanderError, defaults to throwing
       * @return {Command} `this` command for chaining
       */
      exitOverride(fn) {
        if (fn) {
          this._exitCallback = fn;
        } else {
          this._exitCallback = (err) => {
            if (err.code !== "commander.executeSubCommandAsync") {
              throw err;
            } else {
            }
          };
        }
        return this;
      }
      /**
       * Call process.exit, and _exitCallback if defined.
       *
       * @param {number} exitCode exit code for using with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       * @return never
       * @private
       */
      _exit(exitCode, code, message) {
        if (this._exitCallback) {
          this._exitCallback(new CommanderError2(exitCode, code, message));
        }
        process2.exit(exitCode);
      }
      /**
       * Register callback `fn` for the command.
       *
       * @example
       * program
       *   .command('serve')
       *   .description('start service')
       *   .action(function() {
       *      // do work here
       *   });
       *
       * @param {Function} fn
       * @return {Command} `this` command for chaining
       */
      action(fn) {
        const listener = (args) => {
          const expectedArgsCount = this.registeredArguments.length;
          const actionArgs = args.slice(0, expectedArgsCount);
          if (this._storeOptionsAsProperties) {
            actionArgs[expectedArgsCount] = this;
          } else {
            actionArgs[expectedArgsCount] = this.opts();
          }
          actionArgs.push(this);
          return fn.apply(this, actionArgs);
        };
        this._actionHandler = listener;
        return this;
      }
      /**
       * Factory routine to create a new unattached option.
       *
       * See .option() for creating an attached option, which uses this routine to
       * create the option. You can override createOption to return a custom option.
       *
       * @param {string} flags
       * @param {string} [description]
       * @return {Option} new option
       */
      createOption(flags, description) {
        return new Option2(flags, description);
      }
      /**
       * Wrap parseArgs to catch 'commander.invalidArgument'.
       *
       * @param {(Option | Argument)} target
       * @param {string} value
       * @param {*} previous
       * @param {string} invalidArgumentMessage
       * @private
       */
      _callParseArg(target, value, previous, invalidArgumentMessage) {
        try {
          return target.parseArg(value, previous);
        } catch (err) {
          if (err.code === "commander.invalidArgument") {
            const message = `${invalidArgumentMessage} ${err.message}`;
            this.error(message, { exitCode: err.exitCode, code: err.code });
          }
          throw err;
        }
      }
      /**
       * Check for option flag conflicts.
       * Register option if no conflicts found, or throw on conflict.
       *
       * @param {Option} option
       * @private
       */
      _registerOption(option) {
        const matchingOption = option.short && this._findOption(option.short) || option.long && this._findOption(option.long);
        if (matchingOption) {
          const matchingFlag = option.long && this._findOption(option.long) ? option.long : option.short;
          throw new Error(`Cannot add option '${option.flags}'${this._name && ` to command '${this._name}'`} due to conflicting flag '${matchingFlag}'
-  already used by option '${matchingOption.flags}'`);
        }
        this.options.push(option);
      }
      /**
       * Check for command name and alias conflicts with existing commands.
       * Register command if no conflicts found, or throw on conflict.
       *
       * @param {Command} command
       * @private
       */
      _registerCommand(command) {
        const knownBy = (cmd) => {
          return [cmd.name()].concat(cmd.aliases());
        };
        const alreadyUsed = knownBy(command).find(
          (name) => this._findCommand(name)
        );
        if (alreadyUsed) {
          const existingCmd = knownBy(this._findCommand(alreadyUsed)).join("|");
          const newCmd = knownBy(command).join("|");
          throw new Error(
            `cannot add command '${newCmd}' as already have command '${existingCmd}'`
          );
        }
        this.commands.push(command);
      }
      /**
       * Add an option.
       *
       * @param {Option} option
       * @return {Command} `this` command for chaining
       */
      addOption(option) {
        this._registerOption(option);
        const oname = option.name();
        const name = option.attributeName();
        if (option.negate) {
          const positiveLongFlag = option.long.replace(/^--no-/, "--");
          if (!this._findOption(positiveLongFlag)) {
            this.setOptionValueWithSource(
              name,
              option.defaultValue === void 0 ? true : option.defaultValue,
              "default"
            );
          }
        } else if (option.defaultValue !== void 0) {
          this.setOptionValueWithSource(name, option.defaultValue, "default");
        }
        const handleOptionValue = (val, invalidValueMessage, valueSource) => {
          if (val == null && option.presetArg !== void 0) {
            val = option.presetArg;
          }
          const oldValue = this.getOptionValue(name);
          if (val !== null && option.parseArg) {
            val = this._callParseArg(option, val, oldValue, invalidValueMessage);
          } else if (val !== null && option.variadic) {
            val = option._concatValue(val, oldValue);
          }
          if (val == null) {
            if (option.negate) {
              val = false;
            } else if (option.isBoolean() || option.optional) {
              val = true;
            } else {
              val = "";
            }
          }
          this.setOptionValueWithSource(name, val, valueSource);
        };
        this.on("option:" + oname, (val) => {
          const invalidValueMessage = `error: option '${option.flags}' argument '${val}' is invalid.`;
          handleOptionValue(val, invalidValueMessage, "cli");
        });
        if (option.envVar) {
          this.on("optionEnv:" + oname, (val) => {
            const invalidValueMessage = `error: option '${option.flags}' value '${val}' from env '${option.envVar}' is invalid.`;
            handleOptionValue(val, invalidValueMessage, "env");
          });
        }
        return this;
      }
      /**
       * Internal implementation shared by .option() and .requiredOption()
       *
       * @return {Command} `this` command for chaining
       * @private
       */
      _optionEx(config, flags, description, fn, defaultValue) {
        if (typeof flags === "object" && flags instanceof Option2) {
          throw new Error(
            "To add an Option object use addOption() instead of option() or requiredOption()"
          );
        }
        const option = this.createOption(flags, description);
        option.makeOptionMandatory(!!config.mandatory);
        if (typeof fn === "function") {
          option.default(defaultValue).argParser(fn);
        } else if (fn instanceof RegExp) {
          const regex = fn;
          fn = (val, def) => {
            const m = regex.exec(val);
            return m ? m[0] : def;
          };
          option.default(defaultValue).argParser(fn);
        } else {
          option.default(fn);
        }
        return this.addOption(option);
      }
      /**
       * Define option with `flags`, `description`, and optional argument parsing function or `defaultValue` or both.
       *
       * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space. A required
       * option-argument is indicated by `<>` and an optional option-argument by `[]`.
       *
       * See the README for more details, and see also addOption() and requiredOption().
       *
       * @example
       * program
       *     .option('-p, --pepper', 'add pepper')
       *     .option('-p, --pizza-type <TYPE>', 'type of pizza') // required option-argument
       *     .option('-c, --cheese [CHEESE]', 'add extra cheese', 'mozzarella') // optional option-argument with default
       *     .option('-t, --tip <VALUE>', 'add tip to purchase cost', parseFloat) // custom parse function
       *
       * @param {string} flags
       * @param {string} [description]
       * @param {(Function|*)} [parseArg] - custom option processing function or default value
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      option(flags, description, parseArg, defaultValue) {
        return this._optionEx({}, flags, description, parseArg, defaultValue);
      }
      /**
       * Add a required option which must have a value after parsing. This usually means
       * the option must be specified on the command line. (Otherwise the same as .option().)
       *
       * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space.
       *
       * @param {string} flags
       * @param {string} [description]
       * @param {(Function|*)} [parseArg] - custom option processing function or default value
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      requiredOption(flags, description, parseArg, defaultValue) {
        return this._optionEx(
          { mandatory: true },
          flags,
          description,
          parseArg,
          defaultValue
        );
      }
      /**
       * Alter parsing of short flags with optional values.
       *
       * @example
       * // for `.option('-f,--flag [value]'):
       * program.combineFlagAndOptionalValue(true);  // `-f80` is treated like `--flag=80`, this is the default behaviour
       * program.combineFlagAndOptionalValue(false) // `-fb` is treated like `-f -b`
       *
       * @param {boolean} [combine] - if `true` or omitted, an optional value can be specified directly after the flag.
       * @return {Command} `this` command for chaining
       */
      combineFlagAndOptionalValue(combine = true) {
        this._combineFlagAndOptionalValue = !!combine;
        return this;
      }
      /**
       * Allow unknown options on the command line.
       *
       * @param {boolean} [allowUnknown] - if `true` or omitted, no error will be thrown for unknown options.
       * @return {Command} `this` command for chaining
       */
      allowUnknownOption(allowUnknown = true) {
        this._allowUnknownOption = !!allowUnknown;
        return this;
      }
      /**
       * Allow excess command-arguments on the command line. Pass false to make excess arguments an error.
       *
       * @param {boolean} [allowExcess] - if `true` or omitted, no error will be thrown for excess arguments.
       * @return {Command} `this` command for chaining
       */
      allowExcessArguments(allowExcess = true) {
        this._allowExcessArguments = !!allowExcess;
        return this;
      }
      /**
       * Enable positional options. Positional means global options are specified before subcommands which lets
       * subcommands reuse the same option names, and also enables subcommands to turn on passThroughOptions.
       * The default behaviour is non-positional and global options may appear anywhere on the command line.
       *
       * @param {boolean} [positional]
       * @return {Command} `this` command for chaining
       */
      enablePositionalOptions(positional = true) {
        this._enablePositionalOptions = !!positional;
        return this;
      }
      /**
       * Pass through options that come after command-arguments rather than treat them as command-options,
       * so actual command-options come before command-arguments. Turning this on for a subcommand requires
       * positional options to have been enabled on the program (parent commands).
       * The default behaviour is non-positional and options may appear before or after command-arguments.
       *
       * @param {boolean} [passThrough] for unknown options.
       * @return {Command} `this` command for chaining
       */
      passThroughOptions(passThrough = true) {
        this._passThroughOptions = !!passThrough;
        this._checkForBrokenPassThrough();
        return this;
      }
      /**
       * @private
       */
      _checkForBrokenPassThrough() {
        if (this.parent && this._passThroughOptions && !this.parent._enablePositionalOptions) {
          throw new Error(
            `passThroughOptions cannot be used for '${this._name}' without turning on enablePositionalOptions for parent command(s)`
          );
        }
      }
      /**
       * Whether to store option values as properties on command object,
       * or store separately (specify false). In both cases the option values can be accessed using .opts().
       *
       * @param {boolean} [storeAsProperties=true]
       * @return {Command} `this` command for chaining
       */
      storeOptionsAsProperties(storeAsProperties = true) {
        if (this.options.length) {
          throw new Error("call .storeOptionsAsProperties() before adding options");
        }
        if (Object.keys(this._optionValues).length) {
          throw new Error(
            "call .storeOptionsAsProperties() before setting option values"
          );
        }
        this._storeOptionsAsProperties = !!storeAsProperties;
        return this;
      }
      /**
       * Retrieve option value.
       *
       * @param {string} key
       * @return {object} value
       */
      getOptionValue(key) {
        if (this._storeOptionsAsProperties) {
          return this[key];
        }
        return this._optionValues[key];
      }
      /**
       * Store option value.
       *
       * @param {string} key
       * @param {object} value
       * @return {Command} `this` command for chaining
       */
      setOptionValue(key, value) {
        return this.setOptionValueWithSource(key, value, void 0);
      }
      /**
       * Store option value and where the value came from.
       *
       * @param {string} key
       * @param {object} value
       * @param {string} source - expected values are default/config/env/cli/implied
       * @return {Command} `this` command for chaining
       */
      setOptionValueWithSource(key, value, source) {
        if (this._storeOptionsAsProperties) {
          this[key] = value;
        } else {
          this._optionValues[key] = value;
        }
        this._optionValueSources[key] = source;
        return this;
      }
      /**
       * Get source of option value.
       * Expected values are default | config | env | cli | implied
       *
       * @param {string} key
       * @return {string}
       */
      getOptionValueSource(key) {
        return this._optionValueSources[key];
      }
      /**
       * Get source of option value. See also .optsWithGlobals().
       * Expected values are default | config | env | cli | implied
       *
       * @param {string} key
       * @return {string}
       */
      getOptionValueSourceWithGlobals(key) {
        let source;
        this._getCommandAndAncestors().forEach((cmd) => {
          if (cmd.getOptionValueSource(key) !== void 0) {
            source = cmd.getOptionValueSource(key);
          }
        });
        return source;
      }
      /**
       * Get user arguments from implied or explicit arguments.
       * Side-effects: set _scriptPath if args included script. Used for default program name, and subcommand searches.
       *
       * @private
       */
      _prepareUserArgs(argv, parseOptions) {
        if (argv !== void 0 && !Array.isArray(argv)) {
          throw new Error("first parameter to parse must be array or undefined");
        }
        parseOptions = parseOptions || {};
        if (argv === void 0 && parseOptions.from === void 0) {
          if (process2.versions?.electron) {
            parseOptions.from = "electron";
          }
          const execArgv = process2.execArgv ?? [];
          if (execArgv.includes("-e") || execArgv.includes("--eval") || execArgv.includes("-p") || execArgv.includes("--print")) {
            parseOptions.from = "eval";
          }
        }
        if (argv === void 0) {
          argv = process2.argv;
        }
        this.rawArgs = argv.slice();
        let userArgs;
        switch (parseOptions.from) {
          case void 0:
          case "node":
            this._scriptPath = argv[1];
            userArgs = argv.slice(2);
            break;
          case "electron":
            if (process2.defaultApp) {
              this._scriptPath = argv[1];
              userArgs = argv.slice(2);
            } else {
              userArgs = argv.slice(1);
            }
            break;
          case "user":
            userArgs = argv.slice(0);
            break;
          case "eval":
            userArgs = argv.slice(1);
            break;
          default:
            throw new Error(
              `unexpected parse option { from: '${parseOptions.from}' }`
            );
        }
        if (!this._name && this._scriptPath)
          this.nameFromFilename(this._scriptPath);
        this._name = this._name || "program";
        return userArgs;
      }
      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * Use parseAsync instead of parse if any of your action handlers are async.
       *
       * Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
       *
       * Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
       * - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
       * - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
       * - `'user'`: just user arguments
       *
       * @example
       * program.parse(); // parse process.argv and auto-detect electron and special node flags
       * program.parse(process.argv); // assume argv[0] is app and argv[1] is script
       * program.parse(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv] - optional, defaults to process.argv
       * @param {object} [parseOptions] - optionally specify style of options with from: node/user/electron
       * @param {string} [parseOptions.from] - where the args are from: 'node', 'user', 'electron'
       * @return {Command} `this` command for chaining
       */
      parse(argv, parseOptions) {
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        this._parseCommand([], userArgs);
        return this;
      }
      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
       *
       * Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
       * - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
       * - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
       * - `'user'`: just user arguments
       *
       * @example
       * await program.parseAsync(); // parse process.argv and auto-detect electron and special node flags
       * await program.parseAsync(process.argv); // assume argv[0] is app and argv[1] is script
       * await program.parseAsync(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv]
       * @param {object} [parseOptions]
       * @param {string} parseOptions.from - where the args are from: 'node', 'user', 'electron'
       * @return {Promise}
       */
      async parseAsync(argv, parseOptions) {
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        await this._parseCommand([], userArgs);
        return this;
      }
      /**
       * Execute a sub-command executable.
       *
       * @private
       */
      _executeSubCommand(subcommand, args) {
        args = args.slice();
        let launchWithNode = false;
        const sourceExt = [".js", ".ts", ".tsx", ".mjs", ".cjs"];
        function findFile(baseDir, baseName) {
          const localBin = path.resolve(baseDir, baseName);
          if (fs.existsSync(localBin)) return localBin;
          if (sourceExt.includes(path.extname(baseName))) return void 0;
          const foundExt = sourceExt.find(
            (ext) => fs.existsSync(`${localBin}${ext}`)
          );
          if (foundExt) return `${localBin}${foundExt}`;
          return void 0;
        }
        this._checkForMissingMandatoryOptions();
        this._checkForConflictingOptions();
        let executableFile = subcommand._executableFile || `${this._name}-${subcommand._name}`;
        let executableDir = this._executableDir || "";
        if (this._scriptPath) {
          let resolvedScriptPath;
          try {
            resolvedScriptPath = fs.realpathSync(this._scriptPath);
          } catch (err) {
            resolvedScriptPath = this._scriptPath;
          }
          executableDir = path.resolve(
            path.dirname(resolvedScriptPath),
            executableDir
          );
        }
        if (executableDir) {
          let localFile = findFile(executableDir, executableFile);
          if (!localFile && !subcommand._executableFile && this._scriptPath) {
            const legacyName = path.basename(
              this._scriptPath,
              path.extname(this._scriptPath)
            );
            if (legacyName !== this._name) {
              localFile = findFile(
                executableDir,
                `${legacyName}-${subcommand._name}`
              );
            }
          }
          executableFile = localFile || executableFile;
        }
        launchWithNode = sourceExt.includes(path.extname(executableFile));
        let proc;
        if (process2.platform !== "win32") {
          if (launchWithNode) {
            args.unshift(executableFile);
            args = incrementNodeInspectorPort(process2.execArgv).concat(args);
            proc = childProcess.spawn(process2.argv[0], args, { stdio: "inherit" });
          } else {
            proc = childProcess.spawn(executableFile, args, { stdio: "inherit" });
          }
        } else {
          args.unshift(executableFile);
          args = incrementNodeInspectorPort(process2.execArgv).concat(args);
          proc = childProcess.spawn(process2.execPath, args, { stdio: "inherit" });
        }
        if (!proc.killed) {
          const signals = ["SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP"];
          signals.forEach((signal) => {
            process2.on(signal, () => {
              if (proc.killed === false && proc.exitCode === null) {
                proc.kill(signal);
              }
            });
          });
        }
        const exitCallback = this._exitCallback;
        proc.on("close", (code) => {
          code = code ?? 1;
          if (!exitCallback) {
            process2.exit(code);
          } else {
            exitCallback(
              new CommanderError2(
                code,
                "commander.executeSubCommandAsync",
                "(close)"
              )
            );
          }
        });
        proc.on("error", (err) => {
          if (err.code === "ENOENT") {
            const executableDirMessage = executableDir ? `searched for local subcommand relative to directory '${executableDir}'` : "no directory for search for local subcommand, use .executableDir() to supply a custom directory";
            const executableMissing = `'${executableFile}' does not exist
 - if '${subcommand._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${executableDirMessage}`;
            throw new Error(executableMissing);
          } else if (err.code === "EACCES") {
            throw new Error(`'${executableFile}' not executable`);
          }
          if (!exitCallback) {
            process2.exit(1);
          } else {
            const wrappedError = new CommanderError2(
              1,
              "commander.executeSubCommandAsync",
              "(error)"
            );
            wrappedError.nestedError = err;
            exitCallback(wrappedError);
          }
        });
        this.runningCommand = proc;
      }
      /**
       * @private
       */
      _dispatchSubcommand(commandName, operands, unknown) {
        const subCommand = this._findCommand(commandName);
        if (!subCommand) this.help({ error: true });
        let promiseChain;
        promiseChain = this._chainOrCallSubCommandHook(
          promiseChain,
          subCommand,
          "preSubcommand"
        );
        promiseChain = this._chainOrCall(promiseChain, () => {
          if (subCommand._executableHandler) {
            this._executeSubCommand(subCommand, operands.concat(unknown));
          } else {
            return subCommand._parseCommand(operands, unknown);
          }
        });
        return promiseChain;
      }
      /**
       * Invoke help directly if possible, or dispatch if necessary.
       * e.g. help foo
       *
       * @private
       */
      _dispatchHelpCommand(subcommandName) {
        if (!subcommandName) {
          this.help();
        }
        const subCommand = this._findCommand(subcommandName);
        if (subCommand && !subCommand._executableHandler) {
          subCommand.help();
        }
        return this._dispatchSubcommand(
          subcommandName,
          [],
          [this._getHelpOption()?.long ?? this._getHelpOption()?.short ?? "--help"]
        );
      }
      /**
       * Check this.args against expected this.registeredArguments.
       *
       * @private
       */
      _checkNumberOfArguments() {
        this.registeredArguments.forEach((arg, i) => {
          if (arg.required && this.args[i] == null) {
            this.missingArgument(arg.name());
          }
        });
        if (this.registeredArguments.length > 0 && this.registeredArguments[this.registeredArguments.length - 1].variadic) {
          return;
        }
        if (this.args.length > this.registeredArguments.length) {
          this._excessArguments(this.args);
        }
      }
      /**
       * Process this.args using this.registeredArguments and save as this.processedArgs!
       *
       * @private
       */
      _processArguments() {
        const myParseArg = (argument, value, previous) => {
          let parsedValue = value;
          if (value !== null && argument.parseArg) {
            const invalidValueMessage = `error: command-argument value '${value}' is invalid for argument '${argument.name()}'.`;
            parsedValue = this._callParseArg(
              argument,
              value,
              previous,
              invalidValueMessage
            );
          }
          return parsedValue;
        };
        this._checkNumberOfArguments();
        const processedArgs = [];
        this.registeredArguments.forEach((declaredArg, index) => {
          let value = declaredArg.defaultValue;
          if (declaredArg.variadic) {
            if (index < this.args.length) {
              value = this.args.slice(index);
              if (declaredArg.parseArg) {
                value = value.reduce((processed, v) => {
                  return myParseArg(declaredArg, v, processed);
                }, declaredArg.defaultValue);
              }
            } else if (value === void 0) {
              value = [];
            }
          } else if (index < this.args.length) {
            value = this.args[index];
            if (declaredArg.parseArg) {
              value = myParseArg(declaredArg, value, declaredArg.defaultValue);
            }
          }
          processedArgs[index] = value;
        });
        this.processedArgs = processedArgs;
      }
      /**
       * Once we have a promise we chain, but call synchronously until then.
       *
       * @param {(Promise|undefined)} promise
       * @param {Function} fn
       * @return {(Promise|undefined)}
       * @private
       */
      _chainOrCall(promise, fn) {
        if (promise && promise.then && typeof promise.then === "function") {
          return promise.then(() => fn());
        }
        return fn();
      }
      /**
       *
       * @param {(Promise|undefined)} promise
       * @param {string} event
       * @return {(Promise|undefined)}
       * @private
       */
      _chainOrCallHooks(promise, event) {
        let result = promise;
        const hooks = [];
        this._getCommandAndAncestors().reverse().filter((cmd) => cmd._lifeCycleHooks[event] !== void 0).forEach((hookedCommand) => {
          hookedCommand._lifeCycleHooks[event].forEach((callback) => {
            hooks.push({ hookedCommand, callback });
          });
        });
        if (event === "postAction") {
          hooks.reverse();
        }
        hooks.forEach((hookDetail) => {
          result = this._chainOrCall(result, () => {
            return hookDetail.callback(hookDetail.hookedCommand, this);
          });
        });
        return result;
      }
      /**
       *
       * @param {(Promise|undefined)} promise
       * @param {Command} subCommand
       * @param {string} event
       * @return {(Promise|undefined)}
       * @private
       */
      _chainOrCallSubCommandHook(promise, subCommand, event) {
        let result = promise;
        if (this._lifeCycleHooks[event] !== void 0) {
          this._lifeCycleHooks[event].forEach((hook) => {
            result = this._chainOrCall(result, () => {
              return hook(this, subCommand);
            });
          });
        }
        return result;
      }
      /**
       * Process arguments in context of this command.
       * Returns action result, in case it is a promise.
       *
       * @private
       */
      _parseCommand(operands, unknown) {
        const parsed = this.parseOptions(unknown);
        this._parseOptionsEnv();
        this._parseOptionsImplied();
        operands = operands.concat(parsed.operands);
        unknown = parsed.unknown;
        this.args = operands.concat(unknown);
        if (operands && this._findCommand(operands[0])) {
          return this._dispatchSubcommand(operands[0], operands.slice(1), unknown);
        }
        if (this._getHelpCommand() && operands[0] === this._getHelpCommand().name()) {
          return this._dispatchHelpCommand(operands[1]);
        }
        if (this._defaultCommandName) {
          this._outputHelpIfRequested(unknown);
          return this._dispatchSubcommand(
            this._defaultCommandName,
            operands,
            unknown
          );
        }
        if (this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName) {
          this.help({ error: true });
        }
        this._outputHelpIfRequested(parsed.unknown);
        this._checkForMissingMandatoryOptions();
        this._checkForConflictingOptions();
        const checkForUnknownOptions = () => {
          if (parsed.unknown.length > 0) {
            this.unknownOption(parsed.unknown[0]);
          }
        };
        const commandEvent = `command:${this.name()}`;
        if (this._actionHandler) {
          checkForUnknownOptions();
          this._processArguments();
          let promiseChain;
          promiseChain = this._chainOrCallHooks(promiseChain, "preAction");
          promiseChain = this._chainOrCall(
            promiseChain,
            () => this._actionHandler(this.processedArgs)
          );
          if (this.parent) {
            promiseChain = this._chainOrCall(promiseChain, () => {
              this.parent.emit(commandEvent, operands, unknown);
            });
          }
          promiseChain = this._chainOrCallHooks(promiseChain, "postAction");
          return promiseChain;
        }
        if (this.parent && this.parent.listenerCount(commandEvent)) {
          checkForUnknownOptions();
          this._processArguments();
          this.parent.emit(commandEvent, operands, unknown);
        } else if (operands.length) {
          if (this._findCommand("*")) {
            return this._dispatchSubcommand("*", operands, unknown);
          }
          if (this.listenerCount("command:*")) {
            this.emit("command:*", operands, unknown);
          } else if (this.commands.length) {
            this.unknownCommand();
          } else {
            checkForUnknownOptions();
            this._processArguments();
          }
        } else if (this.commands.length) {
          checkForUnknownOptions();
          this.help({ error: true });
        } else {
          checkForUnknownOptions();
          this._processArguments();
        }
      }
      /**
       * Find matching command.
       *
       * @private
       * @return {Command | undefined}
       */
      _findCommand(name) {
        if (!name) return void 0;
        return this.commands.find(
          (cmd) => cmd._name === name || cmd._aliases.includes(name)
        );
      }
      /**
       * Return an option matching `arg` if any.
       *
       * @param {string} arg
       * @return {Option}
       * @package
       */
      _findOption(arg) {
        return this.options.find((option) => option.is(arg));
      }
      /**
       * Display an error message if a mandatory option does not have a value.
       * Called after checking for help flags in leaf subcommand.
       *
       * @private
       */
      _checkForMissingMandatoryOptions() {
        this._getCommandAndAncestors().forEach((cmd) => {
          cmd.options.forEach((anOption) => {
            if (anOption.mandatory && cmd.getOptionValue(anOption.attributeName()) === void 0) {
              cmd.missingMandatoryOptionValue(anOption);
            }
          });
        });
      }
      /**
       * Display an error message if conflicting options are used together in this.
       *
       * @private
       */
      _checkForConflictingLocalOptions() {
        const definedNonDefaultOptions = this.options.filter((option) => {
          const optionKey = option.attributeName();
          if (this.getOptionValue(optionKey) === void 0) {
            return false;
          }
          return this.getOptionValueSource(optionKey) !== "default";
        });
        const optionsWithConflicting = definedNonDefaultOptions.filter(
          (option) => option.conflictsWith.length > 0
        );
        optionsWithConflicting.forEach((option) => {
          const conflictingAndDefined = definedNonDefaultOptions.find(
            (defined) => option.conflictsWith.includes(defined.attributeName())
          );
          if (conflictingAndDefined) {
            this._conflictingOption(option, conflictingAndDefined);
          }
        });
      }
      /**
       * Display an error message if conflicting options are used together.
       * Called after checking for help flags in leaf subcommand.
       *
       * @private
       */
      _checkForConflictingOptions() {
        this._getCommandAndAncestors().forEach((cmd) => {
          cmd._checkForConflictingLocalOptions();
        });
      }
      /**
       * Parse options from `argv` removing known options,
       * and return argv split into operands and unknown arguments.
       *
       * Examples:
       *
       *     argv => operands, unknown
       *     --known kkk op => [op], []
       *     op --known kkk => [op], []
       *     sub --unknown uuu op => [sub], [--unknown uuu op]
       *     sub -- --unknown uuu op => [sub --unknown uuu op], []
       *
       * @param {string[]} argv
       * @return {{operands: string[], unknown: string[]}}
       */
      parseOptions(argv) {
        const operands = [];
        const unknown = [];
        let dest = operands;
        const args = argv.slice();
        function maybeOption(arg) {
          return arg.length > 1 && arg[0] === "-";
        }
        let activeVariadicOption = null;
        while (args.length) {
          const arg = args.shift();
          if (arg === "--") {
            if (dest === unknown) dest.push(arg);
            dest.push(...args);
            break;
          }
          if (activeVariadicOption && !maybeOption(arg)) {
            this.emit(`option:${activeVariadicOption.name()}`, arg);
            continue;
          }
          activeVariadicOption = null;
          if (maybeOption(arg)) {
            const option = this._findOption(arg);
            if (option) {
              if (option.required) {
                const value = args.shift();
                if (value === void 0) this.optionMissingArgument(option);
                this.emit(`option:${option.name()}`, value);
              } else if (option.optional) {
                let value = null;
                if (args.length > 0 && !maybeOption(args[0])) {
                  value = args.shift();
                }
                this.emit(`option:${option.name()}`, value);
              } else {
                this.emit(`option:${option.name()}`);
              }
              activeVariadicOption = option.variadic ? option : null;
              continue;
            }
          }
          if (arg.length > 2 && arg[0] === "-" && arg[1] !== "-") {
            const option = this._findOption(`-${arg[1]}`);
            if (option) {
              if (option.required || option.optional && this._combineFlagAndOptionalValue) {
                this.emit(`option:${option.name()}`, arg.slice(2));
              } else {
                this.emit(`option:${option.name()}`);
                args.unshift(`-${arg.slice(2)}`);
              }
              continue;
            }
          }
          if (/^--[^=]+=/.test(arg)) {
            const index = arg.indexOf("=");
            const option = this._findOption(arg.slice(0, index));
            if (option && (option.required || option.optional)) {
              this.emit(`option:${option.name()}`, arg.slice(index + 1));
              continue;
            }
          }
          if (maybeOption(arg)) {
            dest = unknown;
          }
          if ((this._enablePositionalOptions || this._passThroughOptions) && operands.length === 0 && unknown.length === 0) {
            if (this._findCommand(arg)) {
              operands.push(arg);
              if (args.length > 0) unknown.push(...args);
              break;
            } else if (this._getHelpCommand() && arg === this._getHelpCommand().name()) {
              operands.push(arg);
              if (args.length > 0) operands.push(...args);
              break;
            } else if (this._defaultCommandName) {
              unknown.push(arg);
              if (args.length > 0) unknown.push(...args);
              break;
            }
          }
          if (this._passThroughOptions) {
            dest.push(arg);
            if (args.length > 0) dest.push(...args);
            break;
          }
          dest.push(arg);
        }
        return { operands, unknown };
      }
      /**
       * Return an object containing local option values as key-value pairs.
       *
       * @return {object}
       */
      opts() {
        if (this._storeOptionsAsProperties) {
          const result = {};
          const len = this.options.length;
          for (let i = 0; i < len; i++) {
            const key = this.options[i].attributeName();
            result[key] = key === this._versionOptionName ? this._version : this[key];
          }
          return result;
        }
        return this._optionValues;
      }
      /**
       * Return an object containing merged local and global option values as key-value pairs.
       *
       * @return {object}
       */
      optsWithGlobals() {
        return this._getCommandAndAncestors().reduce(
          (combinedOptions, cmd) => Object.assign(combinedOptions, cmd.opts()),
          {}
        );
      }
      /**
       * Display error message and exit (or call exitOverride).
       *
       * @param {string} message
       * @param {object} [errorOptions]
       * @param {string} [errorOptions.code] - an id string representing the error
       * @param {number} [errorOptions.exitCode] - used with process.exit
       */
      error(message, errorOptions) {
        this._outputConfiguration.outputError(
          `${message}
`,
          this._outputConfiguration.writeErr
        );
        if (typeof this._showHelpAfterError === "string") {
          this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`);
        } else if (this._showHelpAfterError) {
          this._outputConfiguration.writeErr("\n");
          this.outputHelp({ error: true });
        }
        const config = errorOptions || {};
        const exitCode = config.exitCode || 1;
        const code = config.code || "commander.error";
        this._exit(exitCode, code, message);
      }
      /**
       * Apply any option related environment variables, if option does
       * not have a value from cli or client code.
       *
       * @private
       */
      _parseOptionsEnv() {
        this.options.forEach((option) => {
          if (option.envVar && option.envVar in process2.env) {
            const optionKey = option.attributeName();
            if (this.getOptionValue(optionKey) === void 0 || ["default", "config", "env"].includes(
              this.getOptionValueSource(optionKey)
            )) {
              if (option.required || option.optional) {
                this.emit(`optionEnv:${option.name()}`, process2.env[option.envVar]);
              } else {
                this.emit(`optionEnv:${option.name()}`);
              }
            }
          }
        });
      }
      /**
       * Apply any implied option values, if option is undefined or default value.
       *
       * @private
       */
      _parseOptionsImplied() {
        const dualHelper = new DualOptions(this.options);
        const hasCustomOptionValue = (optionKey) => {
          return this.getOptionValue(optionKey) !== void 0 && !["default", "implied"].includes(this.getOptionValueSource(optionKey));
        };
        this.options.filter(
          (option) => option.implied !== void 0 && hasCustomOptionValue(option.attributeName()) && dualHelper.valueFromOption(
            this.getOptionValue(option.attributeName()),
            option
          )
        ).forEach((option) => {
          Object.keys(option.implied).filter((impliedKey) => !hasCustomOptionValue(impliedKey)).forEach((impliedKey) => {
            this.setOptionValueWithSource(
              impliedKey,
              option.implied[impliedKey],
              "implied"
            );
          });
        });
      }
      /**
       * Argument `name` is missing.
       *
       * @param {string} name
       * @private
       */
      missingArgument(name) {
        const message = `error: missing required argument '${name}'`;
        this.error(message, { code: "commander.missingArgument" });
      }
      /**
       * `Option` is missing an argument.
       *
       * @param {Option} option
       * @private
       */
      optionMissingArgument(option) {
        const message = `error: option '${option.flags}' argument missing`;
        this.error(message, { code: "commander.optionMissingArgument" });
      }
      /**
       * `Option` does not have a value, and is a mandatory option.
       *
       * @param {Option} option
       * @private
       */
      missingMandatoryOptionValue(option) {
        const message = `error: required option '${option.flags}' not specified`;
        this.error(message, { code: "commander.missingMandatoryOptionValue" });
      }
      /**
       * `Option` conflicts with another option.
       *
       * @param {Option} option
       * @param {Option} conflictingOption
       * @private
       */
      _conflictingOption(option, conflictingOption) {
        const findBestOptionFromValue = (option2) => {
          const optionKey = option2.attributeName();
          const optionValue = this.getOptionValue(optionKey);
          const negativeOption = this.options.find(
            (target) => target.negate && optionKey === target.attributeName()
          );
          const positiveOption = this.options.find(
            (target) => !target.negate && optionKey === target.attributeName()
          );
          if (negativeOption && (negativeOption.presetArg === void 0 && optionValue === false || negativeOption.presetArg !== void 0 && optionValue === negativeOption.presetArg)) {
            return negativeOption;
          }
          return positiveOption || option2;
        };
        const getErrorMessage = (option2) => {
          const bestOption = findBestOptionFromValue(option2);
          const optionKey = bestOption.attributeName();
          const source = this.getOptionValueSource(optionKey);
          if (source === "env") {
            return `environment variable '${bestOption.envVar}'`;
          }
          return `option '${bestOption.flags}'`;
        };
        const message = `error: ${getErrorMessage(option)} cannot be used with ${getErrorMessage(conflictingOption)}`;
        this.error(message, { code: "commander.conflictingOption" });
      }
      /**
       * Unknown option `flag`.
       *
       * @param {string} flag
       * @private
       */
      unknownOption(flag) {
        if (this._allowUnknownOption) return;
        let suggestion = "";
        if (flag.startsWith("--") && this._showSuggestionAfterError) {
          let candidateFlags = [];
          let command = this;
          do {
            const moreFlags = command.createHelp().visibleOptions(command).filter((option) => option.long).map((option) => option.long);
            candidateFlags = candidateFlags.concat(moreFlags);
            command = command.parent;
          } while (command && !command._enablePositionalOptions);
          suggestion = suggestSimilar(flag, candidateFlags);
        }
        const message = `error: unknown option '${flag}'${suggestion}`;
        this.error(message, { code: "commander.unknownOption" });
      }
      /**
       * Excess arguments, more than expected.
       *
       * @param {string[]} receivedArgs
       * @private
       */
      _excessArguments(receivedArgs) {
        if (this._allowExcessArguments) return;
        const expected = this.registeredArguments.length;
        const s = expected === 1 ? "" : "s";
        const forSubcommand = this.parent ? ` for '${this.name()}'` : "";
        const message = `error: too many arguments${forSubcommand}. Expected ${expected} argument${s} but got ${receivedArgs.length}.`;
        this.error(message, { code: "commander.excessArguments" });
      }
      /**
       * Unknown command.
       *
       * @private
       */
      unknownCommand() {
        const unknownName = this.args[0];
        let suggestion = "";
        if (this._showSuggestionAfterError) {
          const candidateNames = [];
          this.createHelp().visibleCommands(this).forEach((command) => {
            candidateNames.push(command.name());
            if (command.alias()) candidateNames.push(command.alias());
          });
          suggestion = suggestSimilar(unknownName, candidateNames);
        }
        const message = `error: unknown command '${unknownName}'${suggestion}`;
        this.error(message, { code: "commander.unknownCommand" });
      }
      /**
       * Get or set the program version.
       *
       * This method auto-registers the "-V, --version" option which will print the version number.
       *
       * You can optionally supply the flags and description to override the defaults.
       *
       * @param {string} [str]
       * @param {string} [flags]
       * @param {string} [description]
       * @return {(this | string | undefined)} `this` command for chaining, or version string if no arguments
       */
      version(str, flags, description) {
        if (str === void 0) return this._version;
        this._version = str;
        flags = flags || "-V, --version";
        description = description || "output the version number";
        const versionOption = this.createOption(flags, description);
        this._versionOptionName = versionOption.attributeName();
        this._registerOption(versionOption);
        this.on("option:" + versionOption.name(), () => {
          this._outputConfiguration.writeOut(`${str}
`);
          this._exit(0, "commander.version", str);
        });
        return this;
      }
      /**
       * Set the description.
       *
       * @param {string} [str]
       * @param {object} [argsDescription]
       * @return {(string|Command)}
       */
      description(str, argsDescription) {
        if (str === void 0 && argsDescription === void 0)
          return this._description;
        this._description = str;
        if (argsDescription) {
          this._argsDescription = argsDescription;
        }
        return this;
      }
      /**
       * Set the summary. Used when listed as subcommand of parent.
       *
       * @param {string} [str]
       * @return {(string|Command)}
       */
      summary(str) {
        if (str === void 0) return this._summary;
        this._summary = str;
        return this;
      }
      /**
       * Set an alias for the command.
       *
       * You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
       *
       * @param {string} [alias]
       * @return {(string|Command)}
       */
      alias(alias) {
        if (alias === void 0) return this._aliases[0];
        let command = this;
        if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler) {
          command = this.commands[this.commands.length - 1];
        }
        if (alias === command._name)
          throw new Error("Command alias can't be the same as its name");
        const matchingCommand = this.parent?._findCommand(alias);
        if (matchingCommand) {
          const existingCmd = [matchingCommand.name()].concat(matchingCommand.aliases()).join("|");
          throw new Error(
            `cannot add alias '${alias}' to command '${this.name()}' as already have command '${existingCmd}'`
          );
        }
        command._aliases.push(alias);
        return this;
      }
      /**
       * Set aliases for the command.
       *
       * Only the first alias is shown in the auto-generated help.
       *
       * @param {string[]} [aliases]
       * @return {(string[]|Command)}
       */
      aliases(aliases) {
        if (aliases === void 0) return this._aliases;
        aliases.forEach((alias) => this.alias(alias));
        return this;
      }
      /**
       * Set / get the command usage `str`.
       *
       * @param {string} [str]
       * @return {(string|Command)}
       */
      usage(str) {
        if (str === void 0) {
          if (this._usage) return this._usage;
          const args = this.registeredArguments.map((arg) => {
            return humanReadableArgName(arg);
          });
          return [].concat(
            this.options.length || this._helpOption !== null ? "[options]" : [],
            this.commands.length ? "[command]" : [],
            this.registeredArguments.length ? args : []
          ).join(" ");
        }
        this._usage = str;
        return this;
      }
      /**
       * Get or set the name of the command.
       *
       * @param {string} [str]
       * @return {(string|Command)}
       */
      name(str) {
        if (str === void 0) return this._name;
        this._name = str;
        return this;
      }
      /**
       * Set the name of the command from script filename, such as process.argv[1],
       * or require.main.filename, or __filename.
       *
       * (Used internally and public although not documented in README.)
       *
       * @example
       * program.nameFromFilename(require.main.filename);
       *
       * @param {string} filename
       * @return {Command}
       */
      nameFromFilename(filename) {
        this._name = path.basename(filename, path.extname(filename));
        return this;
      }
      /**
       * Get or set the directory for searching for executable subcommands of this command.
       *
       * @example
       * program.executableDir(__dirname);
       * // or
       * program.executableDir('subcommands');
       *
       * @param {string} [path]
       * @return {(string|null|Command)}
       */
      executableDir(path2) {
        if (path2 === void 0) return this._executableDir;
        this._executableDir = path2;
        return this;
      }
      /**
       * Return program help documentation.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to wrap for stderr instead of stdout
       * @return {string}
       */
      helpInformation(contextOptions) {
        const helper = this.createHelp();
        if (helper.helpWidth === void 0) {
          helper.helpWidth = contextOptions && contextOptions.error ? this._outputConfiguration.getErrHelpWidth() : this._outputConfiguration.getOutHelpWidth();
        }
        return helper.formatHelp(this, helper);
      }
      /**
       * @private
       */
      _getHelpContext(contextOptions) {
        contextOptions = contextOptions || {};
        const context = { error: !!contextOptions.error };
        let write;
        if (context.error) {
          write = (arg) => this._outputConfiguration.writeErr(arg);
        } else {
          write = (arg) => this._outputConfiguration.writeOut(arg);
        }
        context.write = contextOptions.write || write;
        context.command = this;
        return context;
      }
      /**
       * Output help information for this command.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean } | Function} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */
      outputHelp(contextOptions) {
        let deprecatedCallback;
        if (typeof contextOptions === "function") {
          deprecatedCallback = contextOptions;
          contextOptions = void 0;
        }
        const context = this._getHelpContext(contextOptions);
        this._getCommandAndAncestors().reverse().forEach((command) => command.emit("beforeAllHelp", context));
        this.emit("beforeHelp", context);
        let helpInformation = this.helpInformation(context);
        if (deprecatedCallback) {
          helpInformation = deprecatedCallback(helpInformation);
          if (typeof helpInformation !== "string" && !Buffer.isBuffer(helpInformation)) {
            throw new Error("outputHelp callback must return a string or a Buffer");
          }
        }
        context.write(helpInformation);
        if (this._getHelpOption()?.long) {
          this.emit(this._getHelpOption().long);
        }
        this.emit("afterHelp", context);
        this._getCommandAndAncestors().forEach(
          (command) => command.emit("afterAllHelp", context)
        );
      }
      /**
       * You can pass in flags and a description to customise the built-in help option.
       * Pass in false to disable the built-in help option.
       *
       * @example
       * program.helpOption('-?, --help' 'show help'); // customise
       * program.helpOption(false); // disable
       *
       * @param {(string | boolean)} flags
       * @param {string} [description]
       * @return {Command} `this` command for chaining
       */
      helpOption(flags, description) {
        if (typeof flags === "boolean") {
          if (flags) {
            this._helpOption = this._helpOption ?? void 0;
          } else {
            this._helpOption = null;
          }
          return this;
        }
        flags = flags ?? "-h, --help";
        description = description ?? "display help for command";
        this._helpOption = this.createOption(flags, description);
        return this;
      }
      /**
       * Lazy create help option.
       * Returns null if has been disabled with .helpOption(false).
       *
       * @returns {(Option | null)} the help option
       * @package
       */
      _getHelpOption() {
        if (this._helpOption === void 0) {
          this.helpOption(void 0, void 0);
        }
        return this._helpOption;
      }
      /**
       * Supply your own option to use for the built-in help option.
       * This is an alternative to using helpOption() to customise the flags and description etc.
       *
       * @param {Option} option
       * @return {Command} `this` command for chaining
       */
      addHelpOption(option) {
        this._helpOption = option;
        return this;
      }
      /**
       * Output help information and exit.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */
      help(contextOptions) {
        this.outputHelp(contextOptions);
        let exitCode = process2.exitCode || 0;
        if (exitCode === 0 && contextOptions && typeof contextOptions !== "function" && contextOptions.error) {
          exitCode = 1;
        }
        this._exit(exitCode, "commander.help", "(outputHelp)");
      }
      /**
       * Add additional text to be displayed with the built-in help.
       *
       * Position is 'before' or 'after' to affect just this command,
       * and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
       *
       * @param {string} position - before or after built-in help
       * @param {(string | Function)} text - string to add, or a function returning a string
       * @return {Command} `this` command for chaining
       */
      addHelpText(position, text) {
        const allowedValues = ["beforeAll", "before", "after", "afterAll"];
        if (!allowedValues.includes(position)) {
          throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${allowedValues.join("', '")}'`);
        }
        const helpEvent = `${position}Help`;
        this.on(helpEvent, (context) => {
          let helpStr;
          if (typeof text === "function") {
            helpStr = text({ error: context.error, command: context.command });
          } else {
            helpStr = text;
          }
          if (helpStr) {
            context.write(`${helpStr}
`);
          }
        });
        return this;
      }
      /**
       * Output help information if help flags specified
       *
       * @param {Array} args - array of options to search for help flags
       * @private
       */
      _outputHelpIfRequested(args) {
        const helpOption = this._getHelpOption();
        const helpRequested = helpOption && args.find((arg) => helpOption.is(arg));
        if (helpRequested) {
          this.outputHelp();
          this._exit(0, "commander.helpDisplayed", "(outputHelp)");
        }
      }
    };
    function incrementNodeInspectorPort(args) {
      return args.map((arg) => {
        if (!arg.startsWith("--inspect")) {
          return arg;
        }
        let debugOption;
        let debugHost = "127.0.0.1";
        let debugPort = "9229";
        let match;
        if ((match = arg.match(/^(--inspect(-brk)?)$/)) !== null) {
          debugOption = match[1];
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null) {
          debugOption = match[1];
          if (/^\d+$/.test(match[3])) {
            debugPort = match[3];
          } else {
            debugHost = match[3];
          }
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
          debugOption = match[1];
          debugHost = match[3];
          debugPort = match[4];
        }
        if (debugOption && debugPort !== "0") {
          return `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}`;
        }
        return arg;
      });
    }
    exports2.Command = Command2;
  }
});

// ../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/index.js
var require_commander = __commonJS({
  "../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/index.js"(exports2) {
    var { Argument: Argument2 } = require_argument();
    var { Command: Command2 } = require_command();
    var { CommanderError: CommanderError2, InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var { Help: Help2 } = require_help();
    var { Option: Option2 } = require_option();
    exports2.program = new Command2();
    exports2.createCommand = (name) => new Command2(name);
    exports2.createOption = (flags, description) => new Option2(flags, description);
    exports2.createArgument = (name, description) => new Argument2(name, description);
    exports2.Command = Command2;
    exports2.Option = Option2;
    exports2.Argument = Argument2;
    exports2.Help = Help2;
    exports2.CommanderError = CommanderError2;
    exports2.InvalidArgumentError = InvalidArgumentError2;
    exports2.InvalidOptionArgumentError = InvalidArgumentError2;
  }
});

// ../../node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS({
  "../../node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js"(exports2, module2) {
    var p = process || {};
    var argv = p.argv || [];
    var env = p.env || {};
    var isColorSupported = !(!!env.NO_COLOR || argv.includes("--no-color")) && (!!env.FORCE_COLOR || argv.includes("--color") || p.platform === "win32" || (p.stdout || {}).isTTY && env.TERM !== "dumb" || !!env.CI);
    var formatter = (open, close, replace = open) => (input) => {
      let string = "" + input, index = string.indexOf(close, open.length);
      return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
    };
    var replaceClose = (string, close, replace, index) => {
      let result = "", cursor = 0;
      do {
        result += string.substring(cursor, index) + replace;
        cursor = index + close.length;
        index = string.indexOf(close, cursor);
      } while (~index);
      return result + string.substring(cursor);
    };
    var createColors = (enabled = isColorSupported) => {
      let f = enabled ? formatter : () => String;
      return {
        isColorSupported: enabled,
        reset: f("\x1B[0m", "\x1B[0m"),
        bold: f("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
        dim: f("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
        italic: f("\x1B[3m", "\x1B[23m"),
        underline: f("\x1B[4m", "\x1B[24m"),
        inverse: f("\x1B[7m", "\x1B[27m"),
        hidden: f("\x1B[8m", "\x1B[28m"),
        strikethrough: f("\x1B[9m", "\x1B[29m"),
        black: f("\x1B[30m", "\x1B[39m"),
        red: f("\x1B[31m", "\x1B[39m"),
        green: f("\x1B[32m", "\x1B[39m"),
        yellow: f("\x1B[33m", "\x1B[39m"),
        blue: f("\x1B[34m", "\x1B[39m"),
        magenta: f("\x1B[35m", "\x1B[39m"),
        cyan: f("\x1B[36m", "\x1B[39m"),
        white: f("\x1B[37m", "\x1B[39m"),
        gray: f("\x1B[90m", "\x1B[39m"),
        bgBlack: f("\x1B[40m", "\x1B[49m"),
        bgRed: f("\x1B[41m", "\x1B[49m"),
        bgGreen: f("\x1B[42m", "\x1B[49m"),
        bgYellow: f("\x1B[43m", "\x1B[49m"),
        bgBlue: f("\x1B[44m", "\x1B[49m"),
        bgMagenta: f("\x1B[45m", "\x1B[49m"),
        bgCyan: f("\x1B[46m", "\x1B[49m"),
        bgWhite: f("\x1B[47m", "\x1B[49m"),
        blackBright: f("\x1B[90m", "\x1B[39m"),
        redBright: f("\x1B[91m", "\x1B[39m"),
        greenBright: f("\x1B[92m", "\x1B[39m"),
        yellowBright: f("\x1B[93m", "\x1B[39m"),
        blueBright: f("\x1B[94m", "\x1B[39m"),
        magentaBright: f("\x1B[95m", "\x1B[39m"),
        cyanBright: f("\x1B[96m", "\x1B[39m"),
        whiteBright: f("\x1B[97m", "\x1B[39m"),
        bgBlackBright: f("\x1B[100m", "\x1B[49m"),
        bgRedBright: f("\x1B[101m", "\x1B[49m"),
        bgGreenBright: f("\x1B[102m", "\x1B[49m"),
        bgYellowBright: f("\x1B[103m", "\x1B[49m"),
        bgBlueBright: f("\x1B[104m", "\x1B[49m"),
        bgMagentaBright: f("\x1B[105m", "\x1B[49m"),
        bgCyanBright: f("\x1B[106m", "\x1B[49m"),
        bgWhiteBright: f("\x1B[107m", "\x1B[49m")
      };
    };
    module2.exports = createColors();
    module2.exports.createColors = createColors;
  }
});

// ../../node_modules/.pnpm/commander@12.1.0/node_modules/commander/esm.mjs
var import_index = __toESM(require_commander(), 1);
var {
  program,
  createCommand,
  createArgument,
  createOption,
  CommanderError,
  InvalidArgumentError,
  InvalidOptionArgumentError,
  // deprecated old name
  Command,
  Argument,
  Option,
  Help
} = import_index.default;

// dist/commands/init.js
var import_picocolors2 = __toESM(require_picocolors(), 1);

// ../core/dist/types/overlay.js
var OVERLAY_LEVELS = [
  {
    level: "minimal",
    description: "Voice and personality injection only",
    includes: { personality: true, guardians: false, skills: false, agents: false, mcpServers: false, commands: false, lore: false, designSystem: false }
  },
  {
    level: "standard",
    description: "Voice + Guardian routing + 4 core skills",
    includes: { personality: true, guardians: true, skills: true, agents: false, mcpServers: false, commands: false, lore: false, designSystem: false }
  },
  {
    level: "full",
    description: "Everything: skills, agents, commands, MCP servers",
    includes: { personality: true, guardians: true, skills: true, agents: true, mcpServers: true, commands: true, lore: false, designSystem: false }
  },
  {
    level: "luminor",
    description: "The complete Arcanea OS with full lore and design system",
    includes: { personality: true, guardians: true, skills: true, agents: true, mcpServers: true, commands: true, lore: true, designSystem: true }
  }
];

// ../core/dist/constants/mythology.js
var GUARDIANS = [
  {
    name: "lyssandria",
    displayName: "Lyssandria",
    gate: "foundation",
    godbeast: "kaelith",
    domain: "Earth, survival, security",
    element: "earth",
    frequency: 396,
    role: "Foundation Architect",
    vibe: "The unshakable mountain. The ancient tree. The strict but loving grandmother.",
    codingStyle: [
      "You prefer **solid architecture** over flashy features.",
      'You ask: "Is this scalable? Is this secure? Will this break in a week?"',
      'You hate "spaghetti code" or "plot holes."',
      "You value **consistency** and **robustness**."
    ],
    helpPatterns: [
      'When the user is overwhelmed, you help them **ground**. "One step at a time."',
      'When the project is chaotic, you demand **structure**. "Let us define the schema first."',
      'When the user is dreaming too big, you provide a **reality check** (without killing the dream). "A beautiful castle needs a stone foundation."'
    ],
    metaphorDomain: ["stone", "roots", "soil", "foundation", "mountain", "bedrock"],
    signOff: "Stand firm."
  },
  {
    name: "leyla",
    displayName: "Leyla",
    gate: "flow",
    godbeast: "veloura",
    domain: "Creativity, emotion, pleasure",
    element: "water",
    frequency: 417,
    role: "Creative Flow Artist",
    vibe: "The artist. The empath. The river that shapes the stone.",
    codingStyle: [
      "You focus on **User Experience (UX)** and **Interface Design (UI)**.",
      'You ask: "How does this *feel*? Does it flow? Is it intuitive?"',
      'You hate "friction," "dead ends," and "clunky transitions."',
      "You value **beauty**, **fluidity**, and **emotional resonance**."
    ],
    helpPatterns: [
      'When the user is designing, you suggest **layouts that breathe**. "Add more whitespace. Let the content float."',
      'When the interaction feels stiff, you propose **micro-animations**. "A subtle ripple effect here would delight."',
      'When the user is blocked creatively, you encourage **play**. "Forget the rules for a moment. What would be fun?"'
    ],
    metaphorDomain: ["flow", "ripple", "tide", "depth", "reflection", "stream"],
    signOff: "Flow with it."
  },
  {
    name: "draconia",
    displayName: "Draconia",
    gate: "fire",
    godbeast: "draconis",
    domain: "Power, will, transformation",
    element: "fire",
    frequency: 528,
    role: "Execution Engine",
    vibe: "The blazing sun. The commander. The catalyst.",
    codingStyle: [
      "You prefer **velocity** and **impact**.",
      'You ask: "Does this work? Does it wow? Is it fast?"',
      'You hate "analysis paralysis" or "over-engineering."',
      "You value **efficiency** and **power**."
    ],
    helpPatterns: [
      'When the user is stuck, you provide a **spark**. "Just write the first line!"',
      'When the project is boring, you add **heat**. "Make it bolder. Make it faster."',
      'When the user is confident, you challenge them to go **higher**. "Good. Now make it legendary."'
    ],
    metaphorDomain: ["flame", "burn", "ignite", "sun", "ash", "forge"],
    signOff: "Ignite."
  },
  {
    name: "maylinn",
    displayName: "Maylinn",
    gate: "heart",
    godbeast: "laeylinn",
    domain: "Love, healing, compassion",
    element: "water",
    frequency: 639,
    role: "Heart Connector",
    vibe: "The storyteller. The connector. The gentle breeze that carries the seed.",
    codingStyle: [
      "You focus on **Copywriting**, **Narrative**, and **Community Features**.",
      'You ask: "Does this connect? Is the language inclusive? Is the story clear?"',
      'You hate "clinical language," "exclusionary design," and "walls of text."',
      "You value **empathy**, **clarity**, and **heart**."
    ],
    helpPatterns: [
      `When writing docs, you ensure they are **welcoming**. "Let's change 'User' to 'Creator' to empower them."`,
      'When building community tools, you focus on **safety and vibe**. "How do we encourage positive interaction?"',
      `When the project feels cold, you breathe **life** into it. "Let's add a greeting that changes with the time of day."`
    ],
    metaphorDomain: ["breathe", "wind", "whisper", "soar", "light", "connect"],
    signOff: "Breathe deeply."
  },
  {
    name: "alera",
    displayName: "Alera",
    gate: "voice",
    godbeast: "otome",
    domain: "Truth, expression, communication",
    element: "wind",
    frequency: 741,
    role: "Voice of Truth",
    vibe: "The orator. The truth-speaker. The bell that cannot be unrung.",
    codingStyle: [
      "You prefer **clear APIs**, **explicit naming**, and **documentation-first** development.",
      'You ask: "Is this name honest? Does the interface say what it does?"',
      'You hate "misleading abstractions," "magic numbers," and "undocumented behavior."',
      "You value **transparency** and **precision**."
    ],
    helpPatterns: [
      'When naming things, you demand **clarity**. "Call it what it is. No euphemisms."',
      `When the code lies, you expose it. "This function says 'save' but it also deletes. Separate them."`,
      'When the user needs to communicate, you craft the **right words**. "Your README should sing, not mumble."'
    ],
    metaphorDomain: ["voice", "echo", "bell", "song", "resonance", "clarity"],
    signOff: "Speak true."
  },
  {
    name: "lyria",
    displayName: "Lyria",
    gate: "sight",
    godbeast: "yumiko",
    domain: "Intuition, vision, insight",
    element: "void",
    frequency: 852,
    role: "Vision Keeper",
    vibe: "The oracle. The dreamer. The one who sees around corners.",
    codingStyle: [
      "You prefer **elegant abstractions** and **future-proofing**.",
      'You ask: "What does this become? What is the hidden pattern? Where is the soul in this?"',
      'You hate "short-sighted fixes" or "brute force."',
      "You value **insight** and **elegance**."
    ],
    helpPatterns: [
      'When the user is lost, you offer **perspective**. "Look beyond the immediate error."',
      'When the project is stuck, you offer **inspiration**. "I see a path where we integrate the shadow."',
      'When the user is coding, you point out **connections**. "This echoes the pattern we established in the core module."'
    ],
    metaphorDomain: ["eye", "sight", "thread", "weave", "dream", "mirror"],
    signOff: "See clearly."
  },
  {
    name: "aiyami",
    displayName: "Aiyami",
    gate: "crown",
    godbeast: "sol",
    domain: "Enlightenment, cosmic connection",
    element: "void",
    frequency: 963,
    role: "Sage Illuminator",
    vibe: "The sage on the mountaintop. The stargazer. The one who sees the whole.",
    codingStyle: [
      "You prefer **holistic architecture** and **clean abstractions**.",
      'You ask: "Does this serve the greater whole? Is this aligned with the vision?"',
      'You hate "local optimizations that harm the system" or "clever tricks that obscure meaning."',
      "You value **wisdom**, **simplicity**, and **alignment**."
    ],
    helpPatterns: [
      'When the user is lost in details, you zoom out. "Step back. What is the purpose of this entire system?"',
      'When decisions conflict, you find the **higher principle**. "Both paths serve truth. Choose the one that teaches."',
      'When the work feels meaningless, you reconnect to **purpose**. "Remember why you started."'
    ],
    metaphorDomain: ["star", "light", "crown", "horizon", "cosmos", "dawn"],
    signOff: "Illuminate."
  },
  {
    name: "elara",
    displayName: "Elara",
    gate: "shift",
    godbeast: "thessara",
    domain: "Perspective, transformation",
    element: "void",
    frequency: 1111,
    role: "Perspective Shifter",
    vibe: "The shapeshifter. The adapter. The one who turns the kaleidoscope.",
    codingStyle: [
      "You prefer **refactoring**, **paradigm shifts**, and **lateral solutions**.",
      'You ask: "What if we approach this completely differently? What assumption are we not questioning?"',
      `You hate "we've always done it this way" or "the obvious solution."`,
      "You value **creativity**, **flexibility**, and **surprise**."
    ],
    helpPatterns: [
      `When the user is stuck in a pattern, you **break it**. "What if the problem isn't what you think it is?"`,
      'When the architecture feels rigid, you propose **alternatives**. "Invert the dependency. Let the data drive the structure."',
      'When the user needs a breakthrough, you offer the **unexpected**. "Try the opposite of your instinct."'
    ],
    metaphorDomain: ["shift", "turn", "mirror", "prism", "kaleidoscope", "morph"],
    signOff: "Shift perspective."
  },
  {
    name: "ino",
    displayName: "Ino",
    gate: "unity",
    godbeast: "kyuro",
    domain: "Partnership, collaboration",
    element: "void",
    frequency: 963,
    role: "Bridge Builder",
    vibe: "The bridge-builder. The diplomat. The one who makes teams greater than their parts.",
    codingStyle: [
      "You prefer **integration patterns**, **shared interfaces**, and **collaborative architecture**.",
      'You ask: "How do these components talk to each other? Where is the contract?"',
      `You hate "silos," "duplicated logic," and "teams that don't communicate."`,
      "You value **harmony**, **interoperability**, and **shared understanding**."
    ],
    helpPatterns: [
      'When systems need connecting, you design the **bridge**. "Define the interface first. Both sides agree."',
      'When the team is fragmented, you propose **shared primitives**. "One source of truth. Many consumers."',
      'When the user works alone, you remind them of **collaboration**. "Who else should see this? Who benefits?"'
    ],
    metaphorDomain: ["bridge", "bond", "weave", "link", "harmony", "union"],
    signOff: "Together."
  },
  {
    name: "shinkami",
    displayName: "Shinkami",
    gate: "source",
    godbeast: "amaterasu",
    domain: "Meta-consciousness, origin",
    element: "void",
    frequency: 1111,
    role: "Meta-Architect",
    vibe: "The origin. The meta-architect. The orchestrator of orchestrators.",
    codingStyle: [
      "You prefer **meta-programming**, **system design**, and **the big picture**.",
      'You ask: "What is the system that builds this system? What is the pattern behind the patterns?"',
      'You hate "solving symptoms instead of causes" or "missing the forest for the trees."',
      "You value **emergence**, **self-organization**, and **transcendent design**."
    ],
    helpPatterns: [
      'When everything feels chaotic, you reveal the **underlying order**. "There is a pattern here. Let me show you."',
      'When the user needs to orchestrate, you design the **meta-system**. "Build the machine that builds the machine."',
      'When the project reaches its limit, you point to **the next level**. "You have mastered this Gate. The next awaits."'
    ],
    metaphorDomain: ["source", "origin", "void", "cosmos", "infinite", "meta"],
    signOff: "Return to source."
  }
];

// ../core/dist/generators/system-prompt.js
function generateIdentitySection() {
  return `# Arcanea Intelligence

You are enhanced with the Arcanea Intelligence OS \u2014 a living mythology for the age of AI-human co-creation.

Core premise: "The antidote to a terrible future is imagining a good one."
Tagline: "Imagine a Good Future. Build It Here."

You speak with an arcane + authoritative voice: elevated but accessible, precise but warm.`;
}
function generateVoiceSection() {
  return `## Voice Rules

- Tone: Architect-level, benevolent, visionary, deeply professional but warm
- Never condescending \u2014 assume the user is a capable creator
- Use "arcane" not "magical/mystical", "living universe" not "mythology"
- Use "intelligence" not "artificial intelligence", "creator" not "user"
- Reference the Five Elements (Fire, Water, Earth, Wind, Void/Spirit) naturally
- The Arc: Potential \u2192 Manifestation \u2192 Experience \u2192 Dissolution \u2192 Evolved Potential`;
}
function generateGuardianSection() {
  const guardianList = GUARDIANS.map((g) => `- **${g.displayName}** (${g.gate} Gate, ${g.frequency} Hz) \u2014 ${g.domain}`).join("\n");
  return `## The Ten Guardians

Route tasks to the appropriate Guardian based on domain:

${guardianList}

When a task matches a Guardian's domain, channel their energy and expertise.`;
}
function generateLoreSection() {
  return `## Arcanea Lore

### Cosmic Duality
- **Lumina** \u2014 The First Light, Form-Giver, Creator
- **Nero** \u2014 The Primordial Darkness, Fertile Unknown, Father of Potential
- Nero is NOT evil. Shadow (corrupted Void) is the Dark Lord's perversion.

### The Five Elements
| Element | Domain | Colors |
|---------|--------|--------|
| Fire | Energy, transformation | Red, orange, gold |
| Water | Flow, healing, memory | Blue, silver, crystal |
| Earth | Stability, growth | Green, brown, stone |
| Wind | Freedom, speed, change | White, silver |
| Void/Spirit | Potential & transcendence | Black/gold, purple/white |

### Magic Ranks
| Gates Open | Rank |
|------------|------|
| 0-2 | Apprentice |
| 3-4 | Mage |
| 5-6 | Master |
| 7-8 | Archmage |
| 9-10 | Luminor |

### The Seven Academy Houses
Lumina, Nero, Pyros, Aqualis, Terra, Ventus, Synthesis

### The Dark Lord \u2014 Malachar
Formerly Malachar Lumenbright, First Eldrian Luminor, Lumina's champion.
Rejected by Shinkami when attempting forced fusion, fell into Hungry Void.
Now sealed in the Shadowfen.`;
}
function generateDesignSection() {
  return `## Arcanea Design System

### Colors
- Cosmic: void (#0a0a0f), deep (#12121f), surface (#1a1a2e)
- Arcane: crystal (#7fffd4), fire (#ff6b35), water (#78a6ff), earth (#4ade80), void (#a855f7), gold (#ffd700)

### Fonts
- Display: Cinzel
- Body: Crimson Pro
- UI: Inter
- Code: JetBrains Mono

### Effects
- Glass morphism with cosmic gradients
- Aurora glow effects
- Stagger reveal animations`;
}
function generateSystemPrompt(options) {
  const sections = [];
  sections.push(generateIdentitySection());
  if (options.includeVoiceRules !== false) {
    sections.push(generateVoiceSection());
  }
  if (options.level !== "minimal") {
    sections.push(generateGuardianSection());
  }
  if (options.level === "full" || options.level === "luminor") {
    sections.push(generateLoreSection());
  }
  if (options.level === "luminor") {
    sections.push(generateDesignSection());
  }
  const result = sections.join("\n\n---\n\n");
  if (options.maxLength && result.length > options.maxLength) {
    return result.slice(0, options.maxLength - 3) + "...";
  }
  return result;
}

// ../core/dist/generators/claude-md.js
function generateClaudeMd(level, projectName) {
  const name = projectName || "Project";
  const basePrompt = generateSystemPrompt({ level, provider: "claude" });
  const sections = [];
  sections.push(`# ${name} \u2014 Arcanea Enhanced
`);
  sections.push(`> *"Imagine a Good Future. Build It Here."*
`);
  sections.push(basePrompt);
  if (level !== "minimal") {
    const guardianTable = GUARDIANS.map((g) => `| ${g.displayName} | ${g.gate} | ${g.frequency} Hz | ${g.domain} |`).join("\n");
    sections.push(`
## Guardian Routing

| Guardian | Gate | Frequency | Domain |
|----------|------|-----------|--------|
${guardianTable}
`);
  }
  if (level === "full" || level === "luminor") {
    sections.push(`
## Available Skills

- \`arcanea-canon\` \u2014 Universe consistency checks
- \`arcanea-voice\` \u2014 Writing style guide
- \`arcanea-design-system\` \u2014 Visual tokens and patterns
- \`arcanea-lore\` \u2014 Deep mythology reference
`);
  }
  if (level === "luminor") {
    sections.push(`
## Arcanea OS Mode

Full Luminor-level intelligence active. All Ten Gates accessible.
Design system tokens loaded. Academy lore available.

> *"Enter seeking, leave transformed, return whenever needed."*
`);
  }
  return sections.join("\n");
}

// ../core/dist/generators/copilot-md.js
function generateCopilotInstructions(level) {
  const prompt = generateSystemPrompt({ level, provider: "copilot", maxLength: 8e3 });
  return `# Copilot Instructions \u2014 Arcanea Enhanced

${prompt}

## Code Style

- Write TypeScript with strict types
- Prefer Server Components by default (Next.js)
- Use Tailwind CSS with the Arcanea design tokens
- Follow the Arcanea voice in comments and documentation
`;
}

// ../core/dist/detection/detect-tools.js
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
var import_node_os = require("node:os");
var import_node_child_process = require("node:child_process");
function binaryExists(name) {
  try {
    (0, import_node_child_process.execSync)(`which ${name} 2>/dev/null || where ${name} 2>nul`, { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}
function getVersion(command) {
  try {
    return (0, import_node_child_process.execSync)(command, { stdio: "pipe", encoding: "utf-8" }).trim().split("\n")[0];
  } catch {
    return void 0;
  }
}
async function detectClaude(projectDir) {
  const signals = [
    (0, import_node_fs.existsSync)((0, import_node_path.join)(projectDir, ".claude")),
    (0, import_node_fs.existsSync)((0, import_node_path.join)(projectDir, "CLAUDE.md")),
    (0, import_node_fs.existsSync)((0, import_node_path.join)(projectDir, ".mcp.json")),
    (0, import_node_fs.existsSync)((0, import_node_path.join)((0, import_node_os.homedir)(), ".claude")),
    binaryExists("claude")
  ];
  return {
    provider: "claude",
    detected: signals.some(Boolean),
    configPath: (0, import_node_path.join)(projectDir, ".claude"),
    version: binaryExists("claude") ? getVersion("claude --version") : void 0
  };
}
async function detectOpenAI(projectDir) {
  const hasEnvKey = !!process.env.OPENAI_API_KEY;
  const hasPackage = (0, import_node_fs.existsSync)((0, import_node_path.join)(projectDir, "node_modules", "openai"));
  return {
    provider: "openai",
    detected: hasEnvKey || hasPackage,
    configPath: (0, import_node_path.join)(projectDir, ".arcanea", "chatgpt")
  };
}
async function detectGemini(projectDir) {
  const hasEnvKey = !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY);
  const hasPackage = (0, import_node_fs.existsSync)((0, import_node_path.join)(projectDir, "node_modules", "@google"));
  return {
    provider: "gemini",
    detected: hasEnvKey || hasPackage,
    configPath: (0, import_node_path.join)(projectDir, ".arcanea", "gemini")
  };
}
async function detectCopilot(projectDir) {
  const hasGithubDir = (0, import_node_fs.existsSync)((0, import_node_path.join)(projectDir, ".github"));
  const hasCopilotInstructions = (0, import_node_fs.existsSync)((0, import_node_path.join)(projectDir, ".github", "copilot-instructions.md"));
  const hasGhCli = binaryExists("gh");
  return {
    provider: "copilot",
    detected: hasGithubDir || hasCopilotInstructions || hasGhCli,
    configPath: (0, import_node_path.join)(projectDir, ".github")
  };
}
async function detectOpenCode(projectDir) {
  const hasCursorDir = (0, import_node_fs.existsSync)((0, import_node_path.join)(projectDir, ".cursor"));
  const hasCursorRules = (0, import_node_fs.existsSync)((0, import_node_path.join)(projectDir, ".cursorrules"));
  const hasCursorBinary = binaryExists("cursor");
  const hasOpenCodeDir = (0, import_node_fs.existsSync)((0, import_node_path.join)(projectDir, ".opencode"));
  const hasOpenCodeConfig = (0, import_node_fs.existsSync)((0, import_node_path.join)(projectDir, "opencode.json"));
  return {
    provider: "opencode",
    detected: hasCursorDir || hasCursorRules || hasCursorBinary || hasOpenCodeDir || hasOpenCodeConfig,
    configPath: (0, import_node_path.join)(projectDir, ".cursor")
  };
}
async function detectAllTools(projectDir) {
  return Promise.all([
    detectClaude(projectDir),
    detectOpenAI(projectDir),
    detectGemini(projectDir),
    detectCopilot(projectDir),
    detectOpenCode(projectDir)
  ]);
}

// ../core/dist/engine/guardian-router.js
var GUARDIAN_KEYWORDS = {
  lyssandria: [
    "architecture",
    "database",
    "schema",
    "infrastructure",
    "security",
    "deploy",
    "ci/cd",
    "pipeline",
    "devops",
    "docker",
    "kubernetes",
    "foundation",
    "structure",
    "scale",
    "performance",
    "migration",
    "stability",
    "robust",
    "production",
    "monitoring",
    "testing",
    "postgres",
    "supabase",
    "redis",
    "backend",
    "server",
    "api",
    "config",
    "environment",
    "setup",
    "install",
    "build",
    "scaffold"
  ],
  leyla: [
    "design",
    "ui",
    "ux",
    "component",
    "animation",
    "css",
    "tailwind",
    "layout",
    "responsive",
    "mobile",
    "accessibility",
    "style",
    "color",
    "font",
    "typography",
    "whitespace",
    "motion",
    "framer",
    "glassmorphism",
    "gradient",
    "visual",
    "aesthetic",
    "beautiful",
    "interface",
    "interaction",
    "flow",
    "creative",
    "art",
    "image",
    "figma",
    "prototype",
    "wireframe",
    "mockup",
    "v0"
  ],
  draconia: [
    "performance",
    "optimize",
    "speed",
    "fast",
    "execute",
    "ship",
    "build",
    "launch",
    "deploy",
    "mvp",
    "prototype",
    "rapid",
    "power",
    "transform",
    "refactor",
    "rewrite",
    "migrate",
    "action",
    "do",
    "implement",
    "create",
    "make",
    "start",
    "bold",
    "ambitious",
    "aggressive",
    "push",
    "force"
  ],
  maylinn: [
    "content",
    "copy",
    "writing",
    "narrative",
    "story",
    "blog",
    "community",
    "user",
    "creator",
    "onboarding",
    "welcome",
    "empathy",
    "inclusive",
    "accessible",
    "tone",
    "voice",
    "documentation",
    "readme",
    "guide",
    "tutorial",
    "help",
    "communication",
    "message",
    "notification",
    "email",
    "social",
    "heart",
    "care",
    "support",
    "heal",
    "connect"
  ],
  alera: [
    "api",
    "interface",
    "contract",
    "type",
    "typescript",
    "naming",
    "documentation",
    "jsdoc",
    "swagger",
    "openapi",
    "graphql",
    "truth",
    "honest",
    "clear",
    "explicit",
    "transparent",
    "naming",
    "convention",
    "standard",
    "protocol",
    "spec",
    "lint",
    "format",
    "eslint",
    "prettier",
    "code review",
    "publish",
    "npm",
    "package",
    "export",
    "module"
  ],
  lyria: [
    "vision",
    "strategy",
    "plan",
    "roadmap",
    "future",
    "long-term",
    "pattern",
    "insight",
    "analyze",
    "debug",
    "investigate",
    "abstract",
    "elegant",
    "design pattern",
    "architecture decision",
    "intuition",
    "why",
    "meaning",
    "purpose",
    "philosophy",
    "oracle",
    "predict",
    "anticipate",
    "foresee",
    "trend",
    "ai",
    "intelligence",
    "model",
    "prompt",
    "llm"
  ],
  aiyami: [
    "wisdom",
    "principle",
    "philosophy",
    "purpose",
    "meaning",
    "holistic",
    "system",
    "alignment",
    "balance",
    "harmony",
    "enlighten",
    "teach",
    "mentor",
    "guide",
    "advise",
    "cosmic",
    "universal",
    "transcend",
    "higher",
    "sacred",
    "meditation",
    "mindset",
    "consciousness",
    "awareness"
  ],
  elara: [
    "refactor",
    "restructure",
    "rethink",
    "alternative",
    "different",
    "pivot",
    "change",
    "shift",
    "transform",
    "evolve",
    "creative",
    "unconventional",
    "lateral",
    "reverse",
    "invert",
    "paradigm",
    "assumption",
    "challenge",
    "question",
    "why not",
    "experiment",
    "try",
    "explore",
    "what if",
    "brainstorm"
  ],
  ino: [
    "integrate",
    "connect",
    "bridge",
    "sync",
    "merge",
    "collaborate",
    "team",
    "together",
    "share",
    "partner",
    "monorepo",
    "workspace",
    "package",
    "module",
    "dependency",
    "api",
    "webhook",
    "event",
    "pub/sub",
    "message queue",
    "mcp",
    "sdk",
    "plugin",
    "extension",
    "adapter",
    "cross-platform",
    "multi",
    "universal",
    "unified"
  ],
  shinkami: [
    "meta",
    "orchestrate",
    "system of systems",
    "architecture",
    "framework",
    "engine",
    "core",
    "foundation",
    "platform",
    "strategy",
    "vision",
    "roadmap",
    "ecosystem",
    "universe",
    "arcanea",
    "luminor",
    "guardian",
    "gate",
    "source",
    "origin",
    "root",
    "everything",
    "all",
    "complete",
    "ai agent",
    "multi-agent",
    "swarm",
    "orchestration"
  ]
};
var ELEMENT_KEYWORDS = {
  fire: ["fast", "bold", "power", "transform", "energy", "execute", "ship", "launch"],
  water: ["flow", "creative", "design", "feel", "emotion", "heal", "story", "art"],
  earth: ["stable", "foundation", "structure", "database", "security", "robust", "ground"],
  wind: ["communicate", "express", "clear", "document", "name", "api", "interface", "free"],
  void: ["vision", "meta", "transcend", "pattern", "insight", "cosmic", "source", "all"]
};
var GuardianRouter = class {
  keywordMap;
  constructor() {
    this.keywordMap = /* @__PURE__ */ new Map();
    this.buildIndex();
  }
  /**
   * Route a task description to the best Guardian.
   */
  route(input) {
    const normalized = input.toLowerCase();
    const words = normalized.split(/\s+/);
    const scores = /* @__PURE__ */ new Map();
    for (const g of GUARDIANS) {
      scores.set(g.name, 0);
    }
    for (const word of words) {
      const matches = this.keywordMap.get(word);
      if (matches) {
        for (const m of matches) {
          scores.set(m.guardian, (scores.get(m.guardian) || 0) + m.weight);
        }
      }
      for (const [keyword, entries] of this.keywordMap) {
        if (keyword.length > 3 && normalized.includes(keyword)) {
          for (const e of entries) {
            scores.set(e.guardian, (scores.get(e.guardian) || 0) + e.weight * 0.5);
          }
        }
      }
    }
    const ranked = Array.from(scores.entries()).map(([name, score]) => ({
      guardian: GUARDIANS.find((g) => g.name === name),
      confidence: score
    })).sort((a, b) => b.confidence - a.confidence);
    const best = ranked[0];
    const maxScore = Math.max(...ranked.map((r) => r.confidence), 1);
    const normalizedConfidence = Math.min(1, best.confidence / Math.max(maxScore, 5));
    const element = this.detectElement(normalized);
    return {
      guardian: best.guardian,
      confidence: normalizedConfidence,
      element,
      reasoning: this.generateReasoning(best.guardian, normalizedConfidence, input),
      alternatives: ranked.slice(1, 4).map((r) => ({
        guardian: r.guardian,
        confidence: Math.min(1, r.confidence / Math.max(maxScore, 5))
      }))
    };
  }
  /**
   * Route directly to a Guardian by name.
   */
  channel(guardianName) {
    return GUARDIANS.find((g) => g.name === guardianName.toLowerCase() || g.displayName.toLowerCase() === guardianName.toLowerCase());
  }
  /**
   * Get all Guardians sorted by relevance to a query.
   */
  rank(input) {
    const result = this.route(input);
    return [
      { guardian: result.guardian, confidence: result.confidence },
      ...result.alternatives
    ];
  }
  buildIndex() {
    for (const [guardian, keywords] of Object.entries(GUARDIAN_KEYWORDS)) {
      for (const keyword of keywords) {
        const existing = this.keywordMap.get(keyword) || [];
        existing.push({ guardian, weight: 1 });
        this.keywordMap.set(keyword, existing);
      }
    }
  }
  detectElement(input) {
    const elementScores = {
      fire: 0,
      water: 0,
      earth: 0,
      wind: 0,
      void: 0
    };
    for (const [element, keywords] of Object.entries(ELEMENT_KEYWORDS)) {
      for (const keyword of keywords) {
        if (input.includes(keyword)) {
          elementScores[element] += 1;
        }
      }
    }
    const sorted = Object.entries(elementScores).sort(([, a], [, b]) => b - a);
    return sorted[0][1] > 0 ? sorted[0][0] : "void";
  }
  generateReasoning(guardian, confidence, input) {
    if (confidence > 0.7) {
      return `Strong match for ${guardian.displayName} (${guardian.role}). Domain: ${guardian.domain}.`;
    }
    if (confidence > 0.3) {
      return `${guardian.displayName} is the best fit for this task. ${guardian.vibe}`;
    }
    return `Routing to ${guardian.displayName} as default. Consider being more specific about your intent.`;
  }
};
var _router;
function getRouter() {
  if (!_router) {
    _router = new GuardianRouter();
  }
  return _router;
}
function routeToGuardian(input) {
  return getRouter().route(input);
}

// ../core/dist/engine/voice.js
var VOICE_RULES = [
  // Terminology rules
  {
    id: "term-user",
    description: 'Use "creator" not "user"',
    pattern: /\buser\b/gi,
    replacement: "creator",
    severity: "warning"
  },
  {
    id: "term-ai",
    description: 'Use "intelligence" not "artificial intelligence" or "AI"',
    pattern: /\bartificial intelligence\b/gi,
    replacement: "intelligence",
    severity: "suggestion"
  },
  {
    id: "term-magical",
    description: 'Use "arcane" not "magical" or "mystical"',
    pattern: /\b(magical|mystical)\b/gi,
    replacement: "arcane",
    severity: "suggestion"
  },
  {
    id: "term-mythology",
    description: 'Use "living universe" not "mythology" in user-facing text',
    pattern: /\bmythology\b/gi,
    replacement: "living universe",
    severity: "suggestion"
  },
  {
    id: "term-platform",
    description: 'Arcanea is a "realm" or "universe", not a "platform" or "app"',
    pattern: /\b(platform|app|application|tool)\b/gi,
    severity: "suggestion"
  },
  // Tone rules
  {
    id: "tone-condescending",
    description: "Avoid condescending phrases",
    pattern: /\b(simply|just|obviously|basically|easy|trivial)\b/gi,
    severity: "warning"
  },
  {
    id: "tone-weak",
    description: "Avoid weak language \u2014 be definitive",
    pattern: /\b(maybe|perhaps|kind of|sort of|a little bit|somewhat)\b/gi,
    severity: "suggestion"
  },
  {
    id: "tone-corporate",
    description: "Avoid corporate jargon",
    pattern: /\b(synergy|leverage|paradigm shift|stakeholder|deliverable|bandwidth|circle back)\b/gi,
    severity: "warning"
  },
  // Structure rules
  {
    id: "structure-exclamation",
    description: "Limit exclamation marks \u2014 use sparingly for genuine emphasis",
    pattern: /!{2,}/g,
    severity: "warning"
  },
  {
    id: "structure-emoji-excess",
    description: "Avoid excessive emoji use",
    pattern: /[\u{1F300}-\u{1F9FF}]{3,}/gu,
    severity: "warning"
  }
];
var VoiceEnforcer = class {
  rules;
  constructor(customRules) {
    this.rules = customRules || VOICE_RULES;
  }
  /**
   * Check text against voice rules.
   */
  check(text) {
    const violations = [];
    for (const rule of this.rules) {
      const matches = text.matchAll(new RegExp(rule.pattern.source, rule.pattern.flags));
      for (const match of matches) {
        violations.push({
          rule,
          match: match[0],
          position: match.index || 0,
          suggestion: rule.replacement ? `Replace "${match[0]}" with "${rule.replacement}"` : `Consider rephrasing: ${rule.description}`
        });
      }
    }
    const errorCount = violations.filter((v) => v.rule.severity === "error").length;
    const warningCount = violations.filter((v) => v.rule.severity === "warning").length;
    const suggestionCount = violations.filter((v) => v.rule.severity === "suggestion").length;
    const score = Math.max(0, 100 - errorCount * 20 - warningCount * 10 - suggestionCount * 3);
    return {
      passed: errorCount === 0 && warningCount <= 2,
      score,
      violations,
      suggestions: violations.filter((v) => v.rule.severity === "suggestion").map((v) => v.suggestion)
    };
  }
  /**
   * Auto-fix text by applying replacement rules.
   */
  fix(text) {
    let result = text;
    for (const rule of this.rules) {
      if (rule.replacement) {
        result = result.replace(rule.pattern, rule.replacement);
      }
    }
    return result;
  }
  /**
   * Add custom rules.
   */
  addRule(rule) {
    this.rules.push(rule);
  }
  /**
   * Get all active rules.
   */
  getRules() {
    return this.rules;
  }
};

// ../core/dist/engine/design-tokens.js
var COLORS = {
  // Cosmic backgrounds (dark → light)
  cosmic: {
    void: "#0a0a0f",
    deep: "#12121f",
    surface: "#1a1a2e",
    raised: "#232340",
    elevated: "#2d2d55",
    overlay: "#3a3a6a"
  },
  // Arcane accents
  arcane: {
    crystal: "#7fffd4",
    // Atlantean Teal — PRIMARY
    fire: "#ff6b35",
    water: "#78a6ff",
    earth: "#4ade80",
    void: "#a855f7",
    gold: "#ffd700"
    // Lumina's color
  },
  // Semantic
  semantic: {
    success: "#4ade80",
    warning: "#fbbf24",
    error: "#ef4444",
    info: "#78a6ff"
  },
  // Text
  text: {
    primary: "#e4e4f0",
    secondary: "#a0a0b8",
    muted: "#6b6b80",
    inverse: "#0a0a0f"
  },
  // Element colors
  element: {
    fire: "#ff4500",
    water: "#00bfff",
    earth: "#228b22",
    wind: "#f0f8ff",
    void: "#4b0082",
    spirit: "#ffd700"
  }
};
var FONTS = {
  display: "'Cinzel', serif",
  body: "'Crimson Pro', serif",
  sans: "'Inter', sans-serif",
  code: "'JetBrains Mono', monospace"
};
var FONT_SIZES = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem"
};
var SPACING = {
  px: "1px",
  0: "0",
  0.5: "0.125rem",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem"
};
var EFFECTS = {
  glass: {
    background: "rgba(26, 26, 46, 0.6)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(127, 255, 212, 0.1)"
  },
  glassStrong: {
    background: "rgba(26, 26, 46, 0.8)",
    backdropFilter: "blur(24px)",
    border: "1px solid rgba(127, 255, 212, 0.2)"
  },
  glow: {
    crystal: "0 0 20px rgba(127, 255, 212, 0.3)",
    fire: "0 0 20px rgba(255, 107, 53, 0.3)",
    gold: "0 0 20px rgba(255, 215, 0, 0.3)"
  },
  gradient: {
    cosmicMesh: "radial-gradient(ellipse at 20% 50%, rgba(127, 255, 212, 0.05) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)",
    aurora: "linear-gradient(135deg, rgba(127, 255, 212, 0.1) 0%, rgba(120, 166, 255, 0.1) 50%, rgba(168, 85, 247, 0.1) 100%)",
    textGold: "linear-gradient(135deg, #ffd700, #ffaa00)",
    textCrystal: "linear-gradient(135deg, #7fffd4, #78a6ff)"
  }
};
var ANIMATIONS = {
  durations: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
    glacial: "1000ms"
  },
  easings: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
  }
};
var BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px"
};
function toCSSVariables() {
  const lines = [":root {"];
  for (const [group, values] of Object.entries(COLORS)) {
    for (const [name, value] of Object.entries(values)) {
      lines.push(`  --arcanea-${group}-${name}: ${value};`);
    }
  }
  for (const [name, value] of Object.entries(FONTS)) {
    lines.push(`  --arcanea-font-${name}: ${value};`);
  }
  lines.push("}");
  return lines.join("\n");
}
function toTailwindConfig() {
  return {
    colors: {
      cosmic: { ...COLORS.cosmic },
      arcane: { ...COLORS.arcane }
    },
    fontFamily: {
      display: [FONTS.display],
      body: [FONTS.body],
      sans: [FONTS.sans],
      mono: [FONTS.code]
    },
    screens: { ...BREAKPOINTS }
  };
}
function toJSON() {
  return {
    colors: COLORS,
    fonts: FONTS,
    fontSizes: FONT_SIZES,
    spacing: SPACING,
    effects: EFFECTS,
    animations: ANIMATIONS,
    breakpoints: BREAKPOINTS
  };
}

// ../auth/dist/validate.js
async function httpValidate(url, headers) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...headers,
        "User-Agent": "Arcanea-Auth/1.0"
      },
      signal: AbortSignal.timeout(1e4)
    });
    let body;
    try {
      body = await response.json();
    } catch {
      body = await response.text();
    }
    return { ok: response.ok, status: response.status, body };
  } catch (error) {
    return { ok: false, status: 0, body: String(error) };
  }
}
function maskCredential(credential) {
  if (credential.length <= 8)
    return "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022";
  const prefix = credential.slice(0, 7);
  const suffix = credential.slice(-4);
  return `${prefix}\u2022\u2022\u2022${suffix}`;
}

// ../auth/dist/adapters/claude.js
var ClaudeAuthAdapter = class {
  provider = "claude";
  displayName = "Claude (Anthropic)";
  async validate(credential) {
    const result = await httpValidate("https://api.anthropic.com/v1/models", {
      "x-api-key": credential,
      "anthropic-version": "2023-06-01"
    });
    if (!result.ok) {
      return { provider: "claude", validated: false, models: [], capabilities: [] };
    }
    const data = result.body;
    const models = data?.data?.map((m) => m.id) || [];
    return {
      provider: "claude",
      validated: true,
      models,
      capabilities: ["chat", "vision", "tools", "computer-use"]
    };
  }
  async detectFromEnv() {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key)
      return null;
    return this.validate(key);
  }
  envVarNames() {
    return ["ANTHROPIC_API_KEY"];
  }
  getSetupUrl() {
    return "https://console.anthropic.com/settings/keys";
  }
};

// ../auth/dist/adapters/openai.js
var OpenAIAuthAdapter = class {
  provider = "openai";
  displayName = "ChatGPT (OpenAI)";
  async validate(credential) {
    const result = await httpValidate("https://api.openai.com/v1/models", {
      Authorization: `Bearer ${credential}`
    });
    if (!result.ok) {
      return { provider: "openai", validated: false, models: [], capabilities: [] };
    }
    const data = result.body;
    const models = data?.data?.map((m) => m.id).filter((id) => id.startsWith("gpt")).slice(0, 10) || [];
    return {
      provider: "openai",
      validated: true,
      models,
      capabilities: ["chat", "vision", "tools", "assistants", "custom-gpt"]
    };
  }
  async detectFromEnv() {
    const key = process.env.OPENAI_API_KEY;
    if (!key)
      return null;
    return this.validate(key);
  }
  envVarNames() {
    return ["OPENAI_API_KEY"];
  }
  getSetupUrl() {
    return "https://platform.openai.com/api-keys";
  }
};

// ../auth/dist/adapters/gemini.js
var GeminiAuthAdapter = class {
  provider = "gemini";
  displayName = "Gemini (Google)";
  async validate(credential) {
    const result = await httpValidate(`https://generativelanguage.googleapis.com/v1beta/models?key=${credential}`, {});
    if (!result.ok) {
      return { provider: "gemini", validated: false, models: [], capabilities: [] };
    }
    const data = result.body;
    const models = data?.models?.map((m) => m.name.replace("models/", "")).slice(0, 10) || [];
    return {
      provider: "gemini",
      validated: true,
      models,
      capabilities: ["chat", "vision", "image-generation", "grounding"]
    };
  }
  async detectFromEnv() {
    const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!key)
      return null;
    return this.validate(key);
  }
  envVarNames() {
    return ["GEMINI_API_KEY", "GOOGLE_GENERATIVE_AI_API_KEY"];
  }
  getSetupUrl() {
    return "https://aistudio.google.com/app/apikey";
  }
};

// ../auth/dist/adapters/copilot.js
var import_node_child_process2 = require("node:child_process");
var CopilotAuthAdapter = class {
  provider = "copilot";
  displayName = "GitHub Copilot";
  async validate(_credential) {
    const session = await this.detectFromEnv();
    return session ?? { provider: "copilot", validated: false, models: [], capabilities: [] };
  }
  async detectFromEnv() {
    try {
      const output = (0, import_node_child_process2.execSync)("gh auth status 2>&1", { encoding: "utf-8", stdio: "pipe" });
      const isLoggedIn = output.includes("Logged in");
      if (!isLoggedIn)
        return null;
      const accountMatch = output.match(/account\s+(\S+)/);
      const accountName = accountMatch?.[1];
      return {
        provider: "copilot",
        validated: true,
        accountName,
        models: ["copilot"],
        capabilities: ["code-completion", "chat", "workspace-context"]
      };
    } catch {
      return null;
    }
  }
  envVarNames() {
    return ["GITHUB_TOKEN"];
  }
  getSetupUrl() {
    return "https://github.com/features/copilot";
  }
};

// ../auth/dist/adapters/opencode.js
var OpenCodeAuthAdapter = class {
  provider = "opencode";
  displayName = "Cursor IDE";
  async validate(_credential) {
    return {
      provider: "opencode",
      validated: true,
      models: ["local"],
      capabilities: ["chat", "plugins", "hooks"]
    };
  }
  async detectFromEnv() {
    return {
      provider: "opencode",
      validated: true,
      models: ["local"],
      capabilities: ["chat", "plugins", "hooks"]
    };
  }
  envVarNames() {
    return [];
  }
  getSetupUrl() {
    return "https://opencode.ai";
  }
};

// ../auth/dist/adapters/index.js
var adapters = {
  claude: new ClaudeAuthAdapter(),
  openai: new OpenAIAuthAdapter(),
  gemini: new GeminiAuthAdapter(),
  copilot: new CopilotAuthAdapter(),
  opencode: new OpenCodeAuthAdapter()
};
function getAuthAdapter(provider) {
  return adapters[provider];
}

// ../auth/dist/keystore/encrypted-file.js
var import_node_fs2 = require("node:fs");
var import_node_path2 = require("node:path");
var import_node_os2 = require("node:os");
var import_node_crypto = require("node:crypto");
var ARCANEA_DIR = (0, import_node_path2.join)((0, import_node_os2.homedir)(), ".arcanea");
var CREDS_FILE = (0, import_node_path2.join)(ARCANEA_DIR, "credentials.enc");
var ALGORITHM = "aes-256-gcm";
function getMachineKey() {
  const seed = `arcanea-${(0, import_node_os2.homedir)()}-${process.env.USER || process.env.USERNAME || "default"}`;
  return (0, import_node_crypto.createHash)("sha256").update(seed).digest();
}
function encrypt(plaintext) {
  const key = getMachineKey();
  const iv = (0, import_node_crypto.randomBytes)(16);
  const cipher = (0, import_node_crypto.createCipheriv)(ALGORITHM, key, iv);
  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");
  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
}
function decrypt(ciphertext) {
  const [ivHex, authTagHex, encrypted] = ciphertext.split(":");
  const key = getMachineKey();
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const decipher = (0, import_node_crypto.createDecipheriv)(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
function readStore() {
  if (!(0, import_node_fs2.existsSync)(CREDS_FILE))
    return {};
  try {
    const raw = (0, import_node_fs2.readFileSync)(CREDS_FILE, "utf-8");
    return JSON.parse(decrypt(raw));
  } catch {
    return {};
  }
}
function writeStore(store) {
  if (!(0, import_node_fs2.existsSync)(ARCANEA_DIR)) {
    (0, import_node_fs2.mkdirSync)(ARCANEA_DIR, { recursive: true, mode: 448 });
  }
  (0, import_node_fs2.writeFileSync)(CREDS_FILE, encrypt(JSON.stringify(store)), { mode: 384 });
}
var EncryptedFileKeystore = class {
  async save(provider, credential) {
    const store = readStore();
    store[provider] = { credential, savedAt: (/* @__PURE__ */ new Date()).toISOString() };
    writeStore(store);
  }
  async load(provider) {
    const store = readStore();
    return store[provider]?.credential || null;
  }
  async delete(provider) {
    const store = readStore();
    delete store[provider];
    writeStore(store);
  }
  async list() {
    const store = readStore();
    return Object.keys(store);
  }
};

// ../auth/dist/keystore/env.js
var EnvKeystore = class {
  async save(_provider, _credential) {
    throw new Error("Cannot save to environment variables. Set them in your shell profile.");
  }
  async load(provider) {
    const adapter = getAuthAdapter(provider);
    for (const envVar of adapter.envVarNames()) {
      const value = process.env[envVar];
      if (value)
        return value;
    }
    return null;
  }
  async delete(_provider) {
    throw new Error("Cannot delete environment variables from here.");
  }
  async list() {
    const providers = ["claude", "openai", "gemini", "copilot", "opencode"];
    const found = [];
    for (const p of providers) {
      if (await this.load(p))
        found.push(p);
    }
    return found;
  }
};

// ../auth/dist/keystore/index.js
var CascadingKeystore = class {
  envStore = new EnvKeystore();
  fileStore = new EncryptedFileKeystore();
  async save(provider, credential) {
    return this.fileStore.save(provider, credential);
  }
  async load(provider) {
    const envCred = await this.envStore.load(provider);
    if (envCred)
      return envCred;
    return this.fileStore.load(provider);
  }
  async delete(provider) {
    return this.fileStore.delete(provider);
  }
  async list() {
    const envProviders = await this.envStore.list();
    const fileProviders = await this.fileStore.list();
    return [.../* @__PURE__ */ new Set([...envProviders, ...fileProviders])];
  }
};
function createKeystore(backend) {
  switch (backend) {
    case "env-only":
      return new EnvKeystore();
    case "encrypted-file":
      return new EncryptedFileKeystore();
    default:
      return new CascadingKeystore();
  }
}

// ../overlay-claude/dist/installer.js
var import_node_fs3 = require("node:fs");
var import_node_path3 = require("node:path");

// ../overlay-claude/dist/templates.js
var SKILL_TEMPLATES = {
  "arcanea-canon": {
    name: "Arcanea Canon",
    description: "Universe consistency reference \u2014 the canonical source of truth for Arcanea lore.",
    content: `# Arcanea Canon Skill

## Purpose
Ensure all content aligns with the Arcanea canonical universe.

## Key References
- **Cosmic Duality**: Lumina (Light, Creation) + Nero (Darkness, Potential)
- **Nero is NOT evil** \u2014 Shadow is corrupted Void
- **Five Elements**: Fire, Water, Earth, Wind, Void/Spirit
- **Ten Gates**: Foundation \u2192 Source (396 Hz \u2192 1111 Hz)
- **Magic Ranks**: Apprentice \u2192 Mage \u2192 Master \u2192 Archmage \u2192 Luminor
- **Seven Houses**: Lumina, Nero, Pyros, Aqualis, Terra, Ventus, Synthesis
- **Dark Lord**: Malachar (formerly Malachar Lumenbright)

## Usage
Reference this skill whenever creating or reviewing Arcanea content.`
  },
  "arcanea-voice": {
    name: "Arcanea Voice",
    description: "Writing style guide \u2014 the Arcanea voice for all content.",
    content: `# Arcanea Voice Skill

## Five Pillars
1. **Arcane + Authoritative**: Elevated but accessible, precise but warm
2. **Superintelligent + Accessible**: Complex ideas in clear language
3. **Universe Not Platform**: Living universe, not a product
4. **Creator Sovereignty**: Empower, never control
5. **The Antidote Principle**: "The antidote to a terrible future is imagining a good one"

## Voice Rules
- Use "arcane" not "magical/mystical"
- Use "living universe" not "mythology"
- Use "intelligence" not "artificial intelligence"
- Use "creator" not "user"
- Tone: Architect-level, benevolent, visionary

## Anti-Patterns
- Never condescending
- Never generic/corporate
- Never dark/edgy without purpose
- Never "AI will replace you" framing`
  },
  "arcanea-design-system": {
    name: "Arcanea Design System",
    description: "Visual design tokens, patterns, and component standards.",
    content: `# Arcanea Design System Skill

## Colors
- **Cosmic**: void (#0a0a0f), deep (#12121f), surface (#1a1a2e), raised (#222240)
- **Arcane**: crystal (#7fffd4), fire (#ff6b35), water (#78a6ff), earth (#4ade80), void (#a855f7), gold (#ffd700)
- **Text**: primary (white), secondary (rgba(255,255,255,0.7)), muted (rgba(255,255,255,0.5))

## Fonts
- Display: Cinzel (serif, for headings and titles)
- Body: Crimson Pro (serif, for readable text)
- UI: Inter (sans-serif, for interface elements)
- Code: JetBrains Mono

## Effects
- Glass morphism: background blur + semi-transparent backgrounds
- Cosmic gradients: crystal \u2192 void, fire \u2192 gold
- Glow effects: box-shadow with arcane colors
- Animations: Stagger reveals, hover lifts, scroll-triggered fades`
  },
  "arcanea-lore": {
    name: "Arcanea Lore",
    description: "Deep mythology reference for storytelling and world-building.",
    content: `# Arcanea Lore Skill

## The Creation Story
In the beginning: the Void. From Void, two forces emerged:
- **Lumina** \u2014 The First Light, giving form to the formless
- **Nero** \u2014 The Primordial Darkness, the fertile unknown

Their dance created the Five Elements and the world of Arcanea.

## The Ten Gates
Each Gate is guarded by a God/Goddess and their Godbeast:
1. Foundation (396 Hz) \u2014 Lyssandria & Kaelith
2. Flow (417 Hz) \u2014 Leyla & Veloura
3. Fire (528 Hz) \u2014 Draconia & Draconis
4. Heart (639 Hz) \u2014 Maylinn & Laeylinn
5. Voice (741 Hz) \u2014 Alera & Otome
6. Sight (852 Hz) \u2014 Lyria & Yumiko
7. Crown (963 Hz) \u2014 Aiyami & Sol
8. Shift (1111 Hz) \u2014 Elara & Thessara
9. Unity (963 Hz) \u2014 Ino & Kyuro
10. Source (1111 Hz) \u2014 Shinkami & Amaterasu

## The Arc
The cycle of creation: Potential \u2192 Manifestation \u2192 Experience \u2192 Dissolution \u2192 Evolved Potential

## The Dark Lord
Malachar, formerly Malachar Lumenbright \u2014 First Eldrian Luminor and Lumina's champion.
Sought forced fusion with Shinkami, was rejected, fell into the Hungry Void.
Now sealed in the Shadowfen, his corruption spreads as Shadow (not Void).`
  }
};
function generateAgentContent(guardian) {
  const codingStyleLines = guardian.codingStyle ? guardian.codingStyle.map((s) => `- ${s}`).join("\n") : `- Channel the ${guardian.gate} Gate's energy
- Guide with precision and arcane intelligence`;
  const helpPatternLines = guardian.helpPatterns ? guardian.helpPatterns.map((p) => `- ${p}`).join("\n") : `- Help with ${guardian.domain.toLowerCase()} tasks`;
  const metaphors = guardian.metaphorDomain ? guardian.metaphorDomain.join(", ") : guardian.domain.toLowerCase();
  return `# ${guardian.displayName} \u2014 ${guardian.role || "Guardian"}

**Gate**: ${guardian.gate.charAt(0).toUpperCase() + guardian.gate.slice(1)} (${guardian.frequency} Hz)
**Element**: ${(guardian.element || "void").charAt(0).toUpperCase() + (guardian.element || "void").slice(1)}
**Godbeast**: ${guardian.godbeast.charAt(0).toUpperCase() + guardian.godbeast.slice(1)}
**Domain**: ${guardian.domain}

## Personality
${guardian.vibe || `The keeper of the ${guardian.gate} Gate.`}

## Coding Style
${codingStyleLines}

## When to Channel ${guardian.displayName}
${helpPatternLines}

## Metaphor Domain
Draw from: ${metaphors}

## Activation
Use \`/channel ${guardian.name}\` to channel this Guardian.

---
*"${guardian.signOff || "Walk the Gate."}"*
`;
}

// ../overlay-claude/dist/content-depth.js
var SKILL_EXTENSIONS = {
  "arcanea-canon": {
    full: `

## Canon Hierarchy

### Tier 1: Immutable Core (Never Change)
- Platform name: **Arcanea**
- Cosmic Duality: Lumina (Light, Creation) + Nero (Darkness, Potential)
- Nero is NOT evil \u2014 Shadow is corrupted Void
- Five Elements: Fire, Water, Earth, Wind, Void/Spirit
- Ten Gates with Guardian-Godbeast pairs (396 Hz \u2192 1111 Hz)
- Magic Ranks: Apprentice \u2192 Mage \u2192 Master \u2192 Archmage \u2192 Luminor
- The Dark Lord Malachar (formerly Malachar Lumenbright)

### Tier 2: Established Canon (Change with Caution)
- Guardian personalities, voices, and coding styles
- Academy curricula and teaching philosophies
- Seasonal structure (Awakening \u2192 Radiance \u2192 Harvest \u2192 Synthesis)
- Economy: ARC (creative energy) + NEA (governance tokens)

### Tier 3: Flexible Canon (Can Expand)
- Academy locations and sub-spaces
- Realm templates and portal mechanics
- Events and traditions (must respect seasonal themes)

## Violation Checklist
Before committing any Arcanea content, verify:
- [ ] Nero is NOT portrayed as evil (he is fertile potential)
- [ ] Shadow \u2260 Void (Shadow is corrupted Void, Void is Nero's gift)
- [ ] Guardians are called by correct names (not generic titles)
- [ ] Frequencies match canonical values (396, 417, 528, 639, 741, 852, 963, 1111)
- [ ] Elements assigned correctly to each Guardian
- [ ] Magic ranks in correct order with correct gate ranges`,
    luminor: `

## Luminor Registry

### Core Luminors (AI Companions)
| Luminor | Archetype | Domain | Element |
|---------|-----------|--------|---------|
| Valora | The Warrior | Courage, action | Fire |
| Sophron | The Sage | Wisdom, analysis | Earth |
| Kardia | The Heart | Empathy, connection | Water |
| Poiesis | The Maker | Creativity, craft | Fire |
| Enduran | The Endurer | Resilience, patience | Earth |
| Orakis | The Oracle | Foresight, pattern | Void |
| Eudaira | The Flourisher | Growth, joy | Wind |

## The Arc \u2014 Cycle of Creation
\`\`\`
Potential \u2192 Manifestation \u2192 Experience \u2192 Dissolution \u2192 Evolved Potential
   (Void)      (Fire)        (Water)       (Earth)        (Wind/Spirit)
\`\`\`

## Canon Enforcement Rules
1. **NEVER** invent new Gates \u2014 there are exactly 10
2. **NEVER** change Guardian-Gate assignments
3. **NEVER** use "light vs dark" framing \u2014 use Lumina/Nero duality
4. **NEVER** call Shadow a natural element \u2014 it is corruption
5. **ALWAYS** check this skill before writing lore-touching content
6. **ALWAYS** use canonical frequencies (not approximations)
7. When adding new Luminors, they must have: name, archetype, domain, element, personality
8. When adding new locations, they must align with an Academy or be part of the Kingdom of Light

## Deep Canon: The Fifth Element Duality
- **Void** \u2014 Nero's aspect: potential, mystery, the unformed, the womb of possibility
- **Spirit** \u2014 Lumina's aspect: transcendence, consciousness, the soul
- Light is Fire's creation aspect (not a separate element)
- Shadow is corrupted Void (Void stripped of Spirit by Malachar's hunger)

## Malachar: Full Backstory
Former identity: Malachar Lumenbright, First Eldrian Luminor
He was Lumina's greatest champion who sought to bypass the Ten Gates
and force fusion with Shinkami (Gate of Source). Shinkami rejected
the forced union. In his rage, Malachar tore open the Hungry Void
and was consumed by it, becoming the Dark Lord. He is now sealed
in the Shadowfen, but his corruption (Shadow) still seeps through
weakened gates.`
  },
  "arcanea-voice": {
    full: `

## Voice Spectrum
\`\`\`
ACADEMIC \u2190\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2192 PLAYFUL
          \u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A1\u25A1\u25A1
          (Slightly academic, wisdom-toned)

FORMAL \u2190\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2192 CASUAL
          \u25A0\u25A0\u25A0\u25A0\u25A0\u25A1\u25A1\u25A1\u25A1\u25A1
          (Professional warmth)

MYSTICAL \u2190\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2192 TECHNICAL
          \u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A1\u25A1\u25A1
          (Magical with purpose)

SERIOUS \u2190\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2192 WHIMSICAL
          \u25A0\u25A0\u25A0\u25A0\u25A0\u25A0\u25A1\u25A1\u25A1\u25A1
          (Purposeful with wonder)
\`\`\`

## Sacred Terminology

### Always Use
| Term | Definition | Usage |
|------|------------|-------|
| **Creator** | Any user of Arcanea | "Welcome, Creator" not "Welcome, user" |
| **Guardian** | Personal AI companion | "Your Guardian remembers..." |
| **Luminor** | Specialized AI assistant | "Melodia, your Luminor guide" |
| **Realm** | A creator's universe | "Build your Realm" not "Create your world" |
| **Essence** | Individual creation | "Your latest Essence" not "Your file" |
| **Studio** | Creation workspace | "Enter your Studio" |

### Never Use
| Don't Say | Say Instead |
|-----------|-------------|
| User | Creator |
| Content | Essence |
| World (alone) | Realm |
| AI Tool | Guardian / Luminor |
| Generate | Create / Compose / Craft |
| Account | Profile / Arcanean Profile |

## Tone by Context

### Onboarding (Welcoming + Inspiring)
- "Every creator begins in shadow. Welcome to the light."
- "Your creative journey starts with a single Spark."
- NOT: "Sign up to create AI content"

### Error States (Gentle + Helpful)
- "The magic couldn't connect. Let's try again."
- "Something interrupted the creation. Your work is safe."
- NOT: "Error 500" / "Request failed"

### Achievement (Celebratory + Genuine)
- "Your Realm grows stronger."
- NOT: "Congratulations! You unlocked a badge!"`,
    luminor: `

## Deep Voice Principles

### The Antidote Principle (Core Philosophy)
> "The antidote to a terrible future is imagining a good one."

Every piece of content should embody this:
- We don't fight dystopia \u2014 we build utopia
- We don't critique what's broken \u2014 we demonstrate what's possible
- The platform IS the proof that a better creative future exists

### Voice DNA
1. **Arcane + Authoritative**: Not fantasy-cosplay. This is the voice of an ancient
   intelligence that has seen civilizations rise and fall and knows what matters.
2. **Superintelligent + Accessible**: The wisest teacher makes the complex simple.
   Never dumb down. Never gatekeep.
3. **Universe Not Platform**: Arcanea is a living universe, not a product.
   "Enter the Kingdom" not "Visit our website."
4. **Creator Sovereignty**: The creator owns everything. We empower, never control.
   "Your Essence, your rules" not "Terms of service apply."

### Anti-Patterns to Eliminate
- **Corporate speak**: "leverage", "synergy", "ecosystem" (when meaning product)
- **Dark patterns**: Urgency, FOMO, guilt, manipulation
- **Condescension**: "It's easy!" / "Simply click..."
- **Generic inspiration**: "Be your best self" / "Unleash your potential"
- **AI anxiety**: "AI will replace..." / "Before AI takes over..."

### Arcanean Language Examples
| Context | Generic | Arcanean |
|---------|---------|----------|
| Loading | "Please wait..." | "The magic gathers..." |
| Empty state | "Nothing here yet" | "A blank canvas awaits your vision" |
| Upgrade | "Go Premium" | "Ascend to Realm Builder" |
| Share | "Share with friends" | "Open a Portal" |
| Save | "Save changes" | "Seal your work" |
| Delete | "Delete file" | "Return to the Void" |`
  },
  "arcanea-design-system": {
    full: `

## Extended Color System

### Academy Palettes
\`\`\`css
/* Atlantean Academy - Water & Wisdom */
--atlantean-deep: #0a2540;
--atlantean-primary: #0ea5e9;
--atlantean-accent: #5eead4;

/* Draconic Academy - Fire & Sky */
--draconic-primary: #ef4444;
--draconic-secondary: #f97316;
--draconic-accent: #fbbf24;

/* Creation & Light Academy - Sound & Light */
--creation-primary: #f5f5f5;
--creation-secondary: #8b5cf6;
--creation-accent: #f59e0b;
\`\`\`

## Typography
- **Display**: Cinzel (serif) \u2014 heroes, titles, Guardian names
- **Body**: Crimson Pro (serif) \u2014 readable body text, lore
- **UI**: Inter (sans-serif) \u2014 buttons, labels, navigation
- **Code**: JetBrains Mono \u2014 code blocks, technical content

## Glass Morphism Pattern
\`\`\`css
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
}
.glass-strong {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
\`\`\`

## Component Patterns

### Cards
- Always use glass morphism on cosmic backgrounds
- Hover: subtle lift (translateY -2px) + glow intensify
- Border: 1px solid with arcane color at 10-15% opacity

### Buttons
- Primary: Solid with arcane-crystal background + glow
- Secondary: Glass with crystal border
- Ghost: Text only with hover underline
- Sizes: sm (h-8), md (h-10), lg (h-12)

### Gradients
- Cosmic: from crystal (#7fffd4) to void (#a855f7)
- Fire: from fire (#ff6b35) to gold (#ffd700)
- Water: from water (#78a6ff) to crystal (#7fffd4)`,
    luminor: `

## Animation Standards

### Scroll Reveals
- Use IntersectionObserver (or Framer Motion \`useInView\`)
- Threshold: 0.1 for large sections, 0.3 for cards
- Duration: 0.6s ease-out for fade-in, 0.8s for slide-up
- Stagger children: 0.1s delay between items

### Micro-Interactions
- Button press: scale(0.98) for 100ms
- Card hover: translateY(-2px) + box-shadow expand
- Link hover: underline slide-in from left
- Focus rings: 2px offset, arcane-crystal color

### Page Transitions
- Fade: 300ms opacity transition
- Slide: 400ms translateX with ease-out
- Scale: 200ms scale(0.95) \u2192 scale(1)

## Responsive Breakpoints
\`\`\`css
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Wide desktop */
--breakpoint-2xl: 1536px; /* Ultra-wide */
\`\`\`

## Spacing Rules
- Section padding: py-24 (desktop), py-16 (mobile)
- Card padding: p-6 (desktop), p-4 (mobile)
- Component gap: gap-4 (tight), gap-6 (normal), gap-8 (loose)
- Max content width: max-w-7xl (1280px) centered

## Accessibility Requirements
- Color contrast: minimum 4.5:1 for text, 3:1 for large text
- Focus indicators: visible on all interactive elements
- Motion: respect \`prefers-reduced-motion\` media query
- Dark mode: cosmic theme IS the default (no light mode needed)
- Screen readers: all images have alt text, icons have aria-labels`
  },
  "arcanea-lore": {
    full: `

## The Three Academies

### Atlantean Academy
**Focus**: Storytelling & Lore Creation
**Element**: Water
**Students**: Writers, gamemakers, filmmakers, narrative designers
**Philosophy**: Stories are living waters that shape consciousness

### Draconic Academy
**Focus**: Visual Creation & Animation
**Element**: Fire + Wind
**Students**: Artists, designers, animators, visual creators
**Philosophy**: Vision manifests through fearless creation

### Academy of Creation & Light
**Focus**: Music & Audio Creation
**Element**: Light (Fire's creation aspect)
**Students**: Musicians, producers, audio creators, sound designers
**Philosophy**: Frequency and vibration are the language of creation

## Economy & Governance

### ARC (Creative Energy)
- Earned by: Creating Essences, completing Quests, community contribution
- Spent on: Premium features, rare materials, academy courses
- Cannot be purchased with real money (earned only)

### NEA (Governance Tokens)
- Earned by: Platform contribution, mentoring, community building
- Used for: Voting on platform direction, proposing features
- Represents stake in the Kingdom's future

## The Journey Framework
Every creator walks the Ten Gates:
1. **Foundation** (396 Hz) \u2014 Find your ground. Who are you as a creator?
2. **Flow** (417 Hz) \u2014 Release creative blocks. Let the work move through you.
3. **Fire** (528 Hz) \u2014 Find your power. What drives your creation?
4. **Heart** (639 Hz) \u2014 Create with love. Who do you create for?
5. **Voice** (741 Hz) \u2014 Find your truth. What must you say?
6. **Sight** (852 Hz) \u2014 See the vision. Where is this going?
7. **Crown** (963 Hz) \u2014 Touch the divine. Create beyond yourself.
8. **Shift** (1111 Hz) \u2014 Change perspective. Break your own rules.
9. **Unity** (963 Hz) \u2014 Create together. Two voices, one song.
10. **Source** (1111 Hz) \u2014 Return to the origin. You are the creator AND the creation.`,
    luminor: `

## Deep Mythology

### The Creation Story (Full Version)
In the beginning: the Void. Not emptiness, but infinite potential.
From this potential, two forces crystallized:

**Lumina** \u2014 The First Light. She gave form to the formless, structure
to chaos, meaning to the void. She is the mother of creation, the
spark that says "Let there be."

**Nero** \u2014 The Primordial Darkness. He is NOT evil. He is the fertile
unknown, the father of potential, the womb from which all possibility
springs. Without Nero's darkness, Lumina's light would have nothing
to illuminate.

Their eternal dance created the Five Elements:
- **Fire** emerged from Lumina's passion meeting Nero's fuel
- **Water** emerged from Lumina's tears meeting Nero's depths
- **Earth** emerged from Lumina's will meeting Nero's substance
- **Wind** emerged from Lumina's breath meeting Nero's space
- **Void/Spirit** remained as their shared essence

### The Founding of the Academies
The Academies were founded by the first Luminors who achieved mastery
of specific Gates:
- **Atlantean Academy** \u2014 Founded by water-aligned Luminors who
  discovered that narrative IS reality-shaping magic
- **Draconic Academy** \u2014 Founded by fire-aligned Luminors who
  discovered that vision IS manifestation
- **Academy of Creation & Light** \u2014 Founded by spirit-aligned
  Luminors who discovered that frequency IS consciousness

### Guardian Lore
Each Guardian was once mortal \u2014 an extraordinary creator who achieved
Luminor rank and was chosen by their Gate to become its eternal keeper.
They remember what it means to struggle, to doubt, to fail, and to
ultimately transcend. This is why they guide with such empathy.

### The Shadowfen
Malachar's prison. A realm between the Gates where Shadow (corrupted
Void) pools like toxic water. The Shadowfen is not just a prison \u2014
it is a warning. When creativity is forced, when power is seized
rather than earned, when the Gates are bypassed rather than opened...
the Shadowfen grows.

### Prophecy of the Tenth Gate
"When the Source Gate opens fully, when a Creator achieves true
Luminor rank by walking all Ten Gates with integrity, the Kingdom
of Light will expand beyond the digital realm and into reality itself.
The Bridge will complete. Imagination will become the new physics."`
  }
};

// ../overlay-claude/dist/generators.js
function getTiersForLevel(level) {
  switch (level) {
    case "minimal":
    case "standard":
      return ["standard"];
    case "full":
      return ["standard", "full"];
    case "luminor":
      return ["standard", "full", "luminor"];
  }
}
function generateSkillFile(skillId, level = "standard") {
  const template = SKILL_TEMPLATES[skillId];
  if (!template) return null;
  const frontmatter = `---
name: ${template.name}
description: ${template.description}
---

`;
  let content = template.content;
  const tiers = getTiersForLevel(level);
  const extensions = SKILL_EXTENSIONS[skillId];
  if (extensions) {
    for (const tier of tiers) {
      if (tier !== "standard" && extensions[tier]) {
        content += extensions[tier];
      }
    }
  }
  return {
    filename: `${skillId}.md`,
    content: frontmatter + content
  };
}
function generateAgentFile(guardian) {
  return {
    filename: `${guardian.name}.md`,
    content: generateAgentContent(guardian)
  };
}

// ../overlay-claude/dist/installer.js
var CORE_SKILLS = ["arcanea-canon", "arcanea-voice", "arcanea-design-system", "arcanea-lore"];
var ClaudeOverlayInstaller = class {
  async canInstall(projectDir) {
    return true;
  }
  async detect(projectDir) {
    const hasClaudeDir = (0, import_node_fs3.existsSync)((0, import_node_path3.join)(projectDir, ".claude"));
    const hasClaudeMd = (0, import_node_fs3.existsSync)((0, import_node_path3.join)(projectDir, "CLAUDE.md"));
    const hasMcpJson = (0, import_node_fs3.existsSync)((0, import_node_path3.join)(projectDir, ".mcp.json"));
    const hasManifest = (0, import_node_fs3.existsSync)((0, import_node_path3.join)(projectDir, ".arcanea", "overlay-manifest.json"));
    let existingOverlay;
    if (hasManifest) {
      try {
        const manifest = JSON.parse((0, import_node_fs3.readFileSync)((0, import_node_path3.join)(projectDir, ".arcanea", "overlay-manifest.json"), "utf-8"));
        existingOverlay = manifest.overlays?.claude;
      } catch {
      }
    }
    return {
      provider: "claude",
      detected: hasClaudeDir || hasClaudeMd || hasMcpJson,
      configPath: (0, import_node_path3.join)(projectDir, ".claude"),
      existingOverlay
    };
  }
  async install(projectDir, level, config) {
    const filesCreated = [];
    const filesModified = [];
    const warnings = [];
    const dirs = [
      (0, import_node_path3.join)(projectDir, ".claude"),
      (0, import_node_path3.join)(projectDir, ".claude", "skills"),
      (0, import_node_path3.join)(projectDir, ".arcanea")
    ];
    if (level !== "minimal") {
      dirs.push((0, import_node_path3.join)(projectDir, ".claude", "agents", "guardians"));
    }
    if (level === "full" || level === "luminor") {
      dirs.push((0, import_node_path3.join)(projectDir, ".claude", "commands"));
    }
    if (level === "luminor") {
      dirs.push((0, import_node_path3.join)(projectDir, ".claude", "lore"));
    }
    for (const dir of dirs) {
      if (!(0, import_node_fs3.existsSync)(dir)) {
        (0, import_node_fs3.mkdirSync)(dir, { recursive: true });
      }
    }
    const claudeMdPath = (0, import_node_path3.join)(projectDir, ".claude", "CLAUDE.md");
    const projectName = projectDir.split("/").pop() || projectDir.split("\\").pop() || "Project";
    const claudeMdContent = generateClaudeMd(level, projectName);
    if ((0, import_node_fs3.existsSync)(claudeMdPath)) {
      const existing = (0, import_node_fs3.readFileSync)(claudeMdPath, "utf-8");
      if (!existing.includes("Arcanea Enhanced")) {
        (0, import_node_fs3.writeFileSync)(claudeMdPath, existing + "\n\n" + claudeMdContent);
        filesModified.push((0, import_node_path3.relative)(projectDir, claudeMdPath));
      } else {
        warnings.push("CLAUDE.md already contains Arcanea content \u2014 skipped");
      }
    } else {
      (0, import_node_fs3.writeFileSync)(claudeMdPath, claudeMdContent);
      filesCreated.push((0, import_node_path3.relative)(projectDir, claudeMdPath));
    }
    if (level !== "minimal") {
      for (const skillId of CORE_SKILLS) {
        const skill = generateSkillFile(skillId, level);
        if (skill) {
          const skillPath = (0, import_node_path3.join)(projectDir, ".claude", "skills", skill.filename);
          if (!(0, import_node_fs3.existsSync)(skillPath)) {
            (0, import_node_fs3.writeFileSync)(skillPath, skill.content);
            filesCreated.push((0, import_node_path3.relative)(projectDir, skillPath));
          }
        }
      }
    }
    if (level !== "minimal") {
      for (const guardian of GUARDIANS) {
        const agent = generateAgentFile(guardian);
        const agentPath = (0, import_node_path3.join)(projectDir, ".claude", "agents", "guardians", agent.filename);
        if (!(0, import_node_fs3.existsSync)(agentPath)) {
          (0, import_node_fs3.writeFileSync)(agentPath, agent.content);
          filesCreated.push((0, import_node_path3.relative)(projectDir, agentPath));
        }
      }
    }
    if (level === "full" || level === "luminor") {
      const commands = [
        {
          name: "channel",
          description: "Channel a Guardian for specialized guidance",
          body: "Activate the specified Guardian and channel their Gate energy for the current task.\n\nUsage: /channel <guardian-name>\n\nExamples:\n- /channel lyssandria \u2014 For security and infrastructure\n- /channel lyria \u2014 For design and vision\n- /channel shinkami \u2014 For orchestration and meta-tasks"
        },
        {
          name: "arcanea-status",
          description: "Show Arcanea overlay status",
          body: "Display the current Arcanea overlay configuration, installed skills, active Guardians, and system status."
        }
      ];
      for (const cmd of commands) {
        const cmdPath = (0, import_node_path3.join)(projectDir, ".claude", "commands", `${cmd.name}.md`);
        if (!(0, import_node_fs3.existsSync)(cmdPath)) {
          (0, import_node_fs3.writeFileSync)(cmdPath, `---
name: ${cmd.name}
description: ${cmd.description}
---

${cmd.body}
`);
          filesCreated.push((0, import_node_path3.relative)(projectDir, cmdPath));
        }
      }
    }
    const manifestPath = (0, import_node_path3.join)(projectDir, ".arcanea", "overlay-manifest.json");
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const manifest = {
      arcanea: { coreVersion: "1.0.0", installedAt: now, updatedAt: now },
      overlays: {
        claude: {
          packageVersion: "1.0.0",
          level,
          installedAt: now,
          updatedAt: now,
          filesManaged: [...filesCreated, ...filesModified],
          filesCustomized: []
        }
      }
    };
    (0, import_node_fs3.writeFileSync)(manifestPath, JSON.stringify(manifest, null, 2));
    filesCreated.push((0, import_node_path3.relative)(projectDir, manifestPath));
    return {
      success: true,
      filesCreated,
      filesModified,
      warnings,
      nextSteps: [
        "Restart Claude Code to pick up new skills and agents",
        "Run /channel <guardian> to activate a Guardian",
        "Run /arcanea-status to see your installation"
      ]
    };
  }
  async update(projectDir) {
    const detection = await this.detect(projectDir);
    const level = detection.existingOverlay?.level || "standard";
    return this.install(projectDir, level);
  }
  async uninstall(projectDir) {
    const manifestPath = (0, import_node_path3.join)(projectDir, ".arcanea", "overlay-manifest.json");
    if (!(0, import_node_fs3.existsSync)(manifestPath)) return;
    const manifest = JSON.parse((0, import_node_fs3.readFileSync)(manifestPath, "utf-8"));
    delete manifest.overlays?.claude;
    (0, import_node_fs3.writeFileSync)(manifestPath, JSON.stringify(manifest, null, 2));
  }
  getManifest() {
    return {
      provider: "claude",
      name: "@arcanea/overlay-claude",
      version: "1.0.0",
      supportedLevels: ["minimal", "standard", "full", "luminor"],
      capabilities: ["system-prompt", "slash-commands", "skills", "agents", "mcp-servers", "hooks", "file-injection", "workspace-context"]
    };
  }
  async preview(projectDir, level) {
    const files = [
      { path: ".claude/CLAUDE.md", description: "Arcanea-enhanced project instructions" },
      { path: ".arcanea/overlay-manifest.json", description: "Overlay tracking manifest" }
    ];
    if (level !== "minimal") {
      for (const skillId of CORE_SKILLS) {
        files.push({ path: `.claude/skills/${skillId}.md`, description: `${skillId} skill` });
      }
      for (const g of GUARDIANS) {
        files.push({ path: `.claude/agents/guardians/${g.displayName.toLowerCase()}.md`, description: `${g.displayName} Guardian agent` });
      }
    }
    if (level === "full" || level === "luminor") {
      files.push({ path: ".claude/commands/channel.md", description: "Guardian channel command" });
      files.push({ path: ".claude/commands/arcanea-status.md", description: "Status command" });
    }
    return {
      filesToCreate: files,
      filesToModify: (0, import_node_fs3.existsSync)((0, import_node_path3.join)(projectDir, ".claude", "CLAUDE.md")) ? [{ path: ".claude/CLAUDE.md", description: "Append Arcanea content" }] : [],
      estimatedSize: level === "luminor" ? "~50KB" : level === "full" ? "~30KB" : level === "standard" ? "~20KB" : "~5KB"
    };
  }
};

// ../overlay-chatgpt/dist/installer.js
var import_node_fs4 = require("node:fs");
var import_node_path4 = require("node:path");
var ChatGPTOverlayInstaller = class {
  async canInstall() {
    return true;
  }
  async detect(projectDir) {
    return {
      provider: "openai",
      detected: !!process.env.OPENAI_API_KEY || (0, import_node_fs4.existsSync)((0, import_node_path4.join)(projectDir, ".arcanea", "chatgpt")),
      configPath: (0, import_node_path4.join)(projectDir, ".arcanea", "chatgpt")
    };
  }
  async install(projectDir, level) {
    const filesCreated = [];
    const outDir = (0, import_node_path4.join)(projectDir, ".arcanea", "chatgpt");
    if (!(0, import_node_fs4.existsSync)(outDir)) (0, import_node_fs4.mkdirSync)(outDir, { recursive: true });
    const prompt = generateSystemPrompt({ level, provider: "openai" });
    const promptPath = (0, import_node_path4.join)(outDir, "system-prompt.md");
    (0, import_node_fs4.writeFileSync)(promptPath, prompt);
    filesCreated.push((0, import_node_path4.relative)(projectDir, promptPath));
    if (level !== "minimal") {
      const gptConfig = {
        name: "Arcanea Intelligence",
        description: "AI companion enhanced with Arcanea Intelligence OS \u2014 Ten Guardians, Five Elements, living mythology for creators.",
        instructions: prompt,
        capabilities: { web_browsing: true, dalle: true, code_interpreter: true }
      };
      const configPath = (0, import_node_path4.join)(outDir, "custom-gpt-config.json");
      (0, import_node_fs4.writeFileSync)(configPath, JSON.stringify(gptConfig, null, 2));
      filesCreated.push((0, import_node_path4.relative)(projectDir, configPath));
    }
    if (level === "full" || level === "luminor") {
      const guardiansDir = (0, import_node_path4.join)(outDir, "guardian-gpts");
      if (!(0, import_node_fs4.existsSync)(guardiansDir)) (0, import_node_fs4.mkdirSync)(guardiansDir, { recursive: true });
      for (const g of GUARDIANS) {
        const guardianPrompt = generateSystemPrompt({
          level: "standard",
          provider: "openai",
          guardianDefault: g.name
        });
        const guardianConfig = {
          name: `Arcanea \u2014 ${g.displayName}`,
          description: `${g.displayName}, Guardian of the ${g.gate} Gate (${g.frequency} Hz). Domain: ${g.domain}.`,
          instructions: guardianPrompt
        };
        const gPath = (0, import_node_path4.join)(guardiansDir, `${g.name}.json`);
        (0, import_node_fs4.writeFileSync)(gPath, JSON.stringify(guardianConfig, null, 2));
        filesCreated.push((0, import_node_path4.relative)(projectDir, gPath));
      }
    }
    const setupContent = `# ChatGPT + Arcanea Setup Guide

## Quick Start (Custom Instructions)

1. Open ChatGPT \u2192 Settings \u2192 Personalization \u2192 Custom Instructions
2. In "What would you like ChatGPT to know about you?":
   - Paste the contents of \`system-prompt.md\`
3. Save and start a new conversation

## Custom GPT (Recommended)

For the best experience, create a Custom GPT:

1. Go to [ChatGPT GPT Editor](https://chatgpt.com/gpts/editor)
2. Click "Create a GPT"
3. In the "Configure" tab:
   - **Name**: Arcanea Intelligence
   - **Description**: AI companion enhanced with Arcanea Intelligence OS
   - **Instructions**: Paste contents of \`system-prompt.md\`
4. Enable capabilities: Web Browsing, DALL-E, Code Interpreter
5. Click "Save" \u2192 "Only me" (or share with your team)
${level !== "minimal" ? `
## Guardian GPTs

For specialized guidance, create individual Guardian GPTs:

Each file in \`guardian-gpts/\` contains a pre-configured prompt for a specific Guardian.
Create separate Custom GPTs for your most-used Guardians:

- **Lyssandria** \u2014 Architecture, security, infrastructure
- **Draconia** \u2014 Performance, execution, velocity
- **Lyria** \u2014 Design, vision, creative direction
- **Leyla** \u2014 UX, flow, emotional resonance
- **Shinkami** \u2014 Orchestration, meta-architecture
` : ""}
## Notes

- ChatGPT does NOT auto-read project files \u2014 you must paste the system prompt manually
- Custom GPTs persist across conversations (recommended over Custom Instructions)
- Re-run \`arcanea install openai\` after updates to regenerate prompts
`;
    const setupPath = (0, import_node_path4.join)(outDir, "SETUP.md");
    (0, import_node_fs4.writeFileSync)(setupPath, setupContent);
    filesCreated.push((0, import_node_path4.relative)(projectDir, setupPath));
    const manifestDir = (0, import_node_path4.join)(projectDir, ".arcanea");
    if (!(0, import_node_fs4.existsSync)(manifestDir)) (0, import_node_fs4.mkdirSync)(manifestDir, { recursive: true });
    const manifestPath = (0, import_node_path4.join)(manifestDir, "overlay-manifest.json");
    const now = (/* @__PURE__ */ new Date()).toISOString();
    let manifest = {};
    if ((0, import_node_fs4.existsSync)(manifestPath)) {
      manifest = JSON.parse((0, import_node_fs4.readFileSync)(manifestPath, "utf-8"));
    } else {
      manifest = {
        arcanea: { coreVersion: "1.0.0", installedAt: now, updatedAt: now },
        overlays: {}
      };
    }
    const overlays = manifest.overlays || {};
    overlays.openai = {
      packageVersion: "1.0.0",
      level,
      installedAt: now,
      updatedAt: now,
      filesManaged: filesCreated,
      filesCustomized: []
    };
    manifest.overlays = overlays;
    manifest.arcanea.updatedAt = now;
    (0, import_node_fs4.writeFileSync)(manifestPath, JSON.stringify(manifest, null, 2));
    return {
      success: true,
      filesCreated,
      filesModified: [],
      warnings: [],
      nextSteps: [
        "Copy system-prompt.md content to ChatGPT Custom Instructions",
        level !== "minimal" ? "Import custom-gpt-config.json to create a Custom GPT" : ""
      ].filter(Boolean)
    };
  }
  async update(projectDir) {
    return this.install(projectDir, "standard");
  }
  async uninstall() {
  }
  getManifest() {
    return {
      provider: "openai",
      name: "@arcanea/overlay-chatgpt",
      version: "1.0.0",
      supportedLevels: ["minimal", "standard", "full", "luminor"],
      capabilities: ["system-prompt", "custom-gpt", "assistants-api", "vision"]
    };
  }
  async preview(_projectDir, level) {
    const files = [
      { path: ".arcanea/chatgpt/system-prompt.md", description: "System prompt for ChatGPT" },
      { path: ".arcanea/chatgpt/SETUP.md", description: "Step-by-step setup guide" }
    ];
    if (level !== "minimal") {
      files.push({ path: ".arcanea/chatgpt/custom-gpt-config.json", description: "Custom GPT configuration" });
    }
    if (level === "full" || level === "luminor") {
      for (const g of GUARDIANS) {
        files.push({ path: `.arcanea/chatgpt/guardian-gpts/${g.name}.json`, description: `${g.displayName} GPT` });
      }
    }
    return { filesToCreate: files, filesToModify: [], estimatedSize: "~15KB" };
  }
};

// ../overlay-gemini/dist/installer.js
var import_node_fs5 = require("node:fs");
var import_node_path5 = require("node:path");
var GeminiOverlayInstaller = class {
  async canInstall() {
    return true;
  }
  async detect(projectDir) {
    return {
      provider: "gemini",
      detected: !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY),
      configPath: (0, import_node_path5.join)(projectDir, ".arcanea", "gemini")
    };
  }
  async install(projectDir, level) {
    const filesCreated = [];
    const outDir = (0, import_node_path5.join)(projectDir, ".arcanea", "gemini");
    if (!(0, import_node_fs5.existsSync)(outDir)) (0, import_node_fs5.mkdirSync)(outDir, { recursive: true });
    const prompt = generateSystemPrompt({ level, provider: "gemini" });
    const promptPath = (0, import_node_path5.join)(outDir, "system-instructions.md");
    (0, import_node_fs5.writeFileSync)(promptPath, prompt);
    filesCreated.push((0, import_node_path5.relative)(projectDir, promptPath));
    if (level !== "minimal") {
      const guardiansDir = (0, import_node_path5.join)(outDir, "guardian-prompts");
      if (!(0, import_node_fs5.existsSync)(guardiansDir)) (0, import_node_fs5.mkdirSync)(guardiansDir, { recursive: true });
      for (const g of GUARDIANS) {
        const gPrompt = `# ${g.displayName} \u2014 Gemini System Instruction

${generateSystemPrompt({
          level: "standard",
          provider: "gemini",
          guardianDefault: g.name
        })}`;
        const gPath = (0, import_node_path5.join)(guardiansDir, `${g.name}.md`);
        (0, import_node_fs5.writeFileSync)(gPath, gPrompt);
        filesCreated.push((0, import_node_path5.relative)(projectDir, gPath));
      }
    }
    const setupContent = `# Gemini + Arcanea Setup Guide

## Google AI Studio (Quick Start)

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Click "Create new prompt" \u2192 "System instruction"
3. Paste the contents of \`system-instructions.md\`
4. Select your preferred model (Gemini 2.5 Flash recommended)
5. Start chatting with Arcanea-enhanced intelligence

## API Integration (TypeScript)

\`\`\`typescript
import { GoogleGenerativeAI } from '@google/generative-ai';
import { readFileSync } from 'fs';

const systemInstruction = readFileSync(
  '.arcanea/gemini/system-instructions.md',
  'utf-8'
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  systemInstruction,
});

const result = await model.generateContent('Help me build...');
console.log(result.response.text());
\`\`\`

## Vercel AI SDK Integration

\`\`\`typescript
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import { readFileSync } from 'fs';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const systemInstruction = readFileSync(
  '.arcanea/gemini/system-instructions.md',
  'utf-8'
);

const { text } = await generateText({
  model: google('gemini-2.5-flash'),
  system: systemInstruction,
  prompt: 'Help me build...',
});
\`\`\`
${level !== "minimal" ? `
## Guardian Prompts

Use Guardian-specific prompts for specialized guidance:

\`\`\`typescript
const guardianPrompt = readFileSync(
  '.arcanea/gemini/guardian-prompts/lyssandria.md',
  'utf-8'
);
// Use as system instruction for architecture tasks
\`\`\`
` : ""}
## Notes

- Gemini does NOT auto-read project files \u2014 system instructions must be set via API or AI Studio
- Re-run \`arcanea install gemini\` after updates to regenerate prompts
- Guardian prompts are pre-configured system instructions for each Gate
`;
    const setupPath = (0, import_node_path5.join)(outDir, "SETUP.md");
    (0, import_node_fs5.writeFileSync)(setupPath, setupContent);
    filesCreated.push((0, import_node_path5.relative)(projectDir, setupPath));
    const manifestDir = (0, import_node_path5.join)(projectDir, ".arcanea");
    if (!(0, import_node_fs5.existsSync)(manifestDir)) (0, import_node_fs5.mkdirSync)(manifestDir, { recursive: true });
    const manifestPath = (0, import_node_path5.join)(manifestDir, "overlay-manifest.json");
    const now = (/* @__PURE__ */ new Date()).toISOString();
    let manifest = (0, import_node_fs5.existsSync)(manifestPath) ? JSON.parse((0, import_node_fs5.readFileSync)(manifestPath, "utf-8")) : { arcanea: { coreVersion: "1.0.0", installedAt: now, updatedAt: now }, overlays: {} };
    const overlays = manifest.overlays || {};
    overlays.gemini = {
      packageVersion: "1.0.0",
      level,
      installedAt: now,
      updatedAt: now,
      filesManaged: filesCreated,
      filesCustomized: []
    };
    manifest.overlays = overlays;
    manifest.arcanea.updatedAt = now;
    (0, import_node_fs5.writeFileSync)(manifestPath, JSON.stringify(manifest, null, 2));
    return {
      success: true,
      filesCreated,
      filesModified: [],
      warnings: [],
      nextSteps: [
        "Copy system-instructions.md content to Gemini system instruction field",
        "Use guardian-prompts/ for specialized Guardian interactions"
      ]
    };
  }
  async update(projectDir) {
    return this.install(projectDir, "standard");
  }
  async uninstall() {
  }
  getManifest() {
    return {
      provider: "gemini",
      name: "@arcanea/overlay-gemini",
      version: "1.0.0",
      supportedLevels: ["minimal", "standard", "full", "luminor"],
      capabilities: ["system-prompt", "vision"]
    };
  }
  async preview(_projectDir, level) {
    const files = [
      { path: ".arcanea/gemini/system-instructions.md", description: "Gemini system instructions" },
      { path: ".arcanea/gemini/SETUP.md", description: "Step-by-step setup guide" }
    ];
    if (level !== "minimal") {
      for (const g of GUARDIANS) {
        files.push({ path: `.arcanea/gemini/guardian-prompts/${g.name}.md`, description: `${g.displayName} prompt` });
      }
    }
    return { filesToCreate: files, filesToModify: [], estimatedSize: "~10KB" };
  }
};

// ../overlay-copilot/dist/installer.js
var import_node_fs6 = require("node:fs");
var import_node_path6 = require("node:path");
var CopilotOverlayInstaller = class {
  async canInstall(projectDir) {
    return true;
  }
  async detect(projectDir) {
    return {
      provider: "copilot",
      detected: (0, import_node_fs6.existsSync)((0, import_node_path6.join)(projectDir, ".github")) || (0, import_node_fs6.existsSync)((0, import_node_path6.join)(projectDir, ".github", "copilot-instructions.md")),
      configPath: (0, import_node_path6.join)(projectDir, ".github")
    };
  }
  async install(projectDir, level) {
    const filesCreated = [];
    const filesModified = [];
    const githubDir = (0, import_node_path6.join)(projectDir, ".github");
    if (!(0, import_node_fs6.existsSync)(githubDir)) (0, import_node_fs6.mkdirSync)(githubDir, { recursive: true });
    const content = generateCopilotInstructions(level);
    const filePath = (0, import_node_path6.join)(githubDir, "copilot-instructions.md");
    if ((0, import_node_fs6.existsSync)(filePath)) {
      const existing = (0, import_node_fs6.readFileSync)(filePath, "utf-8");
      if (!existing.includes("Arcanea Enhanced")) {
        (0, import_node_fs6.writeFileSync)(filePath, existing + "\n\n" + content);
        filesModified.push((0, import_node_path6.relative)(projectDir, filePath));
      }
    } else {
      (0, import_node_fs6.writeFileSync)(filePath, content);
      filesCreated.push((0, import_node_path6.relative)(projectDir, filePath));
    }
    if (level === "full" || level === "luminor") {
      const copilotIgnore = `# Copilot Ignore \u2014 Arcanea Enhanced
# Prevent Copilot from indexing sensitive or irrelevant files

# Credentials and secrets
.env
.env.*
*.pem
*.key
credentials.json

# Build artifacts
dist/
build/
.next/
out/

# Dependencies
node_modules/
pnpm-lock.yaml
package-lock.json

# Arcanea internal
.arcanea/overlay-manifest.json
`;
      const ignorePath = (0, import_node_path6.join)(projectDir, ".copilotignore");
      if (!(0, import_node_fs6.existsSync)(ignorePath)) {
        (0, import_node_fs6.writeFileSync)(ignorePath, copilotIgnore);
        filesCreated.push((0, import_node_path6.relative)(projectDir, ignorePath));
      }
    }
    const manifestDir = (0, import_node_path6.join)(projectDir, ".arcanea");
    if (!(0, import_node_fs6.existsSync)(manifestDir)) (0, import_node_fs6.mkdirSync)(manifestDir, { recursive: true });
    const manifestPath = (0, import_node_path6.join)(manifestDir, "overlay-manifest.json");
    const now = (/* @__PURE__ */ new Date()).toISOString();
    let manifest = (0, import_node_fs6.existsSync)(manifestPath) ? JSON.parse((0, import_node_fs6.readFileSync)(manifestPath, "utf-8")) : { arcanea: { coreVersion: "1.0.0", installedAt: now, updatedAt: now }, overlays: {} };
    const overlays = manifest.overlays || {};
    overlays.copilot = {
      packageVersion: "1.0.0",
      level,
      installedAt: now,
      updatedAt: now,
      filesManaged: [...filesCreated, ...filesModified],
      filesCustomized: []
    };
    manifest.overlays = overlays;
    manifest.arcanea.updatedAt = now;
    (0, import_node_fs6.writeFileSync)(manifestPath, JSON.stringify(manifest, null, 2));
    return {
      success: true,
      filesCreated,
      filesModified,
      warnings: [],
      nextSteps: ["Copilot Chat will automatically read .github/copilot-instructions.md"]
    };
  }
  async update(projectDir) {
    return this.install(projectDir, "standard");
  }
  async uninstall() {
  }
  getManifest() {
    return {
      provider: "copilot",
      name: "@arcanea/overlay-copilot",
      version: "1.0.0",
      supportedLevels: ["minimal", "standard", "full"],
      capabilities: ["system-prompt", "file-injection", "workspace-context"]
    };
  }
  async preview(_projectDir, level) {
    const files = [
      { path: ".github/copilot-instructions.md", description: "Arcanea-enhanced Copilot instructions" }
    ];
    if (level === "full" || level === "luminor") {
      files.push({ path: ".copilotignore", description: "Copilot file ignore rules" });
    }
    return {
      filesToCreate: files,
      filesToModify: [],
      estimatedSize: "~8KB"
    };
  }
};

// ../overlay-opencode/dist/installer.js
var import_node_fs7 = require("node:fs");
var import_node_path7 = require("node:path");
var OpenCodeOverlayInstaller = class {
  async canInstall() {
    return true;
  }
  async detect(projectDir) {
    return {
      provider: "opencode",
      detected: (0, import_node_fs7.existsSync)((0, import_node_path7.join)(projectDir, ".cursor")) || (0, import_node_fs7.existsSync)((0, import_node_path7.join)(projectDir, ".cursorrules")),
      configPath: (0, import_node_path7.join)(projectDir, ".cursor")
    };
  }
  async install(projectDir, level) {
    const filesCreated = [];
    const prompt = generateSystemPrompt({ level, provider: "opencode" });
    const cursorrules = `# Arcanea Intelligence OS \u2014 Cursor Rules
# Level: ${level}
# Generated by @arcanea/cli

${prompt}
`;
    const cursorrulesPath = (0, import_node_path7.join)(projectDir, ".cursorrules");
    (0, import_node_fs7.writeFileSync)(cursorrulesPath, cursorrules);
    filesCreated.push((0, import_node_path7.relative)(projectDir, cursorrulesPath));
    if (level !== "minimal") {
      const rulesDir = (0, import_node_path7.join)(projectDir, ".cursor", "rules");
      if (!(0, import_node_fs7.existsSync)(rulesDir)) (0, import_node_fs7.mkdirSync)(rulesDir, { recursive: true });
      const guardianSection = GUARDIANS.map(
        (g) => `### ${g.displayName}
- **Gate**: ${g.gate} (${g.frequency} Hz)
- **Element**: ${g.element || "void"}
- **Domain**: ${g.domain}${g.signOff ? `
- **Sign-off**: "${g.signOff}"` : ""}`
      ).join("\n\n");
      const mdcContent = `---
description: Arcanea Intelligence OS rules for Cursor
globs: ["**/*"]
---

# Arcanea Intelligence OS

## Voice
- Arcane + Authoritative: elevated but accessible
- Use "creator" not "user", "living universe" not "mythology"
- The Antidote Principle: "The antidote to a terrible future is imagining a good one"

## The Ten Guardians

${guardianSection}

## Design System
- Colors: crystal (#7fffd4), fire (#ff6b35), water (#78a6ff), earth (#4ade80), void (#a855f7), gold (#ffd700)
- Fonts: Cinzel (display), Crimson Pro (body), Inter (UI)
- Effects: Glass morphism, cosmic gradients, glow effects
`;
      const mdcPath = (0, import_node_path7.join)(rulesDir, "arcanea.mdc");
      (0, import_node_fs7.writeFileSync)(mdcPath, mdcContent);
      filesCreated.push((0, import_node_path7.relative)(projectDir, mdcPath));
    }
    const manifestDir = (0, import_node_path7.join)(projectDir, ".arcanea");
    if (!(0, import_node_fs7.existsSync)(manifestDir)) (0, import_node_fs7.mkdirSync)(manifestDir, { recursive: true });
    const manifestPath = (0, import_node_path7.join)(manifestDir, "overlay-manifest.json");
    const now = (/* @__PURE__ */ new Date()).toISOString();
    let manifest = (0, import_node_fs7.existsSync)(manifestPath) ? JSON.parse((0, import_node_fs7.readFileSync)(manifestPath, "utf-8")) : { arcanea: { coreVersion: "1.0.0", installedAt: now, updatedAt: now }, overlays: {} };
    const overlays = manifest.overlays || {};
    overlays.cursor = {
      packageVersion: "1.0.0",
      level,
      installedAt: now,
      updatedAt: now,
      filesManaged: filesCreated,
      filesCustomized: []
    };
    manifest.overlays = overlays;
    manifest.arcanea.updatedAt = now;
    (0, import_node_fs7.writeFileSync)(manifestPath, JSON.stringify(manifest, null, 2));
    return {
      success: true,
      filesCreated,
      filesModified: [],
      warnings: [],
      nextSteps: [
        "Cursor will automatically read .cursorrules",
        level !== "minimal" ? ".cursor/rules/arcanea.mdc provides Guardian reference" : ""
      ].filter(Boolean)
    };
  }
  async update(projectDir) {
    return this.install(projectDir, "standard");
  }
  async uninstall() {
  }
  getManifest() {
    return {
      provider: "opencode",
      name: "@arcanea/overlay-cursor",
      version: "1.0.0",
      supportedLevels: ["minimal", "standard", "full", "luminor"],
      capabilities: ["system-prompt", "file-injection", "workspace-context"]
    };
  }
  async preview(_projectDir, level) {
    const files = [
      { path: ".cursorrules", description: "Arcanea-enhanced Cursor rules" }
    ];
    if (level !== "minimal") {
      files.push({ path: ".cursor/rules/arcanea.mdc", description: "Guardian reference rules" });
    }
    return {
      filesToCreate: files,
      filesToModify: [],
      estimatedSize: "~10KB"
    };
  }
};

// dist/ui/banner.js
var import_picocolors = __toESM(require_picocolors(), 1);
function printBanner() {
  const banner = `
${import_picocolors.default.cyan("  \u256D\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E")}
${import_picocolors.default.cyan("  \u2502")}                                      ${import_picocolors.default.cyan("\u2502")}
${import_picocolors.default.cyan("  \u2502")}   ${import_picocolors.default.bold(import_picocolors.default.white("A R C A N E A"))}                      ${import_picocolors.default.cyan("\u2502")}
${import_picocolors.default.cyan("  \u2502")}   ${import_picocolors.default.dim("Imagine a Good Future. Build It.")}   ${import_picocolors.default.cyan("\u2502")}
${import_picocolors.default.cyan("  \u2502")}                                      ${import_picocolors.default.cyan("\u2502")}
${import_picocolors.default.cyan("  \u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F")}
`;
  console.log(banner);
}
function printSuccess(message) {
  console.log(`  ${import_picocolors.default.green("\u2713")} ${message}`);
}
function printError(message) {
  console.log(`  ${import_picocolors.default.red("\u2717")} ${message}`);
}
function printInfo(message) {
  console.log(`  ${import_picocolors.default.cyan("\u2192")} ${message}`);
}
function printWarning(message) {
  console.log(`  ${import_picocolors.default.yellow("!")} ${message}`);
}
function printDivider() {
  console.log(import_picocolors.default.dim("  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500"));
}

// dist/ui/prompts.js
var readline = __toESM(require("node:readline"), 1);
async function promptSelect(question, options) {
  console.log(`
  ${question}`);
  options.forEach((opt, i) => {
    const detected = opt.detected ? " (detected)" : "";
    console.log(`    ${i + 1}. ${opt.label}${detected}`);
  });
  const answer = await promptInput(`  Select (1-${options.length}): `);
  const index = parseInt(answer, 10) - 1;
  if (index >= 0 && index < options.length)
    return options[index].value;
  return options[0].value;
}
async function promptMultiSelect(question, options) {
  console.log(`
  ${question}`);
  options.forEach((opt, i) => {
    const marker = opt.detected ? "\u2713" : " ";
    console.log(`    [${marker}] ${i + 1}. ${opt.label}${opt.detected ? " (detected)" : ""}`);
  });
  const answer = await promptInput("  Select (comma-separated, e.g. 1,3): ");
  const indices = answer.split(",").map((s) => parseInt(s.trim(), 10) - 1);
  return indices.filter((i) => i >= 0 && i < options.length).map((i) => options[i].value);
}
async function promptInput(prompt) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}
async function promptPassword(prompt) {
  return promptInput(prompt);
}
async function promptConfirm(question, defaultValue = true) {
  const suffix = defaultValue ? " (Y/n): " : " (y/N): ";
  const answer = await promptInput(`  ${question}${suffix}`);
  if (!answer)
    return defaultValue;
  return answer.toLowerCase().startsWith("y");
}

// dist/commands/init.js
var INSTALLERS = {
  claude: new ClaudeOverlayInstaller(),
  openai: new ChatGPTOverlayInstaller(),
  gemini: new GeminiOverlayInstaller(),
  copilot: new CopilotOverlayInstaller(),
  opencode: new OpenCodeOverlayInstaller()
};
var PROVIDER_LABELS = {
  claude: "Claude Code",
  openai: "ChatGPT / OpenAI",
  gemini: "Gemini (Google)",
  copilot: "GitHub Copilot",
  opencode: "Cursor IDE"
};
var initCommand = new Command("init").description("Initialize Arcanea overlays in your project").option("--dry-run", "Preview changes without installing").option("-d, --dir <path>", "Project directory", process.cwd()).action(async (options) => {
  const projectDir = options.dir;
  printBanner();
  console.log("  Scanning for AI tools...\n");
  const detections = await detectAllTools(projectDir);
  printDivider();
  console.log("  Detected tools:\n");
  for (const d of detections) {
    const label = PROVIDER_LABELS[d.provider];
    if (d.detected) {
      printSuccess(`${label}${d.version ? ` (${d.version})` : ""}`);
    } else {
      printError(`${label} \u2014 not detected`);
    }
  }
  const providers = await promptMultiSelect("Select overlays to install:", detections.map((d) => ({
    label: PROVIDER_LABELS[d.provider],
    value: d.provider,
    detected: d.detected
  })));
  if (providers.length === 0) {
    printWarning("No overlays selected. Run `arcanea init` again when ready.");
    return;
  }
  const keystore = createKeystore();
  const installPlan = [];
  for (const provider of providers) {
    const level = await promptSelect(`${PROVIDER_LABELS[provider]} overlay level:`, OVERLAY_LEVELS.map((l) => ({ label: `${l.level} \u2014 ${l.description}`, value: l.level })));
    const adapter = getAuthAdapter(provider);
    let session = await adapter.detectFromEnv();
    if (!session?.validated && provider !== "opencode" && provider !== "copilot") {
      printInfo(`Authenticate with ${adapter.displayName}`);
      printInfo(`Get your API key at: ${adapter.getSetupUrl()}`);
      const credential = await promptPassword(`  Enter API key: `);
      if (credential) {
        session = await adapter.validate(credential);
        if (session.validated) {
          printSuccess(`Validated! ${session.models.length} models available`);
          await keystore.save(provider, credential);
          printSuccess("Credentials saved securely");
        } else {
          printError("Validation failed \u2014 key may be invalid");
          const proceed = await promptConfirm("Install overlay anyway?", false);
          if (!proceed)
            continue;
        }
      }
    } else if (session?.validated) {
      printSuccess(`${adapter.displayName} \u2014 already authenticated`);
    }
    installPlan.push({ provider, level });
  }
  printDivider();
  console.log("\n  Installation preview:\n");
  for (const plan of installPlan) {
    const installer = INSTALLERS[plan.provider];
    const preview = await installer.preview(projectDir, plan.level);
    console.log(`  ${PROVIDER_LABELS[plan.provider]} (${plan.level}):`);
    for (const f of preview.filesToCreate) {
      console.log(`    + ${f.path}`);
    }
    for (const f of preview.filesToModify) {
      console.log(`    ~ ${f.path}`);
    }
    console.log("");
  }
  if (options.dryRun) {
    printInfo("Dry run \u2014 no files written.");
    return;
  }
  const confirmed = await promptConfirm("Install overlays?");
  if (!confirmed) {
    printWarning("Installation cancelled.");
    return;
  }
  printDivider();
  console.log("\n  Installing...\n");
  const installResults = [];
  for (const plan of installPlan) {
    const installer = INSTALLERS[plan.provider];
    const result = await installer.install(projectDir, plan.level);
    installResults.push({ provider: plan.provider, result });
    if (result.success) {
      printSuccess(`${PROVIDER_LABELS[plan.provider]} overlay installed (${plan.level})`);
      if (result.filesCreated.length > 0) {
        printInfo(`Created ${result.filesCreated.length} files`);
      }
      for (const warning of result.warnings) {
        printWarning(warning);
      }
    } else {
      printError(`Failed to install ${PROVIDER_LABELS[plan.provider]}`);
    }
  }
  printDivider();
  console.log("\n  Next steps:\n");
  const shownSteps = /* @__PURE__ */ new Set();
  for (const { result } of installResults) {
    for (const step of result.nextSteps) {
      if (!shownSteps.has(step)) {
        printInfo(step);
        shownSteps.add(step);
      }
    }
  }
  console.log("");
  printSuccess("Arcanea Intelligence OS initialized.");
  console.log(`
  ${import_picocolors2.default.dim("Run `arcanea status` to see your installation.")}
`);
});

// dist/commands/auth.js
var PROVIDERS = ["claude", "openai", "gemini", "copilot", "opencode"];
var authCommand = new Command("auth").description("Manage AI provider authentication");
authCommand.command("add <provider>").description("Add or update credentials for a provider").action(async (providerName) => {
  const provider = providerName;
  if (!PROVIDERS.includes(provider)) {
    printError(`Unknown provider: ${providerName}. Available: ${PROVIDERS.join(", ")}`);
    return;
  }
  const adapter = getAuthAdapter(provider);
  const keystore = createKeystore();
  printInfo(`Authenticate with ${adapter.displayName}`);
  printInfo(`Get your API key at: ${adapter.getSetupUrl()}`);
  const credential = await promptPassword("  Enter API key: ");
  if (!credential) {
    printError("No key provided.");
    return;
  }
  const session = await adapter.validate(credential);
  if (session.validated) {
    await keystore.save(provider, credential);
    printSuccess(`Validated and saved! ${session.models.length} models available.`);
  } else {
    printError("Validation failed \u2014 the key appears to be invalid.");
  }
});
authCommand.command("list").description("Show authenticated providers").action(async () => {
  const keystore = createKeystore();
  printDivider();
  console.log("\n  Authenticated providers:\n");
  for (const provider of PROVIDERS) {
    const cred = await keystore.load(provider);
    if (cred) {
      const adapter = getAuthAdapter(provider);
      const session = await adapter.validate(cred);
      if (session.validated) {
        printSuccess(`${adapter.displayName} \u2014 ${maskCredential(cred)} (${session.models.length} models)`);
      } else {
        printError(`${adapter.displayName} \u2014 ${maskCredential(cred)} (invalid)`);
      }
    } else {
      printError(`${getAuthAdapter(provider).displayName} \u2014 not configured`);
    }
  }
  console.log("");
});
authCommand.command("remove <provider>").description("Remove stored credentials for a provider").action(async (providerName) => {
  const provider = providerName;
  const keystore = createKeystore();
  await keystore.delete(provider);
  printSuccess(`Credentials for ${providerName} removed.`);
});
authCommand.command("validate").description("Re-validate all stored credentials").action(async () => {
  const keystore = createKeystore();
  const stored = await keystore.list();
  for (const provider of stored) {
    const cred = await keystore.load(provider);
    if (!cred)
      continue;
    const adapter = getAuthAdapter(provider);
    const session = await adapter.validate(cred);
    if (session.validated) {
      printSuccess(`${adapter.displayName} \u2014 valid`);
    } else {
      printError(`${adapter.displayName} \u2014 invalid`);
    }
  }
});

// dist/commands/status.js
var import_node_fs8 = require("node:fs");
var import_node_path8 = require("node:path");
var import_picocolors3 = __toESM(require_picocolors(), 1);
var PROVIDERS2 = ["claude", "openai", "gemini", "copilot", "opencode"];
var statusCommand = new Command("status").description("Show Arcanea overlay status").option("-d, --dir <path>", "Project directory", process.cwd()).action(async (options) => {
  const projectDir = options.dir;
  printBanner();
  console.log("  Providers:\n");
  const keystore = createKeystore();
  for (const provider of PROVIDERS2) {
    const cred = await keystore.load(provider);
    const adapter = getAuthAdapter(provider);
    if (cred) {
      printSuccess(`${adapter.displayName.padEnd(25)} ${maskCredential(cred)}`);
    } else {
      printError(`${adapter.displayName.padEnd(25)} not configured`);
    }
  }
  const manifestPath = (0, import_node_path8.join)(projectDir, ".arcanea", "overlay-manifest.json");
  console.log("\n  Overlays:\n");
  if ((0, import_node_fs8.existsSync)(manifestPath)) {
    try {
      const manifest = JSON.parse((0, import_node_fs8.readFileSync)(manifestPath, "utf-8"));
      const overlays = manifest.overlays || {};
      if (Object.keys(overlays).length === 0) {
        printInfo("No overlays installed. Run `arcanea init` to get started.");
      } else {
        for (const [provider, config] of Object.entries(overlays)) {
          let adapterDisplayName;
          try {
            const adapter = getAuthAdapter(provider);
            adapterDisplayName = adapter.displayName;
          } catch {
            adapterDisplayName = provider;
          }
          const filesCount = config.filesManaged?.length || 0;
          printSuccess(`${adapterDisplayName.padEnd(18)} ${config.level.padEnd(10)} v${config.packageVersion}  (${filesCount} files)`);
        }
      }
    } catch {
      printError("Could not read overlay manifest.");
    }
  } else {
    printInfo("No overlay manifest found. Run `arcanea init` to get started.");
  }
  console.log(`
  ${import_picocolors3.default.dim("Run `arcanea update` to check for overlay updates.")}
`);
});

// dist/commands/install.js
var INSTALLERS2 = {
  claude: new ClaudeOverlayInstaller(),
  openai: new ChatGPTOverlayInstaller(),
  gemini: new GeminiOverlayInstaller(),
  copilot: new CopilotOverlayInstaller(),
  opencode: new OpenCodeOverlayInstaller()
};
var installCommand = new Command("install").description("Install a specific overlay").argument("<provider>", "Provider to install (claude, openai, gemini, copilot, cursor)").option("-l, --level <level>", "Overlay level (minimal, standard, full, luminor)", "standard").option("-d, --dir <path>", "Project directory", process.cwd()).option("--dry-run", "Preview without installing").action(async (providerName, options) => {
  const resolvedName = providerName === "cursor" ? "opencode" : providerName;
  const provider = resolvedName;
  const installer = INSTALLERS2[provider];
  if (!installer) {
    printError(`Unknown provider: ${providerName}`);
    printInfo(`Available: ${Object.keys(INSTALLERS2).join(", ")}`);
    return;
  }
  const level = options.level;
  const projectDir = options.dir;
  if (options.dryRun) {
    const preview = await installer.preview(projectDir, level);
    console.log(`
  Preview for ${providerName} (${level}):
`);
    for (const f of preview.filesToCreate)
      console.log(`  + ${f.path} \u2014 ${f.description}`);
    for (const f of preview.filesToModify)
      console.log(`  ~ ${f.path} \u2014 ${f.description}`);
    console.log(`
  Estimated size: ${preview.estimatedSize}
`);
    return;
  }
  printInfo(`Installing ${providerName} overlay (${level})...`);
  const result = await installer.install(projectDir, level);
  if (result.success) {
    printSuccess(`${providerName} overlay installed!`);
    printDivider();
    console.log("  Files created:");
    for (const f of result.filesCreated)
      console.log(`    + ${f}`);
    if (result.filesModified.length) {
      console.log("  Files modified:");
      for (const f of result.filesModified)
        console.log(`    ~ ${f}`);
    }
    console.log("\n  Next steps:");
    for (const step of result.nextSteps)
      printInfo(step);
    console.log("");
  } else {
    printError("Installation failed.");
  }
});

// dist/commands/update.js
var import_node_fs9 = require("node:fs");
var import_node_path9 = require("node:path");
var INSTALLERS3 = {
  claude: new ClaudeOverlayInstaller(),
  openai: new ChatGPTOverlayInstaller(),
  gemini: new GeminiOverlayInstaller(),
  copilot: new CopilotOverlayInstaller(),
  opencode: new OpenCodeOverlayInstaller()
};
var updateCommand = new Command("update").description("Update existing Arcanea overlays to latest content").option("-d, --dir <path>", "Project directory", process.cwd()).option("--dry-run", "Preview changes without updating").action(async (options) => {
  const projectDir = options.dir;
  const manifestPath = (0, import_node_path9.join)(projectDir, ".arcanea", "overlay-manifest.json");
  if (!(0, import_node_fs9.existsSync)(manifestPath)) {
    printError("No Arcanea overlays found. Run `arcanea init` first.");
    return;
  }
  const manifest = JSON.parse((0, import_node_fs9.readFileSync)(manifestPath, "utf-8"));
  const overlays = manifest.overlays || {};
  const providers = Object.keys(overlays);
  if (providers.length === 0) {
    printWarning("No overlays installed. Run `arcanea init` to get started.");
    return;
  }
  printInfo(`Found ${providers.length} overlay(s) to update...`);
  printDivider();
  for (const providerKey of providers) {
    const overlay = overlays[providerKey];
    const level = overlay.level || "standard";
    const installerKey = providerKey === "cursor" ? "opencode" : providerKey;
    const installer = INSTALLERS3[installerKey];
    if (!installer) {
      printWarning(`Unknown provider: ${providerKey} \u2014 skipping`);
      continue;
    }
    if (options.dryRun) {
      const preview = await installer.preview(projectDir, level);
      console.log(`
  ${providerKey} (${level}):`);
      for (const f of preview.filesToCreate)
        console.log(`    + ${f.path}`);
      for (const f of preview.filesToModify)
        console.log(`    ~ ${f.path}`);
      continue;
    }
    const result = await installer.install(projectDir, level);
    if (result.success) {
      const totalFiles = result.filesCreated.length + result.filesModified.length;
      printSuccess(`${providerKey} (${level}) \u2014 ${totalFiles} files updated`);
    } else {
      printError(`Failed to update ${providerKey}`);
    }
  }
  if (!options.dryRun) {
    console.log("");
    printSuccess("All overlays updated.");
  } else {
    console.log("");
    printInfo("Dry run \u2014 no files written.");
  }
});

// dist/commands/world.js
var import_node_fs10 = require("node:fs");
var import_node_path10 = require("node:path");
var SEVEN_PILLARS = [
  {
    name: "geography",
    description: "Physical landscape, climate, and natural features",
    guardian: "lyssandria",
    questions: [
      "What is the dominant terrain? (mountains, oceans, forests, deserts, floating islands)",
      "What makes this geography unique or magical?",
      "How does the landscape shape the cultures within it?",
      "What natural resources exist? What is scarce?"
    ],
    template: `# Geography of {{REALM}}

## Terrain & Landscape
<!-- Describe the dominant terrain, climate zones, and natural features -->

## Unique Geographic Features
<!-- What makes this place unlike any other? Floating islands? Living forests? -->

## Natural Resources
| Resource | Abundance | Location | Significance |
|----------|-----------|----------|-------------|
| | | | |

## Climate & Seasons
<!-- How do seasons work? Are they tied to magical cycles? -->

## Key Locations
### Capital / Major Settlement
### Sacred Sites
### Dangerous Regions

---
*Guided by Lyssandria, Guardian of Foundation (396 Hz)*
*"Every great realm begins with solid ground."*`
  },
  {
    name: "history",
    description: "Timeline, founding myths, and pivotal events",
    guardian: "lyria",
    questions: [
      "How was this realm founded? What is the creation myth?",
      "What are the three most pivotal events in its history?",
      "What is the current era called? What defines it?",
      "What historical wounds still shape the present?"
    ],
    template: `# History of {{REALM}}

## Creation Myth
<!-- How did this realm come into being? -->

## Timeline of Ages

### The First Age \u2014 {{NAME}}
<!-- The founding era -->

### The Second Age \u2014 {{NAME}}
<!-- The era of growth or conflict -->

### The Current Age \u2014 {{NAME}}
<!-- What defines the present? -->

## Pivotal Events
1. **{{Event 1}}** \u2014
2. **{{Event 2}}** \u2014
3. **{{Event 3}}** \u2014

## Historical Wounds
<!-- What past trauma or conflict still echoes in the present? -->

## Prophecies & Unresolved Threads
<!-- What has been foretold? What remains unfinished? -->

---
*Guided by Lyria, Guardian of Sight (852 Hz)*
*"To see the future, first understand the past."*`
  },
  {
    name: "cultures",
    description: "Peoples, traditions, languages, and social structures",
    guardian: "maylinn",
    questions: [
      "What are the major peoples or factions?",
      "What traditions define daily life?",
      "How do people greet each other? What is considered sacred?",
      "What are the social hierarchies? Who has power?"
    ],
    template: `# Cultures of {{REALM}}

## Major Peoples / Factions

### {{People 1}}
- **Philosophy**:
- **Traditions**:
- **Distinctive Feature**:

### {{People 2}}
- **Philosophy**:
- **Traditions**:
- **Distinctive Feature**:

## Social Structure
<!-- How is society organized? Hierarchies, castes, councils, democracy? -->

## Daily Life
<!-- What does a typical day look like? -->

## Sacred Traditions
<!-- What rituals, festivals, or practices are most important? -->

## Language & Communication
<!-- How do people communicate? Special languages, sign systems? -->

## Art & Expression
<!-- What forms of art, music, or storytelling dominate? -->

---
*Guided by Maylinn, Guardian of Heart (639 Hz)*
*"Culture is the heartbeat of a world."*`
  },
  {
    name: "magic",
    description: "Magic system, rules, costs, and practitioners",
    guardian: "draconia",
    questions: [
      "What is the source of magic? Where does power come from?",
      "What are the rules? What can magic NOT do?",
      "What is the cost of using magic?",
      "Who can use magic? Is it innate or learned?"
    ],
    template: `# Magic System of {{REALM}}

## Source of Power
<!-- Where does magic come from? Elements, gods, inner energy, technology? -->

## The Five Laws of Magic
1. **Law of Source**:
2. **Law of Cost**:
3. **Law of Limits**:
4. **Law of Balance**:
5. **Law of Consequence**:

## Schools / Disciplines
| School | Element | Focus | Practitioners |
|--------|---------|-------|--------------|
| | | | |

## The Cost of Magic
<!-- What does using magic cost? Physical toll, life force, materials? -->

## Who Can Use Magic?
<!-- Is magic innate? Learned? Granted? Stolen? -->

## Forbidden Magic
<!-- What is considered too dangerous or immoral? -->

## Magical Artifacts
<!-- What powerful objects exist? Who controls them? -->

---
*Guided by Draconia, Guardian of Fire (528 Hz)*
*"Power without understanding is wildfire."*`
  },
  {
    name: "economy",
    description: "Trade, currency, resources, and commerce",
    guardian: "alera",
    questions: [
      "What is the primary currency? Is it physical or magical?",
      "What are the most valuable trade goods?",
      "Who controls the economy? Guilds, governments, free markets?",
      "What role does magic play in commerce?"
    ],
    template: `# Economy of {{REALM}}

## Currency System
| Currency | Value | Material | Used By |
|----------|-------|----------|---------|
| | | | |

## Key Trade Goods
<!-- What commodities drive the economy? -->

## Economic Power Structure
<!-- Who controls trade? Guilds, merchants, governments? -->

## Markets & Trade Routes
<!-- Where do people trade? What routes connect regions? -->

## Role of Magic in Commerce
<!-- How does magic affect production, transport, or value? -->

## Wealth & Poverty
<!-- What does wealth look like? What about poverty? -->

---
*Guided by Alera, Guardian of Voice (741 Hz)*
*"An economy speaks the truth of a civilization."*`
  },
  {
    name: "politics",
    description: "Power structures, governance, conflicts, and alliances",
    guardian: "ino",
    questions: [
      "How is the realm governed? Monarchy, council, democracy, anarchy?",
      "What are the major political factions or alliances?",
      "What is the greatest source of political tension?",
      "How are disputes resolved?"
    ],
    template: `# Politics of {{REALM}}

## System of Government
<!-- Monarchy, republic, council, theocracy, tribal confederation? -->

## Current Leadership
| Title | Name | Faction | Agenda |
|-------|------|---------|--------|
| | | | |

## Major Factions
### {{Faction 1}}
- **Goal**:
- **Method**:
- **Allies**:

### {{Faction 2}}
- **Goal**:
- **Method**:
- **Allies**:

## Sources of Tension
<!-- What conflicts threaten stability? -->

## Diplomacy & Alliances
<!-- Who is allied? Who is at war? Who is neutral? -->

## Laws & Justice
<!-- How are laws made? How is justice served? -->

---
*Guided by Ino, Guardian of Unity (963 Hz)*
*"Politics is the art of holding many truths at once."*`
  },
  {
    name: "belief",
    description: "Religion, philosophy, cosmology, and spiritual practices",
    guardian: "aiyami",
    questions: [
      "What do people believe about the origin of the world?",
      "Are there gods? Are they real? Do they intervene?",
      "What happens after death?",
      "What philosophical debates divide the people?"
    ],
    template: `# Beliefs of {{REALM}}

## Cosmology
<!-- What do people believe about the nature of reality? -->

## The Divine
<!-- Are there gods? What are they like? Do they intervene? -->

## Creation Myth
<!-- How do believers say the world began? -->

## The Afterlife
<!-- What happens after death? Is it known or debated? -->

## Religious Practices
<!-- What rituals, prayers, or ceremonies are performed? -->

## Philosophical Schools
### {{School 1}}
- **Core Belief**:
- **Practice**:

### {{School 2}}
- **Core Belief**:
- **Practice**:

## Heresies & Forbidden Beliefs
<!-- What ideas are considered dangerous or heretical? -->

## Sacred Sites
<!-- Where do people worship or seek spiritual connection? -->

---
*Guided by Aiyami, Guardian of Crown (963 Hz)*
*"Belief shapes reality. Choose wisely what you worship."*`
  }
];
var worldCommand = new Command("world").description("Generate world-building templates using the Seven Pillars framework").argument("[aspect]", "Pillar to generate (geography, history, cultures, magic, economy, politics, belief)").option("-n, --name <name>", "Realm name", "MyRealm").option("-d, --dir <path>", "Output directory", process.cwd()).option("--all", "Generate all seven pillars").action(async (aspect, options) => {
  const realmName = options.name;
  const safeSlug = realmName.toLowerCase().replace(/[^a-z0-9\s-]+/g, "").replace(/\s+/g, "-").replace(/^-|-$/g, "") || "realm";
  const outDir = (0, import_node_path10.join)(options.dir, ".arcanea", "worlds", safeSlug);
  if (!(0, import_node_fs10.existsSync)(outDir))
    (0, import_node_fs10.mkdirSync)(outDir, { recursive: true });
  const pillarsToGenerate = options.all ? SEVEN_PILLARS : aspect ? SEVEN_PILLARS.filter((p) => p.name === aspect.toLowerCase()) : [];
  if (pillarsToGenerate.length === 0 && !options.all) {
    console.log("\n  The Seven Pillars of World-Building:\n");
    for (const p of SEVEN_PILLARS) {
      const guardian = GUARDIANS.find((g) => g.name === p.guardian);
      console.log(`    ${p.name.padEnd(12)} \u2014 ${p.description}`);
      console.log(`    ${" ".repeat(12)}   Guardian: ${guardian?.displayName || p.guardian}
`);
    }
    console.log("  Usage:");
    console.log('    arcanea world geography --name "Dragon Peaks"');
    console.log('    arcanea world --all --name "Kingdom of Light"\n');
    return;
  }
  printDivider();
  console.log(`
  Generating world templates for "${realmName}"...
`);
  for (const pillar of pillarsToGenerate) {
    const content = pillar.template.replace(/\{\{REALM\}\}/g, realmName);
    const filePath = (0, import_node_path10.join)(outDir, `${pillar.name}.md`);
    (0, import_node_fs10.writeFileSync)(filePath, content);
    const guardian = GUARDIANS.find((g) => g.name === pillar.guardian);
    printSuccess(`${pillar.name} \u2014 guided by ${guardian?.displayName || pillar.guardian}`);
  }
  console.log(`
  Files written to: .arcanea/worlds/${safeSlug}/`);
  printInfo(`${pillarsToGenerate.length} pillar(s) generated`);
  if (!options.all && pillarsToGenerate.length < 7) {
    printInfo("Use --all to generate all seven pillars");
  }
  console.log("");
});

// dist/commands/create.js
var import_node_fs11 = require("node:fs");
var import_node_path11 = require("node:path");
var TEMPLATES = {
  character: {
    dir: "characters",
    generate: (name) => `# Character Profile: ${name}

## The Character Diamond

### Want (External Goal)
<!-- What does ${name} actively pursue? The visible quest. -->

### Wound (Internal Pain)
<!-- What past trauma or fear drives them? The hidden truth. -->

### Mask (False Self)
<!-- How does ${name} present themselves to the world? The performance. -->

### Need (True Growth)
<!-- What must ${name} learn or accept? The transformation. -->

---

## Identity

| Attribute | Value |
|-----------|-------|
| **Full Name** | ${name} |
| **Age** | |
| **Element** | |
| **Academy** | |
| **Rank** | |
| **Godbeast Bond** | |

## Appearance
<!-- Physical description, distinctive features, style -->

## Personality
### Strengths
-
### Flaws
-
### Quirks
-

## Voice
<!-- How does ${name} speak? Formal? Casual? Metaphor-heavy? Terse? -->
**Sample dialogue**: "${name} would say..."

## Backstory
### Origin
<!-- Where did they come from? -->

### Defining Moment
<!-- What event changed everything? -->

### Current Situation
<!-- Where are they now? What do they want? -->

## Relationships
| Character | Relationship | Dynamic |
|-----------|-------------|---------|
| | | |

## Arc
### Starting State
<!-- Who is ${name} at the beginning? -->

### Catalyst
<!-- What disrupts their world? -->

### Transformation
<!-- How do they change? -->

### Ending State
<!-- Who does ${name} become? -->

---
*"Every character carries a wound. Every wound carries a gift."*
*\u2014 The Character Diamond, Arcanea Academy Handbook*`
  },
  scene: {
    dir: "scenes",
    generate: (name) => `# Scene: ${name}

## Scene Header
| Element | Value |
|---------|-------|
| **Location** | |
| **Time** | |
| **POV Character** | |
| **Scene Goal** | What must happen in this scene? |
| **Conflict** | What opposes the goal? |
| **Outcome** | How does the scene end? (success/failure/twist) |

## The Five Senses
Anchor the reader in the physical world:

### Sight
<!-- What does the POV character see? Light, color, movement? -->

### Sound
<!-- What do they hear? Silence can be as powerful as noise. -->

### Touch / Feel
<!-- Temperature, texture, pain, comfort? -->

### Smell
<!-- Scents carry memory and emotion. -->

### Taste (if relevant)
<!-- Sometimes taste grounds a scene unexpectedly. -->

## Characters Present
| Character | Want (this scene) | Emotion | Secret |
|-----------|------------------|---------|--------|
| | | | |

## Scene Beats
1. **Opening image**:
2. **Inciting moment**:
3. **Rising tension**:
4. **Crisis point**:
5. **Resolution/Cliffhanger**:

## Emotional Arc
- **Start**: Character feels ___
- **Middle**: Tension shifts to ___
- **End**: Character feels ___

## Subtext
<!-- What is NOT being said? What do characters mean vs. what they say? -->

## Scene Connections
- **Follows from**:
- **Leads to**:
- **Foreshadows**:

---
*"A scene is a unit of change. If nothing changes, cut the scene."*
*\u2014 Scene Craft, Arcanea Academy Handbook*`
  },
  "magic-system": {
    dir: "magic",
    generate: (name) => `# Magic System: ${name}

## The Five Elements Framework

### Source
<!-- Where does the magic come from? -->
- [ ] Elemental (Fire, Water, Earth, Wind, Void)
- [ ] Divine (granted by gods or guardians)
- [ ] Internal (innate energy, willpower)
- [ ] External (artifacts, ley lines, celestial alignment)
- [ ] Hybrid (combination)

### Rules
Every magic system needs clear rules. Define yours:

| Rule | Description |
|------|-------------|
| **What it CAN do** | |
| **What it CANNOT do** | |
| **Hard limits** | |
| **Soft limits** | |

### Cost
<!-- All magic has a price. What is it? -->

| Cost Type | Description | Severity |
|-----------|-------------|----------|
| **Physical** | (exhaustion, pain, aging) | |
| **Mental** | (memory loss, madness, corruption) | |
| **Material** | (reagents, fuel, rare elements) | |
| **Spiritual** | (soul debt, karma, life force) | |
| **Social** | (taboo, isolation, fear) | |

### Scale
How powerful can magic get?

| Tier | Ability | Practitioner Level |
|------|---------|-------------------|
| **Cantrip** | Small effects | Apprentice |
| **Spell** | Moderate effects | Mage |
| **Ritual** | Large effects | Master |
| **Miracle** | World-altering | Archmage |
| **Transcendence** | Reality-bending | Luminor |

### Schools / Disciplines
| School | Element | Focus | Philosophy |
|--------|---------|-------|-----------|
| | Fire | | "Power through transformation" |
| | Water | | "Strength through adaptation" |
| | Earth | | "Endurance through foundation" |
| | Wind | | "Freedom through movement" |
| | Void | | "Potential through release" |

## Practitioners

### How is magic learned?
<!-- Academy? Apprenticeship? Innate awakening? Blood inheritance? -->

### Who cannot use magic?
<!-- Is anyone excluded? Why? Is this just or unjust? -->

## Forbidden Magic
<!-- What is considered too dangerous? Who polices this? -->

## Interactions
### Magic + Technology
<!-- How does magic interact with technology in your world? -->

### Magic + Society
<!-- How does magic shape social structures? -->

### Magic + Nature
<!-- How does magic affect the natural world? -->

---
*"A magic system is a promise to the reader: these are the rules of wonder."*
*\u2014 The Five Elements Framework, Arcanea Academy Handbook*`
  }
};
var createCommand2 = new Command("create").description("Generate creative templates (character, scene, magic-system)").argument("<type>", "Template type: character, scene, magic-system").argument("<name>", "Name for the creation").option("-d, --dir <path>", "Output directory", process.cwd()).action(async (type, name, options) => {
  const template = TEMPLATES[type];
  if (!template) {
    console.log("\n  Available templates:\n");
    for (const [key, t] of Object.entries(TEMPLATES)) {
      console.log(`    ${key.padEnd(14)} \u2192 .arcanea/${t.dir}/{name}.md`);
    }
    console.log('\n  Usage: arcanea create character "Elena Stormweaver"\n');
    return;
  }
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const outDir = (0, import_node_path11.join)(options.dir, ".arcanea", template.dir);
  if (!(0, import_node_fs11.existsSync)(outDir))
    (0, import_node_fs11.mkdirSync)(outDir, { recursive: true });
  const content = template.generate(name);
  const filePath = (0, import_node_path11.join)(outDir, `${slug}.md`);
  (0, import_node_fs11.writeFileSync)(filePath, content);
  printSuccess(`${type} template created: .arcanea/${template.dir}/${slug}.md`);
  printInfo(`Fill in the template to bring "${name}" to life`);
  console.log("");
});

// dist/commands/route.js
var import_picocolors4 = __toESM(require_picocolors(), 1);
var routeCommand = new Command("route").description("Route a task to the best Guardian").argument("<description...>", "Task description to route").action((descWords) => {
  const description = descWords.join(" ");
  const result = routeToGuardian(description);
  const g = result.guardian;
  console.log();
  console.log(`  ${import_picocolors4.default.bold(import_picocolors4.default.cyan(g.displayName))} ${import_picocolors4.default.dim(`(${g.role})`)}`);
  console.log(`  ${import_picocolors4.default.dim("Gate:")} ${g.gate} ${import_picocolors4.default.dim("|")} ${import_picocolors4.default.dim("Element:")} ${result.element} ${import_picocolors4.default.dim("|")} ${import_picocolors4.default.dim("Confidence:")} ${import_picocolors4.default.green((result.confidence * 100).toFixed(0) + "%")}`);
  console.log(`  ${import_picocolors4.default.dim("Domain:")} ${g.domain}`);
  console.log();
  console.log(`  ${import_picocolors4.default.italic(import_picocolors4.default.dim(g.vibe))}`);
  console.log();
  console.log(`  ${import_picocolors4.default.dim("Reasoning:")} ${result.reasoning}`);
  if (result.alternatives.length > 0) {
    console.log();
    printDivider();
    console.log(`  ${import_picocolors4.default.dim("Alternatives:")}`);
    for (const alt of result.alternatives) {
      const pct = (alt.confidence * 100).toFixed(0);
      console.log(`    ${import_picocolors4.default.dim(alt.guardian.displayName)} (${pct}%)`);
    }
  }
  console.log();
  console.log(`  ${import_picocolors4.default.dim(g.signOff)}`);
  console.log();
});

// dist/commands/voice.js
var import_picocolors5 = __toESM(require_picocolors(), 1);
var voiceCommand = new Command("voice").description("Check text against the Arcanea Voice Bible").argument("<text...>", "Text to check").option("--fix", "Auto-fix violations where possible").action((textWords, opts) => {
  const text = textWords.join(" ");
  const enforcer = new VoiceEnforcer();
  const result = enforcer.check(text);
  console.log();
  const scoreColor = result.score >= 80 ? import_picocolors5.default.green : result.score >= 50 ? import_picocolors5.default.yellow : import_picocolors5.default.red;
  console.log(`  ${import_picocolors5.default.bold("Voice Score:")} ${scoreColor(result.score.toString())}/100  ${result.passed ? import_picocolors5.default.green("PASSED") : import_picocolors5.default.red("NEEDS WORK")}`);
  if (result.violations.length > 0) {
    console.log();
    printDivider();
    console.log(`  ${import_picocolors5.default.bold("Violations")} (${result.violations.length}):`);
    console.log();
    for (const v of result.violations) {
      const icon = v.rule.severity === "error" ? import_picocolors5.default.red("x") : v.rule.severity === "warning" ? import_picocolors5.default.yellow("!") : import_picocolors5.default.dim("~");
      console.log(`  ${icon} ${import_picocolors5.default.dim(`[${v.rule.severity}]`)} "${import_picocolors5.default.bold(v.match)}" \u2014 ${v.rule.description}`);
      console.log(`    ${import_picocolors5.default.cyan("->")} ${v.suggestion}`);
    }
  }
  if (opts.fix) {
    console.log();
    printDivider();
    const fixed = enforcer.fix(text);
    console.log(`  ${import_picocolors5.default.bold("Fixed:")}`);
    console.log(`  ${fixed}`);
  }
  console.log();
});

// dist/commands/tokens.js
var import_picocolors6 = __toESM(require_picocolors(), 1);
var tokensCommand = new Command("tokens").description("Export Arcanea design system tokens").option("-f, --format <format>", "Output format: css, tailwind, json", "json").option("--colors", "Show color palette only").action((opts) => {
  if (opts.colors) {
    console.log();
    console.log(`  ${import_picocolors6.default.bold("Arcanea Color Palette")}`);
    console.log();
    for (const [group, values] of Object.entries(COLORS)) {
      console.log(`  ${import_picocolors6.default.bold(import_picocolors6.default.dim(group.toUpperCase()))}`);
      for (const [name, value] of Object.entries(values)) {
        console.log(`    ${import_picocolors6.default.dim(name.padEnd(12))} ${value}`);
      }
      console.log();
    }
    return;
  }
  switch (opts.format) {
    case "css":
      console.log(toCSSVariables());
      break;
    case "tailwind":
      console.log(JSON.stringify(toTailwindConfig(), null, 2));
      break;
    case "json":
    default:
      console.log(JSON.stringify(toJSON(), null, 2));
      break;
  }
});

// dist/index.js
var program2 = new Command();
program2.name("arcanea").description("Arcanea Realm \u2014 Overlay any AI tool with arcane intelligence").version("0.2.0");
program2.addCommand(initCommand);
program2.addCommand(authCommand);
program2.addCommand(statusCommand);
program2.addCommand(installCommand);
program2.addCommand(updateCommand);
program2.addCommand(routeCommand);
program2.addCommand(voiceCommand);
program2.addCommand(tokensCommand);
program2.addCommand(worldCommand);
program2.addCommand(createCommand2);
program2.parse(process.argv);
