/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { IDetailsColumnProps, IRenderFunction } from '@fluentui/react'
import { useMemo } from 'react'

const DEFAULT_COLUMN_WIDTH = 100
const DEFAULT_COMMAND_BAR_WIDTH = 40
const DEFAULT_COMMAND_BAR_THRESHOLD = 10

export function useCountMinWidth(
	commandBar: IRenderFunction<IDetailsColumnProps>[] | undefined,
): number {
	return useMemo(() => {
		const elementsWidth = Math.max(
			...(commandBar?.map(command => +command()?.props?.style?.width) || [0]),
		)

		const buttonsWidth =
			Math.max(
				...(commandBar?.map(command => command()?.props.items.length) || [0]),
			) * DEFAULT_COMMAND_BAR_WIDTH

		const totalWidth = Math.max(buttonsWidth, elementsWidth)

		const minCommandBar = Math.max(
			DEFAULT_COLUMN_WIDTH,
			totalWidth + DEFAULT_COMMAND_BAR_THRESHOLD,
		)
		return minCommandBar
	}, [commandBar])
}
