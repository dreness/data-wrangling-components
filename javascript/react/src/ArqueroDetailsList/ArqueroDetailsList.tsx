/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	DetailsList,
	DetailsListLayoutMode,
	IColumn,
	SelectionMode,
	IDetailsListStyles,
	ConstrainMode,
} from '@fluentui/react'
import type { RowObject } from 'arquero/dist/types/table/table'
import { memo, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { groupBuilder } from '../common/index.js'
import {
	useColumns,
	useDetailsHeaderRenderer,
	useDetailsListStyles,
	useGroupHeaderRenderer,
	useSlicedTable,
	useSortedGroups,
	useSortedTable,
	useSortHandling,
	useStripedRowsRenderer,
	useTableMetadata,
	useSubsetTable,
} from './hooks/index.js'
import type { ArqueroDetailsListProps, DetailsListFeatures } from './types.js'

/**
 * Renders an arquero table using a fluent DetailsList.
 */
export const ArqueroDetailsList: React.FC<ArqueroDetailsListProps> = memo(
	function ArqueroDetailsList(props) {
		const {
			table,
			features = {},
			metadata,
			offset = 0,
			limit = Infinity,
			includeAllColumns = true,
			visibleColumns,
			isSortable = false,
			isStriped = false,
			isColumnClickable = false,
			showColumnBorders = false,
			selectedColumn,
			onColumnClick,
			onCellDropdownSelect,
			onRenderGroupHeader,
			// extract props we want to set data-centric defaults for
			selectionMode = SelectionMode.none,
			layoutMode = DetailsListLayoutMode.fixedColumns,
			columns,
			onColumnHeaderClick,
			styles,
			isHeadersFixed = false,
			compact = false,
			// passthrough the remainder as props
			...rest
		} = props

		const [version, setVersion] = useState(0)
		const { sortColumn, sortDirection, handleColumnHeaderClick } =
			useSortHandling(isSortable, onColumnHeaderClick)

		// first subset the table using the visible columns
		// this will prevent any further operations on columns we aren't going to show
		const subset = useSubsetTable(table, visibleColumns)
		// sort the table internally
		// note that this is different than the orderby of a pipeline step
		// this is a temporary sort only for the table display
		const sorted = useSortedTable(subset, sortColumn, sortDirection)
		// slice any potential page
		const sliced = useSlicedTable(sorted, offset, limit)
		// last, copy these items to actual JS objects for the DetailsList
		const items = useMemo(() => sliced.objects(), [sliced])

		// if the table is grouped, groups the information in a way we can iterate
		const groupedEntries = useMemo(
			() =>
				table.isGrouped() ? sliced.objects({ grouped: 'entries' }) : undefined,
			[sliced, table],
		)

		// sorts first level group headers
		const sortedGroups = useSortedGroups(
			table,
			sortColumn,
			sortDirection,
			groupedEntries,
		)

		const computedMetadata = useTableMetadata(
			table,
			metadata,
			anyStatsFeatures(features),
		)

		const isDefaultHeaderClickable = useMemo((): any => {
			return isSortable || isColumnClickable || !!onColumnHeaderClick
		}, [isSortable, isColumnClickable, onColumnHeaderClick])

		const displayColumns = useColumns(
			table,
			computedMetadata,
			columns,
			visibleColumns,
			handleColumnHeaderClick,
			{
				features,
				sortColumn,
				sortDirection,
				selectedColumn,
				onColumnClick,
				onCellDropdownSelect,
				isDefaultHeaderClickable,
				includeAllColumns,
				isColumnClickable,
				showColumnBorders,
				compact,
			},
		)

		const headerStyle = useDetailsListStyles(
			isHeadersFixed,
			features,
			styles as IDetailsListStyles,
			!!onColumnClick,
			compact,
		)

		const renderRow = useStripedRowsRenderer(isStriped, showColumnBorders)
		const renderDetailsHeader = useDetailsHeaderRenderer()
		const renderGroupHeader = useGroupHeaderRenderer(
			table,
			computedMetadata,
			onRenderGroupHeader,
			features.lazyLoadGroups,
		)

		const groups = useMemo(() => {
			if (!sliced.isGrouped()) {
				return undefined
			}

			const existingGroups = sliced.groups()
			const totalLevelCount = existingGroups.names.length

			return sortedGroups?.map((row: RowObject) => {
				const initialLevel = 0
				return groupBuilder(
					row,
					existingGroups,
					initialLevel,
					totalLevelCount,
					items,
					sortDirection,
					features.lazyLoadGroups,
					sortColumn,
				)
			})
		}, [sliced, sortedGroups, items, sortColumn, sortDirection, features])

		// as in FluentUI documentation, when updating item we can update the list items with a spread operator.
		// since when adding a new column we're changing the columns prop too, this approach doesn't work for that.
		// a workaround found in the issues suggest to use this version property to use as comparisson to force re-render
		useEffect(() => {
			setVersion(prev => prev + 1)
		}, [columns, table, compact])

		return (
			<DetailsWrapper data-is-scrollable="true">
				<DetailsList
					items={[...items]}
					selectionMode={selectionMode}
					layoutMode={layoutMode}
					groups={groups}
					getKey={(_: any, index?: number) => {
						return (index as number).toString()
					}} //To be sure that every key is unique
					groupProps={{
						onRenderHeader: renderGroupHeader,
					}}
					columns={displayColumns as IColumn[]}
					constrainMode={ConstrainMode.unconstrained}
					onRenderRow={renderRow}
					onRenderDetailsHeader={renderDetailsHeader}
					compact={compact}
					{...rest}
					listProps={{
						version,
					}}
					styles={headerStyle}
				/>
			</DetailsWrapper>
		)
	},
)

const DetailsWrapper = styled.div`
	height: inherit;
	position: relative;
	max-height: inherit;
	overflow-y: auto;
	overflow-x: auto;

	span.ms-DetailsHeader-cellTitle {
		background-color: ${({ theme }) => theme.application().background().hex()};
	}

	.ms-List-cell {
		min-height: unset;
	}

	.ms-CommandBar {
		padding: unset;
	}

	.ms-OverflowSet {
		justify-content: center;
	}
`

function anyStatsFeatures(features?: DetailsListFeatures) {
	return Object.values(features || {}).some(v => v)
}
