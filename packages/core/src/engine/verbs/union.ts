/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { internal as ArqueroTypes } from 'arquero'
import { TableStore } from '../..'
import { SetOp, Step } from '../../types'
import { set } from '../util'

/**
 * Executes an arquero table union.
 * @param step
 * @param store
 * @returns
 */
export async function union(
	step: Step,
	store: TableStore,
): Promise<ArqueroTypes.ColumnTable> {
	return set(step, store, SetOp.Union)
}