/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { AggregateStep } from '@data-wrangling-components/core'
import { memo, useMemo } from 'react'
import { VerbDescription } from '../../index.js'
import type { StepDescriptionProps } from '../../types.js'

export const AggregateDescription: React.FC<StepDescriptionProps> = memo(
	function AggregateDescription(props) {
		const rows = useMemo(() => {
			const internal = props.step as AggregateStep
			const { args } = internal
			return [
				{
					before: 'into column',
					value: args.to,
				},
				{
					before: 'group by',
					value: args.groupby,
				},
				{
					before: 'rollup column',
					value: args.column,
					sub: [
						{
							before: 'with function',
							value: args.operation,
						},
					],
				},
			]
		}, [props])
		return <VerbDescription {...props} rows={rows} />
	},
)
