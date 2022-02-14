/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { IColumn } from '@fluentui/react'
import { useThematic } from '@thematic/react'
import React, { memo, useMemo } from 'react'
import { useCellDimensions } from '../hooks'
import { getValue } from '../util'
import { ColumnCellProps, Dimensions } from './types'

/**
 * Symbolic rendering of boolean values.
 * TODO: this should probably be a check versus x
 */
export const BooleanSymbolCell: React.FC<ColumnCellProps> = memo(
	function BooleanSymbolCell({ item, column }) {
		const dimensions = useCellDimensions(column)
		const attrs = useBooleanCircleAttrs(dimensions, item, column)
		return (
			<svg width={dimensions.width} height={dimensions.height}>
				<circle {...attrs} />
			</svg>
		)
	},
)

function useBooleanCircleAttrs(
	dimensions: Dimensions,
	item?: any,
	column?: IColumn,
) {
	const theme = useThematic()
	return useMemo(() => {
		// TODO: helpers for extracting steeltoe table value defaults with all these optionals
		const value = !!getValue(item, column)
		const { width, height } = dimensions
		return {
			cx: width / 2,
			cy: height / 2,
			r: height / 4,
			fill: value ? theme.process().fill().hex() : 'none',
			stroke: theme.process().stroke().hex(),
		}
	}, [theme, dimensions, item, column])
}
