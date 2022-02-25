/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const content =
	"# recode\n\nAllows mapping of cell contents from one one value to another. This is useful for categorizing or otherwise performing direct value transforms.\n\n## Example\n\n| product       |\n| ------------- |\n| xbox 360      |\n| xbox one      |\n| xbox series x |\n| outlook       |\n| word          |\n| excel         |\n| powerpoint    |\n\n`recode column['product] values=['xbox 360' -> 'xbox', 'xbox one' -> 'xbox', 'xbox series x' -> 'xbox', 'outlook -> m365', 'word' -> 'm365', 'excel' -> 'm365', 'powerpoint' -> 'm365'], to_column='family'`\n\n| product       | family |\n| ------------- | ------ |\n| xbox 360      | xbox   |\n| xbox one      | xbox   |\n| xbox series x | xbox   |\n| outlook       | m365   |\n| word          | m365   |\n| excel         | m365   |\n| powerpoint    | m365   |\n"
export default content
