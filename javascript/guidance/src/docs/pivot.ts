/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const content =
	"# pivot\n\nPerforms an inverse of the [fold](./fold.md) operation, aggregating output values. If you want a direct fold reversal that restores rows, use [unfold](./unfold.md). If an aggregation operation is not specified, `any` is used.\n\n## Example\n\n| key   | value |\n| ----- | ----- |\n| id    | 1     |\n| sales | 100   |\n| id    | 1     |\n| sales | 200   |\n| id    | 2     |\n| sales | 150   |\n| sales | 300   |\n| id    | 3     |\n| sales | 12    |\n| sales | 31    |\n\n`pivot key['id'], value['sales'], operation='sum'`:\n\n| id  | sales |\n| --- | ----- |\n| 1   | 300   |\n| 2   | 450   |\n| 3   | 43    |\n"
export default content
