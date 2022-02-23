/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { escape, op } from 'arquero'
import type ColumnTable from 'arquero/dist/types/table/column-table'
import type { ExprObject } from 'arquero/dist/types/table/transformable'
import type { TableStore } from '../../index.js'
import type { RecodeArgs, Step } from '../../types.js'

/**
 * Executes an arquero derive to map a list of values to new values.
 * Commonly used for recategorization.
 * @param step
 * @param store
 * @returns
 */
export async function recode(
	step: Step,
	store: TableStore,
): Promise<ColumnTable> {
	const { input, args } = step
	const { column, to, map } = args as RecodeArgs
	const inputTable = await store.get(input)

	const dArgs: ExprObject = {
		[to]: escape((d: any) => op.recode(d[column], map)),
	}

	return inputTable.derive(dArgs)
}