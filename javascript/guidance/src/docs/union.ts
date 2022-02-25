/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const content =
	"# union\n\nSet operation between an input table and one or more secondary tables that retains the unique set of rows across all tables. This is similar to a [concat](./concat.md) + [dedupe](./dedupe.md).\n\n## Example\n\ninput 1\n\n| id  |\n| --- |\n| 1   |\n| 2   |\n\ninput 2\n\n| id  |\n| --- |\n| 1   |\n| 3   |\n| 4   |\n\n`union table['input 1'] with table['input 2']`:\n\n| id  |\n| --- |\n| 1   |\n| 2   |\n| 3   |\n| 4   |\n"
export default content
