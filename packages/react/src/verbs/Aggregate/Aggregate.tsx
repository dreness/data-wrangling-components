/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AggregateStep } from '@data-wrangling-components/core'
import { TextField } from '@fluentui/react'
import React, { memo, useMemo } from 'react'
import styled from 'styled-components'
import { useHandleTextfieldChange, LeftAlignedRow } from '../../common'
import { AggregateInputs } from '../../controls'
import { columnDropdownStyles } from '../../controls/styles'
import { StepComponentProps } from '../../types'

/**
 * Provides inputs for an aggregation step.
 */
export const Aggregate: React.FC<StepComponentProps> = memo(function Aggregate({
	step,
	store,
	onChange,
}) {
	const internal = useMemo(() => step as AggregateStep, [step])

	const handleAsChange = useHandleTextfieldChange(internal, 'args.as', onChange)

	return (
		<Container>
			<LeftAlignedRow>
				<TextField
					required
					label={'New column name'}
					placeholder={'Column name'}
					value={internal.args.as}
					styles={columnDropdownStyles}
					onChange={handleAsChange}
				/>
			</LeftAlignedRow>
			<AggregateInputs step={step} store={store} onChange={onChange} />
		</Container>
	)
})

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`