/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ColumnConfigMap, ArqueroTable } from '@data-wrangling-components/react'
import { IconButton } from '@fluentui/react'
import { useThematic } from '@thematic/react'
import { internal as ArqueroTypes } from 'arquero'
import React, { memo, useMemo } from 'react'
import styled from 'styled-components'

export interface TableProps {
	name?: string
	table: ArqueroTypes.ColumnTable
	config: ColumnConfigMap
}

export const Table: React.FC<TableProps> = memo(function Table({
	name,
	table,
	config,
}) {
	// note that we always reify the table for display, because some arquero operations
	// only create backing indexes (i.e., orderby, filter)
	const theme = useThematic()
	const buttonStyles = useMemo(
		() => ({
			root: {
				color: theme.application().background().hex(),
			},
		}),
		[theme],
	)
	// TODO: this would be better to do lazily because it copies the table data
	const downloadUrl = useMemo(() => {
		const blob = new Blob([table.toCSV()])
		return URL.createObjectURL(blob)
	}, [table])
	return (
		<Container className="table-container">
			<Header>
				<H2>{name}</H2>
				<H3>{table.numRows()} rows</H3>
				<H3>{table.numCols()} cols</H3>
				<IconButton
					iconProps={{ iconName: 'Download' }}
					styles={buttonStyles}
					href={downloadUrl}
					download={name}
					type={'text/csv'}
				/>
			</Header>
			<TableContainer>
				<ArqueroTable table={table.reify()} columnConfig={config} />
			</TableContainer>
		</Container>
	)
})

const Container = styled.div`
	width: 300px;
	height: 300px;
	border: 1px solid ${({ theme }) => theme.application().faint().hex()};
`

const Header = styled.div`
	height: 36px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: ${({ theme }) => theme.application().accent().hex()};
`

const TableContainer = styled.div`
	overflow-y: scroll;
	height: 264px;
`

const H2 = styled.h3`
	font-weight: normal;
	font-size: 0.8em;
	margin-right: 8px;
	color: ${({ theme }) => theme.application().background().hex()};
`

const H3 = styled.h3`
	font-weight: normal;
	font-size: 0.8em;
	margin-right: 8px;
	color: ${({ theme }) => theme.application().background().hex()};
`