/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo } from 'react'
import styled from 'styled-components'
import { LeftAlignedRow, useHandleDropdownChange } from './common'
import { TableDropdown } from './controls'
import { HOCFunction, StepComponentProps } from './types'

/**
 * Higher order component generator to wrap a Step in the input table dropdown.
 * @param label optional label to use for the dropdown instead of the default.
 * @returns
 */
export const withTableDropdown = (
	label?: string,
): HOCFunction<StepComponentProps> => {
	return Component => {
		const WithTableDropdown: React.FC<StepComponentProps> = props => {
			const { step, store, onChange } = props
			const handleTableChange = useHandleDropdownChange(step, 'input', onChange)
			return (
				<Container className="with-table-dropdown">
					<LeftAlignedRow>
						<TableDropdown
							store={store}
							label={label || 'Input table'}
							selectedKey={step.input}
							onChange={handleTableChange}
						/>
					</LeftAlignedRow>
					<Component {...props} />
				</Container>
			)
		}
		return memo(WithTableDropdown)
	}
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: flex-start;
`