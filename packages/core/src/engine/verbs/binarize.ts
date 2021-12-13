/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { internal as ArqueroTypes } from 'arquero'
import { TableStore } from '../..'
import { BinarizeArgs, Step } from '../../types'
import { compare } from '../util'

/**
 * Executes an arquero derive where the output is a 1 or 0.
 */
export async function binarize(
	step: Step,
	store: TableStore,
): Promise<ArqueroTypes.ColumnTable> {
	const { input, args } = step
	const { column, value, operator, type, as } = args as BinarizeArgs
	const inputTable = await store.get(input)

	const expr = compare(column, value, operator, type)

	const dArgs = {
		[`${as}`]: expr,
	}

	return inputTable.derive(dArgs)
}