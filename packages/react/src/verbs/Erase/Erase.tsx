/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo } from 'react'
import { EraseInputs } from '../../controls'
import { StepComponentProps } from '../../types'

/**
 * Provides inputs for an aggregation step.
 */
export const Erase: React.FC<StepComponentProps> = memo(function Erase(props) {
	return <EraseInputs {...props} />
})
