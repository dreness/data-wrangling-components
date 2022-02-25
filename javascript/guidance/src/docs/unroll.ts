/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const content =
	"# unroll\n\nUnrolls array-valued cells into new rows. Similar to [spread](./spread.md), but generating new rows instead of columns. Akin to a denormalize operation - other column values in the row are copied to the new rows.\n\n## Example\n\n| id  | values      |\n| --- | ----------- |\n| 1   | [10, 15]    |\n| 2   | [1, 11, 18] |\n\n`unroll column['values']`:\n\n| id  | values |\n| --- | ------ |\n| 1   | 10     |\n| 1   | 15     |\n| 2   | 1      |\n| 2   | 11     |\n| 2   | 18     |\n"
export default content
