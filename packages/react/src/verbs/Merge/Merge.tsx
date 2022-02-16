/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo } from 'react'
import { VerbContainer } from '../../common'
import { MergeInputs } from '../../controls'
import type { StepComponentProps } from '../../types'

/**
 * Provides inputs for an aggregation step.
 */
export const Merge: React.FC<StepComponentProps> = memo(function Merge(props) {
	return (
		<VerbContainer>
			<MergeInputs {...props} />
		</VerbContainer>
	)
})