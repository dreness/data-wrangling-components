/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const content =
	"# dedupe\n\nDeduplicates table rows. A list of column names can be supplied to create the key for duplicate checking, otherwise all columns are used In other words, the cell values for every supplied key must match to be considered a duplicate row.\n\n## Example\n\n| name  | age |\n| ----- | --- |\n| Bob   | 32  |\n| Joe   | 35  |\n| Jenny | 31  |\n| Bob   | 45  |\n| Bob   | 32  |\n\n`dedupe` default uses all columns, so the final row is removed:\n\n| name  | age |\n| ----- | --- |\n| Bob   | 32  |\n| Joe   | 35  |\n| Jenny | 31  |\n| Bob   | 45  |\n\n`dedupe columns['name']` removes any matches with the same name, ignoring other columns that may differ:\n\n| name  | age |\n| ----- | --- |\n| Bob   | 32  |\n| Joe   | 35  |\n| Jenny | 31  |\n"
export default content
