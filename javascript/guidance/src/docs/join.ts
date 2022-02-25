/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const content =
	"# join\n\nCombines two tables using relational inner join mechanics. A join key (column name) from the input and secondary table can be specified. Only rows with a match on each table are copied. All columns from the secondary table are joined with the input. If a secondary join key is not specified, the primary join key is used for both tables.\n\n## Example\n\ninput 1\n\n| id  | name  |\n| --- | ----- |\n| 1   | Bob   |\n| 2   | Joe   |\n| 3   | Jenny |\n| 4   | Kate  |\n\ninput 2\n\n| id  | age |\n| --- | --- |\n| 1   | 32  |\n| 2   | 35  |\n| 3   | 21  |\n\n`join table['input 1'] with table['input 2'] on column['id']`:\n\n| id  | name  | age |\n| --- | ----- | --- |\n| 1   | Bob   | 32  |\n| 2   | Joe   | 35  |\n| 3   | Jenny | 31  |\n"
export default content
