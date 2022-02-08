/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { SpreadArgs, SpreadStep, Step } from '@data-wrangling-components/core'
import { ActionButton } from '@fluentui/react'
import ColumnTable from 'arquero/dist/types/table/column-table'
import { set } from 'lodash'
import React, { memo, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { useHandleDropdownChange, useLoadTable } from '../../common'
import { TableColumnDropdown } from '../../controls'
import { StepComponentProps } from '../../types'
import { ColumnSpread } from '../ColumnSpread'

/**
 * Provides inputs for a step that needs lists of columns.
 */
export const SpreadInputs: React.FC<StepComponentProps> = memo(
	function SpreadInputs({ step, store, table, onChange, input }) {
		const internal = useMemo(() => step as SpreadStep, [step])

		const tbl = useLoadTable(input || step.input, table, store)
		const columns = useColumns(internal, tbl, onChange)

		const handleButtonClick = useCallback(() => {
			onChange &&
				onChange({
					...internal,
					args: {
						...internal.args,
						columns: [...internal.args.columns, first(tbl)],
					},
				})
		}, [internal, tbl, onChange])

		const handleColumnChange = useHandleDropdownChange(
			step,
			'args.column',
			onChange,
		)

		return (
			<Container>
				<TableColumnDropdown
					required
					table={tbl}
					label={'Column to spread'}
					selectedKey={(step.args as SpreadArgs).column}
					onChange={handleColumnChange}
				/>

				{columns}
				<ActionButton
					onClick={handleButtonClick}
					iconProps={{ iconName: 'Add' }}
					disabled={!tbl}
				>
					Add column
				</ActionButton>
			</Container>
		)
	},
)

function first(table?: ColumnTable): string {
	return table?.columnNames()[0] as string
}

function useColumns(
	step: SpreadStep,
	table?: ColumnTable,
	onChange?: (step: Step) => void,
) {
	return useMemo(() => {
		return step.args.columns.map((column: string, index: number) => {
			const handleColumnChange = (col: string) => {
				const update = { ...step }
				set(update, `args.columns[${index}]`, col)
				onChange && onChange(update)
			}

			const handleDeleteClick = () => {
				const update = { ...step }
				update.args.columns.splice(index, 1)
				onChange && onChange(update)
			}

			return (
				<ColumnSpread
					key={`column-list-${column}-${index}`}
					column={column}
					onChange={handleColumnChange}
					onDelete={handleDeleteClick}
				/>
			)
		})
	}, [step, onChange])
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 12px;
`
