/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Step, TableContainer } from '@data-wrangling-components/core'
import type { IRenderFunction, IDetailsColumnProps } from '@fluentui/react'
import { memo } from 'react'
import styled from 'styled-components'
import { ManageSteps } from '../../Steps/index.js'
import { TableListBar } from '../TableListBar/TableListBar.js'
import { PreviewTable } from '../index.js'
import { useBusinessLogic } from './PrepareDataFull.hooks.js'

export const PrepareDataFull: React.FC<{
	tables: TableContainer[]
	onUpdateSteps: (steps: Step[]) => void
	steps?: Step[]
	outputHeaderCommandBar?: IRenderFunction<IDetailsColumnProps>[]
}> = memo(function PrepareDataFull({
	tables,
	onUpdateSteps,
	steps,
	outputHeaderCommandBar,
}) {
	const {
		selectedTable,
		selectedTableName,
		setSelectedTableName,
		onDeleteStep,
		onSaveStep,
		store,
		lastTableName,
		derived,
	} = useBusinessLogic(tables, onUpdateSteps, steps)

	return (
		<Container>
			<InputContainer>
				<SectionTitle>Tables</SectionTitle>
				<TableListBar
					inputs={tables}
					derived={derived}
					selected={selectedTableName}
					onSelect={setSelectedTableName}
				/>
			</InputContainer>

			<StepsTrayContainer>
				<SectionTitle>Steps</SectionTitle>
				<StepsContainer>
					<ManageSteps
						nextInputTable={lastTableName}
						onDelete={onDeleteStep}
						onSave={onSaveStep}
						onSelect={setSelectedTableName}
						store={store}
						steps={steps}
					/>
				</StepsContainer>
			</StepsTrayContainer>

			<OutputContainer>
				<SectionTitle>Preview</SectionTitle>
				<PreviewTable
					headerCommandBar={outputHeaderCommandBar}
					table={selectedTable}
					name={selectedTableName}
				/>
			</OutputContainer>
		</Container>
	)
})

const GAP = 18
const INPUT_HEIGHT = 60
const STEPS_HEIGHT = 260

const SectionTitle = styled.span`
	margin: 0 ${GAP}px 0 ${GAP}px;
	font-weight: bold;
	writing-mode: vertical-rl;
	transform: rotate(180deg);
	font-size: 15px;
	align-self: center;
	text-transform: uppercase;
	color: ${({ theme }) => theme.application().lowMidContrast().hex()};
`

const Container = styled.div`
	display: flex;
	flex-flow: column;
	height: 100%;
	width: 100%;
	padding: ${GAP}px 0 ${GAP}px 0;
	gap: 18px;
`

const InputContainer = styled.div`
	display: flex;
	min-height: ${INPUT_HEIGHT}px;
	flex: 0 1 ${INPUT_HEIGHT}px;
	padding-right: ${GAP}px;
`

const OutputContainer = styled.div`
	flex: 1 1 auto;
	display: flex;
	padding-right: ${GAP}px;
	max-height: calc(100% - ${INPUT_HEIGHT + STEPS_HEIGHT + GAP * 4}px);
`

const StepsTrayContainer = styled.div`
	flex: 0 1 ${STEPS_HEIGHT}px;
	display: flex;
	min-height: ${STEPS_HEIGHT}px;
	background-color: ${({ theme }) => theme.application().faint().hex()};
	padding: 0;
`
const StepsContainer = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	align-items: center;
`
