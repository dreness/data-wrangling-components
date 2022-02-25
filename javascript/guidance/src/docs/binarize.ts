/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const content =
	"# binarize\n\nConverts values to a 0 or 1 based on a comparison function match. This is commonly used in machine learning causal models where the input data needs to be turned into a series of flags. See [filter](./filter.md) for a description of the comparison functions available.\n\n## Example\n\n| age |\n| --- |\n| 12  |\n| 32  |\n| 35  |\n| 64  |\n\n`binarize column['age'] >= 35`:\n\n| age |\n| --- |\n| 0   |\n| 0   |\n| 1   |\n| 1   |\n"
export default content
