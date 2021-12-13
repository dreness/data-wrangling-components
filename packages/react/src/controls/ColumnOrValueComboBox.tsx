/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ComboBox, IComboBoxProps } from '@fluentui/react'
import { internal as ArqueroTypes } from 'arquero'
import { SelectableOptionMenuItemType } from 'office-ui-fabric-react'
import React, { memo, useMemo } from 'react'
import { useTableColumnOptions } from '../common'
import { columnDropdownStyles } from './styles'

export interface ColumnOrValueComboBoxProps extends Partial<IComboBoxProps> {
	table?: ArqueroTypes.ColumnTable
}

/**
 * ComboBox that allows the user to either input a freeform value or select a column.
 * We frequently have operations where a comparison may be to a fixed value, or should
 * be dependent on per-row column values.
 */
export const ColumnOrValueComboBox: React.FC<ColumnOrValueComboBoxProps> = memo(
	function ColumnOrValueComboBox({ table, ...rest }) {
		const options = useTableColumnOptions(table)
		const withHeader = useMemo(() => {
			return [
				{
					key: 'header',
					text: 'Columns',
					itemType: SelectableOptionMenuItemType.Header,
				},
				...options,
			]
		}, [options])
		return (
			<ComboBox
				allowFreeform
				label={'Column or value'}
				placeholder={'text/number or select column'}
				options={withHeader}
				styles={columnDropdownStyles}
				{...rest}
			/>
		)
	},
)