/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const content =
	"# aggregate\n\nCombines a [groupby](./groupby.md) with a [rollup](./rollup.md) to support all-in-one data aggregations.\n\n## Example\n\n| id  | value |\n| --- | ----- |\n| 1   | 10    |\n| 1   | 15    |\n| 2   | 1     |\n| 2   | 11    |\n| 2   | 18    |\n\n`aggregate column['value'] with function='sum', groupby column['id'], to_column='output'`:\n\n| id  | output |\n| --- | ------ |\n| 1   | 25     |\n| 2   | 30     |\n"
export default content
