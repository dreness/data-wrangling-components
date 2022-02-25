/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const content =
	"# filter\n\nCreates a filtered table that only contains rows that match specified criteria. Filter can compare the values of an input column to a fixed value (e.g.) `row.value <= 10`), or it can compare to the value of another column in the same row (e.g., `row.value <= row.other_value`). Comparisons can be numeric (=, !=, <, >, etc.) or string-based (equals, contains, starts with, etc.).\n\n## Comparison operators\n\n_numeric_\n\n- Eq ('=')\n- NotEq ('!=')\n- Lt ('<')\n- Lte ('<=')\n- Gt ('>')\n- Gte ('>=')\n- NotEmpty ('is not empty')\n- Empty ('is empty')\n\n_string_\n\n- Equal ('equals')\n- NotEqual ('is not equal')\n- Contains ('contains')\n- StartsWith ('starts with')\n- EndsWith ('ends with')\n- NotEmpty ('is not empty')\n- Empty ('is empty')\n\n## Examples\n\n| fy20 | fy21 |\n| ---- | ---- |\n| 100  | 124  |\n| 23   | 165  |\n| 354  | 300  |\n\n`filter where column['fy20'] < 200`:\n\n| fy20 | fy21 |\n| ---- | ---- |\n| 100  | 124  |\n| 23   | 165  |\n\n`filter where column['fy20'] > column['fy21']`:\n\n| fy20 | fy21 |\n| ---- | ---- |\n| 354  | 300  |\n"
export default content
