/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Dropdown, IDropdownProps } from '@fluentui/react'
import { internal as ArqueroTypes } from 'arquero'
import React, { memo } from 'react'
import { useTableColumnOptions } from '../../common'
import { columnDropdownStyles } from '../styles'

export interface TableColumnDropdownProps extends Partial<IDropdownProps> {
	table?: ArqueroTypes.ColumnTable
}

/**
 * Dropdown wrapper to automatically list the columns of an Arquero table.
 */
export const TableColumnDropdown: React.FC<TableColumnDropdownProps> = memo(
	function TableColumnDropdown({ table, ...rest }) {
		const options = useTableColumnOptions(table)
		return (
			<Dropdown
				label={'Column'}
				placeholder={'Select column'}
				options={options}
				styles={columnDropdownStyles}
				{...rest}
			/>
		)
	},
)