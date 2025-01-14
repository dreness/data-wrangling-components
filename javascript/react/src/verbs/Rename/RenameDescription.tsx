/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { RenameStep } from '@data-wrangling-components/core'
import { memo, useMemo } from 'react'
import { createRowEntries, VerbDescription } from '../../index.js'
import type { StepDescriptionProps } from '../../types.js'

export const RenameDescription: React.FC<StepDescriptionProps> = memo(
	function RenameDescription(props) {
		const rows = useMemo(() => {
			const internal = props.step as RenameStep
			const { args } = internal
			const entries = Object.entries(args.columns || {})
			const sub = createRowEntries(
				entries,
				c => ({
					value: `${c[0]} -> ${c[1]}`,
				}),
				1,
				props,
			)
			return [
				{
					before: 'columns',
					value: entries.length === 0 ? undefined : '',
					sub,
				},
			]
		}, [props])
		return <VerbDescription {...props} rows={rows} />
	},
)
